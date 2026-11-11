/* ---------- lot 8 : album et succès ---------- */
// aides communes aux lots 8 à 12
function addCss(t){const s=document.createElement('style');s.textContent=t;document.head.appendChild(s)}
const realDay=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/DAYMS); // numéro du jour civil (indépendant de DEBUG_SPEED)
// valeurs par défaut des données ajoutées à S après la v1 : chaque lot y inscrit les siennes (appliquées au chargement et au démarrage)
const EXTRA=[];
{const ld=load,sh=show;
 load=function(){const s=ld();if(s)EXTRA.forEach(fn=>fn(s));return s};
 show=function(){if(S)EXTRA.forEach(fn=>fn(S));sh()}}

/* l'album est indépendant de la partie : clé propre, jamais effacée par « Nouvelle partie » */
const AKEY='kaijuchi-album',FORMS=['commune','noble','sauvage','glouton'],FNAME={commune:'Commune',noble:'Noble',sauvage:'Sauvage',glouton:'Glouton'};
const alForm=()=>S.form||(ORDER.indexOf(S.stage)>=3&&typeof pickForm=='function'?(S.form=pickForm()):'')||'commune'; // S.form arrive avec le lot 7 ; sans lui, tout monstre est « commune »
let AL=null;
function alDefault(){return {v:1,mons:{},forms:{},prey:{},cities:0,maxLv:0,caught:0,best:{catch:0},days:{last:-1,streak:0,max:0},ach:{},freed:[]}}
function alLoad(){const d=alDefault();try{const a=JSON.parse(localStorage.getItem(AKEY));if(a&&a.v==1){Object.keys(d).forEach(k=>{if(a[k]!=null)d[k]=a[k]});d.best=Object.assign({catch:0},a.best);d.days=Object.assign(d.days,a.days)}}catch(e){}return d}
function alSave(){try{localStorage.setItem(AKEY,JSON.stringify(AL))}catch(e){}}
AL=alLoad();

// série de jours de visite consécutifs
function alDay(){const d=realDay(),D=AL.days;if(D.last==d)return false;D.streak=D.last==d-1?D.streak+1:1;D.last=d;D.max=Math.max(D.max,D.streak);return true}

// tout ce qu'on peut goûter (hors œuf)
const ALPREY=(()=>{const a=[];ORDER.slice(1).forEach(k=>FOODS[k].forEach(m=>{if(!a.some(x=>x[0]==m[0]))a.push([m[0],m[1]])}));return a})();
const alMons=n=>Object.keys(AL.mons).filter(k=>AL.mons[k]>=n).length;
const alFormN=f=>Object.keys(AL.forms).filter(k=>k.split('-')[1]==f).length;
const alTasted=()=>ALPREY.filter(p=>AL.prey[p[0]]).length;
const ACH=[
 ['eclo','Première éclosion','Faire éclore un œuf',()=>alMons(1)>=1],
 ['ado','Ça pousse !','Atteindre le stade ado',()=>alMons(2)>=1],
 ['adulte','Grand monstre','Atteindre l\'âge adulte',()=>alMons(3)>=1],
 ['titan','Premier titan','Faire grandir un monstre jusqu\'au titan',()=>alMons(4)>=1],
 ['trois','Trio de choc','Élever 3 monstres différents jusqu\'à l\'âge adulte',()=>alMons(3)>=3],
 ['cinq','Les cinq monstres','Élever les 5 monstres jusqu\'à l\'âge adulte',()=>alMons(3)>=5],
 ['noble','Un air de noblesse','Découvrir une forme noble',()=>alFormN('noble')>=1],
 ['sauvage','Bête sauvage','Découvrir une forme sauvage',()=>alFormN('sauvage')>=1],
 ['glouton','Sacré glouton','Découvrir une forme glouton',()=>alFormN('glouton')>=1],
 ['toutes','Toutes les formes','Découvrir les 4 formes d\'un même monstre',()=>D.some((d,i)=>FORMS.every(f=>AL.forms[i+'-'+f]))],
 ['dix','Collectionneur','Découvrir 10 formes',()=>Object.keys(AL.forms).length>=10],
 ['ville1','Première ville rasée','Raser une ville entière',()=>AL.cities>=1],
 ['ville5','Démolisseur','Raser 5 villes',()=>AL.cities>=5],
 ['ville10','Fléau des cartes','Raser 10 villes',()=>AL.cities>=10],
 ['capitale','Capitale en vue','Atteindre la ville Capitale',()=>AL.maxLv>=5],
 ['gout10','Fin gourmet','Goûter 10 proies différentes',()=>alTasted()>=10],
 ['goutout','Menu complet','Goûter toutes les proies',()=>alTasted()>=ALPREY.length],
 ['dec25','Bon chasseur','Attraper 25 proies dans le décor',()=>AL.caught>=25],
 ['dec100','Cent proies','Attraper 100 proies dans le décor',()=>AL.caught>=100],
 ['j3','Trois jours de suite','Rendre visite à son monstre 3 jours de suite',()=>AL.days.max>=3],
 ['j7','Sept jours de suite','Rendre visite à son monstre 7 jours de suite',()=>AL.days.max>=7],
 ['catch','Roi de l\'attrape','Marquer 15 points à l\'attrape',()=>AL.best.catch>=15],
 ['libre','Retour à la nature','Relâcher un titan',()=>AL.freed.length>=1]];

/* bandeau de succès (trois secondes) */
let alQ=[],alBusy=false;
const banner=document.createElement('div');banner.id='ach';document.body.appendChild(banner);
function alNext(){if(alBusy||!alQ.length)return;alBusy=true;const a=alQ.shift();
 banner.innerHTML=`<b>Succès !</b> ${a[1]}<small>${a[2]}</small>`;banner.classList.add('show');
 setTimeout(()=>{banner.classList.remove('show');setTimeout(()=>{alBusy=false;alNext()},450)},3000)}
function alCheck(){let n=0;ACH.forEach(a=>{if(!AL.ach[a[0]]&&a[3]()){AL.ach[a[0]]=Date.now();alQ.push(a);n++}});if(n){alSave();alNext()}return n}

/* mise à jour depuis l'état de la partie (appelée à chaque affichage de la jauge) */
function alSync(){if(!AL)return;let ch=alDay();
 if(S){const n=idx(),i=S.mon;
  if(n>=1&&!(AL.mons[i]>=n)){AL.mons[i]=n;ch=true}
  if(n>=3){const k=i+'-'+alForm();if(!AL.forms[k]){AL.forms[k]=Date.now();ch=true}}
  if(S.city.niveau>AL.maxLv){AL.maxLv=S.city.niveau;ch=true}
  if(S.best&&S.best.catch>AL.best.catch){AL.best.catch=S.best.catch;ch=true}}
 if(ch)alSave();alCheck()}

/* événements */
{const fl=fly,em=eatMover,cc=cityCleared,h=hud;
 fly=function(n,sx,sy){if(S&&ALPREY.some(p=>p[0]==n)){AL.prey[n]=(AL.prey[n]||0)+1;alSave();alCheck()}return fl(n,sx,sy)};
 eatMover=function(o){AL.caught++;alSave();alCheck();return em(o)};
 cityCleared=function(){AL.cities++;alSave();const r=cc();alCheck();return r};
 hud=function(){h();alSync();const b=$('b-new'),t=S&&S.stage=='titan'?'Relâcher dans la nature':'Nouvelle partie';if(b.textContent!=t)b.textContent=t}}
// « Nouvelle partie » sur un titan : le monstre est relâché et rejoint l'album avec sa date
$('app').addEventListener('click',e=>{if(!e.target.closest('#b-new')||!S||S.stage!='titan')return;e.stopPropagation();
 if(!confirm('Relâcher ce titan dans la nature ? Il restera dans ton album, et tu pourras choisir un nouvel œuf.'))return;
 AL.freed.push({mon:S.mon,name:CUR.name,form:alForm(),date:Date.now()});alSave();alCheck();
 try{localStorage.removeItem(KEY)}catch(x){}S=null;show()},true);

/* écran Album */
addCss(`#ach{position:fixed;top:12px;left:50%;transform:translate(-50%,-160%);transition:transform .4s;z-index:60;background:#ffe14d;border:4px solid var(--ink);border-radius:22px;padding:6px 18px;box-shadow:0 5px 0 var(--ink);font-weight:800;font-size:18px;text-align:center;pointer-events:none;max-width:92vw}
#ach.show{transform:translate(-50%,0)}#ach small{display:block;font-size:13px;opacity:.75}
.app.home .top #b-album,.app.home .top #b-son{display:inline-block}
#album{display:none}.app.alb #album{display:block}.app.alb #home,.app.alb #game{display:none}
.alh{display:flex;align-items:center;justify-content:space-between;margin:6px 6px 0}.alh h2{margin:6px 0}
#album h3{font-size:18px;font-weight:800;margin:20px 6px 8px}#album h3 small{font-size:13px;opacity:.65;margin-left:6px}
.alrow{margin-bottom:14px}.alrow .rn{font-size:17px;font-weight:800;margin:0 6px 4px}
.alf{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.alf .card{cursor:default;padding:4px 4px 6px}.alf .card:hover{transform:none;box-shadow:0 6px 0 var(--ink)}.alf .card .n{font-size:15px}
.alp{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px}
.alp div{background:#fff;border:3px solid var(--ink);border-radius:14px;text-align:center;padding:4px 2px;font-size:12px;font-weight:800;line-height:1.1}
.alp svg{width:44px;height:44px;display:block;margin:0 auto 2px;--k:1.5}.alp .no svg{filter:brightness(0);opacity:.28}.alp .no{opacity:.7}
.als{display:flex;flex-wrap:wrap;gap:8px}.als .chip{font-size:15px}
.alc{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}
.alc div{background:#fff;border:3px solid var(--ink);border-radius:14px;padding:6px 10px;font-size:14px;font-weight:700;line-height:1.15;box-shadow:0 3px 0 var(--ink)}
.alc b{display:block;font-size:16px}.alc .ok{background:#fff3b0}.alc .no{opacity:.55}.alc small{display:block;opacity:.7}
@media(max-width:760px){.alf{gap:5px}.alf .card{border-width:3px;border-radius:14px}.alf .card .n{font-size:12px}}`);
const bAlb=document.createElement('button');bAlb.className='chip mini';bAlb.id='b-album';bAlb.type='button';bAlb.textContent='Album';$('b-new').before(bAlb);
const albEl=document.createElement('div');albEl.id='album';$('app').appendChild(albEl);
const fmtD=t=>new Date(t).toLocaleDateString('fr-FR');
function alRender(){
 const rows=D.map((d,i)=>{const vb=d.vb.join(' '),seen=AL.mons[i]!=null;
  return `<div class="alrow"><div class="rn">${seen?d.name:'???'}</div><div class="alf">${FORMS.map((f,fi)=>{const got=AL.forms[i+'-'+f];
   return `<div class="card album${got?'':' lock'}" style="--cb:${d.cb}"><svg viewBox="${vb}">${rays(vb)}<g class="sil">${mon(d,'adulte','a'+fi,false,{form:f})}</g></svg><div class="n">${got?FNAME[f]:'???'}</div><div class="a">${got?fmtD(got):''}</div></div>`}).join('')}</div></div>`}).join('');
 const prey=ALPREY.map(p=>{const n=AL.prey[p[0]];return `<div class="${n?'':'no'}">${ic(p[0])}${n?p[1]+' ×'+n:'???'}</div>`}).join('');
 const freed=AL.freed.length?AL.freed.map(r=>`<span class="chip">${r.name} · ${FNAME[r.form]||r.form} · ${fmtD(r.date)}</span>`).join(''):'<span style="opacity:.6;margin:0 6px">Personne pour l\'instant.</span>';
 const ach=ACH.map(a=>{const t=AL.ach[a[0]];return `<div class="${t?'ok':'no'}"><b>${t?a[1]:'???'}</b>${a[2]}<small>${t?fmtD(t):'à débloquer'}</small></div>`}).join('');
 albEl.innerHTML=`<div class="alh"><h2>Album <small>${Object.keys(AL.forms).length}/20 formes · ${Object.keys(AL.ach).length}/${ACH.length} succès</small></h2><button class="chip mini" id="al-back" type="button">Retour</button></div>
 <h3>Monstres et formes</h3>${rows}
 <h3>Proies goûtées <small>${alTasted()}/${ALPREY.length}</small></h3><div class="alp">${prey}</div>
 <h3>Villes et records</h3><div class="als"><span class="chip">Villes rasées <b>${AL.cities}</b></span><span class="chip">Ville la plus haute <b>${AL.maxLv?lvInfo(AL.maxLv).n:'-'}</b></span><span class="chip">Proies attrapées dans le décor <b>${AL.caught}</b></span><span class="chip">Meilleur score d'attrape <b>${AL.best.catch}</b></span><span class="chip">Série de visites <b>${AL.days.streak} j</b> (record ${AL.days.max} j)</span></div>
 <h3>Relâchés dans la nature</h3><div class="als">${freed}</div>
 <h3>Succès <small>${Object.keys(AL.ach).length}/${ACH.length}</small></h3><div class="alc">${ach}</div>`}
function alOpen(on){const a=$('app');if(on){alSync();a.classList.add('alb');alRender();scrollTo(0,0)}else{a.classList.remove('alb');albEl.innerHTML=''}}
bAlb.addEventListener('click',()=>alOpen(true));
albEl.addEventListener('click',e=>{if(e.target.closest('#al-back'))alOpen(false)});
{const hh=document.querySelector('#home h2'),b=document.createElement('button');b.className='chip mini';b.type='button';b.textContent='Voir l\'album';b.style.marginLeft='12px';b.onclick=()=>alOpen(true);hh.appendChild(b)}
alSync();
