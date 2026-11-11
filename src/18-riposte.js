/* ---------- lot 9 : la ville riposte ---------- */
// À partir du stade adulte, une vague d'attaque (30 s) arrive toutes les 3 à 6 minutes de jeu actif : chars, hélicoptères, avions.
// Les attaquants sont des objets mobiles dans le groupe #prey (coordonnées du monde, attribut transform). Un clic sur l'un d'eux le fait croquer.
const WAVE_DUR=30,WAVE_HUM=3; // durée d'une vague, humeur perdue par impact
// calques supplémentaires dans #prey (que syncPrey vide et que l'on remet en place)
const PBL=[];
function pbLayer(id){const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.id=id;PB.appendChild(g);PBL.push(g);return g}
{const sp=stopPrey,sy=syncPrey;
 stopPrey=function(){sp();PBL.forEach(g=>PB.appendChild(g))};
 syncPrey=function(force){const r=sy(force);PBL.forEach(g=>{if(g.parentNode!==PB)PB.appendChild(g)});if(RP.on&&(!S||S.stage!=RP.stage))endWave('abort');return r}}
const FG=pbLayer('foes');
EXTRA.push(s=>{if(!s.rp||typeof s.rp.acc!='number')s.rp={acc:0,next:180+Math.random()*180}});

/* dessins : char et avion (hélicoptère : heli() de 02-objets.js) */
const tankArt=(col='#7fc24a')=>`<ellipse cx="0" cy="1" rx="46" ry="4" fill="${L}" opacity=".22"/><rect class="o" x="-44" y="-17" width="88" height="17" rx="8.5" fill="#4a4268"/>`+
 [-30,-15,0,15,30].map(x=>`<circle class="o2" cx="${x}" cy="-8.5" r="5.5" fill="#8a84a3"/>`).join('')+
 `<path class="o" d="M-34 -17 L-27 -31 L29 -31 L38 -17 Z" fill="${col}"/><rect class="o" x="12" y="-42" width="40" height="8" rx="3" fill="#5f9a36"/><rect class="o2" x="49" y="-44" width="8" height="12" rx="2" fill="#3a3152"/><path class="o" d="M-17 -31 C-17 -47,15 -47,17 -31 Z" fill="${col}"/><polygon class="o2" points="${star(0,-24,6.5,2.8,5)}" fill="#ffd23f"/><path d="M-9 -41 C-5 -45,3 -45,6 -42" stroke="#fff" stroke-width="2.5" fill="none" opacity=".6" stroke-linecap="round"/>`;
const planeArt=(col='#ff7a2e',c2='#ffd23f')=>`<path class="o" d="M-60 -6 L-72 -30 L-52 -30 L-40 -10 Z" fill="${c2}"/><path class="o" d="M-6 -3 L-27 -35 L-9 -35 L22 -5 Z" fill="${c2}"/><path class="o" d="M-62 -2 C-40 -19,34 -19,58 -4 C34 11,-40 11,-62 -2 Z" fill="${col}"/><path d="M-50 3 C-20 9,30 9,54 -2 C34 9,-40 11,-50 3 Z" fill="${L}" opacity=".18"/><ellipse class="o2" cx="22" cy="-11" rx="11" ry="6" fill="#c9f0ff"/><polygon class="o2" points="${star(-22,-3,6,2.6,5)}" fill="#fff"/><path class="o" d="M-4 2 L-26 31 L-8 31 L24 3 Z" fill="${c2}"/><ellipse class="o2 rot" cx="59" cy="-4" rx="4" ry="15" fill="#eef3fb" opacity=".9"/>`;
IC.tank=['-50 -52 112 56',tankArt()];IC.plane=['-76 -38 140 72',planeArt()];

/* les attaquants : r = rayon de clic, cy = hauteur du centre, v = vitesse (px d'écran / s), art = sens du dessin, pts = points gagnés, faim = faim rendue */
const FOE={
 tank:{r:46,cy:-24,v:70,art:1,pts:12,faim:8,ic:'tank',sp:()=>tankArt(rnd(['#7fc24a','#6bb86a','#9ac94a']))},
 heli:{r:70,cy:-14,v:90,art:-1,pts:16,faim:10,ic:'heli',sp:()=>heli(0,0,1,'#7fc24a',Math.random()*2)},
 plane:{r:64,cy:-8,v:150,art:1,pts:20,faim:12,ic:'plane',sp:()=>planeArt(rnd(['#ff7a2e','#4db8ff','#ff5a5a']))}};
const STARS=[0,1,2].map(i=>`<polygon class="o2" points="${star(-16+i*16,i==1?-4:0,6,2.6,5)}" fill="#ffd23f"/>`).join('');
let RP={on:false,t:0,list:[],q:[],eaten:0,total:0,raf:0,last:0,shots:[],stage:null,n:0};
const rpOk=()=>!!S&&idx()>=3&&!S.asleep&&!mini;
const rpTarget=()=>{const p=ST[S.stage];return [0,-(p.m*p.bs*150)/p.z]}; // le torse du monstre, en coordonnées du monde
const rpTall=()=>{const p=ST[S.stage];return p.m*p.bs*300/p.z};

function startWave(){if(RP.on||!rpOk())return false;const N=S.stage=='titan'?6:4,kinds=['tank','heli','plane','tank','heli','plane'];
 Object.assign(RP,{on:true,t:0,list:[],q:[],eaten:0,total:N,last:performance.now(),stage:S.stage,n:RP.n+1});
 for(let i=0;i<N;i++)RP.q.push({t:i*2.2+Math.random(),type:kinds[i],side:i%2?1:-1});
 pop('WIOUUU !');cancelAnimationFrame(RP.raf);RP.raf=requestAnimationFrame(rpTick);return true}
function foeSpawn(q){const z=ST[RP.stage].z,hw=500/z,F=FOE[q.type],sc=Math.max(1,.7/z),th=rpTall(),side=q.side;
 const o={type:q.type,side,sc,r:F.r*sc,cy:F.cy*sc,gone:false,stun:0,tf:1.6+Math.random()*2,hold:false,tm:Math.random()*9};
 o.lim=hw+170+o.r;o.x=side*o.lim;o.dir=-side;o.v=F.v/z;
 if(q.type=='tank'){o.y=-22;o.sx=side*210/z}else if(q.type=='heli'){o.y=-th*.85;o.sx=side*260/z}else{o.y=-th*1.1;o.sx=0}
 o.y0=o.y;
 const g=document.createElementNS('http://www.w3.org/2000/svg','g'),hit=Math.max(o.r,23/z);g.style.pointerEvents='none';
 g.innerHTML=`<circle class="halo pulse" cx="0" cy="${f(o.cy)}" r="${f(Math.max(o.r*.9,19/z))}" fill="#ff8a7a" fill-opacity=".35" stroke="#fff" style="stroke-width:calc(var(--k)*2.4px)"/><g class="fl">${F.sp()}</g><g class="stn" style="display:none" transform="translate(0,${f(o.cy-60*sc)}) scale(${sc})"><g class="bob">${STARS}</g></g><circle data-foe="1" cx="0" cy="${f(o.cy)}" r="${f(hit)}" fill="#000" fill-opacity="0" style="pointer-events:all;cursor:pointer"/>`;
 o.el=g;o.fl=g.querySelector('.fl');o.stn=g.querySelector('.stn');o.circ=g.querySelector('[data-foe]');o.circ.__o=o;FG.appendChild(g);RP.list.push(o);foePlace(o)}
function foePlace(o){o.el.setAttribute('transform',`translate(${o.x.toFixed(1)},${o.y.toFixed(1)})`);
 const s=`scale(${o.dir*FOE[o.type].art*o.sc},${o.sc})`;if(s!=o.sk){o.sk=s;o.fl.setAttribute('transform',s)}}
function foeStep(o,dt){o.tm+=dt;
 if(o.stun>0){o.stun-=dt;o.stn.style.display=o.stun>0?'':'none';if(o.stun>0)return}
 const F=FOE[o.type],dx=o.sx-o.x;
 if(o.type=='plane'){o.x+=o.dir*o.v*dt*1.6;if(Math.abs(o.x)>o.lim)o.dir=o.x>0?-1:1;o.y=o.y0+Math.sin(o.tm*2)*10;o.hold=true}
 else if(!o.hold){const st=o.v*dt;if(Math.abs(dx)<=st){o.x=o.sx;o.hold=true;o.dir=-o.side}else{o.dir=Math.sign(dx);o.x+=o.dir*st}}
 else if(o.type=='heli')o.y=o.y0+Math.sin(o.tm*2.4)*9;
 if(o.hold){o.tf-=dt;if(o.tf<=0){o.tf=5+Math.random()*2;foeFire(o)}}
 foePlace(o)}
// un tir : un petit projectile part de l'attaquant vers le monstre
function foeFire(o){const [tx,ty]=rpTarget(),sc=o.sc,g=document.createElementNS('http://www.w3.org/2000/svg','g');
 g.innerHTML=`<circle class="o2" r="${f(6*sc)}" fill="#ff5a3c"/><circle r="${f(2.4*sc)}" fill="#ffe14d"/>`;FG.appendChild(g);
 RP.shots.push({el:g,x0:o.x,y0:o.y+o.cy,tx,ty,u:0,sc})}
function foeHit(s){S.humeur=clamp(S.humeur-WAVE_HUM);if(!poseNow)strike('debout','triste',500);react('no');
 const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.innerHTML=`<g transform="translate(${f(s.tx)},${f(s.ty)}) scale(${f(s.sc)})"><polygon class="o2" points="${star(0,0,24,11,9)}" fill="#ffd23f"/><polygon points="${star(0,0,13,6,9)}" fill="#ff7a2e"/></g>`;
 FG.appendChild(g);setTimeout(()=>g.remove(),320)}
function rpTick(now){if(!RP.on)return;RP.raf=requestAnimationFrame(rpTick);const dt=Math.min(.05,(now-RP.last)/1000);RP.last=now;
 if(!S||S.asleep||S.stage!=RP.stage)return endWave('abort');
 if(mini)return; // un mini-jeu gèle la vague
 RP.t+=dt;while(RP.q.length&&RP.q[0].t<=RP.t)foeSpawn(RP.q.shift());
 RP.list.forEach(o=>foeStep(o,dt));
 RP.shots=RP.shots.filter(s=>{s.u+=dt/.75;if(s.u>=1){s.el.remove();foeHit(s);return false}
  s.el.setAttribute('transform',`translate(${f(s.x0+(s.tx-s.x0)*s.u)},${f(s.y0+(s.ty-s.y0)*s.u)})`);return true});
 if(RP.t>=WAVE_DUR)endWave('time')}
// fin : victoire (tous croqués, bonus), temps écoulé (les survivants repartent) ou abandon (sommeil, changement de stade)
function endWave(how){if(!RP.on)return;RP.on=false;cancelAnimationFrame(RP.raf);
 RP.shots.forEach(s=>s.el.remove());RP.shots=[];
 RP.list.forEach(o=>{const e=o.el;if(how!='abort'&&e.animate){e.animate([{opacity:1},{opacity:0}],{duration:500}).onfinish=()=>e.remove();setTimeout(()=>e.remove(),600)}else e.remove()});RP.list=[];RP.q=[];
 if(S&&S.rp){S.rp.acc=0;S.rp.next=180+Math.random()*180}
 if(how=='win'&&S){gain(30);S.humeur=clamp(S.humeur+10);pop('HOURRA !');react('jump');strike('debout','content',900);done()}
 else if(how=='time'&&S){pop('OUF !')}}
// un clic sur un attaquant : il est croqué (points et faim)
function eatFoe(o){if(o.gone||!S||mini||S.asleep)return;o.gone=true;const z=zCur||1,sx=500+z*o.x,sy=470+z*(o.y+o.cy),F=FOE[o.type];
 o.el.remove();RP.list=RP.list.filter(p=>p!==o);RP.eaten++;fly(F.ic,sx,sy);
 setTimeout(()=>{if(!S)return;S.faim=clamp(S.faim+F.faim);gain(F.pts);react('chomp');strike('mange','miam',700);pop(rnd(MIAM[S.stage]||MIAM.adulte));done()},430);
 if(RP.eaten>=RP.total)setTimeout(()=>endWave('win'),700)}
FG.addEventListener('pointerdown',e=>{const c=e.target.closest('[data-foe]');if(!c||!c.__o)return;e.preventDefault();e.stopPropagation();eatFoe(c.__o)});
// étourdit les attaquants (utilisé par les pouvoirs du lot 10)
function stunFoes(sec){RP.list.forEach(o=>{o.stun=sec;o.stn.style.display=''})}
// une vague peut arriver quand le temps de jeu actif s'accumule (vigilance : pas de sommeil, pas de mini-jeu, onglet visible)
setInterval(()=>{if(!S||!S.rp||RP.on||document.hidden||!rpOk())return;S.rp.acc+=DEBUG_SPEED;if(S.rp.acc>=S.rp.next)startWave()},1000);
{const sh=show;show=function(){if(RP.on)endWave('abort');sh()}}
