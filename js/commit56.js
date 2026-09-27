// Commit 56.1: Startseite, Prolog und seitenbezogenes Farbsystem
(() => {
  "use strict";
  const START=sessionStorage.getItem("pf56-session-gestartet")!=="1";
  const start=document.getElementById("startseite56"), prolog=document.getElementById("prolog56");
  const titel=document.getElementById("prologTitel56"), text=document.getElementById("prologText56"), bild=document.getElementById("prologBild56"), zaehler=document.getElementById("prologZaehler56");
  const szenen=[
    ["Das Reich der Azlanti","Vor vielen tausend Jahren, als das Volk der Azlanti über Golarion herrschte, schufen mächtige Champions ein Artefakt, das sie auf ihren Reisen begleiten und unterstützen sollte."],
    ["Die Erschaffung","Erschaffen aus der Haut eines Aboleth, bestand das Artefakt aus mehreren kombinierbaren Teilstücken. Das erste Stück bildete den Kern – sozusagen die Basis des Artefakts."],
    ["Verbunden mit den Champions","Der Kern verband sich mit jedem einzelnen Champion der Gruppe und speicherte seine körperliche Verfassung, sein geistiges Wissen und dessen Zustand und Können."],
    ["Erweiterungen des Artefakts","Die anderen einzelnen Bestandteile konnten frei nach den Bedürfnissen eines jeden Champions zum Kernstück hinzugefügt werden. Sie erweiterten das Artefakt um Magie, Göttlichkeit, Lebensenergie oder die Verwaltung der Zeit selbst."],
    ["Eine ungewollte Verbindung","Was die Azlanti bei der Erschaffung nicht ahnten: Bei seiner Vollendung baute das Artefakt eine ungewollte und unbekannte energetische Verbindung mit einer anderen Dimension auf."],
    ["Der Erdenfall","Dann folgte der Erdenfall. Kometen stürzten vom Himmel, und Azlant und seine Werke gingen unter im Zeitalter der Finsternis."],
    ["Jahrtausende später","Jahrtausende später fand eine varisische Händlerin beim Lagern ihrer Karawane in einer zerfallenen Ruine durch Zufall eine steinähnliche dunkle kleine Tafel mit einer gravierten Rune, deren Bedeutung längst in Vergessenheit geraten war."],
    ["Ein Kauf in Magnimar","Auf einem belebten Markt in Magnimar bietet dir plötzlich eine in die Jahre gekommene Händlerin von ihrem bunt bemalten Wagen einen Glücksbringer in Form einer sehr alt aussehenden dunklen Tafel an. Ihrem zahnlückenversehenen und verschmitzten Lächeln und einem Angebot von 5 Silberstücken kannst du nicht widerstehen."],
    ["In der Sumpfgegend","Ihr seid bereits mehrere Tage in dieser verfluchten, endlos wirkenden Sumpfgegend unterwegs. Als ihr euch durch eine wässrige, stinkende Senke schleppt, tauchen vor euch zwei bucklig gebeugte Trolle aus dem Morast auf und lecken sich hungrig die Mäuler."],
    ["Die Rune erwacht","Beim Ziehen eurer Waffen beginnt die kleine, mit Lederschnüren an deinem Gürtel befestigte Tafel zu vibrieren. Die unbekannte eingravierte Rune glimmt auf."],
    ["Zwischen den Welten","Irgendwo in einer anderen unbekannten Dimension machen sich zur gleichen Zeit ein halbes Dutzend Chips fressender und Cola saufender Möchtegern-Helden daran, ihre Würfel zu sortieren und sich mit Papier, Bleistift und einer dunklen glasigen Scheibe zu bewaffnen."],
    ["Das azlantische Helferlein der Boni ist erwacht","Die dunkle glasige Scheibe erglimmt auf dem Spieltisch. Das azlantische Helferlein der Boni ist erwacht und die Würfel können rollen."]
  ];
  let idx=0;
  function zeigeOverlay(el,an){if(!el)return;el.hidden=!an;el.setAttribute("aria-hidden",an?"false":"true")}
  function zurApp(){zeigeOverlay(start,false);zeigeOverlay(prolog,false);sessionStorage.setItem("pf56-session-gestartet","1");document.getElementById("btnCharaktere")?.click();window.scrollTo({top:0,behavior:"auto"})}
  function startseite(){zeigeOverlay(prolog,false);zeigeOverlay(start,true)}
  function bildFuerSzene(i){
    const nr=String(i+1).padStart(2,"0");
    bild.src=`assets/prolog56/${nr}.png`;
    bild.alt=`Prologszene ${i+1}: ${szenen[i][0]}`;
  }
  function render(){const s=szenen[idx];titel.textContent=s[0];text.textContent=s[1];zaehler.textContent=`${idx+1} / ${szenen.length}`;bildFuerSzene(idx);document.getElementById("btnPrologZurueck56").disabled=idx===0;document.getElementById("btnPrologWeiter56").textContent=idx===szenen.length-1?"Zur App ›":"Weiter ›"}
  function prologStart(){idx=0;zeigeOverlay(start,false);zeigeOverlay(prolog,true);render()}
  document.getElementById("btnStartseite56")?.addEventListener("click",startseite);
  document.getElementById("btnZurApp56")?.addEventListener("click",zurApp);
  document.getElementById("btnProlog56")?.addEventListener("click",prologStart);
  document.getElementById("btnPrologUeberspringen56")?.addEventListener("click",zurApp);
  document.getElementById("btnPrologZurueck56")?.addEventListener("click",()=>{if(idx>0){idx--;render()}});
  document.getElementById("btnPrologWeiter56")?.addEventListener("click",()=>{if(idx<szenen.length-1){idx++;render()}else zurApp()});

  const map={effekte:"page-effekte-56",charakterwerte:"page-charakterwerte-56",leben:"page-leben-56",zauber:"page-zauber-56",zeit:"page-zeit-56",vermoegen:"page-vermoegen-56",charaktere:"page-charaktere-56",admin:"page-admin-56",dashboard:"page-charaktere-56"};
  function farbe(name){document.body.classList.remove(...Object.values(map));document.body.classList.add(map[name]||map.charaktere)}
  const alt=window.zeigeSeite;
  if(typeof alt==="function") window.zeigeSeite=function(name){alt(name);farbe(name)};
  document.querySelectorAll("nav button").forEach(b=>b.addEventListener("click",()=>{const id=b.id;const lookup={btnEffekte:"effekte",btnCharakterwerte:"charakterwerte",btnLeben:"leben",btnZeit:"zeit",btnZauber:"zauber",btnVermoegen:"vermoegen",btnCharaktere:"charaktere",btnAdmin:"admin"};if(lookup[id])farbe(lookup[id])}));
  farbe("charaktere");
  if(START) requestAnimationFrame(()=>startseite()); else zurApp();
})();
