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
