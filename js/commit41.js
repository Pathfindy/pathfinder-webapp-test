// Commit 41: Wisch-Navigation zwischen Hauptseiten
(() => {
  "use strict";

  const REIHENFOLGE = ["dashboard","effekte","charakterwerte","leben","charaktere","admin"];
  const MIN_DISTANZ = 55;
  const VERHAELTNIS = 1.25;
  let startX = 0;
  let startY = 0;
  let startZiel = null;

  function istInteraktiv(element) {
    return !!element?.closest?.("input, textarea, select, button, a, dialog, [contenteditable='true']");
  }

  function hatHorizontalenScroll(element) {
    let aktuell = element;
    while (aktuell && aktuell !== document.body) {
      const stil = getComputedStyle(aktuell);
      const overflowX = stil.overflowX;
      if ((overflowX === "auto" || overflowX === "scroll") &&
          aktuell.scrollWidth > aktuell.clientWidth + 2) return true;
      aktuell = aktuell.parentElement;
    }
    return false;
  }

  function aktiveSeite() {
    return REIHENFOLGE.find(name => {
      const element = typeof seiten !== "undefined" ? seiten[name] : null;
      return element && getComputedStyle(element).display !== "none";
    }) || "dashboard";
  }

  function wechsle(richtung) {
    if (typeof zeigeSeite !== "function") return;
    const aktuell = aktiveSeite();
    const index = REIHENFOLGE.indexOf(aktuell);
    const zielIndex = index + richtung;
    if (index < 0 || zielIndex < 0 || zielIndex >= REIHENFOLGE.length) return;

    const ziel = REIHENFOLGE[zielIndex];
    zeigeSeite(ziel);

    if (ziel === "admin" && typeof aktualisiereAdminAnsicht === "function") aktualisiereAdminAnsicht();
    if (ziel === "charakterwerte" && typeof window.aktualisiereAngriffeAnsicht === "function") window.aktualisiereAngriffeAnsicht();
    if (ziel === "leben" && typeof window.rendereEnergieAnsicht === "function") window.rendereEnergieAnsicht();
  }

  function initialisiereSwipe() {
    const main = document.querySelector("main");
    if (!main || main.dataset.swipe41) return;
    main.dataset.swipe41 = "1";

    main.addEventListener("touchstart", event => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startZiel = event.target;
    }, { passive: true });

    main.addEventListener("touchend", event => {
      if (!startZiel || event.changedTouches.length !== 1) return;
      const ziel = startZiel;
      startZiel = null;
      if (istInteraktiv(ziel) || hatHorizontalenScroll(ziel)) return;

      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (Math.abs(dx) < MIN_DISTANZ) return;
      if (Math.abs(dx) < Math.abs(dy) * VERHAELTNIS) return;

      wechsle(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialisiereSwipe, { once: true });
  } else {
    initialisiereSwipe();
  }
})();
