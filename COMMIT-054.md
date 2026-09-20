# COMMIT-054 – Seite „Zeit“

Version: **v0.54.4**

## Ziel

Neue kampagnenbezogene Seite „Zeit“ für die persönliche Kampfrundenverwaltung.

## Enthalten

- Rundenzähler mit manuellem Fortschalten und Zurücksetzen.
- Initiative 0–40 für Charaktere der aktiven Kampagne sowie freie Gegner-/NSC-Einträge.
- Initiative bleibt während des Kampfes änderbar und wird automatisch absteigend sortiert.
- Bei gleichem Initiativrang kann die Reihenfolge mit Pfeilen geändert werden.
- Aktive, zeitlich geeignete Effekte der eigenen Charaktere der aktiven Kampagne werden angeboten.
- Effekt-Timer können „Jetzt“ oder mit frei eingegebener Startrunde begonnen werden.
- Freie temporäre Effekte können unabhängig von der Effektseite angelegt und nach dem Kampf gelöscht werden.
- Dashboard bleibt technisch vorhanden, ist aber aus der sichtbaren Navigation und Wischreihenfolge entfernt.

## Hotfixes nach erstem Test

### v0.54.1
Die Seite „Zeit“ wurde in die zentrale Seitennavigation aufgenommen.

### v0.54.2
Kritische Regression behoben: Der sichtbare Dashboard-Button war aus `index.html` vollständig entfernt worden,
obwohl `app.js` beim Start weiterhin direkt auf `btnDashboard` zugreift. Dadurch brach `app.js` bereits beim Laden
mit einem JavaScript-Laufzeitfehler ab und große Teile der App wurden nicht initialisiert.

Der Dashboard-Button bleibt nun als unsichtbares Kompatibilitätselement im DOM. Dadurch bleibt die bestehende
Architektur funktionsfähig, während Dashboard für den Nutzer weiterhin ausgeblendet ist.

Zusätzlich wurden die Cache-Versionen der geänderten JavaScript-/CSS-Dateien auf 54.2 angehoben.

### v0.54.3

- „+ Nächste Runde“ wird optisch hervorgehoben.
- Neuer Button „− nochmal zurück“ reduziert die aktuelle Runde bis minimal Runde 0.
- „Zurücksetzen“ heißt nun „Kampf beendet“; die bestehende Lösch-/Reset-Funktion bleibt erhalten.
- Im Initiative-Bereich heißt das Eingabefeld nun „Initiative“; der erklärende Sortiertext wurde entfernt.
- Bei aktiven Kampagneneffekten wird die konkrete Dauer nicht mehr aus der Stufe des betroffenen Charakters berechnet. Sie wird beim Start des Timers manuell in Runden eingegeben.
- Abgelaufene App-Effekttimer werden vollständig gegraut dargestellt.


### v0.54.4

- Abgelaufene Effekte erhalten nun explizit graue Schrift statt nur reduzierter Deckkraft.
- Initiative-Aktionen (hoch/runter/löschen) bleiben auf Mobilgeräten neben dem Namen, solange ausreichend Breite vorhanden ist; erst bei sehr schmalen Displays wechseln sie in die nächste Zeile.
- „+ Nächste Runde“ ist dunkelblau mit weißer, normalgewichtiger Schrift.
- Effektlaufzeiten können alternativ als Runden, Zauberstufe × 1 Runde, Zauberstufe × 1 Minute oder Minuten eingegeben werden. Minuten werden mit 10 Runden pro Minute umgerechnet.
- Die Unterzeile „Kampfrunden der aktiven Kampagne“ wurde entfernt.
- Der Hinweistext im Effektbereich wurde entfernt und die Überschrift lautet jetzt „Effekte“.
