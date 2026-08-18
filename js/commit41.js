// Commit 41.1: stabile Wisch-Navigation zwischen Hauptseiten
(() => {
  "use strict";

  const REIHENFOLGE = ["dashboard","effekte","charakterwerte","leben","charaktere","admin"];
  const BUTTONS = {
    dashboard: "btnDashboard",
    effekte: "btnEffekte",
    charakterwerte: "btnCharakterwerte",
    leben: "btnLeben",
    charaktere: "btnCharaktere",
    admin: "btnAdmin"
  };
  const MIN_DISTANZ = 65;
  const MAX_DAUER = 800;
  const VERHAELTNIS = 1.35;

  let startX = 0;
  let startY = 0;
  let startZeit = 0;
  let startSeite = "";
  let startZiel = null;
  let aktiv = false;

  function sichtbareSeite() {
    for (const name of REIHENFOLGE) {
      const element = typeof seiten !== "undefined" ? seiten[name] : null;
      if (element && !element.hidden && getComputedStyle(element).display !== "none") return name;
    }
    return "dashboard";
  }

  function istBedienelement(element) {
    return !!element?.closest?.(
      "input, textarea, select, option, button, a, label, dialog, " +
      "[contenteditable='true'], .bonus-klickbar, .angriff-karte"
    );
  }

  function horizontalScrollbarerVorfahre(element) {
    let aktuell = element;
    while (aktuell && aktuell !== document.body) {
      const stil = getComputedStyle(aktuell);
      if (
        ["auto","scroll"].includes(stil.overflowX) &&
        aktuell.scrollWidth > aktuell.clientWidth + 3
      ) return aktuell;
      aktuell = aktuell.parentElement;
    }
    return null;
  }

  function aktiviereSeite(name) {
    const buttonId = BUTTONS[name];
    const button = buttonId ? document.getElementById(buttonId) : null;

    // Immer denselben Weg wie die vorhandene Menü-Navigation verwenden.
    if (button) {
      button.click();
      return;
    }

    if (typeof zeigeSeite === "function") zeigeSeite(name);
  }

  function initialisiereSwipe() {
    const main = document.querySelector("main");
    if (!main || main.dataset.swipe411) return;
    main.dataset.swipe411 = "1";

    main.addEventListener("touchstart", event => {
      aktiv = false;
      if (event.touches.length !== 1) return;

      const ziel = event.target;
      if (istBedienelement(ziel) || horizontalScrollbarerVorfahre(ziel)) return;

      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startZeit = Date.now();
      startSeite = sichtbareSeite();
      startZiel = ziel;
      aktiv = true;
    }, { passive: true });

    main.addEventListener("touchcancel", () => {
      aktiv = false;
      startZiel = null;
    }, { passive: true });

    main.addEventListener("touchend", event => {
      if (!aktiv || !startZiel || event.changedTouches.length !== 1) {
        aktiv = false;
        return;
      }

      aktiv = false;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const dauer = Date.now() - startZeit;

      startZiel = null;

      if (dauer > MAX_DAUER) return;
      if (Math.abs(dx) < MIN_DISTANZ) return;
      if (Math.abs(dx) < Math.abs(dy) * VERHAELTNIS) return;

      // Nur von der Seite wechseln, auf der die Geste begonnen hat.
      const index = REIHENFOLGE.indexOf(startSeite);
      if (index < 0) return;

      // Finger nach links = in der Menüfolge nach rechts / nächste Seite.
      // Finger nach rechts = in der Menüfolge nach links / vorherige Seite.
      const zielIndex = dx < 0 ? index + 1 : index - 1;
      if (zielIndex < 0 || zielIndex >= REIHENFOLGE.length) return;

      aktiviereSeite(REIHENFOLGE[zielIndex]);
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialisiereSwipe, { once: true });
  } else {
    initialisiereSwipe();
  }
})();
