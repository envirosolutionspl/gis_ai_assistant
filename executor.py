# -*- coding: utf-8 -*-
"""Wykonywanie planu krok po kroku.

Algorytmy Processing uruchamiane są w tle (QgsProcessingAlgRunnerTask), więc QGIS
nie zamarza. Kroki wymagające użytkownika wstrzymują plan do potwierdzenia.
"""
import contextlib
import io
import traceback
from urllib.parse import urlencode

from qgis.core import (
    Qgis,
    QgsApplication,
    QgsExpressionContext,
    QgsExpressionContextUtils,
    QgsFeature,
    QgsField,
    QgsGeometry,
    QgsMapLayer,
    QgsMessageLog,
    QgsNetworkAccessManager,
    QgsProcessingAlgRunnerTask,
    QgsProcessingContext,
    QgsProcessingFeatureSourceDefinition,
    QgsProcessingFeedback,
    QgsProcessingUtils,
    QgsProject,
    QgsRasterLayer,
    QgsVectorLayer,
)
from qgis.PyQt.QtCore import QObject, QTimer, QUrl, pyqtSignal
from qgis.PyQt.QtNetwork import QNetworkReply, QNetworkRequest

from .constants import LOG_TAG, ULDK_LEVELS, ULDK_URL
import qgis.core as _qcore

from .i18n import tr
from .utils import resolve_refs, short_json


def _string_field_type():
    """Typ pola tekstowego zgodny z wersją: QgsField(QMetaType) istnieje dopiero od QGIS 3.38."""
    try:
        from qgis.PyQt.QtCore import QVariant
        if Qgis.QGIS_VERSION_INT < 33800:
            return QVariant.String
    except (ImportError, AttributeError):  # PyQt6 nie ma QVariant.String
        pass
    from qgis.PyQt.QtCore import QMetaType
    return QMetaType.Type.QString


_STRING_TYPE = _string_field_type()

PENDING, RUNNING, DONE, ERROR, WAITING, SKIPPED = "pending", "running", "done", "error", "waiting", "skipped"

# Dostawcy czytający pliki z dysku – wczytanie wymaga potwierdzenia użytkownika (audyt B2).
LOCAL_PROVIDERS = {"ogr", "gdal", "delimitedtext", "spatialite", "pdal", "mdal", "virtual", "postgres",
                   "mssql", "oracle", "hana"}

_LAYER_OUTPUT_CLASSES = tuple(getattr(_qcore, n) for n in (
    "QgsProcessingOutputVectorLayer", "QgsProcessingOutputRasterLayer", "QgsProcessingOutputMapLayer",
    "QgsProcessingOutputPointCloudLayer", "QgsProcessingOutputVectorTileLayer") if hasattr(_qcore, n))


class StepError(Exception):
    pass


def _flag(obj, new_path, old_name):
    """Zwraca flagę w nowej (Qgis.*) lub starej konwencji API."""
    try:
        cur = Qgis
        for part in new_path.split("."):
            cur = getattr(cur, part)
        return cur
    except AttributeError:
        return getattr(obj, old_name)


def _is_optional(param):
    from qgis.core import QgsProcessingParameterDefinition
    flag = _flag(QgsProcessingParameterDefinition, "ProcessingParameterFlag.Optional", "FlagOptional")
    return bool(param.flags() & flag)


def _no_threading(alg):
    from qgis.core import QgsProcessingAlgorithm
    flag = _flag(QgsProcessingAlgorithm, "ProcessingAlgorithmFlag.NoThreading", "FlagNoThreading")
    return bool(alg.flags() & flag)


class _Feedback(QgsProcessingFeedback):
    def __init__(self):
        super().__init__()
        self.messages = []

    def reportError(self, error, fatalError=False):  # noqa: N802,N803
        self.messages.append(str(error))
        super().reportError(error, fatalError)

    def pushWarning(self, warning):  # noqa: N802
        self.messages.append(str(warning))
        super().pushWarning(warning)


class PlanExecutor(QObject):
    changed = pyqtSignal()                 # zmiana statusu kroków – odśwież widok
    log = pyqtSignal(str, str)             # poziom, komunikat
    progress = pyqtSignal(float)           # postęp bieżącego algorytmu 0–100
    waitingForUser = pyqtSignal(int)       # krok user_action czeka na użytkownika
    confirmPython = pyqtSignal(int)        # krok python czeka na zatwierdzenie kodu
    confirmLoad = pyqtSignal(int, str)     # wczytanie pliku lokalnego czeka na zatwierdzenie
    stepFailed = pyqtSignal(int, str)      # krok zakończył się błędem
    replanRequested = pyqtSignal(int)      # po kroku użytkownika należy dopasować plan
    finished = pyqtSignal(bool)            # True = wszystko wykonane

    def __init__(self, iface, parent=None):
        super().__init__(parent)
        self.iface = iface
        self.plan = None
        self.steps = []
        self.idx = -1
        self.results = {}
        self.running = False
        self._task_refs = None
        self._net_reply = None
        self._uldk_queue = []
        self._uldk_layer = None
        # Numer bieżącego uruchomienia – spóźnione odpowiedzi z poprzedniego (np. po „Zatrzymaj”)
        # są ignorowane i nie przesuwają nowego planu (audyt A2).
        self._run_id = 0
        self._confirmed_loads = set()  # indeksy kroków load_layer zatwierdzonych w tym uruchomieniu

    # ================================================================ sterowanie
    def start(self, plan):
        self.plan = plan
        self.steps = plan["steps"]
        for s in self.steps:
            s["_status"] = PENDING
            s.pop("_error", None)
            s.pop("_result_text", None)
        self.results = {}
        self.idx = 0
        self.running = True
        self._run_id += 1
        self._task_refs = None
        self._net_reply = None
        self._confirmed_loads = set()
        self.log.emit("info", tr("Rozpoczynam wykonywanie planu „%s”.") % (plan.get("title") or ""))
        self._schedule()

    def abort(self):
        if not self.running:
            return
        self.running = False
        self._run_id += 1
        refs, self._task_refs = self._task_refs, None
        if refs:
            for obj in (refs[2], refs[3]):  # feedback i samo zadanie
                try:
                    obj.cancel()
                except Exception:  # noqa: BLE001
                    pass
        reply, self._net_reply = self._net_reply, None
        if reply is not None:
            reply.abort()
        if 0 <= self.idx < len(self.steps) and self.steps[self.idx]["_status"] in (RUNNING, WAITING):
            self.steps[self.idx]["_status"] = PENDING
        self.log.emit("warning", tr("Wykonywanie planu przerwane przez użytkownika."))
        self.changed.emit()
        self.finished.emit(False)

    def current(self):
        return self.steps[self.idx] if 0 <= self.idx < len(self.steps) else None

    def user_done(self, layer=None):
        """Użytkownik potwierdził wykonanie kroku user_action."""
        step = self.current()
        if not step or step["_status"] != WAITING:
            return
        exp = step.get("expects_layer")
        if layer is not None:
            self.results[step["id"]] = {"OUTPUT": layer.id(), "_layer_name": layer.name()}
            step["_result_text"] = tr("Wskazana warstwa: %s") % layer.name()
        elif exp:
            self.log.emit("warning", tr("Nie wskazano warstwy – kolejne kroki mogą jej wymagać."))
        self._mark(step, DONE)
        if step.get("replan_after"):
            self.replanRequested.emit(self.idx)   # interfejs wywoła apply_revision / continue_plan
        else:
            self._next()

    def skip(self):
        step = self.current()
        if not step:
            return
        self._mark(step, SKIPPED)
        self.log.emit("warning", tr("Pominięto krok: %s") % step["title"])
        self._next()

    def retry(self):
        step = self.current()
        if step:
            step.pop("_error", None)
            self._schedule()

    def continue_plan(self):
        """Kontynuacja po kroku użytkownika bez zmian planu."""
        self._next()

    def apply_revision(self, new_steps, from_index, continue_after=True):
        """Zastępuje kroki od from_index nowymi (np. po korekcie przez AI)."""
        self.steps[from_index:] = new_steps
        self._confirmed_loads = {i for i in self._confirmed_loads if i < from_index}
        self.plan["steps"] = self.steps
        self.log.emit("info", tr("Plan zaktualizowany (%d nowych kroków).") % len(new_steps))
        self.changed.emit()
        if continue_after:
            self.idx = from_index
            self._schedule()

    def done_summary(self):
        out = []
        for s in self.steps:
            if s["_status"] in (DONE, SKIPPED):
                res = self.results.get(s["id"], {})
                item = {"id": s["id"], "action": s["action"], "title": s["title"], "status": s["_status"]}
                layer_id = res.get("OUTPUT")
                lyr = QgsProject.instance().mapLayer(layer_id) if isinstance(layer_id, str) else None
                if lyr is not None:
                    item["output_layer"] = {"id": lyr.id(), "name": lyr.name()}
                else:
                    item["outputs"] = {k: v for k, v in res.items() if not k.startswith("_")}
                out.append(item)
        return out

    # ================================================================ pętla
    def _schedule(self):
        rid = self._run_id
        QTimer.singleShot(30, lambda r=rid: self._run_current(r))

    def _next(self):
        self.idx += 1
        self._schedule()

    def _mark(self, step, status):
        step["_status"] = status
        self.changed.emit()

    def _run_current(self, rid=None):
        if not self.running or (rid is not None and rid != self._run_id):
            return
        if self.idx >= len(self.steps):
            self.running = False
            self.log.emit("success", tr("Plan wykonany."))
            self.changed.emit()
            self.finished.emit(True)
            return
        step = self.steps[self.idx]
        self._mark(step, RUNNING)
        self.log.emit("info", tr("Krok %d: %s") % (self.idx + 1, step["title"]))
        handler = getattr(self, "_do_" + step["action"], None)
        try:
            if handler is None:
                raise StepError(tr("Nieobsługiwany typ kroku: %s") % step["action"])
            handler(step)
        except StepError as e:
            self._fail(step, str(e))
        except Exception as e:  # noqa: BLE001
            QgsMessageLog.logMessage(traceback.format_exc(), LOG_TAG, Qgis.MessageLevel.Critical)
            self._fail(step, "%s: %s" % (type(e).__name__, e))

    def _complete(self, step, result=None, text=None):
        if not self.running:
            return
        self.results[step["id"]] = result or {}
        if text:
            step["_result_text"] = text
        self._mark(step, DONE)
        self._next()

    def _fail(self, step, message):
        step["_error"] = message
        self._mark(step, ERROR)
        self.log.emit("error", tr("Błąd w kroku „%s”: %s") % (step["title"], message))
        self.stepFailed.emit(self.idx, message)

    # ================================================================ referencje
    def _lookup(self, sid, key):
        if sid not in self.results:
            raise StepError(tr("Krok „%s” nie ma jeszcze wyniku (pominięty lub nie wykonany).") % sid)
        res = self.results[sid]
        if key:
            if key not in res:
                raise StepError(tr("Krok „%s” nie ma wyjścia „%s” (dostępne: %s).") % (
                    sid, key, ", ".join(k for k in res if not k.startswith("_")) or "brak"))
            return res[key]
        if "OUTPUT" in res:
            return res["OUTPUT"]
        for v in res.values():
            if isinstance(v, str) and QgsProject.instance().mapLayer(v):
                return v
        raise StepError(tr("Krok „%s” nie zwrócił warstwy.") % sid)

    def _resolve(self, value):
        return resolve_refs(value, self._lookup)

    def get_layer(self, ref):
        ref = self._resolve(ref) if isinstance(ref, str) else ref
        if isinstance(ref, QgsMapLayer):
            return ref
        prj = QgsProject.instance()
        lyr = prj.mapLayer(str(ref))
        if lyr is None:
            found = prj.mapLayersByName(str(ref))
            lyr = found[0] if found else None
        return lyr

    # ================================================================ akcje
    # ---------------------------------------------------------------- processing
    def _do_processing(self, step):
        reg = QgsApplication.processingRegistry()
        alg = reg.createAlgorithmById(step["algorithm"])
        if alg is None:
            raise StepError(_unavailable_message(reg, step["algorithm"]))
        params = self._prepare_params(alg, self._resolve(step.get("params") or {}), step)

        context = QgsProcessingContext()
        context.setProject(QgsProject.instance())
        context.setTransformContext(QgsProject.instance().transformContext())
        ec = QgsExpressionContext()
        ec.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(None))
        context.setExpressionContext(ec)
        feedback = _Feedback()
        feedback.progressChanged.connect(self.progress.emit)

        ok, msg = alg.checkParameterValues(params, context)
        if not ok:
            raise StepError(tr("Niepoprawne parametry: %s\nParametry: %s") % (msg, short_json(_printable(params))))
        self.log.emit("debug", "%s %s" % (step["algorithm"], short_json(_printable(params), 400)))

        rid = self._run_id
        if _no_threading(alg):
            results, ok = alg.run(params, context, feedback)
            self._alg_done(step, alg, context, feedback, bool(ok), results or {}, rid)
            return
        task = QgsProcessingAlgRunnerTask(alg, params, context, feedback)
        self._task_refs = (alg, context, feedback, task)
        task.executed.connect(lambda ok, res, s=step, a=alg, c=context, f=feedback, r=rid:
                              self._alg_done(s, a, c, f, ok, res, r))
        QgsApplication.taskManager().addTask(task)

    def _prepare_params(self, alg, params, step):
        defs = {p.name(): p for p in alg.parameterDefinitions()}
        lower = {n.lower(): n for n in defs}
        clean = {}
        for k, v in params.items():
            name = k if k in defs else lower.get(str(k).lower())
            if not name:
                self.log.emit("warning", tr("Pomijam nieznany parametr „%s” algorytmu %s.") % (k, alg.id()))
                continue
            if isinstance(v, dict) and ("source" in v or "selected_only" in v):
                v = QgsProcessingFeatureSourceDefinition(str(v.get("source", "")), bool(v.get("selected_only")))
            if _is_optional(defs[name]) and _is_blank(v):
                continue  # pusty parametr opcjonalny – zostawiamy wartość domyślną algorytmu
            clean[name] = v
        for name, p in defs.items():
            if p.isDestination() and name not in clean and not _is_optional(p):
                clean[name] = "TEMPORARY_OUTPUT"
        fix = _PARAM_FIXES.get(alg.provider().id().lower() if alg.provider() else "")
        if fix:
            fix(clean, self.log)
        return clean

    def _alg_done(self, step, alg, context, feedback, ok, results, rid=None):
        if rid is not None and rid != self._run_id:
            return  # wynik zadania z przerwanego uruchomienia
        self._task_refs = None
        if not self.running or step is not self.current():
            return
        if not ok:
            detail = _clean_feedback(feedback.messages) or tr("Algorytm zakończył się niepowodzeniem.")
            self._fail(step, detail)
            return
        try:
            produced, texts = self._collect_outputs(step, alg, context, results)
        except Exception as e:  # noqa: BLE001
            self._fail(step, tr("Nie udało się dodać wyników do projektu: %s") % e)
            return
        self._complete(step, produced, "; ".join(texts) if texts else None)

    def _collect_outputs(self, step, alg, context, results):
        prj = QgsProject.instance()
        base = step.get("output_name") or step["title"]
        produced, texts, first_layer = {}, [], True
        for out in alg.outputDefinitions():
            name = out.name()
            if name not in results:
                continue
            val = results[name]
            is_layer_out = isinstance(out, _LAYER_OUTPUT_CLASSES) or isinstance(val, QgsMapLayer)
            if not is_layer_out:
                produced[name] = val if isinstance(val, (int, float, str, bool, type(None))) else str(val)
                if name not in ("OUTPUT_HTML_FILE",) and not isinstance(val, (list, dict)):
                    texts.append("%s = %s" % (name, str(val)[:80]))
                continue
            if isinstance(val, str) and prj.mapLayer(val):   # algorytm działał na istniejącej warstwie
                produced[name] = val
                continue
            layer = self._take_layer(val, context)
            if layer is None or not layer.isValid():
                produced[name] = val if isinstance(val, str) else str(val)
                continue
            layer.setName(base if first_layer else "%s (%s)" % (base, name))
            prj.addMapLayer(layer)
            produced[name] = layer.id()
            if first_layer:
                produced.setdefault("OUTPUT", layer.id())
                if isinstance(layer, QgsVectorLayer):
                    texts.append(tr("%s: %d obiektów") % (layer.name(), layer.featureCount()))
                else:
                    texts.append(tr("Dodano warstwę %s") % layer.name())
            first_layer = False
        return produced, texts

    @staticmethod
    def _take_layer(val, context):
        if isinstance(val, QgsMapLayer):
            return val
        if not isinstance(val, str) or not val:
            return None
        lyr = context.takeResultLayer(val)
        if lyr is not None:
            return lyr
        lyr = QgsProcessingUtils.mapLayerFromString(val, context, True)
        if lyr is not None:
            return lyr.clone() if QgsProject.instance().mapLayer(lyr.id()) is None else None
        vl = QgsVectorLayer(val, tr("wynik"), "ogr")
        if vl.isValid():
            return vl
        rl = QgsRasterLayer(val, "wynik")
        return rl if rl.isValid() else None

    # ---------------------------------------------------------------- okno algorytmu
    def _do_processing_dialog(self, step):
        import processing
        params = self._resolve(step.get("params") or {})
        before = set(QgsProject.instance().mapLayers().keys())
        results = processing.execAlgorithmDialog(step["algorithm"], params)
        new = [i for i in QgsProject.instance().mapLayers().keys() if i not in before]
        if not results and not new:  # okno zamknięte bez uruchomienia algorytmu
            step["_result_text"] = tr("Okno zamknięte bez uruchomienia – krok pominięty.")
            self._mark(step, SKIPPED)
            self.log.emit("warning", tr("Pominięto krok: %s") % step["title"])
            self._next()
            return
        res = {"OUTPUT": new[0]} if new else {}
        self._complete(step, res, tr("Nowe warstwy: %d") % len(new))

    # ---------------------------------------------------------------- wczytanie warstwy
    def _do_load_layer(self, step):
        provider = str(step.get("provider") or "").lower()
        uri = str(self._resolve(step.get("uri") or ""))
        name = step.get("name") or step["title"]
        if not uri:
            raise StepError(tr("Brak adresu (uri) warstwy."))
        needs_ok = provider in LOCAL_PROVIDERS or "/vsi" in uri.lower() or uri.lower().startswith("file:")
        if needs_ok and self.idx not in self._confirmed_loads:
            # plik lub baza wskazane przez model – tylko za zgodą użytkownika (audyt B2)
            self._mark(step, WAITING)
            self.confirmLoad.emit(self.idx, "%s: %s" % (provider, uri))
            return
        raster_providers = {"wms": "wms", "wmts": "wms", "xyz": "wms", "gdal": "gdal",
                            "wcs": "wcs", "arcgismapserver": "arcgismapserver"}
        vector_providers = {"wfs": "WFS", "oapif": "OAPIF", "ogr": "ogr", "arcgisfeatureserver": "arcgisfeatureserver",
                            "delimitedtext": "delimitedtext", "spatialite": "spatialite", "memory": "memory"}
        if provider in raster_providers:
            layer = QgsRasterLayer(uri, name, raster_providers[provider])
        elif provider in vector_providers:
            layer = QgsVectorLayer(uri, name, vector_providers[provider])
        else:
            raise StepError(tr("Nieobsługiwany dostawca danych „%s”.") % provider)
        if not layer.isValid():
            err = layer.error().summary() if layer.error() else ""
            raise StepError(tr("Nie udało się wczytać warstwy (%s). %s\n"
                            "Możesz wczytać ją ręcznie i pominąć ten krok albo poprosić AI o poprawkę.")
                            % (provider, err))
        QgsProject.instance().addMapLayer(layer)
        self._complete(step, {"OUTPUT": layer.id()}, tr("Wczytano: %s") % layer.name())

    def confirm_load(self, accepted):
        step = self.current()
        if not step or step["_status"] != WAITING or step["action"] != "load_layer":
            return
        if not accepted:
            self._mark(step, SKIPPED)
            self.log.emit("warning", tr("Pominięto krok: %s") % step["title"])
            self._next()
            return
        self._confirmed_loads.add(self.idx)
        self._run_current(self._run_id)

    # ---------------------------------------------------------------- ULDK GUGiK
    def _do_uldk_boundary(self, step):
        level = str(step.get("level") or "").lower().replace("ó", "o").replace("ę", "e").replace("ł", "l")
        level = {"województwo": "wojewodztwo", "wojewodztwa": "wojewodztwo", "obręb": "obreb",
                 "działka": "dzialka", "dzialki": "dzialka"}.get(level, level)
        if level not in ULDK_LEVELS:
            raise StepError(tr("Nieznany poziom jednostki ULDK: %s") % step.get("level"))
        teryt = step.get("teryt") or step.get("id_teryt") or step.get("code")
        codes = [str(t).strip() for t in (teryt if isinstance(teryt, list) else [teryt]) if str(t or "").strip()]
        if not codes:
            raise StepError(tr("Brak kodu TERYT jednostki."))
        name = step.get("name") or step["title"]
        vl = QgsVectorLayer("MultiPolygon?crs=EPSG:2180", name, "memory")
        pr = vl.dataProvider()
        pr.addAttributes([QgsField(n, _STRING_TYPE) for n in ("teryt", "nazwa", "powiat", "wojewodztwo")])
        vl.updateFields()
        self._uldk_layer = vl
        self._uldk_queue = list(codes)
        self._uldk_level = level
        self._uldk_step = step
        self._uldk_next()

    def _uldk_next(self):
        if not self._uldk_queue:
            vl, step = self._uldk_layer, self._uldk_step
            if vl.featureCount() == 0:
                self._fail(step, tr("ULDK nie zwróciło żadnej geometrii."))
                return
            vl.updateExtents()
            QgsProject.instance().addMapLayer(vl)
            self._complete(step, {"OUTPUT": vl.id()}, tr("%s: %d obiekt(y)") % (vl.name(), vl.featureCount()))
            return
        code = self._uldk_queue.pop(0)
        request, result = ULDK_LEVELS[self._uldk_level]
        url = ULDK_URL + "?" + urlencode({"request": request, "id": code, "result": result, "srid": "2180"})
        self.log.emit("debug", "ULDK: %s" % url)
        req = QNetworkRequest(QUrl(url))
        try:
            req.setTransferTimeout(60000)
        except AttributeError:
            pass
        reply = QgsNetworkAccessManager.instance().get(req)
        self._net_reply = reply
        rid = self._run_id
        reply.finished.connect(lambda r=reply, c=code, i=rid: self._uldk_reply(r, c, i))

    def _uldk_reply(self, reply, code, rid):
        try:
            if rid != self._run_id or not self.running:
                return  # odpowiedź z przerwanego uruchomienia
            if self._net_reply is reply:
                self._net_reply = None
            step = self._uldk_step
            if reply.error() != QNetworkReply.NetworkError.NoError:
                self._fail(step, tr("Błąd połączenia z ULDK: %s") % reply.errorString())
                return
            text = bytes(reply.readAll()).decode("utf-8", "replace")
        finally:
            reply.deleteLater()
        feats = self._parse_uldk(text, code)
        if not feats:
            self._fail(step, tr("ULDK nie znalazło jednostki o kodzie „%s” (%s). Odpowiedź: %s")
                       % (code, self._uldk_level, text.strip()[:120]))
            return
        self._uldk_layer.dataProvider().addFeatures(feats)
        self._uldk_next()

    def _parse_uldk(self, text, code):
        """Odpowiedź ULDK: 1. linia = status, kolejne = "SRID=2180;WKT|teryt|nazwa|…|województwo"."""
        feats = []
        for line in text.splitlines():
            line = line.strip()
            if not line or ("|" not in line and "(" not in line):
                continue  # linia statusu, np. "0"
            low = line.lower()
            if low.startswith("-1") or "brak wynik" in low or "błęd" in low:
                continue
            parts = [p.strip() for p in line.split("|")]
            wkt = parts[0]
            if wkt.upper().startswith("SRID=") and ";" in wkt:
                wkt = wkt.split(";", 1)[1]
            geom = QgsGeometry.fromWkt(wkt)
            if geom is None or geom.isEmpty():
                continue
            geom.convertToMultiType()
            teryt = parts[1] if len(parts) > 1 and parts[1] else code
            nazwa = parts[2] if len(parts) > 2 else ""
            woj = parts[-1] if len(parts) > 2 else ""
            powiat = parts[-2] if self._uldk_level != "wojewodztwo" and len(parts) >= 4 else ""
            f = QgsFeature(self._uldk_layer.fields())
            f.setGeometry(geom)
            f.setAttributes([teryt, nazwa, powiat, woj])
            feats.append(f)
        return feats

    # ---------------------------------------------------------------- użytkownik
    def _do_user_action(self, step):
        self._mark(step, WAITING)
        self.waitingForUser.emit(self.idx)

    def _do_zoom(self, step):
        layer = self.get_layer(step.get("layer") or "")
        if layer is None:
            raise StepError(tr("Nie znaleziono warstwy do przybliżenia."))
        canvas = self.iface.mapCanvas()
        ext = layer.extent()
        if ext.isEmpty():
            self._complete(step, {}, tr("Warstwa jest pusta – brak zasięgu do przybliżenia."))
            return
        try:
            from qgis.core import QgsCoordinateTransform
            xform = QgsCoordinateTransform(layer.crs(), canvas.mapSettings().destinationCrs(), QgsProject.instance())
            ext = xform.transformBoundingBox(ext)
        except Exception:  # noqa: BLE001
            pass
        ext.scale(1.1)
        canvas.setExtent(ext)
        canvas.refresh()
        self.iface.setActiveLayer(layer)
        self._complete(step, {"OUTPUT": layer.id()})

    def _do_note(self, step):
        self._complete(step, {})

    # ---------------------------------------------------------------- python
    def _do_python(self, step):
        self._mark(step, WAITING)
        self.confirmPython.emit(self.idx)

    def run_python(self, accepted):
        step = self.current()
        if not step:
            return
        if not accepted:
            self._mark(step, SKIPPED)
            self.log.emit("warning", tr("Odrzucono wykonanie kodu Python – krok pominięty."))
            self._next()
            return
        self._mark(step, RUNNING)
        import processing
        from qgis import core as qcore
        ns = {name: getattr(qcore, name) for name in dir(qcore) if name.startswith("Qgs") or name == "Qgis"}
        ns.update({"iface": self.iface, "processing": processing, "QgsProject": QgsProject,
                   "results": {k: dict(v) for k, v in self.results.items()}, "get_layer": self.get_layer})
        buf = io.StringIO()
        try:
            with contextlib.redirect_stdout(buf):
                exec(compile(step.get("code") or "", "<gis_assistant_ai:%s>" % step["id"], "exec"), ns)  # noqa: S102
        except Exception:  # noqa: BLE001
            self._fail(step, traceback.format_exc(limit=3))
            return
        out = buf.getvalue().strip()
        if out:
            self.log.emit("info", out[:2000])
        res = ns.get("result") if isinstance(ns.get("result"), dict) else {}
        self._complete(step, res, out[:120] if out else None)


def _is_blank(value):
    return value is None or (isinstance(value, str) and value.strip().lower() in ("", "none", "null"))


def _fix_quickosm(params, log):
    """QuickOSM przyjmuje TYPE_MULTI_REQUEST wyłącznie jako „AND”/„OR” (po jednym na każdą dodatkową parę
    klucz=wartość). Model bywa niedokładny – normalizujemy, a przy jednym kluczu parametr usuwamy."""
    if "TYPE_MULTI_REQUEST" not in params:
        return
    keys = [k for k in str(params.get("KEY") or "").split(",") if k.strip()]
    raw = params.get("TYPE_MULTI_REQUEST")
    items = raw if isinstance(raw, (list, tuple)) else str(raw).replace(";", ",").split(",")
    mapping = {"and": "AND", "&": "AND", "&&": "AND", "i": "AND", "or": "OR", "|": "OR", "||": "OR", "lub": "OR"}
    ops = [mapping.get(str(i).strip().lower()) for i in items if str(i).strip()]
    if len(keys) <= 1 or not ops or None in ops:
        params.pop("TYPE_MULTI_REQUEST")
        if len(keys) > 1:  # niezrozumiały operator przy wielu kluczach – najczęstszy przypadek to „AND”
            params["TYPE_MULTI_REQUEST"] = ",".join(["AND"] * (len(keys) - 1))
        log.emit("debug", "QuickOSM: TYPE_MULTI_REQUEST %r -> %r" % (raw, params.get("TYPE_MULTI_REQUEST")))
        return
    ops = (ops + [ops[-1]] * len(keys))[:len(keys) - 1]
    params["TYPE_MULTI_REQUEST"] = ",".join(ops)


# Poprawki parametrów dla algorytmów konkretnych wtyczek (klucz = identyfikator dostawcy Processing).
_PARAM_FIXES = {"quickosm": _fix_quickosm}


def _clean_feedback(messages):
    """Komunikaty algorytmu bez śladu stosu Pythona (wtyczki często zgłaszają cały traceback)."""
    lines = []
    for msg in messages[-8:]:
        text = str(msg).strip()
        if "Traceback (most recent call last)" in text:
            tail = [ln.strip() for ln in text.splitlines() if ln.strip()]
            text = tail[-1] if tail else ""
        if text and text not in lines:
            lines.append(text)
    return "\n".join(lines[-4:])


def _unavailable_message(reg, alg_id):
    """Czytelny powód: brak wtyczki albo błędna nazwa – z listą algorytmów dostawcy (pomaga „Napraw z AI”)."""
    prov = alg_id.split(":", 1)[0].lower() if ":" in alg_id else ""
    ids = sorted(a.id() for a in reg.algorithms() if prov and a.id().lower().startswith(prov + ":"))
    if prov and not ids:
        return tr("Algorytm „%s” jest niedostępny – wtyczka dostarczająca algorytmy „%s” nie jest zainstalowana "
                  "lub włączona.") % (alg_id, prov)
    if ids:
        return tr("Algorytm „%s” jest niedostępny. Dostępne algorytmy dostawcy „%s”: %s.") % (
            alg_id, prov, ", ".join(ids[:25]))
    return tr("Algorytm „%s” jest niedostępny.") % alg_id


def _printable(params):
    out = {}
    for k, v in params.items():
        if isinstance(v, QgsProcessingFeatureSourceDefinition):
            out[k] = {"source": v.source.staticValue() if hasattr(v.source, "staticValue") else str(v.source),
                      "selected_only": v.selectedFeaturesOnly}
        else:
            out[k] = v if isinstance(v, (int, float, str, bool, list, dict, type(None))) else str(v)
    return out
