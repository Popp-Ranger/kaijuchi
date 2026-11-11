/* ---------- planche de validation ---------- */
const VB={bebe:'-185 -258 360 290',ado:'-240 -332 440 360',adulte:'-290 -398 520 420',titan:'-335 -440 590 475'};
const MOODN={content:'Content',faim:'Affamé',triste:'Triste',fatigue:'Fatigué',colere:'En colère',dodo:'Endormi',miam:'Régal'};
const POSEN={debout:'Debout',mange:'Mange',frappe:'Frappe'};
let cellN=0;
function cell(d,k,o,label,cb){const u='x'+(cellN++);return `<figure class="cell"><div class="frame" style="--cb:${cb||ST[k].cb}"><svg viewBox="${VB[k]}">${mon(d,k,u,true,o)}</svg></div><figcaption>${label}</figcaption></figure>`}
function planche(d,old){let h=`<h2>Avant / après <small>le même monstre au stade adulte</small></h2><div class="grid g2">${cell(old,'adulte',{},'Avant')}${cell(d,'adulte',{},'Après')}</div>`;
 h+=`<h2>Les stades</h2><div class="grid g4">${['bebe','ado','adulte','titan'].map(k=>cell(d,k,{},ST[k].n)).join('')}</div>`;
 h+=`<h2>Les expressions <small>choisies par le jeu d'après les jauges</small></h2><div class="grid g4">${Object.keys(MOODN).map(m=>cell(d,'adulte',{mood:m},MOODN[m],d.cb)).join('')}</div>`;
 h+=`<h2>Les expressions du bébé</h2><div class="grid g4">${Object.keys(MOODN).map(m=>cell(d,'bebe',{mood:m},MOODN[m])).join('')}</div>`;
 h+=`<h2>Les poses</h2><div class="grid g3">${Object.keys(POSEN).map(q=>cell(d,'adulte',{pose:q,mood:q=='frappe'?'colere':q=='mange'?'miam':'content'},POSEN[q],d.cb)).join('')}</div>`;
 return h}
document.getElementById('planche').innerHTML=planche(D[0],GRONDO_V1);
