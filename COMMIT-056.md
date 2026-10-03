# Commit 56 – Startseite, Prolog und Farbsystem

- Neue Startseite außerhalb des Menübandes: App-Titel, Version, Pathfinder-Logo, `created by Raubritter`, `Prolog` und `Zur App`.
- Die Startseite erscheint nur beim ersten Öffnen einer Browser-Session. Ein Reload während der Nutzung führt wie bisher zur Charakterseite.
- Kleiner Home-Button in der Kopfzeile führt jederzeit zurück zur Startseite.
- 12-szeniger Prolog auf Basis der freigegebenen Bildversion. Die gelieferten Szenen werden aus dem Storyboard-Bild ausgeschnitten; Erzählertext bleibt als echtes HTML lesbar und editierbar.
- Prolog-Steuerung: Zurück, Weiter, Überspringen; nach der letzten Szene Wechsel zu Charaktere.
- Audio ist für Commit 56 bewusst noch nicht Bestandteil.
- Neues seitenbezogenes Farbsystem: Charaktere blau, Kampf rot, Leben grün, Effekte gelb/ocker, Zauber orange, Zeit violett, Vermögen gold, Admin grau.
- Pathfinder-/Azlanti-Anmutung durch Serifenschrift, Pergamenttöne, dunkle Kopfzeile und bronzefarbene Akzente; Formulare bleiben aus Gründen der Lesbarkeit in einer UI-Schrift.

## v0.56.1 – Startseite/Prolog Hotfix
- Freigegebenes Storyboard in ein eigenes Startbild und 12 echte Szenenbilder getrennt; kein Verschieben eines Gesamtbildes mehr.
- Startseiten-Schaltflächen `Prolog` und `Zur App` als echte HTML-Buttons über der freigegebenen Startgrafik.
- Overlay-Sichtbarkeit korrigiert: `hidden` wird nicht mehr durch die Commit-56-CSS-Regeln überschrieben.
- `Überspringen` und `Zur App` schließen den Prolog jetzt tatsächlich und wechseln zu `Charaktere`.
- Prologbilder werden je Szene separat geladen und vollständig in das Bildfenster eingepasst.


## v0.56.2 – Einheitliches Fantasy-Design
- Seitenbezogene Farbcodierung entfernt; alle App-Seiten verwenden nun ein gemeinsames Pergament-/Bronze-/Altgold-Farbsystem.
- Karten, Navigation, Formulare und Überschriften auf eine einheitliche Fantasy-Optik umgestellt.
- Startseite auf großen Bildschirmen vergrößert, mobile Darstellung bleibt responsiv.
- Prolog-Kopfzeile entfernt. Szenennummer und Szenentitel stehen nun gemeinsam im unteren Geschichtsbereich.
- Eingebrannte Nummern und Überschriften aus den 12 Prolog-Szenenbildern durch Beschnitt entfernt.
- Bestehende App-Funktionen einschließlich Zauber v0.55.13 bleiben erhalten.


## v0.56.3 – Azlanti-Artefakt-Design
- Einheitliche warme Pergament-/Leder-/Bronze-Optik weiter vertieft; keine Seitenfarben.
- Jeder Hauptbereich erhält eine feste Artefakt-Rune im Menü; die aktive Rune glimmt dezent golden und erscheint groß/transluzent im Seitenhintergrund.
- Prolog-Titel auf reine Nummerierung umgestellt (`1 – Titel` statt `Szene 1 – Titel`).
- Alle Prologbilder werden in einer identischen Szenenleinwand dargestellt; extreme Formate werden bildfüllend statt als schmaler Streifen gezeigt.
- Einheitlicher Sepia-/Schwarzweiß-Look für alle Prologbilder per Darstellungsfilter.
- Startseite zeigt Version `v0.56.3` und `App created by Raubritter` als echtes HTML, damit diese Angaben künftig unabhängig von der Grafik gepflegt werden können.


## v0.56.4 – Grimoire-Oberfläche
- App-Oberfläche deutlich näher an den freigegebenen Fantasy-Entwurf gebracht: dunkles Leder-Menü, Pergament-Arbeitsfläche, Bronze-/Altgold-Kanten und stärkere Materialtiefe.
- Navigation dauerhaft in der Reihenfolge `Charaktere · Kampf · Leben · Effekte · Zauber · Zeit · Vermögen · Admin`.
- Artefakt-Runen größer und klarer in jedem Menüpunkt; aktive Rune glimmt gold und bleibt als großes Wasserzeichen im Seitenhintergrund sichtbar.
- Aktive Seiten erhalten einen Grimoire-Seitenkopf mit Runenmedaillon.
- Karten, Eingabefelder, Schaltflächen und Hauptbereiche auf dieselbe Pergament-/Leder-Sprache vereinheitlicht.
- Responsive Navigation für kleine Displays beibehalten; Hauptmenü wird dort horizontal scrollbar statt gequetscht.
- Versionsanzeige und Startseiten-Metadaten auf `v0.56.4` aktualisiert.


## v0.56.5 – Grimoire-Veredelung
- Oberfläche weiter an die freigegebene Quest-/Pergament-Referenz angenähert.
- Pergament erhält stärkere Alterung, Randtiefe und feinere Materialstruktur.
- Aktive Bereichsrune wird als azlantisches Siegel mit Kreis-/Gravurstruktur dargestellt statt nur als großes Wasserzeichen.
- Leder-/Bronze-Navigation vertieft; aktive Rune glimmt weiterhin dezent golden.
- Karten und Eingabebereiche wirken weniger wie moderne Web-Boxen und stärker wie beschriftbare Grimoire-Pergamente.
- Große moderne Weiß-/Blauflächen, insbesondere auf Zeit/Kampf/Leben, visuell in die Pergamentwelt integriert.
- Bestehende Funktionslogik bleibt unverändert.

## v0.56.6 – Mobile Grimoire-Prototyp: Vermögen
- Vermögensseite als Referenz für die neue mobile-first Grimoire-Oberfläche umgebaut.
- Große Karten-/Kastenoptik auf Vermögen weitgehend entfernt; Themen werden über Abstand, Zierlinien und Pergamentstruktur getrennt.
- Eingabefelder auf Vermögen visuell reduziert und stärker in das Pergament integriert.
- Mobile Hauptnavigation auf kompakte Runenleiste umgestellt; Seitennamen bleiben über die jeweilige Seitenüberschrift erhalten.
- Vermögen verwendet eine Münzrune; Zeit verwendet eine vereinfachte einfarbige Sanduhrrune ohne Emoji-Blau.
- Große dekorative Hintergrundrunen werden auf Mobilgeräten ausgeblendet.
- Funktionslogik der Vermögensverwaltung unverändert.


## v0.56.7 – Vermögen: mobiles Pergament-Artefakt
- Vermögens-Prototyp weiter an die mobile Grimoire-Referenz angenähert.
- Pergament-Hintergrund vollständig responsiv per CSS aufgebaut; keine starre Vollbild-Hintergrundgrafik nötig.
- Unregelmäßig dunkle, beschädigt wirkende Seitenkanten und dezente Flecken-/Faserstruktur ergänzt.
- Eingabefelder und Auswahlfelder deutlich stärker gerundet und optisch in das Pergament eingebettet.
- Kartenrahmen bleiben entfernt; Abschnitte werden durch feine braune Zierlinien und Ornamentmarken getrennt.
- Münzrune auf eine klare, einfarbige Kreis-/Münzform `◎` vereinheitlicht.
- Mobile Abstände, Feldhöhen und Touch-Ziele der Vermögensseite verfeinert.
- Vermögenslogik unverändert.

## v0.56.8 – Vermögensseite: mobiler Zielbild-Prototyp
- Linken CSS-Fremdkörper der Pergamentkante vollständig entfernt.
- Hochgeladenen Münzbeutel als Grafik in das Gesamtvermögen integriert.
- Unnötiges Symbol über dem Gesamtvermögen entfernt.
- Detailwiederholung PM/GM/SM/KM am Gesamtvermögen ausgeblendet; dort wird nur die in Goldmünzen umgerechnete Gesamtsumme gezeigt.
- Münzbereiche auf dem Handy als kompakte Viererspalte gestaltet.
- Vermögensrechner wieder einzeilig und näher an der Zielvorlage angeordnet.
- Eingabefelder stärker gerundet und Pergament-/Zierliniengestaltung weiter reduziert.


## v0.56.9 – Vermögen: struktureller Mobile-Umbau
- Gesamtvermögen nach Zielvorlage neu geordnet: Münzbeutel links, Titel und umgerechnete Summe rechts.
- „Goldmünzen“ im Gesamtvermögensblock auf genau eine Angabe reduziert.
- Vier Münzarten auf dem Handy als kompakte Viererspalte angeordnet.
- Vermögensrechner auf Mobile in einer durchgehenden Bedienzeile stabilisiert.
- Hauptabschnitte weiterhin über Zierlinien statt Kartenrahmen getrennt.
- Bestehende Rechen- und Speicherlogik unverändert.

## v0.56.10 – Pergament-Hintergrund Vermögen
- Vermögensseite erhält eine durchgehende, warme CSS-Pergamentfläche.
- Dunklere gealterte Randzonen und dezente Papierflecken/Textur ergänzt.
- Unregelmäßige Seitenkanten liegen innerhalb der Pergamentfläche, um den früheren schwarzen Randartefakt zu vermeiden.
- Hintergrund wächst mit Inhalt und mindestens über die sichtbare mobile Höhe.
- Inhaltslayout und Vermögenslogik aus v0.56.9 bleiben unverändert.

## v0.56.11 – Pergamentkante
- Vermögensseite: geradlinige dunkle Seitenzonen reduziert.
- Schmalere, organisch fleckige Brand-/Alterungskanten links und rechts.
- Gealterte Ober- und Unterkante ergänzt.
- Papierfläche mit dezenten unregelmäßigen Flecken verfeinert.
- Inhaltslayout und Vermögenslogik unverändert.


## v0.56.12 – Vermögen: Finalisierung der Grundlagenseite
- Pergament-Hintergrund aus v0.56.11 unverändert übernommen.
- Münzeingaben erhalten die volle Kachelbreite; Minus/Plus liegen darunter.
- Münzarten im Vermögensrechner auf PM / GM / SM / KM gekürzt.
- Aktionsbuttons im Vermögensrechner auf die Serifenschrift der Seite vereinheitlicht.
- Umrechnungshinweis und zusätzliche „+ Betrag“-Schaltfläche ausgeblendet, um die mobile Oberfläche zu beruhigen.
- Überflüssige Mindesthöhe unterhalb der Notizen entfernt.
- Bestehende Vermögens-, Umrechnungs- und Speicherlogik bleibt erhalten.


## v0.56.14 – Vermögen: gezielte Reparatur auf Basis v0.56.12
- v0.56.12 bleibt gestalterische Basis; Pergament-Hintergrund, Goldbeutel und responsive Runen-Navigation bleiben unverändert.
- Münzeingaben nutzen die volle Kachelbreite; Minus/Plus stehen darunter.
- Vermögensrechner verwendet PM / GM / SM / KM und gibt dem Betragsfeld mehr Platz.
- Aktionsbuttons verwenden die Serifenschrift der Vermögensseite und kürzere Beschriftungen.
- Umrechnungshinweis und zusätzliche „+ Betrag“-Schaltfläche werden ausgeblendet.
- Keine großflächige CSS-Konsolidierung; Änderungen sind auf die Vermögens-Bedienelemente begrenzt.


## v0.56.15 – Vermögensrechner vereinfacht
- Auswahl `+ / −` aus der Rechnerzeile entfernt; Hinzufügen oder Abziehen erfolgt ausschließlich über die beiden Aktionsbuttons.
- Das Betragsfeld erhält dadurch mehr nutzbare Breite.
- Der `×`-Button entfernt nicht mehr die Rechnerzeile, sondern leert ausschließlich das Betragsfeld.
- Währungsauswahl, Teiler, Vermögenslogik, Navigation, Goldbeutel und Pergamentdarstellung bleiben unverändert.


## v0.56.16 – Vermögensrechner: Rechenketten wiederhergestellt
- Mehrere Betragszeilen können wieder über `+ Betrag` angelegt werden.
- Jede Zeile besitzt wieder einen Rechenoperator `+` oder `−`; damit werden verschiedene Beträge vor der Übernahme ins Gesamtvermögen verrechnet.
- `×` leert weiterhin ausschließlich das Betragsfeld der jeweiligen Zeile und entfernt die Zeile nicht.
- Die beiden unteren Aktionsbuttons bestimmen weiterhin erst im letzten Schritt, ob das berechnete Ergebnis zum Gesamtvermögen hinzugefügt oder davon abgezogen wird.
- Pergament, Goldbeutel, Navigation und übrige Vermögensdarstellung bleiben unverändert.


## v0.56.17 – Vermögensrechner mobile-first
- Rechnerzeilen bleiben einzeilig: Operator und Münzart erhalten feste, lesbare Breiten; das Betragsfeld nutzt flexibel den verbleibenden Platz.
- Der ×-Button wurde entfernt; Beträge werden direkt im Eingabefeld geändert.
- PM / GM / SM / KM werden im Währungsfeld vollständig dargestellt.
- Nach Übernahme des Ergebnisses ins Gesamtvermögen wird der Rechner auf genau eine leere Grundzeile, Teiler 1 und Ergebnis 0 GM zurückgesetzt.
- Mehrere Beträge können weiterhin über „+ Betrag“ angelegt und intern mit + / − verrechnet werden.


## v0.56.18 – Hotfix Rechnerfelder auf Mobilgeräten
- Operator `+ / −` erhält eine feste, sichtbare Select-Fläche mit reduziertem Innenabstand.
- Münzart `PM / GM / SM / KM` erhält ausreichend feste Breite und reduzierten Pfeil-Innenabstand.
- Nur das Betragsfeld nutzt flexibel den verbleibenden Platz; die Rechnerzeile bleibt einzeilig.
- Keine Änderungen an Pergament, Goldbeutel, Navigation oder Berechnungslogik.

## v0.56.19 – Zeit: erster grafischer Umbau
- Die Zeit-Seite übernimmt die grafische Sprache der fertigen Vermögensseite: transparente Pergament-Abschnitte, ornamentale Trenner, Serif-Überschriften und weich gerundete Eingaben.
- Rundenzähler und Rundenaktionen wurden mobile-first neu angeordnet; die bestehende Zeit-Logik bleibt unverändert.
- Initiative, Effekte und freie Effekte verwenden Linien und Abstände statt klassischer Kartenrahmen.
- Papierkorb-Symbole in Initiative und freien Effekten wurden durch eine eigene Azlanti-Löschrune als SVG-Grafik ersetzt.

## v0.56.20 – Zeit nach Vermögensvorbild
- Zeitseite konsequenter an die offene Pergamentgestaltung der Vermögensseite angeglichen.
- Gelieferte Sanduhr-Grafik links neben „Aktuelle Runde“ integriert, analog zum Goldsack beim Gesamtvermögen.
- „Nächste Runde“ bewusst etwas größer als die beiden Nachbaraktionen; +/− aus den Rundenbuttons entfernt.
- Initiative repariert: Charakter-IDs werden beim Vergleich normalisiert, sodass Teilnehmer auch bei numerischen IDs wieder hinzugefügt werden können.
- Bestehende Runden-, Effekt- und Timerlogik ansonsten unverändert.

## v0.56.20 – Zeit nach Vermögensvorbild
- Zeitseite konsequenter an die offene Pergamentgestaltung der Vermögensseite angeglichen.
- Gelieferte Sanduhr-Grafik links neben „Aktuelle Runde“ integriert, analog zum Goldsack beim Gesamtvermögen.
- „Nächste Runde“ bewusst etwas größer als die beiden Nachbaraktionen; +/− aus den Rundenbuttons entfernt.
- Initiative repariert: Charakter-IDs werden beim Vergleich normalisiert, sodass Teilnehmer auch bei numerischen IDs wieder hinzugefügt werden können.
- Löschfunktion verwendet eine eigene Runen-SVG statt eines Mülleimer-Symbols.
- Bestehende Runden-, Effekt- und Timerlogik ansonsten unverändert.

## v0.56.21 – globaler Pergament-Hintergrund
- Bisherige künstliche Seitenhintergründe, Verläufe, Kanten und Hintergrundrunen werden für die Inhaltsseiten deaktiviert.
- Grundfläche aller Inhaltsseiten ist schwarz.
- Geliefertes „Pergament 1“ bildet den oberen Blattabschnitt, „Pergament 3“ den unteren Abschluss.
- „Pergament 2“ füllt bei längeren Seiten den Bereich dazwischen wiederholt und mit leichter Überlappung, damit keine offenen Nähte entstehen.
- Alle drei Pergamentteile skalieren gemeinsam auf die jeweilige Seiten-/Handybreite.
- Die gelieferten PNGs wurden nur technisch freigestellt: das eingebettete weiß-graue Transparenzraster wurde transparent gesetzt; die Pergamentstruktur selbst bleibt erhalten.


## v0.56.22 – Sticky-Kopf und Zeit-Innenabstand
- Navigation und globale aktive Charakterzeile bleiben beim Scrollen ohne Lücke direkt zusammen.
- Die App-Kopfzeile reserviert auf Mobilgeräten festen Platz für die Hometaste, damit der Titel nicht überlagert wird.
- Die Zeitseite erhält zusätzlichen horizontalen Innenabstand, damit Überschriften, Initiative, Effekte und Eingaben vollständig auf dem Pergament stehen.
- Der neue Pergament-Hintergrund aus v0.56.21 bleibt unverändert.


## v0.56.23 – Zeit/Vermögen: Innenrahmen und transparente Felder
- Zeit: Initiative, Effekte und Freie Effekte werden über die jeweiligen Inhaltsabschnitte sicher innerhalb der zerrissenen Pergamentkante eingerückt.
- Zeit: Initiativwert ist im Feld zentriert; Name, Hoch/Runter-Navigation und Löschrune bleiben auch mobil in einer Zeile.
- Zeit: helle Eingabeflächen verwenden nur noch ca. 15 % Füllung, damit das Pergament sichtbar bleibt.
- Vermögen: gleicher sicherer horizontaler Innenrahmen für den Inhaltsbereich.
- Vermögen: Münz-, Rechner-, Teiler- und Notizfelder erhalten ebenfalls ca. 15 % helle Füllung.
- Globaler Pergament-Hintergrund bleibt unverändert.
