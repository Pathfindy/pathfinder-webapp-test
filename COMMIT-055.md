# Commit 55 – Zauber

Version 0.55.0 startet die neue Zauberseite.

- neue Seite „Zauber“ in Navigation und Wischreihenfolge
- Zauberwirker werden aus den Klassen des aktiven Charakters erkannt
- pro Zauberklasse: frei wählbares Zauberattribut, vorbereitet/spontan und Zauberstufe (ZS)
- Anzeige von Konzentrationsbonus, defensivem Zaubern und Wurf zum Überwinden von Zauberresistenz
- Zauber-SG für Grad 0–9 aus Zauberattribut und Grad
- Datenbank aus „Bogen Spieler 6.300“, Blatt „ZauberListen“: 1.926 eindeutige Zaubereinträge; Klassen-/Gradzuordnungen werden getrennt gespeichert
- Suche und Filter nach Zaubergrad
- Zauberdetails aus der Excel: Quelle, Schule, Kurzbeschreibung, Reichweite, Dauer und Rettungswurf soweit im Quelldatensatz codiert
- stufenabhängige Reichweiten werden mit der ZS des aktiven Zauberwirkers berechnet
- Reichweitenanzeige wählbar in Meter, Felder oder Feet (1 Feld = 1,5 m; 1 ft = 0,3 m), analog zur Kampfseite

Noch nicht Bestandteil dieser ersten Version: Zauberslot-Verbrauch, vorbereitete/bekannte Zauber pro Charakter, Metamagie sowie weitere Klassenressourcen wie Energie fokussieren, Kampfrausch oder Bardenauftritt.


## v0.55.1

- Navigation: „Zauber“ steht nun zwischen „Effekte“ und „Zeit“, inklusive Wischreihenfolge.
- Die separate oberste Zeile „Zauberklasse“ wurde entfernt.
- Die aktive Zauberklasse wird direkt in „Zauberwirker-Einstellungen“ per Klick auf die Klasse gewählt; die aktive Klasse ist dunkelblau/weiß markiert.
- Zaubergrade 0–9 lassen sich pro Charakter und Zauberklasse über die SG-Felder aktivieren/deaktivieren. Aktivierte Grade sind dunkelblau mit weißer Schrift.
- Grade ohne Zauber in der importierten Datenbank sind deaktiviert.
- Nur aktivierte Grade erscheinen darunter. Jeder Grad ist als einklappbares Banner umgesetzt; die Zauberliste wird erst beim Aufklappen sichtbar.
- Die Suchfunktion filtert innerhalb der aktivierten Grade.

## v0.55.2
- Hotfix: `data/zauber.json` wieder in den Teststand aufgenommen. Ohne diese Datei war die Zauberdatenbank leer; dadurch wurden alle Grad-Schaltflächen als nicht verfügbar deaktiviert.
- Grad 0–9 kann nun angeklickt und pro Charakter/Zauberklasse aktiviert bzw. deaktiviert werden, sofern der Grad in der Zauberdatenbank für die Klasse vorhanden ist.
