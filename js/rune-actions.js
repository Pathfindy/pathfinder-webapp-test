(()=>{
'use strict';
const ICONS={del:'assets/runes/delete.png',up:'assets/runes/up.png',down:'assets/runes/down.png'};
function classify(button){if(button.classList.contains('rune-nav')||button.classList.contains('rune-action-icon'))return null;
 const raw=(button.textContent||'').trim(), title=(button.getAttribute('title')||'').toLowerCase(), label=(button.getAttribute('aria-label')||'').toLowerCase();
 const data=button.hasAttribute('data-del')?'del':button.hasAttribute('data-up')?'up':button.hasAttribute('data-down')?'down':null;
 if(data)return data;
 if(/🗑|🗑️/.test(raw)||/^(löschen|loeschen|entfernen)$/i.test(raw)||/^(löschen|loeschen|entfernen)$/.test(title))return 'del';
 if(/^[↑▲⬆]$/.test(raw))return 'up'; if(/^[↓▼⬇]$/.test(raw))return 'down';
 return null; }
function enhance(scope){const buttons=[];if(scope.nodeType===1&&scope.matches('button'))buttons.push(scope);if(scope.querySelectorAll)buttons.push(...scope.querySelectorAll('button'));
 for(const b of buttons){const type=classify(b);if(!type)continue;const original=b.textContent.trim();b.classList.add('rune-action-icon');if(!b.hasAttribute('aria-label'))b.setAttribute('aria-label',type==='del'?'Löschen':type==='up'?'Nach oben':'Nach unten');if(!b.hasAttribute('title'))b.title=b.getAttribute('aria-label');b.replaceChildren(Object.assign(document.createElement('img'),{src:ICONS[type],alt:'',ariaHidden:'true'}));}
}
let pending=false;const refresh=()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;enhance(document.body)})};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{enhance(document.body);new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true,characterData:true})});else{enhance(document.body);new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true,characterData:true})}
})();
