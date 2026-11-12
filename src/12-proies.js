/* ---------- proies mobiles cliquables dans le décor ---------- */
// Objets {type,x,y,dir,v}, déplacés par requestAnimationFrame dans le groupe #prey (attribut transform, jamais de CSS).
// f = nom de la proie dans FOODS (null : simple passant), r = rayon de clic, cy = hauteur du centre, v = vitesse en pixels d'écran par seconde,
// m = mode (wrap : traverse puis réapparaît de l'autre côté, bounce : fait demi-tour, leap : saute en arc), art = sens du dessin (1 = regarde à droite)
const CARC=['#4db8ff','#ffd23f','#b58cff','#5ed36a','#ff8fc0','#ff9a3c','#ff5a5a','#ffffff'],ri=n=>Math.floor(Math.random()*n);
const crowdSp=()=>`<g class="run">`+person(-12,0,ri(8),1)+person(12,0,ri(8),1)+person(0,2,ri(8),1)+`</g>`;
const MV={
 butterfly:{f:'butterfly',r:26,cy:0,v:42,m:'wrap',art:1,y:()=>-85+Math.random()*60,sp:()=>butterfly(0,0,rnd(['#ff8fc0','#7cc8ff','#ffd23f']),rnd(['#ffd23f','#b58cff','#ff9a3c']),1.15)},
 ladybug:{f:'ladybug',r:24,cy:-11,v:7,m:'bounce',art:1,y:()=>6+Math.random()*18,sp:()=>ladybug(0,0,1.3)},
 apple:{f:'apple',r:24,cy:-19,v:11,m:'bounce',art:1,spin:1,y:()=>8+Math.random()*18,sp:()=>apple(0,0,1.3)},
 fish:{f:'fish',r:32,cy:0,m:'leap',art:1,sp:()=>fish(0,0,1.4)},
 tree:{f:'tree',r:34,cy:-32,v:0,m:'bounce',art:1,y:()=>6+Math.random()*16,sp:()=>tree(0,0,1)},
 lamp:{f:'lamp',r:30,cy:-40,v:0,m:'bounce',art:1,y:()=>-44,sp:()=>lamp(0,0)},
 cow:{f:'cow',r:46,cy:-26,v:9,m:'bounce',art:-1,y:()=>-2+Math.random()*12,sp:()=>cow(0,0,1,1)},
 car:{f:'car',r:42,cy:-18,v:68,m:'wrap',art:1,lane:()=>rnd([[-29,-1],[-15,1]]),sp:()=>car(0,0,rnd(CARC),1,1)},
 bus:{f:'bus',r:56,cy:-22,v:52,m:'wrap',art:1,lane:()=>rnd([[-29,-1],[-15,1]]),sp:()=>bus(0,0,rnd(CARC),1)},
 walker:{f:null,r:14,cy:-10,v:22,m:'wrap',art:1,lane:()=>[-41,rnd([-1,1])],sp:()=>`<g class="run">`+person(0,0,ri(8),1,.9)+`</g>`},
 crowd:{f:'crowd',r:28,cy:-12,v:20,m:'wrap',art:1,lane:()=>[-41,rnd([-1,1])],sc:()=>1.15,sp:crowdSp},
 boat:{f:'boat',r:50,cy:-40,v:18,m:'bounce',art:1,lane:()=>{const y=rnd([-20,40,100,160,220]);return [y,rnd([-1,1])]},sc:o=>1+(o.y+20)/700,
  bounds:hw=>[Math.max(-1050,-hw-170),-390],sp:()=>sail(0,0,1,rnd(['#ff8fc0','#5ed36a','#ffd23f','#b58cff','#ff9a3c']))},
 heli:{f:'heli',r:70,cy:-14,v:55,m:'wrap',art:-1,y:()=>-420+Math.random()*150,sc:()=>1+Math.random()*.5,sp:()=>heli(0,0,1,rnd(['#ff9320','#4db8ff','#ff5a8a']),Math.random()*2)},
 cargo:{f:'cargo',r:150,cy:-60,v:9,m:'bounce',art:1,lane:()=>rnd([[-34,1],[-40,1]]),sc:o=>o.y==-40?.7:1,bounds:hw=>[-1050,-480],sp:()=>cargo(0,0,1,ri(20))},
 district:{f:'district',r:100,cy:-55,v:7,m:'bounce',art:1,y:()=>-30,bounds:hw=>[-980,-500],
  sp:()=>`<path class="o" d="M-104 -10 L104 -10 L86 8 L-86 8 Z" fill="#8a84a3"/><g transform="translate(-88,-8)">${IC.district[1]}</g>`}
};
// population par stade : [type, nombre] (douze objets mobiles au plus)
const POP={bebe:[['butterfly',2],['ladybug',1],['apple',1],['fish',1]],ado:[['cow',1],['car',2],['tree',1],['lamp',1]],
 adulte:[['boat',1],['heli',1],['crowd',2],['bus',1],['car',2]],titan:[['cargo',1],['district',1],['car',2],['bus',1],['boat',1],['heli',1]]};
const MAXMV=8,EDGE=170;
let PR=[],preyStage=null,preyRaf=0,preyT=0,pid=0;

function spawn(type,edge){if(PR.filter(o=>!o.gone).length>=MAXMV)return null;
 const M=MV[type],z=ST[preyStage].z,hw=500/z,o={id:++pid,type,f:M.f,tm:Math.random()*9,ph:Math.random()*6.28,rot:0,gone:false};
 let ln=M.lane?M.lane():[M.y?M.y():0,rnd([-1,1])];o.y=ln[0];o.dir=ln[1];o.sc=(M.sc?M.sc(o):1)*(M.f?.25:1);o.cy=M.cy*o.sc;o.r=M.r*o.sc;o.y0=o.y;o.v=(M.v||0)/z;
 o.live=!!M.f&&FOODS[preyStage].some(m=>m[0]==M.f); // seules les proies du stade sont cliquables
 const hit=Math.max(o.r,23/z); // zone de clic : au moins 44 px à l'écran, quel que soit le zoom
 if(M.m=='wrap'){const lim=hw+EDGE+o.r;o.lim=lim;o.x=edge?-o.dir*lim:(Math.random()*2-1)*hw}
 else if(M.m=='bounce'){const b=M.bounds?M.bounds(hw):[-hw+25,hw-25];o.lo=b[0];o.hi=b[1];o.x=edge?(o.dir>0?o.lo:o.hi):o.lo+Math.random()*(o.hi-o.lo)}
 else{o.u=Math.random();o.dur=1.6;o.wait=0;leapNew(o,hw)}
 const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','mv');g.dataset.id=o.id;g.style.pointerEvents='none';
 g.innerHTML=(o.live?`<circle class="halo pulse" cx="0" cy="${f(o.cy)}" r="${f(Math.max(o.r*.9,19/z)*.4)}" fill="#fff6a0" fill-opacity=".4" stroke="#fff" style="stroke-width:calc(var(--k)*2.4px)"/>`:'')+`<g class="fl">${M.sp()}</g>`+(o.live?`<circle cx="0" cy="${f(o.cy)}" r="${f(hit)}" fill="#000" fill-opacity="0" style="pointer-events:all;cursor:pointer"/>`:'');
 o.el=g;o.fl=g.querySelector('.fl');o.flKey='';PB.appendChild(g);PR.push(o);place(o);return o}
function leapNew(o,hw){o.u=0;o.xa=(Math.random()*2-1)*(hw-40);o.dir=Math.random()<.5?-1:1;o.xb=o.xa+o.dir*(60+Math.random()*50);o.H=95;o.x=o.xa;o.y=42}
function place(o){const M=MV[o.type];let a=o.rot,k=o.dir*M.art*o.sc+'|'+o.sc+'|'+a.toFixed(0);
 o.el.setAttribute('transform',`translate(${o.x.toFixed(1)},${o.y.toFixed(1)})`);
 if(k!=o.flKey){o.flKey=k;o.fl.setAttribute('transform',`scale(${o.dir*M.art*o.sc},${o.sc})`+(a?` rotate(${a.toFixed(1)} 0 ${(M.cy).toFixed(1)})`:''))}}
function stepMover(o,dt,hw){const M=MV[o.type];o.tm+=dt;
 if(M.m=='wrap'){o.x+=o.dir*o.v*dt;if(o.dir>0?o.x>o.lim:o.x<-o.lim)o.x=-o.dir*o.lim;if(M.f=='butterfly')o.y=o.y0+Math.sin(o.tm*2.2+o.ph)*12}
 else if(M.m=='bounce'){o.x+=o.dir*o.v*dt;if(o.x>o.hi){o.x=o.hi;o.dir=-1}else if(o.x<o.lo){o.x=o.lo;o.dir=1}if(M.spin)o.rot=(o.rot+o.v*dt*3.2)%360}
 else{if(o.wait>0){o.wait-=dt;o.el.style.display='none';if(o.wait<=0){leapNew(o,hw);o.el.style.display=''}return}
  o.u+=dt/o.dur;if(o.u>=1){o.wait=.8+Math.random()*1.6;o.u=1}
  const u=o.u;o.x=o.xa+(o.xb-o.xa)*u;o.y=42-4*o.H*u*(1-u);const vy=-4*o.H*(1-2*u)/o.dur,vx=Math.abs(o.xb-o.xa)/o.dur;o.rot=Math.atan2(vy,vx)*57.3}
 place(o)}
function preyTick(t){preyRaf=requestAnimationFrame(preyTick);const dt=Math.min(.05,Math.max(0,(t-preyT)/1000));preyT=t;
 if(!preyStage)return;const hw=500/ST[preyStage].z;for(const o of PR)if(!o.gone)stepMover(o,dt,hw)}
function preyRun(on){cancelAnimationFrame(preyRaf);preyRaf=0;if(on&&!document.hidden){preyT=performance.now();preyRaf=requestAnimationFrame(preyTick)}}
function stopPrey(){preyRun(false);PR=[];preyStage=null;PB.innerHTML=''}
// (re)crée les objets mobiles du stade courant ; sans effet si le stade n'a pas changé
function syncPrey(force){if(!S||S.stage=='oeuf'){if(preyStage)stopPrey();return}
 if(!force&&preyStage==S.stage&&PR.length)return;stopPrey();preyStage=S.stage;PB.innerHTML='';
 (POP[S.stage]||[]).forEach(([t,n])=>{for(let i=0;i<n;i++)spawn(t,false)});preyRun(true)}
// une proie mangée disparaît puis réapparaît au bord quelques secondes plus tard
function eatMover(o){o.gone=true;o.el.remove();const st=preyStage,type=o.type;
 PR=PR.filter(p=>p!==o);setTimeout(()=>{if(S&&preyStage==st)spawn(type,true)},3000+Math.random()*3000)}
PB.addEventListener('pointerdown',e=>{const g=e.target.closest('.mv');if(!g||!S||S.stage=='oeuf'||mini)return;
 const o=PR.find(p=>p.id==g.dataset.id);if(!o||!o.live)return;e.preventDefault();
 const i=FOODS[S.stage].findIndex(m=>m[0]==o.f);if(i<0)return;
 const z=zCur||1,sx=500+z*o.x,sy=470+z*(o.y+o.cy);if(feed(i,[sx,sy]))eatMover(o)});
// au stade titan, les immeubles encore debout se mangent aussi d'un clic (proie « Immeuble »)
W.addEventListener('pointerdown',e=>{if(!S||S.stage!='titan'||mini)return;const g=e.target.closest('[data-b]');if(!g)return;
 const B=cityList().find(b=>b.id==g.dataset.b);if(!B||pvNow(B)<=0)return;const [sx,sy]=bScreen(B);
 if(feed(0,[sx,sy])){hitB(B,1e9);boom(sx,sy);if(!standing().length)cityCleared()}});
document.addEventListener('visibilitychange',()=>preyRun(!document.hidden&&!!preyStage));
