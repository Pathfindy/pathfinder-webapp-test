// Commit 55.1: Zauberseite – Klassenwahl integriert, aktivierbare Grade, einklappbare Listen
(() => {
  "use strict";
  const page=document.getElementById("zauber"), btn=document.getElementById("btnZauber"), root=document.getElementById("zauberInhalt55");
  if(!page||!btn||!root) return;

  const EINHEIT_KEY="pf-reichweiten-einheit";
  const ZAUBERKLASSEN=new Set(["Alchemist","Antipaladin","Arkanist","Barde","Blutwüter","Druide","Ermittler","Hexe","Hexenmeister","Inquisitor","Jäger","Kampfmagus","Kleriker","Kriegspriester","Magier","Mystiker","Paladin","Paktmagier","Schamane","Skalde","Waldläufer"]);
  const STANDARD={Alchemist:["IN","vorbereitet"],Antipaladin:["CH","vorbereitet"],Arkanist:["IN","vorbereitet"],Barde:["CH","spontan"],Blutwüter:["CH","spontan"],Druide:["WE","vorbereitet"],Ermittler:["IN","vorbereitet"],Hexe:["IN","vorbereitet"],Hexenmeister:["CH","spontan"],Inquisitor:["WE","spontan"],Jäger:["WE","spontan"],Kampfmagus:["IN","vorbereitet"],Kleriker:["WE","vorbereitet"],Kriegspriester:["WE","vorbereitet"],Magier:["IN","vorbereitet"],Mystiker:["CH","spontan"],Paladin:["CH","vorbereitet"],Paktmagier:["CH","spontan"],Schamane:["WE","vorbereitet"],Skalde:["CH","spontan"],Waldläufer:["WE","vorbereitet"]};

  let daten=null, klasseAktiv="", suche="";
  const esc=s=>String(s??"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const ch=()=>typeof aktiverCharakter==="function"?aktiverCharakter():null;
  function zauberKlassen(c){return (c?.klassen||[]).filter(k=>ZAUBERKLASSEN.has(k.name));}
  function config(c,name){
    c.zauberklassen=c.zauberklassen&&typeof c.zauberklassen==="object"?c.zauberklassen:{};
    const d=STANDARD[name]||["IN","vorbereitet"];
    const cfg=c.zauberklassen[name]||(c.zauberklassen[name]={
      attribut:d[0],art:d[1],zs:Number((c.klassen||[]).find(k=>k.name===name)?.stufe||0),
      konzBonus:0,zrBonus:0,sgBonus:0,aktiveGrade:[]
    });
    if(!Array.isArray(cfg.aktiveGrade)) cfg.aktiveGrade=[];
    cfg.aktiveGrade=[...new Set(cfg.aktiveGrade.map(Number).filter(g=>Number.isInteger(g)&&g>=0&&g<=9))].sort((a,b)=>a-b);
    return cfg;
  }
  function save(){if(typeof speichereCharaktere==="function")speichereCharaktere();}
  function mod(c,key){return typeof attributModifikator==="function"?Number(attributModifikator(c,key)||0):0;}
  function fmt(n){return n>0?`+${n}`:String(n)}
  function einheit(){return localStorage.getItem(EINHEIT_KEY)||"m"}
  function runde(n){n=Math.round(n*100)/100;return Number.isInteger(n)?String(n):String(n).replace(".",",")}
  function reichweiteMeter(text,zs){let t=String(text||"").replace(/,/g,".");if(!t)return null;if(/berührung|du|persönlich|unbegrenzt/i.test(t))return null;let m=t.match(/(\d+(?:\.\d+)?)m(?:\+(\d+(?:\.\d+)?)m\/(\d*)St)?/i);if(!m)return null;let wert=Number(m[1]);if(m[2])wert+=Number(m[2])*Math.floor(zs/Math.max(1,Number(m[3]||1)));return wert;}
  function reichweiteText(text,zs){const m=reichweiteMeter(text,zs);if(m===null)return text||"–";const e=einheit();if(e==="ft")return `${runde(m/0.3)} ft`;if(e==="feld")return `${runde(m/1.5)} Felder`;return `${runde(m)} m`;}
  async function load(){if(daten)return;try{const r=await fetch("data/zauber.json?v=55.2");if(!r.ok)throw new Error();daten=await r.json()}catch{daten={zauber:[]}}}

  function gradVorhanden(k,g){
    return (daten?.zauber||[]).some(z=>Object.prototype.hasOwnProperty.call(z.klassen||{},k.name)&&Number(z.klassen[k.name])===Number(g));
  }

  function renderKlassen(c,klassen){
    const box=document.createElement("section");
    box.className="zauber-karte-55";
    box.innerHTML='<h3>Zauberwirker-Einstellungen</h3><div class="zauber-hinweis-55">Zauberklasse anklicken, um sie unten anzuzeigen. Die Werte werden pro Charakter und Klasse gespeichert.</div>';
    for(const k of klassen){
      const x=config(c,k.name), row=document.createElement("div");
      row.className="zauber-klassenzeile-55"+(k.name===klasseAktiv?" aktiv":"");
      row.innerHTML=`<button type="button" class="zauber-klassenwahl-55" data-klasse aria-pressed="${k.name===klasseAktiv}">${esc(k.name)} ${Number(k.stufe||0)}</button><label>Attribut <select data-a>${["ST","GE","KO","IN","WE","CH"].map(a=>`<option ${a===x.attribut?"selected":""}>${a}</option>`).join("")}</select></label><label>Art <select data-art><option value="vorbereitet" ${x.art==="vorbereitet"?"selected":""}>vorbereitet</option><option value="spontan" ${x.art==="spontan"?"selected":""}>spontan</option></select></label><label>ZS <input data-zs type="number" min="0" max="99" value="${Number(x.zs||0)}"></label>`;
      row.querySelector('[data-klasse]').onclick=()=>{klasseAktiv=k.name;render()};
      row.querySelector('[data-a]').onchange=e=>{x.attribut=e.target.value;save();render()};
      row.querySelector('[data-art]').onchange=e=>{x.art=e.target.value;save()};
      row.querySelector('[data-zs]').onchange=e=>{x.zs=Math.max(0,Number(e.target.value)||0);save();render()};
      box.append(row);
    }
    root.append(box);
  }

  function renderWerte(c,k,x){
    const am=mod(c,x.attribut), konz=Number(x.zs||0)+am+Number(x.konzBonus||0), zr=Number(x.zs||0)+Number(x.zrBonus||0);
    const box=document.createElement("section");
    box.className="zauber-karte-55";
    box.innerHTML=`<div class="zauber-kopf-55"><h3>${esc(k.name)} ${Number(k.stufe||0)} · ZS ${Number(x.zs||0)} · ${x.attribut} ${fmt(am)}</h3><label>Reichweite <select id="zauberEinheit55"><option value="m">Meter</option><option value="feld">Felder</option><option value="ft">Feet</option></select></label></div><div class="zauber-werte-55"><div class="zauber-wert-55">Konzentration<strong>${fmt(konz)}</strong></div><div class="zauber-wert-55">ZR überwinden<strong>${fmt(zr)}</strong></div><div class="zauber-wert-55">Defensiv Grad 3<strong>SG 21 · W20 ${Math.max(1,21-konz)}+</strong></div></div><div class="zauber-sg-grid-55">${Array.from({length:10},(_,g)=>{const aktiv=x.aktiveGrade.includes(g), vorhanden=gradVorhanden(k,g);return `<button type="button" class="zauber-sg-55${aktiv?" aktiv":""}" data-grad="${g}" ${vorhanden?"":"disabled"} aria-pressed="${aktiv}" title="${vorhanden?"Grad für diesen Charakter ein-/ausblenden":"Für diese Klasse sind in der Datenbank keine Zauber dieses Grades vorhanden"}">Grad ${g}<br><strong>SG ${10+g+am+Number(x.sgBonus||0)}</strong></button>`}).join("")}</div>`;
    root.append(box);
    const sel=box.querySelector('#zauberEinheit55');
    sel.value=einheit();
    sel.onchange=()=>{localStorage.setItem(EINHEIT_KEY,sel.value);render()};
    box.querySelectorAll('[data-grad]').forEach(b=>b.onclick=()=>{
      const g=Number(b.dataset.grad);
      x.aktiveGrade=x.aktiveGrade.includes(g)?x.aktiveGrade.filter(v=>v!==g):[...x.aktiveGrade,g].sort((a,b)=>a-b);
      save();render();
    });
  }

  function zauberHtml(z,k,x){
    const g=Number(z.klassen[k.name]), sg=10+g+mod(ch(),x.attribut)+Number(x.sgBonus||0);
    return `<article class="zauber-eintrag-55"><div class="zauber-eintrag-kopf-55"><h4>${esc(z.name)} <small>Grad ${g}</small></h4><strong>SG ${sg}</strong></div><div class="zauber-meta-55">${esc(z.schule||'')} · ${esc(z.quelle||'')} · ZR-Wurf W20 ${fmt(Number(x.zs||0)+Number(x.zrBonus||0))}</div><div class="zauber-meta-55">Reichweite: <span class="zauber-reichweite-55">${esc(reichweiteText(z.reichweite,x.zs))}</span>${z.dauer?` · Dauer: ${esc(z.dauer)}`:''}${z.rettungswurf?` · RW: ${esc(z.rettungswurf)}`:''}</div>${z.beschreibung?`<div class="zauber-beschreibung-55">${esc(z.beschreibung)}</div>`:''}</article>`;
  }

  function renderGradListen(k,x){
    const box=document.createElement("section");
    box.className="zauber-karte-55";
    const aktive=x.aktiveGrade.filter(g=>gradVorhanden(k,g));
    if(!aktive.length){
      box.innerHTML='<p class="zauber-leer-55">Bitte oben einen oder mehrere Zaubergrade aktivieren.</p>';
      root.append(box);return;
    }
    const filter=document.createElement("div");
    filter.className="zauber-filter-55";
    filter.innerHTML=`<input id="zauberSuche55" placeholder="Zauber suchen…" value="${esc(suche)}">`;
    box.append(filter);
    const listen=document.createElement("div");
    listen.className="zauber-gradlisten-55";
    box.append(listen);
    root.append(box);
    filter.querySelector('input').oninput=e=>{suche=e.target.value;renderGradInhalte(listen,k,x)};
    renderGradInhalte(listen,k,x);
  }

  function renderGradInhalte(container,k,x){
    const q=suche.trim().toLocaleLowerCase('de');
    container.innerHTML='';
    for(const g of x.aktiveGrade.filter(g=>gradVorhanden(k,g))){
      let list=(daten?.zauber||[])
        .filter(z=>Object.prototype.hasOwnProperty.call(z.klassen||{},k.name)&&Number(z.klassen[k.name])===g)
        .filter(z=>!q||z.name.toLocaleLowerCase('de').includes(q))
        .sort((a,b)=>a.name.localeCompare(b.name,'de'));
      const details=document.createElement('details');
      details.className='zauber-gradgruppe-55';
      details.innerHTML=`<summary><span>Grad ${g}</span><span>${list.length} Zauber</span></summary><div class="zauber-liste-55">${list.length?list.slice(0,250).map(z=>zauberHtml(z,k,x)).join(''):'<p class="zauber-leer-55">Keine passenden Zauber gefunden.</p>'}</div>`;
      container.append(details);
    }
  }

  async function render(){
    await load();root.innerHTML='';
    const c=ch();
    if(!c){root.innerHTML='<section class="zauber-karte-55 zauber-leer-55">Kein aktiver Charakter.</section>';return}
    const klassen=zauberKlassen(c);
    if(!klassen.length){root.innerHTML='<section class="zauber-karte-55 zauber-leer-55">Der aktive Charakter besitzt aktuell keine unterstützte Zauberklasse.</section>';return}
    if(!klassen.some(k=>k.name===klasseAktiv))klasseAktiv=klassen[0].name;
    renderKlassen(c,klassen);
    const k=klassen.find(k=>k.name===klasseAktiv), x=config(c,k.name);
    renderWerte(c,k,x);
    renderGradListen(k,x);
  }

  const oldShow=zeigeSeite;
  zeigeSeite=function(name){oldShow(name);if(name==='zauber')render()};
  btn.onclick=()=>zeigeSeite('zauber');
  if(typeof waehleCharakter==='function'){
    const old=waehleCharakter;
    waehleCharakter=function(id){const r=old(id);if(r&&page.style.display!=='none')render();return r};
  }
  window.pfZauber55={render};
})();
