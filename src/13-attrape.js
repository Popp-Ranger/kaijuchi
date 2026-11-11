/* ---------- mini-jeu « Jouer » : attrape (20 secondes) ---------- */
// Des objets tombent du haut ; le monstre suit le doigt ou la souris. Bons : ballons et proies du stade (+1). Mauvais : bombes et brocolis (-1).
const CATCH_T=20,CATCH_Y=385,CATCH_HW=100,GROUND_Y=548;
let CG=null;
function balloonArt(col){return `<ellipse cx="0" cy="-2" rx="22" ry="27" fill="${col}" stroke="${L}" stroke-width="3.5"/><ellipse cx="-8" cy="-14" rx="5" ry="9" fill="#fff" opacity=".6" transform="rotate(20 -8 -14)"/><path d="M-5 28 L5 28 L0 22 Z" fill="${col}" stroke="${L}" stroke-width="3" stroke-linejoin="round"/><path d="M0 29 q-7 11 0 21 q7 10 0 20" stroke="${L}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}
function bombArt(){return `<path d="M10 -20 q8 -12 17 -8" stroke="${L}" stroke-width="4" fill="none" stroke-linecap="round"/><polygon points="${star(30,-30,12,5,6)}" fill="#ffd23f" stroke="${L}" stroke-width="2"/><circle cx="0" cy="2" r="25" fill="#3a3152" stroke="${L}" stroke-width="3.5"/><ellipse cx="-9" cy="-8" rx="6" ry="9" fill="#fff" opacity=".35" transform="rotate(25 -9 -8)"/><rect x="-7" y="-27" width="14" height="8" rx="2" fill="#6b6385" stroke="${L}" stroke-width="3"/>`}
function broccoliArt(){return `<path d="M-6 26 L-8 4 L8 4 L6 26 Z" fill="#b6e07a" stroke="${L}" stroke-width="3" stroke-linejoin="round"/><circle cx="-14" cy="-4" r="13" fill="#3fae55" stroke="${L}" stroke-width="3"/><circle cx="14" cy="-4" r="13" fill="#3fae55" stroke="${L}" stroke-width="3"/><circle cx="0" cy="-14" r="15" fill="#48c768" stroke="${L}" stroke-width="3"/><circle cx="-5" cy="-18" r="4" fill="#8ee89f"/>`}
function preyArt(n){const v=IC[n][0].split(' ').map(Number),k=62/Math.max(v[2],v[3]);
 return `<svg x="${f(-v[2]*k/2)}" y="${f(-v[3]*k/2)}" width="${f(v[2]*k)}" height="${f(v[3]*k)}" viewBox="${IC[n][0]}" style="--k:1.6">${IC[n][1]}</svg>`}
function catchSpawn(){const k=CG.k,good=Math.random()<.62,x=70+Math.random()*860;let art,kind;
 if(good){const fo=FOODS[k];if(Math.random()<.45){art=balloonArt(rnd(['#ff5a5a','#ffd23f','#4db8ff','#5ed36a','#ff8fc0','#b58cff']))}else art=preyArt(rnd(fo)[0]);kind=1}
 else{art=Math.random()<.5?bombArt():broccoliArt();kind=-1}
 const el=document.createElementNS('http://www.w3.org/2000/svg','g');el.innerHTML=`<g class="ro">${art}</g>`;CG.items.appendChild(el);
 CG.list.push({el,x,y:-60,kind,rot:Math.random()*40-20,spin:(Math.random()-.5)*140,vy:(Math.random()*.25+.9)})}
function catchFloat(x,y,txt,col){const g=document.createElementNS('http://www.w3.org/2000/svg','g');
 g.innerHTML=`<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-size="46" font-weight="800" fill="${col}" stroke="${L}" stroke-width="6" paint-order="stroke" stroke-linejoin="round">${txt}</text>`;CG.fx.appendChild(g);
 const end=()=>g.remove();if(g.animate)g.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-60px)',opacity:0}],{duration:700,easing:'ease-out'}).onfinish=end;setTimeout(end,780)}
function catchAct(c){const a=$('mgact');if(!a)return;a.setAttribute('class','');a.getBoundingClientRect();a.setAttribute('class','mgact '+c)}
function startCatch(){if(mini)return;mini=true;const k=S.stage,p=ST[k],vb=p.vb.split(' ').map(Number),sm=Math.min(1,240/-vb[1]);
 const box=$('mg'),svg=$('mgs'),sc=$('scene');const rs=$('screen');box.style.top=(sc.getBoundingClientRect().top-rs.getBoundingClientRect().top-rs.clientTop)+'px';box.style.height=sc.getBoundingClientRect().height+'px';box.hidden=false;
 svg.innerHTML=`<defs><linearGradient id="mgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38a4f7"/><stop offset=".6" stop-color="#8fdcff"/><stop offset="1" stop-color="#fff0c9"/></linearGradient></defs>
<rect width="1000" height="600" fill="url(#mgSky)"/>${cloud(170,110,1,2)}${cloud(560,80,.8,9)}${cloud(860,170,.7,5)}
<path d="M0 520 C150 480,300 500,450 520 C620 490,800 480,1000 515 L1000 600 L0 600 Z" fill="#8fe06a"/><rect y="${GROUND_Y}" width="1000" height="60" fill="url(#gGrass)" style="fill:#5fc65f"/>
<g id="mgm" transform="translate(500,${GROUND_Y}) scale(${f2(sm)})"><g id="mgact" class="mgact"><g class="popin">${mon(CUR,k,'g',false)}</g></g></g>
<g id="mgi"></g><g id="mgfx"></g>
<g transform="translate(24,16)"><rect width="190" height="54" rx="18" fill="#fff" stroke="${L}" stroke-width="4"/><text id="mgsc" x="95" y="39" text-anchor="middle" font-size="32" font-weight="800" fill="${L}">0</text></g>
<g transform="translate(380,26)"><rect width="240" height="26" rx="13" fill="#fff" stroke="${L}" stroke-width="4"/><rect id="mgt" x="4" y="4" width="232" height="18" rx="9" fill="#ffb800"/></g>`;
 CG={k,list:[],score:0,t:0,spawnT:0,mx:500,tx:500,done:false,last:performance.now(),sm,items:$('mgi'),fx:$('mgfx'),box,raf:0};
 const move=e=>{if(e.target.closest('button'))return;const r=box.getBoundingClientRect();CG.tx=Math.max(70,Math.min(930,(e.clientX-r.left)/r.width*1000));if(e.cancelable)e.preventDefault()};
 CG.move=move;box.addEventListener('pointermove',move);box.addEventListener('pointerdown',move);
 $('mg-skip').onclick=()=>catchEnd(true);
 CG.raf=requestAnimationFrame(catchTick)}
function catchTick(now){if(!CG||CG.done)return;CG.raf=requestAnimationFrame(catchTick);const dt=Math.min(.05,(now-CG.last)/1000);CG.last=now;CG.t+=dt;
 const T=CG.t,prog=Math.min(1,T/CATCH_T),speed=1+prog*1.5;
 CG.spawnT-=dt;if(CG.spawnT<=0&&T<CATCH_T-.8){catchSpawn();CG.spawnT=Math.max(.36,.95-.55*prog)}
 CG.mx+=(CG.tx-CG.mx)*Math.min(1,dt*14);const dir=CG.tx<CG.mx-4?-1:CG.tx>CG.mx+4?1:(CG.dir||1);CG.dir=dir;
 $('mgm').setAttribute('transform',`translate(${f(CG.mx)},${GROUND_Y}) scale(${f2(CG.sm*dir)},${f2(CG.sm)})`);
 CG.list=CG.list.filter(o=>{o.y+=190*speed*o.vy*dt;o.rot+=o.spin*dt;
  if(o.y>=CATCH_Y&&o.y<=GROUND_Y+20&&Math.abs(o.x-CG.mx)<CATCH_HW){CG.score+=o.kind;o.el.remove();catchAct(o.kind>0?'chomp':'no');catchFloat(o.x,o.y-30,o.kind>0?'+1':'-1',o.kind>0?'#7dff7a':'#ff6b6b');$('mgsc').textContent=CG.score;return false}
  if(o.y>650){o.el.remove();return false}
  o.el.setAttribute('transform',`translate(${f(o.x)},${f(o.y)}) rotate(${f(o.rot)})`);return true});
 $('mgt').setAttribute('width',f(232*(1-prog)));
 if(T>=CATCH_T&&!CG.list.length||T>=CATCH_T+3)catchEnd(false)}
// fin : éclat avec le score (sauf si on quitte avec « Passer »), puis récompense et retour à la scène
function catchEnd(skip){if(!CG||CG.done)return;CG.done=true;cancelAnimationFrame(CG.raf);
 const sc=Math.max(0,CG.score),rec=!skip&&sc>(S.best.catch||0);
 const finish=()=>{const b=CG.box;b.removeEventListener('pointermove',CG.move);b.removeEventListener('pointerdown',CG.move);b.hidden=true;$('mgs').innerHTML='';CG=null;mini=false;
  const r=skip?0:Math.min(1,sc/15);S.humeur=clamp(S.humeur+10+Math.round(20*r));S.energie=clamp(S.energie-10);gain(2+Math.round(10*r));
  if(rec)S.best.catch=sc;react('jump');pop(skip?'BOING !':rec?'RECORD !':rnd(['YOUPI !','BOING !','HIHI !']));done()};
 if(skip)return finish();
 CG.items.innerHTML='';CG.fx.innerHTML=`<g transform="translate(500,270) rotate(-7)"><g class="popin"><polygon points="${star(0,0,150,96,14)}" fill="#ffe14d" stroke="${L}" stroke-width="5" stroke-linejoin="round"/><polygon points="${star(0,0,124,86,14)}" fill="#fff6b0"/><text x="0" y="22" text-anchor="middle" font-size="72" font-weight="800" fill="#ff4f5e" stroke="${L}" stroke-width="8" paint-order="stroke" stroke-linejoin="round">${sc}</text>${rec?`<text x="0" y="-52" text-anchor="middle" font-size="30" font-weight="800" fill="#ff4f5e" stroke="${L}" stroke-width="6" paint-order="stroke">RECORD !</text>`:''}</g></g>`;
 setTimeout(finish,1700)}
