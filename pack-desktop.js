// Desktop convenience controls; no changes to auth or messaging behavior.
(()=>{const get=id=>document.getElementById(id),desktop=()=>matchMedia('(min-width:721px)').matches;
document.querySelectorAll('[data-desktop-action]').forEach(el=>el.addEventListener('click',()=>get(el.dataset.desktopAction)?.click()));
document.addEventListener('keydown',e=>{if(!desktop()||!e.altKey||!e.shiftKey||e.ctrlKey||e.metaKey||e.repeat||document.querySelector('dialog[open]')||!get('packBoot')?.hidden)return;const key=e.key.toLowerCase();let el;if(key==='f')el=get('search')||get('groupSearch');if(key==='m')el=get('message')||get('groupText');if(el&&el.getClientRects().length){e.preventDefault();el.focus();if(key==='f')el.select()}});
const gs=document.querySelector('.desktopGroupSettings');if(gs){const m=matchMedia('(min-width:721px)');const apply=()=>{gs.open=!m.matches};apply();m.addEventListener?.('change',apply)}
})();