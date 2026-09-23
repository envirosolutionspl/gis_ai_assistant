<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="en_US" sourcelanguage="pl_PL">
<context>
    <name>GISAssistantAI</name>
    <message>
        <location filename="../ui/dock.py" line="524"/>
        <source> (w tym %d wymagające Twojej akcji)</source>
        <translation> (%d requiring your action)</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="299"/>
        <source> – brak połączenia z serwerem (sieć/proxy/adres API).</source>
        <translation> – cannot reach the server (network/proxy/API address).</translation>
    </message>
    <message>
        <location filename="../plugin.py" line="42"/>
        <source> – opisz, co chcesz zrobić w QGIS</source>
        <translation> – describe what you want to do in QGIS</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="292"/>
        <source> – przekroczony limit zapytań, spróbuj za chwilę.</source>
        <translation> – rate limit exceeded, try again in a moment.</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="295"/>
        <source> – serwer nie odpowiedział w wyznaczonym czasie (%d s). Spróbuj ponownie lub wybierz szybszy model; limit czasu sieci można też zwiększyć w Ustawienia › Opcje › Sieć.</source>
        <translation> – the server did not respond in time (%d s). Try again or choose a faster model; the network timeout can also be increased in Settings › Options › Network.</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="287"/>
        <source> – sprawdź klucz API w ustawieniach.</source>
        <translation> – check the API key in the settings.</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="289"/>
        <source> – ten klucz nie jest przypisany do workspace. Wpisz ID workspace (wrkspc_…) w ustawieniach wtyczki albo utwórz w Claude Console klucz przypisany do workspace.</source>
        <translation> – this key is not scoped to a workspace. Enter the workspace ID (wrkspc_…) in the plugin settings or create a workspace-scoped key in the Claude Console.</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="22"/>
        <source> – ustawienia</source>
        <translation> – settings</translation>
    </message>
    <message>
        <location filename="../executor.py" line="535"/>
        <source>%s: %d obiekt(y)</source>
        <translation>%s: %d feature(s)</translation>
    </message>
    <message>
        <location filename="../executor.py" line="422"/>
        <source>%s: %d obiektów</source>
        <translation>%s: %d features</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="895"/>
        <source>(odebrano znaków: %d)</source>
        <translation>(characters received: %d)</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="608"/>
        <source>AI nie zaproponowało poprawionych kroków.</source>
        <translation>The AI did not propose corrected steps.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="605"/>
        <source>AI potwierdziło, że dalsze kroki nie wymagają zmian.</source>
        <translation>The AI confirmed that the remaining steps need no changes.</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="115"/>
        <source>ALGORYTM</source>
        <translation>ALGORITHM</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="67"/>
        <source>ASYSTENT PRACUJE</source>
        <translation>ASSISTANT AT WORK</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="210"/>
        <source>Adres API używa nieszyfrowanego połączenia http://, więc klucz API może zostać przechwycony. Zapisać mimo to?</source>
        <translation>The API address uses an unencrypted http:// connection, so the API key could be intercepted. Save anyway?</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="60"/>
        <source>Adres API:</source>
        <translation>API address:</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="172"/>
        <source>Adres nie używa szyfrowania (http://) – klucz API zostałby wysłany jawnym tekstem. Użyj https://.</source>
        <translation>The address is not encrypted (http://) – the API key would be sent as plain text. Use https://.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="384"/>
        <source>Algorytm zakończył się niepowodzeniem.</source>
        <translation>The algorithm failed.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="709"/>
        <source>Algorytm „%s” jest niedostępny – wtyczka dostarczająca algorytmy „%s” nie jest zainstalowana lub włączona.</source>
        <translation>Algorithm “%s” is not available – the plugin providing the “%s” algorithms is not installed or enabled.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="714"/>
        <source>Algorytm „%s” jest niedostępny.</source>
        <translation>Algorithm “%s” is not available.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="712"/>
        <source>Algorytm „%s” jest niedostępny. Dostępne algorytmy dostawcy „%s”: %s.</source>
        <translation>Algorithm “%s” is not available. Algorithms available from provider “%s”: %s.</translation>
    </message>
    <message>
        <location filename="../plan_model.py" line="141"/>
        <source>Algorytm „%s” nie jest dostępny w tej instalacji QGIS.</source>
        <translation>Algorithm “%s” is not available in this QGIS installation.</translation>
    </message>
    <message>
        <location filename="../plan_model.py" line="139"/>
        <source>Algorytm „%s” pochodzi z wtyczki, która nie jest zainstalowana lub włączona (dostawca Processing „%s”).</source>
        <translation>Algorithm “%s” comes from a plugin that is not installed or enabled (Processing provider “%s”).</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="125"/>
        <source>Analizuj</source>
        <translation>Analyze</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="575"/>
        <source>Analizuję błąd i poprawiam plan…</source>
        <translation>Analyzing the error and correcting the plan…</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="479"/>
        <source>Analizuję polecenie i projekt…</source>
        <translation>Analyzing the request and the project…</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="67"/>
        <source>Analizuję polecenie…</source>
        <translation>Analyzing the request…</translation>
    </message>
    <message>
        <location filename="../constants.py" line="31"/>
        <source>Anthropic Claude</source>
        <translation>Anthropic Claude</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="362"/>
        <source>Asystent przeanalizuje błąd i poprawi pozostałe kroki planu</source>
        <translation>The assistant will analyze the error and correct the remaining steps</translation>
    </message>
    <message>
        <location filename="../executor.py" line="468"/>
        <source>Brak adresu (uri) warstwy.</source>
        <translation>Layer address (uri) is missing.</translation>
    </message>
    <message>
        <location filename="../plan_model.py" line="118"/>
        <source>Brak identyfikatora algorytmu.</source>
        <translation>Algorithm ID is missing.</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="77"/>
        <source>Brak klucza API – uzupełnij go w ustawieniach wtyczki (ikona ⚙).</source>
        <translation>No API key – add it in the plugin settings.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="515"/>
        <source>Brak kodu TERYT jednostki.</source>
        <translation>The TERYT code of the unit is missing.</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="73"/>
        <source>BŁĄD</source>
        <translation>ERROR</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="300"/>
        <location filename="../llm_client.py" line="247"/>
        <source>Błąd API%s: %s%s</source>
        <translation>API error%s: %s%s</translation>
    </message>
    <message>
        <location filename="../executor.py" line="559"/>
        <source>Błąd połączenia z ULDK: %s</source>
        <translation>ULDK connection error: %s</translation>
    </message>
    <message>
        <location filename="../executor.py" line="287"/>
        <source>Błąd w kroku „%s”: %s</source>
        <translation>Error in step “%s”: %s</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="73"/>
        <source>Coś poszło nie tak</source>
        <translation>Something went wrong</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="690"/>
        <source>Czekam na Twoją akcję…</source>
        <translation>Waiting for your action…</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="98"/>
        <source>Do modelu wysyłane są: treść polecenia oraz opis projektu (nazwy i pola warstw, układy współrzędnych, zasięg mapy). Hasła, loginy, tokeny i pełne ścieżki dysków są usuwane. Wybierając Ollama, wszystko pozostaje na Twoim komputerze.</source>
        <translation>The model receives your request and a description of the project (layer names and fields, coordinate systems, map extent). Passwords, logins, tokens and full disk paths are removed. With Ollama everything stays on your computer.</translation>
    </message>
    <message>
        <location filename="../constants.py" line="71"/>
        <source>Dodaj ortofotomapę z Geoportalu jako podkład mapowy</source>
        <translation>Add the Geoportal orthophoto map as a basemap</translation>
    </message>
    <message>
        <location filename="../executor.py" line="424"/>
        <source>Dodano warstwę %s</source>
        <translation>Added layer %s</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="55"/>
        <source>Domyślny</source>
        <translation>Default</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="569"/>
        <source>Dopasowuję dalsze kroki do wczytanych danych…</source>
        <translation>Adapting the next steps to the loaded data…</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="42"/>
        <source>Dostawca:</source>
        <translation>Provider:</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="192"/>
        <source>Dziennik</source>
        <translation>Log</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="122"/>
        <source>Enter – wyślij, Shift+Enter – nowa linia</source>
        <translation>Enter – send, Shift+Enter – new line</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="78"/>
        <source>Fragment odpowiedzi modelu:</source>
        <translation>Part of the model response:</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="49"/>
        <source>Gdy potrzebna będzie Twoja decyzja (np. podłączenie usługi WMS), plan zatrzyma się i poczeka na potwierdzenie.</source>
        <translation>When your decision is needed (e.g. connecting a WMS service), the plan pauses and waits for your confirmation.</translation>
    </message>
    <message>
        <location filename="../constants.py" line="73"/>
        <source>Gdzie znajdę narzędzie do agregacji (rozpuszczania) poligonów?</source>
        <translation>Where do I find the tool for dissolving polygons?</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="114"/>
        <source>Gotowe polecenia do wypróbowania</source>
        <translation>Ready-made requests to try</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="84"/>
        <source>ID workspace:</source>
        <translation>Workspace ID:</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="14"/>
        <source>INFORMACJA</source>
        <translation>INFO</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="52"/>
        <source>JAK TO DZIAŁA</source>
        <translation>HOW IT WORKS</translation>
    </message>
    <message>
        <location filename="../constants.py" line="74"/>
        <source>Jak wyszukać działkę ewidencyjną po numerze?</source>
        <translation>How do I find a cadastral parcel by its number?</translation>
    </message>
    <message>
        <location filename="../constants.py" line="72"/>
        <source>Jakim narzędziem połączę kilka warstw wektorowych w jedną?</source>
        <translation>Which tool merges several vector layers into one?</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="13"/>
        <source>KOD PYQGIS</source>
        <translation>PYQGIS CODE</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="866"/>
        <source>Klucz API zapisany: %s.</source>
        <translation>API key saved: %s.</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="75"/>
        <source>Klucz API:</source>
        <translation>API key:</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="157"/>
        <source>Klucz jest wysyłany wyłącznie w nagłówku zapytania do powyższego adresu API. Nie jest zapisywany jawnym tekstem w profilu QGIS.</source>
        <translation>The key is sent only in the request header to the API address above. It is never stored as plain text in the QGIS profile.</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="78"/>
        <source>Klucz trafia do zaszyfrowanej bazy menedżera uwierzytelniania QGIS. Bez zaznaczenia jest pamiętany tylko do zamknięcia QGIS.</source>
        <translation>The key is stored in the encrypted QGIS authentication database. When unchecked, it is kept only until QGIS closes.</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="180"/>
        <source>Klucz usunięty.</source>
        <translation>Key removed.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="751"/>
        <source>Kod Python jest wyłączony w ustawieniach – krok pominięty.</source>
        <translation>Python code is disabled in the settings – step skipped.</translation>
    </message>
    <message>
        <location filename="../ui/confirm_dialog.py" line="23"/>
        <source>Kod zawiera konstrukcje o skutkach poza projektem QGIS: %s. Zatwierdź tylko, jeśli rozumiesz, co robi.</source>
        <translation>The code contains constructs with effects outside the QGIS project: %s. Approve only if you understand what it does.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="544"/>
        <source>Korekta przez AI nie powiodła się: %s</source>
        <translation>AI correction failed: %s</translation>
    </message>
    <message>
        <location filename="../plan_model.py" line="85"/>
        <source>Krok %d</source>
        <translation>Step %d</translation>
    </message>
    <message>
        <location filename="../executor.py" line="263"/>
        <source>Krok %d: %s</source>
        <translation>Step %d: %s</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="763"/>
        <source>Krok „%s” chce wczytać do projektu plik lub bazę danych wskazane przez AI. Zatwierdź tylko, jeśli znasz to źródło.</source>
        <translation>Step “%s” wants to load a file or database chosen by the AI into the project. Approve only if you know this source.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="756"/>
        <source>Krok „%s” chce wykonać poniższy kod Python. Sprawdź go przed zatwierdzeniem.</source>
        <translation>Step “%s” wants to run the Python code below. Review it before approving.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="293"/>
        <source>Krok „%s” nie ma jeszcze wyniku (pominięty lub nie wykonany).</source>
        <translation>Step “%s” has no result yet (skipped or not run).</translation>
    </message>
    <message>
        <location filename="../executor.py" line="297"/>
        <source>Krok „%s” nie ma wyjścia „%s” (dostępne: %s).</source>
        <translation>Step “%s” has no output “%s” (available: %s).</translation>
    </message>
    <message>
        <location filename="../executor.py" line="305"/>
        <source>Krok „%s” nie zwrócił warstwy.</source>
        <translation>Step “%s” did not return a layer.</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="142"/>
        <source>Lista modeli</source>
        <translation>Model list</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="12"/>
        <source>MAPA</source>
        <translation>MAP</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="115"/>
        <source>MENU</source>
        <translation>MENU</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="95"/>
        <source>Maks. 5 wartości tekstowych na pole – model trafniej buduje wyrażenia filtrujące.</source>
        <translation>Up to 5 text values per field – helps the model build accurate filter expressions.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="318"/>
        <source>Menedżer źródeł danych</source>
        <translation>Data Source Manager</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="118"/>
        <source>Menu</source>
        <translation>Menu</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="36"/>
        <source>Model językowy</source>
        <translation>Language model</translation>
    </message>
    <message>
        <location filename="../utils.py" line="14"/>
        <source>Model zwrócił pustą odpowiedź.</source>
        <translation>The model returned an empty response.</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="62"/>
        <location filename="../ui/settings_dialog.py" line="51"/>
        <source>Model:</source>
        <translation>Model:</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="106"/>
        <source>NARZĘDZIE</source>
        <translation>TOOL</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="448"/>
        <source>Najpierw podaj klucz API w ustawieniach.</source>
        <translation>Enter the API key in the settings first.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="360"/>
        <source>Napraw z AI</source>
        <translation>Fix with AI</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="108"/>
        <source>Narzędzie</source>
        <translation>Tool</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="849"/>
        <source>Nie można otworzyć %s: %s</source>
        <translation>Cannot open %s: %s</translation>
    </message>
    <message>
        <location filename="../executor.py" line="390"/>
        <source>Nie udało się dodać wyników do projektu: %s</source>
        <translation>Could not add the results to the project: %s</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="541"/>
        <source>Nie udało się dopasować planu – kontynuuję bez zmian.</source>
        <translation>Could not adapt the plan – continuing unchanged.</translation>
    </message>
    <message>
        <location filename="../settings.py" line="133"/>
        <source>Nie udało się odczytać klucza API: %s</source>
        <translation>Could not read the API key: %s</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="597"/>
        <source>Nie udało się odczytać korekty planu: %s</source>
        <translation>Could not read the plan correction: %s</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="601"/>
        <source>Nie udało się odczytać korekty: %s</source>
        <translation>Could not read the correction: %s</translation>
    </message>
    <message>
        <location filename="../utils.py" line="29"/>
        <source>Nie udało się odczytać odpowiedzi modelu jako JSON.</source>
        <translation>Could not read the model response as JSON.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="507"/>
        <source>Nie udało się odczytać odpowiedzi: %s</source>
        <translation>Could not read the response: %s</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="82"/>
        <source>Nie udało się przygotować zapytania: %s</source>
        <translation>Could not prepare the request: %s</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="539"/>
        <source>Nie udało się uzyskać odpowiedzi.</source>
        <translation>Could not get a response.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="487"/>
        <source>Nie udało się wczytać warstwy (%s). %s
Możesz wczytać ją ręcznie i pominąć ten krok albo poprosić AI o poprawkę.</source>
        <translation>Could not load the layer (%s). %s
You can load it manually and skip this step, or ask the AI for a fix.</translation>
    </message>
    <message>
        <location filename="../settings.py" line="154"/>
        <source>Nie udało się zapisać klucza API: %s</source>
        <translation>Could not save the API key: %s</translation>
    </message>
    <message>
        <location filename="../executor.py" line="188"/>
        <source>Nie wskazano warstwy – kolejne kroki mogą jej wymagać.</source>
        <translation>No layer selected – the next steps may need one.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="730"/>
        <source>Nie wskazano warstwy. Kolejne kroki mogą jej potrzebować. Kontynuować?</source>
        <translation>No layer selected. The next steps may need one. Continue?</translation>
    </message>
    <message>
        <location filename="../executor.py" line="608"/>
        <source>Nie znaleziono warstwy do przybliżenia.</source>
        <translation>No layer found to zoom to.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="484"/>
        <source>Nieobsługiwany dostawca danych „%s”.</source>
        <translation>Unsupported data provider “%s”.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="267"/>
        <source>Nieobsługiwany typ kroku: %s</source>
        <translation>Unsupported step type: %s</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="252"/>
        <source>Nieoczekiwany format odpowiedzi API: %s</source>
        <translation>Unexpected API response format: %s</translation>
    </message>
    <message>
        <location filename="../executor.py" line="341"/>
        <source>Niepoprawne parametry: %s
Parametry: %s</source>
        <translation>Invalid parameters: %s
Parameters: %s</translation>
    </message>
    <message>
        <location filename="../executor.py" line="511"/>
        <source>Nieznany poziom jednostki ULDK: %s</source>
        <translation>Unknown ULDK unit level: %s</translation>
    </message>
    <message>
        <location filename="../plan_model.py" line="75"/>
        <source>Nieznany typ kroku „%s” – potraktowano jako informację.</source>
        <translation>Unknown step type “%s” – treated as information.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="260"/>
        <source>Nowe polecenie</source>
        <translation>New request</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="879"/>
        <source>Nowe polecenie.</source>
        <translation>New request.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="460"/>
        <source>Nowe warstwy: %d</source>
        <translation>New layers: %d</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="86"/>
        <source>ODPOWIEDŹ</source>
        <translation>ANSWER</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="8"/>
        <source>OKNO NARZĘDZIA</source>
        <translation>TOOL DIALOG</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="101"/>
        <source>Odpowiedz w polu poleceń lub kliknij opcję.</source>
        <translation>Reply in the request box or click an option.</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="86"/>
        <source>Odpowiedź</source>
        <translation>Answer</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="528"/>
        <source>Odpowiedź gotowa.</source>
        <translation>Answer ready.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="509"/>
        <source>Odpowiedź modelu była niepoprawna.</source>
        <translation>The model response was invalid.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="640"/>
        <source>Odrzucono wykonanie kodu Python – krok pominięty.</source>
        <translation>Python code rejected – step skipped.</translation>
    </message>
    <message>
        <location filename="../plan_model.py" line="155"/>
        <source>Odwołanie do nieznanego kroku: %s.</source>
        <translation>Reference to an unknown step: %s.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="454"/>
        <source>Okno zamknięte bez uruchomienia – krok pominięty.</source>
        <translation>Dialog closed without running – step skipped.</translation>
    </message>
    <message>
        <location filename="../constants.py" line="45"/>
        <source>Ollama (lokalnie – dane nie opuszczają komputera)</source>
        <translation>Ollama (local – data stays on your computer)</translation>
    </message>
    <message>
        <location filename="../constants.py" line="38"/>
        <source>OpenAI / API zgodne z OpenAI</source>
        <translation>OpenAI / OpenAI-compatible API</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="99"/>
        <source>Opisz, co chcesz zrobić w QGIS…
np. „Stwórz bufor o promieniu 100 m od szkół w powiecie piaseczyńskim”</source>
        <translation>Describe what you want to do in QGIS…
e.g. “Create a 100 m buffer around schools in Piaseczno County”</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="319"/>
        <source>Otwórz narzędzie</source>
        <translation>Open tool</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="231"/>
        <source>PLAN DZIAŁAŃ · %d KROK</source>
        <translation>ACTION PLAN · %d STEP</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="233"/>
        <source>PLAN DZIAŁAŃ · %d KROKI</source>
        <translation>ACTION PLAN · %d STEPS</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="234"/>
        <source>PLAN DZIAŁAŃ · %d KROKÓW</source>
        <translation>ACTION PLAN · %d STEPS</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="7"/>
        <source>PROCESSING</source>
        <translation>PROCESSING</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="92"/>
        <source>PYTANIE</source>
        <translation>QUESTION</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="611"/>
        <source>Plan dopasowany do danych.</source>
        <translation>Plan adapted to the data.</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="154"/>
        <source>Plan działań</source>
        <translation>Action plan</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="525"/>
        <source>Plan gotowy: %d krok(ów)%s. Sprawdź go i kliknij WYKONAJ.</source>
        <translation>Plan ready: %d step(s)%s. Review it and click RUN.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="611"/>
        <source>Plan poprawiony.</source>
        <translation>Plan corrected.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="257"/>
        <source>Plan wykonany.</source>
        <translation>Plan completed.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="218"/>
        <source>Plan zaktualizowany (%d nowych kroków).</source>
        <translation>Plan updated (%d new steps).</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="659"/>
        <source>Plan „%s” został wykonany.</source>
        <translation>Plan “%s” completed.</translation>
    </message>
    <message>
        <location filename="../constants.py" line="70"/>
        <source>Pobierz granicę gminy Lesznowola i policz jej powierzchnię w hektarach</source>
        <translation>Get the boundary of Lesznowola municipality and calculate its area in hectares</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="95"/>
        <source>Polecenie</source>
        <translation>Request</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="480"/>
        <source>Polecenie: %s</source>
        <translation>Request: %s</translation>
    </message>
    <message>
        <location filename="../executor.py" line="362"/>
        <source>Pomijam nieznany parametr „%s” algorytmu %s.</source>
        <translation>Skipping unknown parameter “%s” of algorithm %s.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="200"/>
        <location filename="../executor.py" line="456"/>
        <location filename="../executor.py" line="499"/>
        <source>Pominięto krok: %s</source>
        <translation>Step skipped: %s</translation>
    </message>
    <message>
        <location filename="../ui/confirm_dialog.py" line="37"/>
        <location filename="../ui/dock.py" line="367"/>
        <source>Pomiń</source>
        <translation>Skip</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="333"/>
        <source>Pomiń krok</source>
        <translation>Skip step</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="364"/>
        <source>Ponów</source>
        <translation>Retry</translation>
    </message>
    <message>
        <location filename="../plan_model.py" line="123"/>
        <location filename="../plan_model.py" line="132"/>
        <location filename="../plan_model.py" line="137"/>
        <source>Poprawiono identyfikator %s → %s.</source>
        <translation>Corrected ID %s → %s.</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="92"/>
        <source>Potrzebuję doprecyzowania</source>
        <translation>I need more details</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="529"/>
        <source>Potrzebuję doprecyzowania.</source>
        <translation>I need more details.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="255"/>
        <source>Powiedz, co chcesz zrobić w QGIS</source>
        <translation>Tell me what you want to do in QGIS</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="96"/>
        <source>Pozwól AI proponować kod PyQGIS (zawsze po Twoim zatwierdzeniu)</source>
        <translation>Allow the AI to propose PyQGIS code (always after your approval)</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="106"/>
        <source>Proponowane narzędzie</source>
        <translation>Suggested tool</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="91"/>
        <source>Prywatność i bezpieczeństwo</source>
        <translation>Privacy and security</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="336"/>
        <location filename="../ui/dock.py" line="370"/>
        <source>Przerwij</source>
        <translation>Abort</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="118"/>
        <source>Przybornik</source>
        <translation>Toolbox</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="109"/>
        <source>Przykłady</source>
        <translation>Examples</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="167"/>
        <source>Rezultat:</source>
        <translation>Result:</translation>
    </message>
    <message>
        <location filename="../executor.py" line="151"/>
        <source>Rozpoczynam wykonywanie planu „%s”.</source>
        <translation>Starting plan “%s”.</translation>
    </message>
    <message>
        <location filename="../ui/widgets.py" line="78"/>
        <source>Rozwiń sekcję</source>
        <translation>Expand section</translation>
    </message>
    <message>
        <location filename="../constants.py" line="24"/>
        <source>SYSTEMY I WSPARCIE GIS</source>
        <translation>GIS SYSTEMS &amp; SUPPORT</translation>
    </message>
    <message>
        <location filename="../constants.py" line="25"/>
        <source>SZKOLENIA GIS</source>
        <translation>GIS TRAINING</translation>
    </message>
    <message>
        <location filename="../constants.py" line="69"/>
        <source>Stwórz bufor o promieniu 100 metrów od szkół w powiecie piaseczyńskim</source>
        <translation>Create a 100 m buffer around schools in Piaseczno County</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="155"/>
        <source>Szczegóły techniczne</source>
        <translation>Technical details</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="11"/>
        <source>TWOJA AKCJA</source>
        <translation>YOUR ACTION</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="621"/>
        <source>Ten plan był już wykonywany. Wykonać go ponownie od początku?</source>
        <translation>This plan has already been run. Run it again from the start?</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="109"/>
        <source>Testuj połączenie</source>
        <translation>Test connection</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="462"/>
        <source>Trwa wykonywanie planu – zatrzymaj je, aby zadać nowe pytanie.</source>
        <translation>A plan is running – stop it to ask a new question.</translation>
    </message>
    <message>
        <location filename="../executor.py" line="566"/>
        <source>ULDK nie znalazło jednostki o kodzie „%s” (%s). Odpowiedź: %s</source>
        <translation>ULDK found no unit with code “%s” (%s). Response: %s</translation>
    </message>
    <message>
        <location filename="../executor.py" line="531"/>
        <source>ULDK nie zwróciło żadnej geometrii.</source>
        <translation>ULDK returned no geometry.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="261"/>
        <source>Ustawienia</source>
        <translation>Settings</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="70"/>
        <source>Usuń klucz</source>
        <translation>Remove key</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="9"/>
        <source>WCZYTANIE WARSTWY</source>
        <translation>LOAD LAYER</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="115"/>
        <source>WTYCZKA</source>
        <translation>PLUGIN</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="177"/>
        <location filename="../ui/dock.py" line="475"/>
        <location filename="../ui/dock.py" line="638"/>
        <source>WYKONAJ</source>
        <translation>RUN</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="638"/>
        <source>WYKONYWANIE…</source>
        <translation>RUNNING…</translation>
    </message>
    <message>
        <location filename="../executor.py" line="612"/>
        <source>Warstwa jest pusta – brak zasięgu do przybliżenia.</source>
        <translation>The layer is empty – no extent to zoom to.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="679"/>
        <source>Warstwa%s:</source>
        <translation>Layer%s:</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="306"/>
        <source>Warstwa:</source>
        <translation>Layer:</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="765"/>
        <source>Wczytaj</source>
        <translation>Load</translation>
    </message>
    <message>
        <location filename="../executor.py" line="491"/>
        <source>Wczytano: %s</source>
        <translation>Loaded: %s</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="52"/>
        <source>Witaj w GIS Assistant AI</source>
        <translation>Welcome to GIS Assistant AI</translation>
    </message>
    <message>
        <location filename="../executor.py" line="186"/>
        <source>Wskazana warstwa: %s</source>
        <translation>Selected layer: %s</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="49"/>
        <source>Współpracuj</source>
        <translation>Work together</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="746"/>
        <source>Wybierz, co zrobić z błędem.</source>
        <translation>Choose how to handle the error.</translation>
    </message>
    <message>
        <location filename="../ui/confirm_dialog.py" line="41"/>
        <source>Wykonaj</source>
        <translation>Run</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="757"/>
        <source>Wykonaj kod</source>
        <translation>Run code</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="181"/>
        <source>Wykonaj plan działań krok po kroku</source>
        <translation>Run the action plan step by step</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="330"/>
        <source>Wykonałem – kontynuuj</source>
        <translation>Done – continue</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="643"/>
        <location filename="../ui/dock.py" line="500"/>
        <source>Wykonuję plan…</source>
        <translation>Running the plan…</translation>
    </message>
    <message>
        <location filename="../executor.py" line="171"/>
        <source>Wykonywanie planu przerwane przez użytkownika.</source>
        <translation>Plan stopped by the user.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="662"/>
        <source>Wykonywanie przerwane.</source>
        <translation>Run stopped.</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="152"/>
        <source>Wynik</source>
        <translation>Result</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="93"/>
        <source>Wysyłaj przykładowe wartości atrybutów</source>
        <translation>Send sample attribute values</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="830"/>
        <source>Zablokowano otwarcie adresu spoza http(s): %s</source>
        <translation>Blocked opening a non-http(s) address: %s</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="142"/>
        <source>Zainstaluj w Menedżerze wtyczek</source>
        <translation>Install in the Plugin Manager</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="77"/>
        <source>Zapamiętaj klucz (zaszyfrowany w QGIS)</source>
        <translation>Remember key (encrypted in QGIS)</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="45"/>
        <source>Zapytaj o narzędzie</source>
        <translation>Ask about a tool</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="184"/>
        <source>Zatrzymaj</source>
        <translation>Stop</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="157"/>
        <source>Założenia:</source>
        <translation>Assumptions:</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="47"/>
        <source>Zleć zadanie</source>
        <translation>Delegate a task</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="528"/>
        <source>Znalazłem narzędzie.</source>
        <translation>Tool found.</translation>
    </message>
    <message>
        <location filename="../ui/widgets.py" line="78"/>
        <source>Zwiń sekcję</source>
        <translation>Collapse section</translation>
    </message>
    <message>
        <location filename="../utils.py" line="223"/>
        <source>dynamiczne wykonanie kodu</source>
        <translation>dynamic code execution</translation>
    </message>
    <message>
        <location filename="../utils.py" line="225"/>
        <source>introspekcja interpretera</source>
        <translation>interpreter introspection</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="755"/>
        <source>kod PyQGIS</source>
        <translation>PyQGIS code</translation>
    </message>
    <message>
        <location filename="../llm_client.py" line="314"/>
        <source>nieznany dostawca</source>
        <translation>unknown provider</translation>
    </message>
    <message>
        <location filename="../utils.py" line="221"/>
        <source>odczyt/zapis plików (open)</source>
        <translation>reading/writing files (open)</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="83"/>
        <source>opcjonalnie, np. wrkspc_01AbCd… – wymagane dla kluczy bez workspace</source>
        <translation>optional, e.g. wrkspc_01AbCd… – required for keys without a workspace</translation>
    </message>
    <message>
        <location filename="../utils.py" line="220"/>
        <source>operacje na plikach</source>
        <translation>file operations</translation>
    </message>
    <message>
        <location filename="../utils.py" line="222"/>
        <source>połączenia sieciowe</source>
        <translation>network connections</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="60"/>
        <source>skonfiguruj klucz API</source>
        <translation>configure the API key</translation>
    </message>
    <message>
        <location filename="../utils.py" line="218"/>
        <source>system operacyjny (os)</source>
        <translation>operating system (os)</translation>
    </message>
    <message>
        <location filename="../settings.py" line="144"/>
        <source>tylko w pamięci (do zamknięcia QGIS)</source>
        <translation>in memory only (until QGIS closes)</translation>
    </message>
    <message>
        <location filename="../settings.py" line="147"/>
        <source>tylko w pamięci – menedżer uwierzytelniania QGIS jest niedostępny</source>
        <translation>in memory only – the QGIS authentication manager is unavailable</translation>
    </message>
    <message>
        <location filename="../settings.py" line="150"/>
        <source>tylko w pamięci – nie podano hasła głównego QGIS</source>
        <translation>in memory only – the QGIS master password was not entered</translation>
    </message>
    <message>
        <location filename="../settings.py" line="155"/>
        <source>tylko w pamięci – zapis w menedżerze uwierzytelniania nie powiódł się</source>
        <translation>in memory only – saving to the authentication manager failed</translation>
    </message>
    <message>
        <location filename="../utils.py" line="219"/>
        <source>uruchamianie programów</source>
        <translation>running programs</translation>
    </message>
    <message>
        <location filename="../utils.py" line="226"/>
        <source>usuwanie danych</source>
        <translation>deleting data</translation>
    </message>
    <message>
        <location filename="../utils.py" line="224"/>
        <source>uwierzytelnianie i ustawienia QGIS</source>
        <translation>QGIS authentication and settings</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="762"/>
        <source>wczytanie danych</source>
        <translation>loading data</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="154"/>
        <source>wklej klucz API</source>
        <translation>paste the API key</translation>
    </message>
    <message>
        <location filename="../executor.py" line="440"/>
        <source>wynik</source>
        <translation>result</translation>
    </message>
    <message>
        <location filename="../settings.py" line="152"/>
        <source>zaszyfrowany w menedżerze uwierzytelniania QGIS</source>
        <translation>encrypted in the QGIS authentication manager</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="192"/>
        <source>Łączę…</source>
        <translation>Connecting…</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="309"/>
        <source>— wskaż warstwę —</source>
        <translation>— select a layer —</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="45"/>
        <source>„Jakim narzędziem połączę kilka warstw w jedną?” – dostaniesz nazwę, ścieżkę w menu i przycisk otwierający narzędzie.</source>
        <translation>“Which tool merges several layers into one?” – you get the name, the menu path and a button that opens the tool.</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="47"/>
        <source>„Stwórz bufor 100 m od szkół w powiecie piaseczyńskim” – dostaniesz plan krok po kroku; kliknij &lt;b&gt;WYKONAJ&lt;/b&gt;, a wtyczka go zrealizuje.</source>
        <translation>“Create a 100 m buffer around schools in Piaseczno County” – you get a step-by-step plan; click &lt;b&gt;RUN&lt;/b&gt; and the plugin carries it out.</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="154"/>
        <source>•••••••• (klucz zapisany – wpisz nowy, aby zmienić)</source>
        <translation>•••••••• (key saved – type a new one to change it)</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="317"/>
        <location filename="../ui/render.py" line="137"/>
        <source>↗ Strona wtyczki</source>
        <translation>↗ Plugin page</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="80"/>
        <source>↻ Spróbuj ponownie</source>
        <translation>↻ Try again</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="133"/>
        <source>▶ Menedżer źródeł danych</source>
        <translation>▶ Data Source Manager</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="129"/>
        <source>▶ Otwórz narzędzie</source>
        <translation>▶ Open tool</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="672"/>
        <source>✋  Krok %d wymaga Twojej akcji: %s</source>
        <translation>✋  Step %d needs your action: %s</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="658"/>
        <source>✔ Plan wykonany.</source>
        <translation>✔ Plan completed.</translation>
    </message>
    <message>
        <location filename="../ui/settings_dialog.py" line="199"/>
        <source>✔ Połączenie działa.</source>
        <translation>✔ Connection works.</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="58"/>
        <source>✔ gotowy</source>
        <translation>✔ ready</translation>
    </message>
    <message>
        <location filename="../ui/render.py" line="139"/>
        <source>✔ zainstalowana</source>
        <translation>✔ installed</translation>
    </message>
    <message>
        <location filename="../ui/dock.py" line="741"/>
        <source>✖  Krok %d nie powiódł się: %s</source>
        <translation>✖  Step %d failed: %s</translation>
    </message>
</context>
</TS>
