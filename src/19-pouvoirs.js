/* ---------- lot 10 : pouvoirs à débloquer ---------- */
// Trois pouvoirs par monstre (ado, adulte, titan). Effet : dégâts de zone sur les immeubles les plus proches et/ou étourdissement des attaquants.
// [nom, famille d'effet, immeubles touchés, dégâts, étourdissement (s), mot]
const POW=[
 [['Coup de queue','swipe',2,2,3,'WHAM !'],['Rugissement','roar',3,3,8,'GRAOUUU !'],['Souffle atomique','atom',5,10,4,'KABLAAM !']],
 [['Roulade','roll',2,2,3,'BOUDOUM !'],['Câlin écrasant','hug',2,5,10,'SQUIIISH !'],['Rot géant','burp',5,9,6,'BRAAAP !']],
 [['Crachat de braise','spit',2,2,2,'PTOUI !'],['Pluie de lave','lava',4,4,5,'SPLOTCH !'],['Éruption','erupt',6,9,6,'BROUUM !']],
 [['Jet d\'eau','jet',2,2,4,'SPLOUCH !'],['Raz-de-marée','tide',5,4,8,'SPLASH !'],['Éclair des abysses','bolt',5,10,6,'ZZZAP !']],
 [['Coup de massue','swipe',2,3,3,'BONK !'],['Charge','roll',4,4,6,'VROOOM !'],['Séisme','quake',8,8,8,'GRRROUM !']]];
const POWCD=[30,60,90]; // temps de recharge en secondes (ado, adulte, titan)
const PWCOL=['#ffb36b','#ff8a7a','#9d8cff'];
EXTRA.push(s=>{if(!s.pw||typeof s.pw!='object')s.pw={}});

/* icônes des boutons (viewBox 48) */
const PGL={
 swipe:`<path ${sw} d="M6 40C8 16,26 6,42 10 30 14,18 22,6 40Z" fill="#fff"/>`,
 roar:`<path ${sw} d="M16 12q14 12 0 24M25 7q20 17 0 34M34 3q26 21 0 42" fill="none"/><circle ${sw} cx="9" cy="24" r="6" fill="#ffd23f"/>`,
 atom:`<circle ${sw} cx="12" cy="24" r="8" fill="#ffd23f"/><path ${sw} d="M20 17L44 9V39L20 31Z" fill="#7fe3ff"/>`,
 roll:`<circle ${sw} cx="24" cy="24" r="15" fill="#ffb36b"/><path ${sw} d="M14 24a10 10 0 0119-6M34 24a10 10 0 01-19 6M30 13l4 5-6 2" fill="none"/>`,
 hug:UI.heart,
 burp:`<circle ${sw} cx="14" cy="28" r="9" fill="#9be35a"/><circle ${sw} cx="26" cy="20" r="11" fill="#b6f06a"/><circle ${sw} cx="36" cy="30" r="8" fill="#9be35a"/>`,
 spit:UI.flame,
 lava:`<path ${sw} d="M24 6c2 7 9 9 9 17a9 9 0 01-18 0c0-4 2-6 4-8 0 4 1 5 3 5 1-6-1-9 2-14z" fill="#ff7a2e"/><circle ${sw} cx="9" cy="38" r="4" fill="#ff5a3c"/><circle ${sw} cx="39" cy="40" r="4" fill="#ff5a3c"/><circle ${sw} cx="24" cy="42" r="3" fill="#ffd23f"/>`,
 erupt:`<path ${sw} d="M4 42L18 20h12l14 22Z" fill="#8a5a36"/><path ${sw} d="M20 20c-6-8 0-12 4-18 2 6 10 8 4 18Z" fill="#ff7a2e"/>`,
 jet:UI.drop,
 tide:`<path ${sw} d="M3 40C3 20,18 8,36 10c-8 4-8 12-2 16 6 2 10 6 12 14Z" fill="#4db8ff"/>`,
 bolt:UI.bolt,
 quake:`<path ${sw} d="M4 30l12-4-4-10 14 6-4-12 18 20-14-2 4 12-10-8-6 6Z" fill="#c98d5a"/>`};

/* effets visuels dans la scène (repère 1000 x 600) */
addCss(`#scene:not(.pwr-beam) .beam{display:none}
.pg{animation:pg .7s ease-out both;transform-box:fill-box;transform-origin:center}
@keyframes pg{0%{transform:scale(.25);opacity:1}70%{opacity:1}100%{transform:scale(2.2);opacity:0}}
.pup{animation:pup .8s ease-out both;transform-box:fill-box;transform-origin:50% 100%}
@keyframes pup{0%{transform:scale(.6,.05);opacity:1}45%{transform:scale(1,1.15);opacity:1}100%{transform:scale(1.1,1);opacity:0}}
.pwr{display:flex;justify-content:center;gap:clamp(14px,5vw,34px);margin-top:16px}.pwr[hidden]{display:none}
.pw{position:relative;border:0;background:none;padding:0;font:inherit;color:inherit;cursor:pointer;width:96px;display:flex;flex-direction:column;align-items:center;gap:4px;-webkit-tap-highlight-color:transparent}
.pw .pb{position:relative;width:64px;height:64px;border-radius:50%;border:4px solid var(--ink);background:linear-gradient(var(--c1),var(--c2));box-shadow:0 6px 0 var(--ink);display:grid;place-items:center;overflow:hidden}
.pw:active .pb{transform:translateY(4px);box-shadow:0 2px 0 var(--ink)}
.pw .pb svg{width:42px;height:42px;position:relative}
.pw .cd{position:absolute;inset:0;background:rgba(42,33,64,.7);color:#fff;font-weight:800;font-size:24px;display:none;align-items:center;justify-content:center;text-shadow:0 2px 0 var(--ink)}
.pw .lk{position:absolute;right:-2px;top:-2px;width:26px;height:26px;display:none}
.pw .nm{font-size:12.5px;font-weight:800;line-height:1.05;text-align:center}
.pw.cool .cd{display:flex}.pw.locked .pb{filter:saturate(.25) brightness(.9)}.pw.locked .lk{display:block}.pw.locked,.pw.cool{cursor:default}
@media(max-width:760px){.pw{width:84px}.pw .pb{width:58px;height:58px}}`);
const pwBox=document.createElement('div');pwBox.className='pwr';pwBox.id='pwr';pwBox.hidden=true;$('screen').after(pwBox);
const pwOf=i=>POW[S.mon][i],pwLeft=i=>Math.max(0,((S.pw[i]||0)-Date.now())/1000),pwOpen=i=>idx()>=2+i;
function pwDraw(){pwBox.innerHTML=[0,1,2].map(i=>`<button class="pw" type="button" data-i="${i}" style="--c1:${PWCOL[i]};--c2:#e8506a"><span class="pb"><svg viewBox="0 0 48 48">${PGL[POW[S.mon][i][1]]}</svg><span class="cd"></span></span><svg class="lk" viewBox="0 0 30 30">${UI.lock}</svg><span class="nm"></span></button>`).join('');pwBox.dataset.m=S.mon}
function pwHud(){if(!S)return;const off=S.stage=='oeuf';pwBox.hidden=off;if(off)return;if(pwBox.dataset.m!=S.mon)pwDraw();
 [...pwBox.children].forEach((b,i)=>{const open=pwOpen(i),l=pwLeft(i);b.classList.toggle('locked',!open);b.classList.toggle('cool',open&&l>0);
  b.querySelector('.nm').textContent=open?pwOf(i)[0]:['Stade ado','Stade adulte','Stade titan'][i];b.querySelector('.cd').textContent=l>0?Math.ceil(l):''})}
{const h=hud;hud=function(){h();pwHud()}}
{const sh=show;show=function(){sh();if(S)pwHud()}}
setInterval(pwHud,500); // le compte à rebours reste à jour entre deux appels de hud()

/* dessin des effets */
const shk=()=>{const sc=$('screen');sc.classList.remove('shake');sc.getBoundingClientRect();sc.classList.add('shake')};
const pg=(x,y,inner,delay=0,s=1)=>`<g transform="translate(${f(x)},${f(y)}) scale(${s})"><g class="pg" style="animation-delay:${delay}s">${inner}</g></g>`;
const gone=(html,ms)=>fx(html,[{opacity:1},{opacity:1,offset:.8},{opacity:0}],ms);
// un projectile qui part d'un point vers un autre, en arc
function proj(html,x0,y0,x1,y1,ms,delay,arc=70){setTimeout(()=>{if(S)fx(html,[{transform:`translate(${f(x0)}px,${f(y0)}px)`},{transform:`translate(${f((x0+x1)/2)}px,${f((y0+y1)/2-arc)}px)`,offset:.5},{transform:`translate(${f(x1)}px,${f(y1)}px)`}],ms)},delay)}
const bolt=(x,y)=>{let d=`M${f(x+30)} -10`;for(let k=1;k<6;k++)d+=` L${f(x+30-k*30/6+(k%2?-26:26))} ${f(-10+(y+10)*k/6)}`;d+=` L${f(x)} ${f(y)}`;return `<path d="${d}" fill="none" stroke="${L}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff6a0" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>`};
const PFX={
 swipe:(C,M,T)=>gone(pg(C[0]+110,C[1]-10,`<path d="M-70 70C-60 -50,40 -90,90 -60 20 -40,-20 10,-70 70Z" fill="#fff" stroke="${L}" stroke-width="6" stroke-linejoin="round"/>`),700),
 roar:(C,M)=>{shk();[0,.15,.3].forEach(d=>gone(pg(M[0]+40,M[1],`<circle r="60" fill="none" stroke="${L}" stroke-width="16"/><circle r="60" fill="none" stroke="#fff" stroke-width="8"/>`,d),1100))},
 atom:()=>{const s=$('scene');s.classList.add('pwr-beam');flash();shk();setTimeout(()=>s.classList.remove('pwr-beam'),1900)},
 roll:(C,M,T,P)=>{const a=$('act');if(a&&a.animate)a.animate([{transform:'translateX(0) scale(1)'},{transform:'translateX(150px) scale(.82,1.12)',offset:.4},{transform:'translateX(150px) scale(1)',offset:.55},{transform:'translateX(0) scale(1)'}],{duration:900,easing:'ease-in-out'});
  for(let i=0;i<4;i++)gone(pg(480+i*40,468,`<circle r="22" fill="#fff" stroke="${L}" stroke-width="4" opacity=".9"/>`,.1+i*.12),900)},
 hug:(C)=>{gone(pg(C[0]+160,C[1]-30,`<g transform="scale(3.4) translate(-24 -24)">${UI.heart}</g>`),900);[0,1,2,3].forEach(i=>gone(pg(C[0]+70+i*60,C[1]-110+(i%2)*70,`<g transform="scale(1.2) translate(-24 -24)">${UI.heart}</g>`,.15+i*.1),900))},
 burp:(C,M)=>{shk();for(let i=0;i<5;i++)gone(pg(M[0]+70+i*48,M[1]-10+(i%2)*26,`<circle r="34" fill="#9be35a" stroke="${L}" stroke-width="5"/><circle cx="-10" cy="-10" r="10" fill="#d4f59a"/>`,i*.09),1100)},
 spit:(C,M,T)=>T.forEach((t,i)=>proj(`<circle r="14" fill="#ff7a2e" stroke="${L}" stroke-width="4"/><circle r="6" fill="#ffe14d"/>`,M[0],M[1],t[0],t[1],480,i*130)),
 lava:(C,M,T)=>T.forEach((t,i)=>proj(`<circle r="18" fill="#ff5a3c" stroke="${L}" stroke-width="4"/><circle r="8" fill="#ffd23f"/>`,t[0]+30,-40,t[0],t[1],520,i*120,0)),
 erupt:(C,M,T)=>{shk();T.forEach((t,i)=>setTimeout(()=>{if(S)gone(`<g transform="translate(${f(t[0])},${f(t[1]+40)})"><g class="pup">${fire(0,0,2.6)}</g></g>`,850)},i*110))},
 jet:(C,M,T)=>T.forEach((t,i)=>proj(`<ellipse rx="22" ry="12" fill="#4db8ff" stroke="${L}" stroke-width="4"/><ellipse cx="-6" cy="-4" rx="7" ry="3.5" fill="#fff"/>`,M[0],M[1],t[0],t[1],480,i*130,40)),
 tide:()=>{
  fx(`<path d="M-1100 600V470C-1000 420,-940 455,-880 395C-840 345,-790 375,-760 430L-760 600Z" fill="#4db8ff" stroke="${L}" stroke-width="6" stroke-linejoin="round"/><path d="M-880 395C-840 345,-790 375,-760 430" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`,[{transform:'translateX(0)'},{transform:'translateX(1900px)'}],1300)},
 bolt:(C,M,T)=>{flash();T.forEach((t,i)=>setTimeout(()=>{if(S)gone(bolt(t[0],t[1]),400)},i*120))},
 quake:()=>{shk();let d='M0 520';for(let x=40;x<=1000;x+=60)d+=` L${x} ${520+((x/60)%2?18:-14)}`;gone(`<path d="${d}" fill="none" stroke="${L}" stroke-width="10" stroke-linejoin="round"/><path d="M200 520L240 600M520 520L470 600M780 520L830 600" fill="none" stroke="${L}" stroke-width="8"/>`,1100);
  for(let i=0;i<6;i++)gone(pg(100+i*160,500,`<circle r="20" fill="#e3c9a0" stroke="${L}" stroke-width="4"/>`,i*.05),900)}};

/* utilisation d'un pouvoir */
function usePower(i){if(!S||S.stage=='oeuf'||mini||busy())return;if(S.asleep)return pop('ZZZ…');
 if(!pwOpen(i)||pwLeft(i)>0)return refuse('PFFF…');
 const P=pwOf(i),T=standing().sort((a,b)=>Math.abs(a.x+a.w/2)-Math.abs(b.x+b.w/2)).slice(0,P[2]);
 if(!T.length&&!RP.on)return refuse('HMPF…'); // rien à détruire ni à repousser : on garde le pouvoir
 S.pw[i]=Date.now()+POWCD[i]*1000;
 const M=mouth(),pp=ST[S.stage],C=[500,470-pp.m*pp.bs*150],TS=T.map(bScreen),me=S;
 strike('frappe','colere',900);react('jump');PFX[P[1]](C,M,TS,P);pop(P[5]);
 if(RP.on)stunFoes(P[4]);
 // les dégâts tombent quand l'effet arrive
 setTimeout(()=>{if(S!==me)return;T.forEach(B=>{if(pvNow(B)>0){hitB(B,P[3]);const [x,y]=bScreen(B);boom(x,y)}});if(T.length&&!standing().length)cityCleared();done();pwHud()},P[1]=='tide'?650:P[1]=='roar'||P[1]=='atom'?350:480);
 pwHud();save()}
pwBox.addEventListener('click',e=>{const b=e.target.closest('.pw');if(b&&S)usePower(+b.dataset.i)});
