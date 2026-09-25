// Commit 55.5: Zauberseite – kompakte Zauberinfos, Quellenkürzel, Dauer und RW-SG
(() => {
  "use strict";
  const page=document.getElementById("zauber"), btn=document.getElementById("btnZauber"), root=document.getElementById("zauberInhalt55");
  if(!page||!btn||!root) return;

  const EINHEIT_KEY="pf-reichweiten-einheit";
  const BENUTZER_KEY="pf-benutzer-zauber";
  const ADMIN_AENDERUNGEN_KEY="pf-admin-zauber-aenderungen";
  const ADMIN_NEU_KEY="pf-admin-zauber-neu";
  const ZAUBERKLASSEN=new Set(["Alchemist","Antipaladin","Arkanist","Barde","Blutwüter","Druide","Ermittler","Hexe","Hexenmeister","Inquisitor","Jäger","Kampfmagus","Kleriker","Kriegspriester","Magier","Mystiker","Paladin","Paktmagier","Schamane","Skalde","Waldläufer"]);
  const STANDARD={Alchemist:["IN","vorbereitet"],Antipaladin:["CH","vorbereitet"],Arkanist:["IN","vorbereitet"],Barde:["CH","spontan"],Blutwüter:["CH","spontan"],Druide:["WE","vorbereitet"],Ermittler:["IN","vorbereitet"],Hexe:["IN","vorbereitet"],Hexenmeister:["CH","spontan"],Inquisitor:["WE","spontan"],Jäger:["WE","spontan"],Kampfmagus:["IN","vorbereitet"],Kleriker:["WE","vorbereitet"],Kriegspriester:["WE","vorbereitet"],Magier:["IN","vorbereitet"],Mystiker:["CH","spontan"],Paladin:["CH","vorbereitet"],Paktmagier:["CH","spontan"],Schamane:["WE","vorbereitet"],Skalde:["CH","spontan"],Waldläufer:["WE","vorbereitet"]};

  let basisDaten=null,daten={zauber:[]},klasseAktiv="",suche="",offeneGrade=new Set(),editorId=null,editorStandard=false;
  const esc=s=>String(s??"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const ch=()=>typeof aktiverCharakter==="function"?aktiverCharakter():null;
  const readJson=(key,standard)=>{try{const v=JSON.parse(localStorage.getItem(key)||"null");return v??standard}catch{return standard}};
  const writeJson=(key,v)=>localStorage.setItem(key,JSON.stringify(v));
  function adminAktiv(){return typeof istAdminEntsperrt==="function"?!!istAdminEntsperrt():false}
  function zauberKlassen(c){return (c?.klassen||[]).filter(k=>ZAUBERKLASSEN.has(k.name));}
  function config(c,name){
    c.zauberklassen=c.zauberklassen&&typeof c.zauberklassen==="object"?c.zauberklassen:{};
    const d=STANDARD[name]||["IN","vorbereitet"], klassenstufe=Number((c.klassen||[]).find(k=>k.name===name)?.stufe||0);
    const cfg=c.zauberklassen[name]||(c.zauberklassen[name]={
      attribut:d[0],art:d[1],zs:klassenstufe,zsAuto:true,letzteKlassenstufe:klassenstufe,
      konzBonus:0,zrBonus:0,sgBonus:0,aktiveGrade:[],slots:{},gelernt:{},vorbereitet:{},nurGelernt:{},verbraucht:{}
    });
    cfg.slots=cfg.slots&&typeof cfg.slots==="object"?cfg.slots:{};
    cfg.gelernt=cfg.gelernt&&typeof cfg.gelernt==="object"?cfg.gelernt:{};
    cfg.vorbereitet=cfg.vorbereitet&&typeof cfg.vorbereitet==="object"?cfg.vorbereitet:{};
    cfg.nurGelernt=cfg.nurGelernt&&typeof cfg.nurGelernt==="object"?cfg.nurGelernt:{};
    cfg.verbraucht=cfg.verbraucht&&typeof cfg.verbraucht==="object"?cfg.verbraucht:{};
    if(!Array.isArray(cfg.aktiveGrade)) cfg.aktiveGrade=[];
    cfg.aktiveGrade=[...new Set(cfg.aktiveGrade.map(Number).filter(g=>Number.isInteger(g)&&g>=0&&g<=9))].sort((a,b)=>a-b);
    if(typeof cfg.zsAuto!=="boolean") cfg.zsAuto=Number(cfg.zs||0)===Number(cfg.letzteKlassenstufe??klassenstufe);
    const vorher=Number(cfg.letzteKlassenstufe??klassenstufe);
    if(cfg.zsAuto || Number(cfg.zs||0)===vorher) cfg.zs=klassenstufe;
    cfg.letzteKlassenstufe=klassenstufe;
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
  function verbraucht(x,g){return Math.max(0,Math.min(slotMax(x,g),Math.trunc(Number(x.verbraucht[g])||0)))}
  function fmt(n){return n>0?`+${n}`:String(n)}
  function einheit(){return localStorage.getItem(EINHEIT_KEY)||"m"}
  function runde(n){n=Math.round(n*100)/100;return Number.isInteger(n)?String(n):String(n).replace(".",",")}
  function reichweiteMeter(text,zs){let t=String(text||"").replace(/,/g,".");if(!t)return null;if(/berührung|du|persönlich|unbegrenzt/i.test(t))return null;let m=t.match(/(\d+(?:\.\d+)?)m(?:\+(\d+(?:\.\d+)?)m\/(\d*)St)?/i);if(!m)return null;let wert=Number(m[1]);if(m[2])wert+=Number(m[2])*Math.floor(zs/Math.max(1,Number(m[3]||1)));return wert;}
  function reichweiteText(text,zs){const m=reichweiteMeter(text,zs);if(m===null)return text||"–";const e=einheit();if(e==="ft")return `${runde(m/0.3)} ft`;if(e==="feld")return `${runde(m/1.5)} Felder`;return `${runde(m)} m`;}
  function normZauber(z){const klassen=z?.klassen&&typeof z.klassen==="object"?z.klassen:{};return {...z,id:String(z.id||("u"+Date.now().toString(36)+Math.random().toString(36).slice(2,7))),name:String(z.name||"").trim(),schule:String(z.schule||""),beschreibung:String(z.beschreibung||""),zeitaufwand:String(z.zeitaufwand||""),komponenten:String(z.komponenten||""),reichweite:String(z.reichweite||""),wirkungsbereich:String(z.wirkungsbereich||""),ziel:String(z.ziel||""),dauer:String(z.dauer||""),rettungswurf:String(z.rettungswurf||""),regelwerk:String(z.regelwerk||""),seite:z.seite===""||z.seite==null?"":Number(z.seite),klassen};}
  function kombiniereDaten(){
    const basis=(basisDaten?.zauber||[]).map(normZauber), aender=readJson(ADMIN_AENDERUNGEN_KEY,{}), benutzer=readJson(BENUTZER_KEY,[]), adminNeu=readJson(ADMIN_NEU_KEY,[]);
    const merged=basis.map(z=>aender[z.id]?normZauber({...z,...aender[z.id],id:z.id}):z);
    daten={zauber:[...merged,...benutzer.map(normZauber),...adminNeu.map(z=>normZauber({...z,standard:true}))]};
  }
  async function load(){if(basisDaten)return;try{const r=await fetch("data/zauber.json?v=55.5");if(!r.ok)throw new Error();basisDaten=await r.json()}catch{basisDaten={zauber:[]}}kombiniereDaten();}
  function gradVorhanden(k,g){return (daten.zauber||[]).some(z=>Object.prototype.hasOwnProperty.call(z.klassen||{},k.name)&&Number(z.klassen[k.name])===Number(g));}
  function touchWert(fern=false){const c=ch(),gab=typeof charakterGAB==="function"?Number(charakterGAB(c)||0):Number(c?.gab||0),a=mod(c,fern?"GE":"ST");return gab+a;}

  function renderKlassen(c,klassen){
    const box=document.createElement("section");box.className="zauber-karte-55";box.innerHTML='<h3>Zauberwirker-Einstellungen</h3><div class="zauber-hinweis-55">Zauberklasse anklicken, um sie unten anzuzeigen. ZS folgt der Klassenstufe automatisch, bis er manuell überschrieben wird.</div>';
    for(const k of klassen){
      const x=config(c,k.name),row=document.createElement("div");row.className="zauber-klassenzeile-55"+(k.name===klasseAktiv?" aktiv":"");
      row.innerHTML=`<button type="button" class="zauber-klassenwahl-55" data-klasse aria-pressed="${k.name===klasseAktiv}">${esc(k.name)} ${Number(k.stufe||0)}</button><label>Attribut <select data-a>${["ST","GE","KO","IN","WE","CH"].map(a=>`<option ${a===x.attribut?"selected":""}>${a}</option>`).join("")}</select></label><label>Art <select data-art><option value="vorbereitet" ${x.art==="vorbereitet"?"selected":""}>vorbereitet</option><option value="spontan" ${x.art==="spontan"?"selected":""}>spontan</option></select></label><label>ZS <input data-zs type="number" min="0" max="99" value="${Number(x.zs||0)}" title="Wird bei Klassenstufenänderung automatisch angepasst, solange er nicht manuell geändert wurde."></label>`;
      row.querySelector('[data-klasse]').onclick=()=>{klasseAktiv=k.name;render()};
      row.querySelector('[data-a]').onchange=e=>{x.attribut=e.target.value;save();render()};
      row.querySelector('[data-art]').onchange=e=>{x.art=e.target.value;save();render()};
      row.querySelector('[data-zs]').onchange=e=>{x.zs=Math.max(0,Number(e.target.value)||0);x.zsAuto=x.zs===Number(k.stufe||0);x.letzteKlassenstufe=Number(k.stufe||0);save();render()};
      box.append(row);
    }root.append(box);
  }

  function renderWerte(c,k,x){
    const am=mod(c,x.attribut),aw=attrWert(c,x.attribut),konz=Number(x.zs||0)+am+Number(x.konzBonus||0),zr=Number(x.zs||0)+Number(x.zrBonus||0),mg=maxGrad(c,x),nah=touchWert(false),fern=touchWert(true);
    x.aktiveGrade=x.aktiveGrade.filter(g=>g<=mg);
    const box=document.createElement("section");box.className="zauber-karte-55";
    box.innerHTML=`<div class="zauber-kopf-55"><h3>${esc(k.name)} ${Number(k.stufe||0)} · ZS ${Number(x.zs||0)} · ${x.attribut} ${aw} (${fmt(am)})</h3><label>Reichweite <select id="zauberEinheit55"><option value="m">Meter</option><option value="feld">Felder</option><option value="ft">Feet</option></select></label></div><div class="zauber-werte-55"><div class="zauber-wert-55">Konzentration<strong>W20 ${fmt(konz)}</strong><small>ZS ${fmt(Number(x.zs||0))} + ${x.attribut}-Mod ${fmt(am)}</small></div><div class="zauber-wert-55">ZR überwinden<strong>W20 ${fmt(zr)}</strong><small>Zauberstufe ${fmt(Number(x.zs||0))}</small></div><div class="zauber-wert-55">Berührung Nah<strong>W20 ${fmt(nah)}</strong><small>GAB + ST-Mod</small></div><div class="zauber-wert-55">Berührung Fern<strong>W20 ${fmt(fern)}</strong><small>GAB + GE-Mod</small></div></div><div class="zauber-sg-grid-55">${Array.from({length:10},(_,g)=>{const aktiv=x.aktiveGrade.includes(g),vorhanden=gradVorhanden(k,g),attributOk=g<=mg;return `<button type="button" class="zauber-sg-55${aktiv?" aktiv":""}" data-grad="${g}" ${vorhanden&&attributOk?"":"disabled"} aria-pressed="${aktiv}" title="${!vorhanden?"Für diese Klasse sind in der Datenbank keine Zauber dieses Grades vorhanden":!attributOk?`${x.attribut} ${aw}: Für Grad ${g} wird mindestens ${10+g} benötigt`:"Grad für diesen Charakter ein-/ausblenden"}">Grad ${g}<br><strong>SG ${10+g+am+Number(x.sgBonus||0)}</strong></button>`}).join("")}</div>`;
    root.append(box);const sel=box.querySelector('#zauberEinheit55');sel.value=einheit();sel.onchange=()=>{localStorage.setItem(EINHEIT_KEY,sel.value);render()};
    box.querySelectorAll('[data-grad]').forEach(b=>b.onclick=()=>{const g=Number(b.dataset.grad);if(g>mg)return;x.aktiveGrade=x.aktiveGrade.includes(g)?x.aktiveGrade.filter(v=>v!==g):[...x.aktiveGrade,g].sort((a,b)=>a-b);save();render()});
  }

  const QUELLEN_KUERZEL={"Grundregelwerk":"GRW","Expertenregeln":"EXP","Ausbauregeln: Magie":"ABR","Ausbauregeln II: Kampf":"ABR II"};
  function quellenText(z){if(!z.regelwerk||!z.seite)return "";return `${QUELLEN_KUERZEL[z.regelwerk]||z.regelwerk} S. ${z.seite}`}
  function dauerRunden(text,zs){
    const t=String(text||"").replace(/\s+/g,"").replace(/Min/g,"min"); if(!t)return null; let m;
    if((m=t.match(/^(\d*)Rd\/St$/i)))return (Number(m[1]||1)*zs);
    if((m=t.match(/^(\d*)Rd\/(\d+)St$/i)))return Number(m[1]||1)*Math.floor(zs/Number(m[2]));
    if((m=t.match(/^(\d*)min\/St$/i)))return Number(m[1]||1)*10*zs;
    if((m=t.match(/^(\d*)h\/St$/i)))return Number(m[1]||1)*600*zs;
    if((m=t.match(/^(\d*)Tag\/St$/i)))return Number(m[1]||1)*14400*zs;
    if((m=t.match(/^(\d+)Rd$/i)))return Number(m[1]);
    if((m=t.match(/^(\d+)min$/i)))return Number(m[1])*10;
    if((m=t.match(/^(\d+)h$/i)))return Number(m[1])*600;
    if((m=t.match(/^(\d+)Rd\+(\d*)Rd\/St$/i)))return Number(m[1])+Number(m[2]||1)*zs;
    return null;
  }
  function dauerText(text,zs){const r=dauerRunden(text,zs);return r===null?String(text||""):`${text} (${r} Runde${r===1?"":"n"})`}
  function rwText(text,sg){const t=String(text||"").trim();if(!t)return "";const hatRw=!/^-$/.test(t)&&!/^kein/i.test(t);return hatRw?`${t} (SG ${sg})`:t}
  function zauberHtml(z,k,x,g){
    const sg=10+g+mod(ch(),x.attribut)+Number(x.sgBonus||0),source=quellenText(z),spontan=x.art==="spontan",gelernt=ids(x,g).includes(z.id),p=Number(prep(x,g)[z.id]||0),max=slotMax(x,g),used=prepAnzahl(x,g);
    const control=spontan?`<label class="zauber-lerncheck-55"><input type="checkbox" data-lern="${esc(z.id)}" ${gelernt?"checked":""}> gelernt / verfügbar</label>`:`<div class="zauber-prep-55"><label><input type="checkbox" data-prepcheck="${esc(z.id)}" ${p>0?"checked":""}> vorbereitet</label><button type="button" data-minus="${esc(z.id)}" ${p<=0?"disabled":""}>−</button><strong>${p}×</strong><button type="button" data-plus="${esc(z.id)}" ${max<=0||used>=max?"disabled":""}>+</button></div>`;
    const editierbar=!z.standard||adminAktiv();
    return `<article class="zauber-eintrag-55" data-zauber-id="${esc(z.id)}"><div class="zauber-eintrag-kopf-55"><h4>${esc(z.name)}</h4><div class="zauber-eintrag-aktionen-554"><strong>SG ${sg}</strong>${editierbar?`<button type="button" data-edit="${esc(z.id)}" title="Zauber bearbeiten" aria-label="Zauber bearbeiten">✏️</button>`:""}</div></div>${control}<div class="zauber-meta-55">${source?`Quelle: ${esc(source)} · `:''}ZR-Wurf W20 ${fmt(Number(x.zs||0)+Number(x.zrBonus||0))}</div><div class="zauber-meta-55">Reichweite: <span class="zauber-reichweite-55">${esc(reichweiteText(z.reichweite,x.zs))}</span>${z.dauer?` · Dauer: ${esc(dauerText(z.dauer,Number(x.zs||0)))}`:''}${z.rettungswurf?` · RW: ${esc(rwText(z.rettungswurf,sg))}`:''}</div>${z.beschreibung?`<div class="zauber-beschreibung-55">${esc(z.beschreibung)}</div>`:''}</article>`;
  }

  function renderGradListen(k,x){
    const box=document.createElement("section");box.className="zauber-karte-55";const aktive=x.aktiveGrade.filter(g=>gradVorhanden(k,g)&&g<=maxGrad(ch(),x));
    const filter=document.createElement("div");filter.className="zauber-filter-55 zauber-filter-mit-loeschen-554";filter.innerHTML=`<input id="zauberSuche55" placeholder="Zauber suchen…" value="${esc(suche)}"><button type="button" id="btnZauberSucheLeeren554" aria-label="Zaubersuche leeren" title="Suche leeren">×</button><button type="button" id="btnNeuerZauber554">+ Zauber</button>`;box.append(filter);
    const listen=document.createElement("div");listen.className="zauber-gradlisten-55";box.append(listen);root.append(box);
    const sucheEl=filter.querySelector('#zauberSuche55'),clear=filter.querySelector('#btnZauberSucheLeeren554');
    const updateClear=()=>clear.classList.toggle('sichtbar',!!sucheEl.value);
    sucheEl.oninput=e=>{suche=e.target.value;updateClear();renderGradInhalte(listen,k,x)};clear.onclick=()=>{suche="";sucheEl.value="";updateClear();renderGradInhalte(listen,k,x);sucheEl.focus()};updateClear();
    filter.querySelector('#btnNeuerZauber554').onclick=()=>oeffneZauberEditor(null,k,x,false);
    if(!aktive.length){listen.innerHTML='<p class="zauber-leer-55">Bitte oben einen oder mehrere verfügbare Zaubergrade aktivieren.</p>';return}renderGradInhalte(listen,k,x);
  }

  function renderSlotsSpontan(summary,x,g){
    const max=slotMax(x,g),used=verbraucht(x,g),box=document.createElement('span');box.className='zauber-slotkaestchen-554';
    for(let i=0;i<max;i++){const b=document.createElement('button');b.type='button';b.className='zauber-slot-554'+(i<used?' verbraucht':'');b.dataset.slotUse=String(i);b.title=i<used?'Slot verbraucht – anklicken zum Wiederherstellen':'Freier Slot – anklicken zum Verbrauchen';b.setAttribute('aria-label',b.title);b.textContent=i<used?'✓':'□';box.append(b)}summary.append(box);
    box.querySelectorAll('[data-slot-use]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();const i=Number(b.dataset.slotUse);x.verbraucht[g]=i<used?i:i+1;save();render()});
  }

  function renderGradInhalte(container,k,x){
    const q=suche.trim().toLocaleLowerCase('de');container.innerHTML='';
    for(const g of x.aktiveGrade.filter(g=>gradVorhanden(k,g)&&g<=maxGrad(ch(),x))){
      const all=(daten.zauber||[]).filter(z=>Object.prototype.hasOwnProperty.call(z.klassen||{},k.name)&&Number(z.klassen[k.name])===g).sort((a,b)=>a.name.localeCompare(b.name,'de')),known=ids(x,g),prepared=prep(x,g),only=!!x.nurGelernt[g];
      let list=all.filter(z=>!q||z.name.toLocaleLowerCase('de').includes(q)).filter(z=>!only||(x.art==="spontan"?known.includes(z.id):Number(prepared[z.id]||0)>0));
      const max=slotMax(x,g),used=x.art==="vorbereitet"?prepAnzahl(x,g):verbraucht(x,g),frei=Math.max(0,max-used),details=document.createElement('details');details.className='zauber-gradgruppe-55';details.open=offeneGrade.has(g);
      details.innerHTML=`<summary><span>Grad ${g}</span><span class="zauber-gradstatus-55"><label onclick="event.stopPropagation()">pro Tag <input data-slot="${g}" type="number" min="0" max="99" value="${max}"></label><strong>${frei} frei / verfügbar</strong><label onclick="event.stopPropagation()"><input data-only="${g}" type="checkbox" ${only?"checked":""}> ${x.art==="spontan"?"nur gelernte":"nur vorbereitete"}</label><span>${list.length} Zauber</span></span></summary><div class="zauber-liste-55">${list.length?list.map(z=>zauberHtml(z,k,x,g)).join(''):'<p class="zauber-leer-55">Keine passenden Zauber gefunden.</p>'}</div>`;
      container.append(details);details.addEventListener('toggle',()=>{if(details.open)offeneGrade.add(g);else offeneGrade.delete(g)});
      if(x.art==="spontan")renderSlotsSpontan(details.querySelector('summary .zauber-gradstatus-55'),x,g);
      details.querySelector('[data-slot]').onchange=e=>{x.slots[g]=Math.max(0,Math.trunc(Number(e.target.value)||0));x.verbraucht[g]=Math.min(verbraucht(x,g),x.slots[g]);offeneGrade.add(g);save();renderGradInhalte(container,k,x)};
      details.querySelector('[data-only]').onchange=e=>{x.nurGelernt[g]=e.target.checked;offeneGrade.add(g);save();renderGradInhalte(container,k,x)};
      details.querySelectorAll('[data-lern]').forEach(el=>el.onchange=()=>{let a=ids(x,g).slice();a=el.checked?[...new Set([...a,el.dataset.lern])]:a.filter(id=>id!==el.dataset.lern);x.gelernt[g]=a;offeneGrade.add(g);save();renderGradInhalte(container,k,x)});
      details.querySelectorAll('[data-prepcheck]').forEach(el=>el.onchange=()=>{const o={...prep(x,g)},id=el.dataset.prepcheck;if(el.checked){if(slotMax(x,g)>prepAnzahl(x,g))o[id]=Math.max(1,Number(o[id]||0));else el.checked=false}else delete o[id];x.vorbereitet[g]=o;offeneGrade.add(g);save();renderGradInhalte(container,k,x)});
      details.querySelectorAll('[data-plus]').forEach(el=>el.onclick=()=>{if(prepAnzahl(x,g)>=slotMax(x,g))return;const o={...prep(x,g)},id=el.dataset.plus;o[id]=Number(o[id]||0)+1;x.vorbereitet[g]=o;offeneGrade.add(g);save();renderGradInhalte(container,k,x)});
      details.querySelectorAll('[data-minus]').forEach(el=>el.onclick=()=>{const o={...prep(x,g)},id=el.dataset.minus,n=Math.max(0,Number(o[id]||0)-1);if(n)o[id]=n;else delete o[id];x.vorbereitet[g]=o;offeneGrade.add(g);save();renderGradInhalte(container,k,x)});
      details.querySelectorAll('[data-edit]').forEach(el=>el.onclick=()=>{const z=daten.zauber.find(v=>String(v.id)===String(el.dataset.edit));if(z)oeffneZauberEditor(z,k,x,!!z.standard)});
    }
  }

  function stelleEditorBereit(){
    if(document.getElementById('zauberDialog554'))return;const d=document.createElement('dialog');d.id='zauberDialog554';d.className='zauber-dialog-554';d.innerHTML=`<form method="dialog" id="zauberForm554"><h3 id="zauberDialogTitel554">Zauber</h3><div class="zauber-editor-grid-554"><label>Name<input id="zauberName554" required></label><label>Schule<input id="zauberSchule554"></label><label>Regelwerk<input id="zauberRegelwerk554"></label><label>Seite<input id="zauberSeite554" type="number" min="1"></label><label>Zeitaufwand<input id="zauberZeit554"></label><label>Komponenten<input id="zauberKomponenten554"></label><label>Reichweite<input id="zauberReichweite554"></label><label>Ziel<input id="zauberZiel554"></label><label>Dauer<input id="zauberDauer554"></label><label>Rettungswurf<input id="zauberRw554"></label></div><fieldset><legend>Klassen / Grad</legend><div id="zauberKlassenEditor554" class="zauber-editor-klassen-554"></div></fieldset><label>Beschreibung<textarea id="zauberBeschreibung554" rows="5"></textarea></label><div class="dialog-aktionen"><button type="submit" id="btnZauberSpeichern554">Speichern</button><button type="button" id="btnZauberAbbrechen554">Abbrechen</button></div></form>`;document.body.append(d);d.querySelector('#btnZauberAbbrechen554').onclick=()=>d.close();d.querySelector('#zauberForm554').onsubmit=e=>{e.preventDefault();speichereZauberEditor()};
  }
  function oeffneZauberEditor(z,k,x,standard){
    stelleEditorBereit();const d=document.getElementById('zauberDialog554');editorId=z?.id||null;editorStandard=!!standard;document.getElementById('zauberDialogTitel554').textContent=z?'Zauber bearbeiten':'Neuen Zauber anlegen';
    const set=(id,v)=>document.getElementById(id).value=v??'';set('zauberName554',z?.name);set('zauberSchule554',z?.schule);set('zauberRegelwerk554',z?.regelwerk);set('zauberSeite554',z?.seite);set('zauberZeit554',z?.zeitaufwand);set('zauberKomponenten554',z?.komponenten);set('zauberReichweite554',z?.reichweite);set('zauberZiel554',z?.ziel);set('zauberDauer554',z?.dauer);set('zauberRw554',z?.rettungswurf);set('zauberBeschreibung554',z?.beschreibung);
    const ce=document.getElementById('zauberKlassenEditor554');ce.innerHTML='';[...ZAUBERKLASSEN].sort((a,b)=>a.localeCompare(b,'de')).forEach(name=>{const val=z?.klassen?.[name],row=document.createElement('label');row.innerHTML=`<span>${esc(name)}</span><input type="number" min="0" max="9" data-editor-klasse="${esc(name)}" placeholder="–" value="${val===undefined?'':Number(val)}">`;ce.append(row)});d.showModal();
  }
  function editorDaten(){const klassen={};document.querySelectorAll('[data-editor-klasse]').forEach(i=>{if(i.value!=="")klassen[i.dataset.editorKlasse]=Math.max(0,Math.min(9,Number(i.value)||0))});return normZauber({id:editorId||undefined,name:document.getElementById('zauberName554').value,schule:document.getElementById('zauberSchule554').value,regelwerk:document.getElementById('zauberRegelwerk554').value,seite:document.getElementById('zauberSeite554').value,zeitaufwand:document.getElementById('zauberZeit554').value,komponenten:document.getElementById('zauberKomponenten554').value,reichweite:document.getElementById('zauberReichweite554').value,ziel:document.getElementById('zauberZiel554').value,dauer:document.getElementById('zauberDauer554').value,rettungswurf:document.getElementById('zauberRw554').value,beschreibung:document.getElementById('zauberBeschreibung554').value,klassen});}
  function speichereZauberEditor(){const z=editorDaten();if(!z.name){document.getElementById('zauberName554').focus();return}if(editorId){const basis=(basisDaten?.zauber||[]).some(v=>String(v.id)===String(editorId));if(basis){if(!adminAktiv()){alert('Standardzauber können nur im entsperrten Admin-Modus geändert werden.');return}const o=readJson(ADMIN_AENDERUNGEN_KEY,{});o[editorId]=z;writeJson(ADMIN_AENDERUNGEN_KEY,o)}else{for(const key of [BENUTZER_KEY,ADMIN_NEU_KEY]){const a=readJson(key,[]),idx=a.findIndex(v=>String(v.id)===String(editorId));if(idx>=0){a[idx]=z;writeJson(key,a);break}}}}else{const key=adminAktiv()?ADMIN_NEU_KEY:BENUTZER_KEY,a=readJson(key,[]);a.push(z);writeJson(key,a)}kombiniereDaten();document.getElementById('zauberDialog554').close();render();}

  async function render(){await load();root.innerHTML='';const c=ch();if(!c){root.innerHTML='<section class="zauber-karte-55 zauber-leer-55">Kein aktiver Charakter.</section>';return}const klassen=zauberKlassen(c);if(!klassen.length){root.innerHTML='<section class="zauber-karte-55 zauber-leer-55">Der aktive Charakter besitzt aktuell keine unterstützte Zauberklasse.</section>';return}if(!klassen.some(k=>k.name===klasseAktiv))klasseAktiv=klassen[0].name;renderKlassen(c,klassen);const k=klassen.find(k=>k.name===klasseAktiv),x=config(c,k.name);renderWerte(c,k,x);renderGradListen(k,x);save();}

  const oldShow=zeigeSeite;zeigeSeite=function(name){oldShow(name);if(name==='zauber')render()};btn.onclick=()=>zeigeSeite('zauber');
  if(typeof waehleCharakter==='function'){const old=waehleCharakter;waehleCharakter=function(id){const r=old(id);if(r&&page.style.display!=='none')render();return r}}
  if(typeof setzeCharakterKlassen==='function'){const oldSet=setzeCharakterKlassen;setzeCharakterKlassen=function(id,klassen){const r=oldSet(id,klassen);if(r&&id===aktiverCharakterId&&page.style.display!=='none')render();return r}}
  window.pfZauber55={render};
})();
