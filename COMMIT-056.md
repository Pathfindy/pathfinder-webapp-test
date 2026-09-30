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
