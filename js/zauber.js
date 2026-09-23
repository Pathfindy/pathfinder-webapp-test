// Commit 55.3: Zauberseite – Attributgrenze für Zaubergrade und klarer ZR-Wurf
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
      konzBonus:0,zrBonus:0,sgBonus:0,aktiveGrade:[],slots:{},gelernt:{},vorbereitet:{},nurGelernt:{}
    });
    cfg.slots=cfg.slots&&typeof cfg.slots==="object"?cfg.slots:{};
    cfg.gelernt=cfg.gelernt&&typeof cfg.gelernt==="object"?cfg.gelernt:{};
    cfg.vorbereitet=cfg.vorbereitet&&typeof cfg.vorbereitet==="object"?cfg.vorbereitet:{};
    cfg.nurGelernt=cfg.nurGelernt&&typeof cfg.nurGelernt==="object"?cfg.nurGelernt:{};
    if(!Array.isArray(cfg.aktiveGrade)) cfg.aktiveGrade=[];
    cfg.aktiveGrade=[...new Set(cfg.aktiveGrade.map(Number).filter(g=>Number.isInteger(g)&&g>=0&&g<=9))].sort((a,b)=>a-b);
    return cfg;
  }
  function save(){if(typeof speichereCharaktere==="function")speichereCharaktere();}
  function mod(c,key){return typeof attributModifikator==="function"?Number(attributModifikator(c,key)||0):0;}
  function attrWert(c,key){return typeof attributAktuellerWert==="function"?Number(attributAktuellerWert(c,key)||0):Number(c?.attribute?.[key]||10);}
  function maxGrad(c,x){return Math.max(-1,Math.min(9,Math.floor(attrWert(c,x.attribut)-10)));}
  function ids(x,g){const a=x.gelernt[g];return Array.isArray(a)?a:[]}
  function prep(x,g){const o=x.vorbereitet[g];return o&&typeof o==="object"?o:{}}
  function slotMax(x,g){return Math.max(0,Math.trunc(Number(x.slots[g])||0))}
  function prepAnzahl(x,g){return Object.values(prep(x,g)).reduce((a,b)=>a+Math.max(0,Math.trunc(Number(b)||0)),0)}
  function fmt(n){return n>0?`+${n}`:String(n)}
  function einheit(){return localStorage.getItem(EINHEIT_KEY)||"m"}
  function runde(n){n=Math.round(n*100)/100;return Number.isInteger(n)?String(n):String(n).replace(".",",")}
  function reichweiteMeter(text,zs){let t=String(text||"").replace(/,/g,".");if(!t)return null;if(/berührung|du|persönlich|unbegrenzt/i.test(t))return null;let m=t.match(/(\d+(?:\.\d+)?)m(?:\+(\d+(?:\.\d+)?)m\/(\d*)St)?/i);if(!m)return null;let wert=Number(m[1]);if(m[2])wert+=Number(m[2])*Math.floor(zs/Math.max(1,Number(m[3]||1)));return wert;}
  function reichweiteText(text,zs){const m=reichweiteMeter(text,zs);if(m===null)return text||"–";const e=einheit();if(e==="ft")return `${runde(m/0.3)} ft`;if(e==="feld")return `${runde(m/1.5)} Felder`;return `${runde(m)} m`;}
  async function load(){if(daten)return;try{const r=await fetch("data/zauber.json?v=55.3");if(!r.ok)throw new Error();daten=await r.json()}catch{daten={zauber:[]}}}

  function gradVorhanden(k,g){
    return (daten?.zauber||[]).some(z=>Object.prototype.hasOwnProperty.call(z.klassen||{},k.name)&&Number(z.klassen[k.name])===Number(g));
  }
  function attributWert(c,key){
    if(typeof attributAktuellerWert==="function") return Number(attributAktuellerWert(c,key)||0);
    const basis=Number(c?.attribute?.[key]??c?.[key]??10);
    return Number.isFinite(basis)?basis:10;
  }
  function gradDurchAttributMoeglich(c,x,g){
    return Number(g)<=Math.max(0,attributWert(c,x.attribut)-10);
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
    const am=mod(c,x.attribut), aw=attrWert(c,x.attribut), konz=Number(x.zs||0)+am+Number(x.konzBonus||0), zr=Number(x.zs||0)+Number(x.zrBonus||0), mg=maxGrad(c,x);
    x.aktiveGrade=x.aktiveGrade.filter(g=>g<=mg);
    const box=document.createElement("section");
    box.className="zauber-karte-55";
    box.innerHTML=`<div class="zauber-kopf-55"><h3>${esc(k.name)} ${Number(k.stufe||0)} · ZS ${Number(x.zs||0)} · ${x.attribut} ${aw} (${fmt(am)})</h3><label>Reichweite <select id="zauberEinheit55"><option value="m">Meter</option><option value="feld">Felder</option><option value="ft">Feet</option></select></label></div><div class="zauber-werte-55"><div class="zauber-wert-55">Konzentration<strong>W20 ${fmt(konz)}</strong><small>ZS ${fmt(Number(x.zs||0))} + ${x.attribut}-Mod ${fmt(am)}</small></div><div class="zauber-wert-55">ZR überwinden<strong>W20 ${fmt(zr)}</strong><small>Zauberstufe ${fmt(Number(x.zs||0))}</small></div><div class="zauber-wert-55">Max. Zaubergrad<strong>${mg>=0?mg:"–"}</strong><small>${x.attribut} ${aw} → benötigt 10 + Grad</small></div></div><div class="zauber-sg-grid-55">${Array.from({length:10},(_,g)=>{const aktiv=x.aktiveGrade.includes(g), vorhanden=gradVorhanden(k,g), attributOk=g<=mg;return `<button type="button" class="zauber-sg-55${aktiv?" aktiv":""}" data-grad="${g}" ${vorhanden&&attributOk?"":"disabled"} aria-pressed="${aktiv}" title="${!vorhanden?"Für diese Klasse sind in der Datenbank keine Zauber dieses Grades vorhanden":!attributOk?`${x.attribut} ${aw}: Für Grad ${g} wird mindestens ${10+g} benötigt`:"Grad für diesen Charakter ein-/ausblenden"}">Grad ${g}<br><strong>SG ${10+g+am+Number(x.sgBonus||0)}</strong></button>`}).join("")}</div>`;
    root.append(box);
    const sel=box.querySelector('#zauberEinheit55');
    sel.value=einheit();
    sel.onchange=()=>{localStorage.setItem(EINHEIT_KEY,sel.value);render()};
    box.querySelectorAll('[data-grad]').forEach(b=>b.onclick=()=>{
      const g=Number(b.dataset.grad); if(g>mg)return;
      x.aktiveGrade=x.aktiveGrade.includes(g)?x.aktiveGrade.filter(v=>v!==g):[...x.aktiveGrade,g].sort((a,b)=>a-b);
      save();render();
    });
  }

  function quellenText(z){return z.quelle_pdf&&z.regelwerk&&z.seite?`${z.regelwerk}, S. ${z.seite}`:""}
  function zauberHtml(z,k,x,g){
    const sg=10+g+mod(ch(),x.attribut)+Number(x.sgBonus||0), source=quellenText(z), spontan=x.art==="spontan";
    const gelernt=ids(x,g).includes(z.id), p=Number(prep(x,g)[z.id]||0), max=slotMax(x,g), used=prepAnzahl(x,g);
    const control=spontan
      ? `<label class="zauber-lerncheck-55"><input type="checkbox" data-lern="${esc(z.id)}" ${gelernt?"checked":""}> gelernt / verfügbar</label>`
      : `<div class="zauber-prep-55"><label><input type="checkbox" data-prepcheck="${esc(z.id)}" ${p>0?"checked":""}> vorbereitet</label><button type="button" data-minus="${esc(z.id)}" ${p<=0?"disabled":""}>−</button><strong>${p}×</strong><button type="button" data-plus="${esc(z.id)}" ${max<=0||used>=max?"disabled":""}>+</button></div>`;
    return `<article class="zauber-eintrag-55" data-zauber-id="${esc(z.id)}"><div class="zauber-eintrag-kopf-55"><h4>${esc(z.name)} <small>Grad ${g}</small></h4><strong>SG ${sg}</strong></div>${control}<div class="zauber-meta-55">${esc(z.schule||'')}${source?` · Quelle: ${esc(source)}`:''} · ZR-Wurf W20 ${fmt(Number(x.zs||0)+Number(x.zrBonus||0))}</div><div class="zauber-meta-55">Reichweite: <span class="zauber-reichweite-55">${esc(reichweiteText(z.reichweite,x.zs))}</span>${z.dauer?` · Dauer: ${esc(z.dauer)}`:''}${z.rettungswurf?` · RW: ${esc(z.rettungswurf)}`:''}</div>${z.beschreibung?`<div class="zauber-beschreibung-55">${esc(z.beschreibung)}</div>`:''}</article>`;
  }

  function renderGradListen(k,x){
    const box=document.createElement("section"); box.className="zauber-karte-55";
    const aktive=x.aktiveGrade.filter(g=>gradVorhanden(k,g)&&g<=maxGrad(ch(),x));
    if(!aktive.length){box.innerHTML='<p class="zauber-leer-55">Bitte oben einen oder mehrere verfügbare Zaubergrade aktivieren.</p>';root.append(box);return}
    const filter=document.createElement("div"); filter.className="zauber-filter-55"; filter.innerHTML=`<input id="zauberSuche55" placeholder="Zauber suchen…" value="${esc(suche)}">`; box.append(filter);
    const listen=document.createElement("div");listen.className="zauber-gradlisten-55";box.append(listen);root.append(box);
    filter.querySelector('input').oninput=e=>{suche=e.target.value;renderGradInhalte(listen,k,x)}; renderGradInhalte(listen,k,x);
  }

  function renderGradInhalte(container,k,x){
    const q=suche.trim().toLocaleLowerCase('de'); container.innerHTML='';
    for(const g of x.aktiveGrade.filter(g=>gradVorhanden(k,g)&&g<=maxGrad(ch(),x))){
      const all=(daten?.zauber||[]).filter(z=>Object.prototype.hasOwnProperty.call(z.klassen||{},k.name)&&Number(z.klassen[k.name])===g).sort((a,b)=>a.name.localeCompare(b.name,'de'));
      const known=ids(x,g), prepared=prep(x,g), only=!!x.nurGelernt[g];
      let list=all.filter(z=>!q||z.name.toLocaleLowerCase('de').includes(q)).filter(z=>!only||(x.art==="spontan"?known.includes(z.id):Number(prepared[z.id]||0)>0));
      const max=slotMax(x,g), used=x.art==="vorbereitet"?prepAnzahl(x,g):0, frei=x.art==="vorbereitet"?Math.max(0,max-used):max;
      const details=document.createElement('details'); details.className='zauber-gradgruppe-55';
      details.innerHTML=`<summary><span>Grad ${g}</span><span class="zauber-gradstatus-55"><label onclick="event.stopPropagation()">pro Tag <input data-slot="${g}" type="number" min="0" max="99" value="${max}"></label><strong>${frei} frei / verfügbar</strong><label onclick="event.stopPropagation()"><input data-only="${g}" type="checkbox" ${only?"checked":""}> ${x.art==="spontan"?"nur gelernte":"nur vorbereitete"}</label><span>${list.length} Zauber</span></span></summary><div class="zauber-liste-55">${list.length?list.map(z=>zauberHtml(z,k,x,g)).join(''):'<p class="zauber-leer-55">Keine passenden Zauber gefunden.</p>'}</div>`;
      container.append(details);
      details.querySelector('[data-slot]').onchange=e=>{x.slots[g]=Math.max(0,Math.trunc(Number(e.target.value)||0));save();renderGradInhalte(container,k,x)};
      details.querySelector('[data-only]').onchange=e=>{x.nurGelernt[g]=e.target.checked;save();renderGradInhalte(container,k,x)};
      details.querySelectorAll('[data-lern]').forEach(el=>el.onchange=()=>{let a=ids(x,g).slice();a=el.checked?[...new Set([...a,el.dataset.lern])]:a.filter(id=>id!==el.dataset.lern);x.gelernt[g]=a;save();renderGradInhalte(container,k,x)});
      details.querySelectorAll('[data-prepcheck]').forEach(el=>el.onchange=()=>{const o={...prep(x,g)},id=el.dataset.prepcheck;if(el.checked){if(slotMax(x,g)>prepAnzahl(x,g))o[id]=Math.max(1,Number(o[id]||0));else el.checked=false}else delete o[id];x.vorbereitet[g]=o;save();renderGradInhalte(container,k,x)});
      details.querySelectorAll('[data-plus]').forEach(el=>el.onclick=()=>{if(prepAnzahl(x,g)>=slotMax(x,g))return;const o={...prep(x,g)},id=el.dataset.plus;o[id]=Number(o[id]||0)+1;x.vorbereitet[g]=o;save();renderGradInhalte(container,k,x)});
      details.querySelectorAll('[data-minus]').forEach(el=>el.onclick=()=>{const o={...prep(x,g)},id=el.dataset.minus,n=Math.max(0,Number(o[id]||0)-1);if(n)o[id]=n;else delete o[id];x.vorbereitet[g]=o;save();renderGradInhalte(container,k,x)});
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
