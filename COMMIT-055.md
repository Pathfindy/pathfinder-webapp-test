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


## v0.55.3
- Aktivierbare Zaubergrade werden nun zusätzlich durch das aktuelle Bezugsattribut begrenzt: Zum Wirken eines Zaubers ist mindestens ein Attributswert von `10 + Zaubergrad` erforderlich. Beispiel: IN 12 erlaubt maximal Grad 2. Höhere Grade bleiben deaktiviert und bereits gespeicherte höhere Grade werden nicht angezeigt, solange das Attribut zu niedrig ist.
- Die Begrenzung verwendet den aktuellen Attributswert inklusive der bereits von der App berechneten Attributsänderungen.
- „ZR überwinden“ zeigt den vollständigen Wurf als `W20 + ZS` (zuzüglich eines ggf. hinterlegten ZR-Bonus) statt nur den Bonuswert.


## v0.55.3
- Zaubergrade sind nur noch bis zum durch das aktuelle Bezugsattribut erlaubten Grad aktivierbar (Mindestwert 10 + Zaubergrad).
- „ZR überwinden“ zeigt den vollständigen Wurf `W20 + Zauberstufe`; „Konzentration“ zeigt `W20 + Zauberstufe + Attributsmodifikator`.
- Quellen aus „Folianten: Zauber“ wurden ausschließlich vorhandenen Excel-/App-Zaubern zugeordnet. Die App-Datenbank wurde nicht um PDF-Zauber erweitert.
- Spontane Zauberwirker können pro Grad gelernte/verfügbare Zauber markieren und auf diese filtern.
- Vorbereitende Zauberwirker können Zauber vorbereiten, mehrfach vorbereiten und auf vorbereitete Zauber filtern.
- Pro aktivem Grad gibt es ein Eingabefeld für Zauber pro Tag/Slots und eine Anzeige der noch freien/verfügbaren Anzahl.
