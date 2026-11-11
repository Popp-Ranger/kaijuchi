/* ---------- dix mini-jeux « Jouer » en rotation + mini-jeu « Laver » ---------- */
// Cadre commun : pgStart(id) ouvre le volet #mg, appelle def.init(G), puis def.tick(G,dt) à chaque image et def.down/move/up(G,x,y)
// (x,y dans le repère 1000×600 du volet). pgEnd() affiche le score et rend la main. def.par = score qui donne la récompense entière.
let PG=null;
const PGNS='http://www.w3.org/2000/svg',PGCOL=['#ff5a5a','#ffd23f','#4db8ff','#5ed36a','#ff8fc0','#b58cff'];
const pgSfx=n=>{if(typeof sfx=='function')sfx(n)};
function pgEl(html,par){const g=document.createElementNS(PGNS,'g');g.innerHTML=html;(par||PG.lay).appendChild(g);return g}
function pgAt(g,x,y,s,r){g.setAttribute('transform',`translate(${f(x)},${f(y)})`+(s&&s!=1?` scale(${f2(s)})`:'')+(r?` rotate(${f(r)})`:''))}
function pgTxt(x,y,txt,col){const g=pgEl(`<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-size="44" font-weight="800" fill="${col||'#fff'}" stroke="${L}" stroke-width="6" paint-order="stroke" stroke-linejoin="round">${txt}</text>`,PG.fx);
 if(g.animate)g.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-60px)',opacity:0}],{duration:800,easing:'ease-out'});setTimeout(()=>g.remove(),780)}
function pgAdd(n,x,y,word){PG.score+=n;$('mgsc').textContent=Math.max(0,PG.score);pgTxt(x,y,word||(n>0?'+'+n:''+n),n>0?'#7dff7a':'#ff6b6b');pgSfx(n>0?'pop':'non')}
// petit effet passager (goutte, étincelle…) qui glisse de (dx,dy) puis disparaît
function pgPuff(html,x,y,dx,dy,ms){const g=pgEl(html,PG.fx);pgAt(g,x,y);const i=g.firstElementChild;
 if(i&&i.animate)i.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${dx}px,${dy}px)`,opacity:0}],{duration:ms,easing:'ease-in'});setTimeout(()=>g.remove(),ms-30)}
function pgHint(x,y){const g=pgEl(`<circle r="46" fill="none" stroke="#fff" stroke-width="7" style="transform-box:fill-box;transform-origin:center"/>`,PG.fx);pgAt(g,x,y);
 const c=g.firstElementChild;if(c.animate)c.animate([{transform:'scale(.5)',opacity:1},{transform:'scale(1.3)',opacity:0}],{duration:800,iterations:3});setTimeout(()=>g.remove(),2400)}
// le monstre du joueur dans le volet : set(o) change son expression, flash(o,ms) le fait un instant, at(x,y,dir) le déplace
function pgMon(x,y,s,o){const G=PG,g=pgEl(''),m={g,s,base:o||{},
  set(o){g.innerHTML=mon(CUR,G.k,'g',false,Object.assign({form:S.form},o))},
  flash(o,ms){m.set(o);clearTimeout(m.ft);m.ft=setTimeout(()=>{if(PG===G)m.set(m.base)},ms)},
  at(x,y,dir){g.setAttribute('transform',`translate(${f(x)},${f(y)}) scale(${f2(G.sm*s*(dir||1))},${f2(G.sm*s)})`)}};
 m.set(m.base);m.at(x,y);return m}
const pgIcon=(n,s)=>`<g transform="scale(${s})">${preyArt(n)}</g>`;

function pgStart(id){if(mini)return;mini=true;const def=PGS[id],k=S.stage,vb=ST[k].vb.split(' ').map(Number);
 const box=$('mg'),svg=$('mgs'),sc=$('scene'),rs=$('screen');box.style.top=(sc.getBoundingClientRect().top-rs.getBoundingClientRect().top-rs.clientTop)+'px';box.style.height=sc.getBoundingClientRect().height+'px';box.style.cursor='pointer';box.hidden=false;
 svg.innerHTML=`<defs><linearGradient id="mgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${def.sky||'#38a4f7'}"/><stop offset=".6" stop-color="#8fdcff"/><stop offset="1" stop-color="#fff0c9"/></linearGradient></defs>
<rect width="1000" height="600" fill="url(#mgSky)"/>${cloud(170,110,1,2)}${cloud(560,80,.8,9)}${cloud(860,170,.7,5)}
<path d="M0 520 C150 480,300 500,450 520 C620 490,800 480,1000 515 L1000 600 L0 600 Z" fill="#8fe06a"/><rect y="${GROUND_Y}" width="1000" height="60" fill="#5fc65f"/>
<g id="pgl"></g><g id="mgfx"></g>
<g transform="translate(24,16)"><rect width="190" height="54" rx="18" fill="#fff" stroke="${L}" stroke-width="4"/><text id="mgsc" x="95" y="39" text-anchor="middle" font-size="32" font-weight="800" fill="${L}">0</text></g>
<g transform="translate(380,26)"><rect width="240" height="26" rx="13" fill="#fff" stroke="${L}" stroke-width="4"/><rect id="mgt" x="4" y="4" width="232" height="18" rx="9" fill="#ffb800"/></g>`;
 const G=PG={id,def,k,t:0,score:0,dur:def.dur||20,sm:Math.min(1,240/-vb[1]),lay:$('pgl'),fx:$('mgfx'),box,svg,done:false,dn:false,last:performance.now(),raf:0};
 G.later=(fn,ms)=>setTimeout(()=>{if(PG===G&&!G.done)fn()},ms);
 const pt=e=>{const m=svg.getScreenCTM();if(!m)return [500,300];const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse());return [p.x,p.y]};
 const ev=n=>e=>{if(PG!==G||G.done||e.target.closest('button'))return;if(e.cancelable)e.preventDefault();if(n=='down')G.dn=true;const [x,y]=pt(e);if(def[n])def[n](G,x,y);if(n=='up')G.dn=false};
 G.h=[['pointerdown',ev('down')],['pointermove',ev('move')],['pointerup',ev('up')],['pointercancel',ev('up')]];G.h.forEach(h=>box.addEventListener(h[0],h[1]));
 $('mg-skip').onclick=()=>pgEnd(true);
 def.init(G);if(def.hint)pgHint(def.hint[0],def.hint[1]);G.raf=requestAnimationFrame(pgTick)}
function pgTick(now){const G=PG;if(!G||G.done)return;G.raf=requestAnimationFrame(pgTick);const dt=Math.min(.05,(now-G.last)/1000);G.last=now;G.t+=dt;
 if(G.def.tick)G.def.tick(G,dt);if(PG!==G||G.done)return;
 $('mgt').setAttribute('width',f(232*Math.max(0,1-G.t/G.dur)));if(G.t>=G.dur)pgEnd(false)}
function pgEnd(skip){const G=PG;if(!G||G.done)return;G.done=true;cancelAnimationFrame(G.raf);
 const sc=Math.max(0,G.score),own=G.def.end,rec=!own&&!skip&&sc>(S.best[G.id]||0);
 const finish=()=>{G.h.forEach(h=>G.box.removeEventListener(h[0],h[1]));G.box.style.cursor='';G.box.hidden=true;$('mgs').innerHTML='';PG=null;mini=false;
  if(own)return own(G,skip);
  const r=skip?0:Math.min(1,sc/G.def.par);S.humeur=clamp(S.humeur+10+Math.round(20*r));S.energie=clamp(S.energie-10);gain(2+Math.round(10*r));
  if(rec)S.best[G.id]=sc;react('jump');pop(skip?'BOING !':rec?'RECORD !':rnd(['YOUPI !','BOING !','HIHI !']));done()};
 if(skip||own)return own&&!skip?setTimeout(finish,700):finish();
 G.lay.style.pointerEvents='none';G.fx.innerHTML=`<g transform="translate(500,270) rotate(-7)"><g class="popin"><polygon points="${star(0,0,150,96,14)}" fill="#ffe14d" stroke="${L}" stroke-width="5" stroke-linejoin="round"/><polygon points="${star(0,0,124,86,14)}" fill="#fff6b0"/><text x="0" y="22" text-anchor="middle" font-size="72" font-weight="800" fill="#ff4f5e" stroke="${L}" stroke-width="8" paint-order="stroke" stroke-linejoin="round">${sc}</text>${rec?`<text x="0" y="-52" text-anchor="middle" font-size="30" font-weight="800" fill="#ff4f5e" stroke="${L}" stroke-width="6" paint-order="stroke">RECORD !</text>`:''}</g></g>`;
 setTimeout(finish,1700)}

const pgBush=()=>`<g fill="#3fae55" stroke="${L}" stroke-width="3.5"><rect x="-84" y="-44" width="168" height="48" rx="22"/><circle cx="-44" cy="-44" r="44"/><circle cx="44" cy="-44" r="44"/><circle cx="0" cy="-70" r="50"/></g><rect x="-80" y="-42" width="160" height="40" rx="20" fill="#3fae55"/><circle cx="-18" cy="-84" r="9" fill="#8ee89f"/><circle cx="40" cy="-52" r="7" fill="#8ee89f"/>`;
const pgEyes=()=>`<ellipse cx="-14" cy="0" rx="12" ry="14" fill="#fff" stroke="${L}" stroke-width="3"/><ellipse cx="14" cy="0" rx="12" ry="14" fill="#fff" stroke="${L}" stroke-width="3"/><circle cx="-11" cy="1" r="5.5" fill="${L}"/><circle cx="17" cy="1" r="5.5" fill="${L}"/>`;
const pgBall=()=>balloonArt(rnd(PGCOL));

const PGS={
 /* 1. cache-cache : deux yeux dépassent un instant d'un buisson, il faut toucher le bon */
 cache:{par:7,init(G){G.bx=[130,315,500,685,870];G.m=pgMon(500,GROUND_Y,.55,{mood:'miam'});G.m.g.style.display='none';G.peek=pgEl(pgEyes());
   G.bx.forEach(x=>pgAt(pgEl(pgBush()),x,GROUND_Y));G.n=0;PGS.cache.round(G)},
  round(G){G.ph='show';G.at=ri(5);G.m.g.style.display='none';pgAt(G.peek,G.bx[G.at],GROUND_Y-124);G.peek.style.display='';
   G.later(()=>{G.peek.style.display='none';G.ph='guess'},Math.max(260,820-G.n*70));G.n++},
  down(G,x,y){if(G.ph!='guess'||y<360)return;const i=G.bx.findIndex(b=>Math.abs(b-x)<88);if(i<0)return;G.ph='rev';
   G.m.at(G.bx[G.at],GROUND_Y-72);G.m.g.style.display='';
   if(i==G.at)pgAdd(1,G.bx[i],GROUND_Y-230,'COUCOU !');else{pgTxt(G.bx[i],GROUND_Y-160,'OUPS !','#ff6b6b');pgSfx('non')}
   G.later(()=>PGS.cache.round(G),750)}},

 /* 2. Jacques a dit : refaire la suite de tambours, qui s'allonge */
 simon:{par:5,dur:45,init(G){G.m=pgMon(500,GROUND_Y,.8,{});
   G.pads=[[190,250],[810,250],[190,460],[810,460]].map((p,i)=>{const g=pgEl(`<circle r="78" fill="${PGCOL[i]}" stroke="${L}" stroke-width="5"/><ellipse cx="-24" cy="-32" rx="24" ry="12" fill="#fff" opacity=".5"/>`);pgAt(g,p[0],p[1]);g.style.opacity=.45;return {g,x:p[0],y:p[1]}});
   G.seq=[];PGS.simon.next(G)},
  lit(G,i,ms){const p=G.pads[i];p.g.style.opacity=1;pgAt(p.g,p.x,p.y,1.15);pgSfx('pop');clearTimeout(p.t);p.t=setTimeout(()=>{if(PG===G){p.g.style.opacity=.45;pgAt(p.g,p.x,p.y)}},ms)},
  next(G){G.ph='play';G.seq.push(ri(4));G.i=0;G.seq.forEach((s,j)=>G.later(()=>PGS.simon.lit(G,s,330),550+j*520));G.later(()=>{G.ph='in'},420+G.seq.length*520)},
  down(G,x,y){if(G.ph!='in')return;const i=G.pads.findIndex(p=>Math.hypot(p.x-x,p.y-y)<98);if(i<0)return;PGS.simon.lit(G,i,200);
   if(i!=G.seq[G.i]){G.ph='x';G.m.set({mood:'triste'});pgTxt(500,200,'OUPS !','#ff6b6b');pgSfx('non');G.later(()=>pgEnd(false),800);return}
   if(++G.i>=G.seq.length){G.ph='ok';pgAdd(1,500,200,'BRAVO !');G.m.flash({mood:'miam'},600);G.later(()=>PGS.simon.next(G),800)}}},

 /* 3. saute-voitures : toucher pour sauter par-dessus ce qui arrive */
 saute:{par:12,hint:[500,300],init(G){G.m=pgMon(220,GROUND_Y,.6,{});G.y=0;G.vy=0;G.obs=[];G.sp=1},
  down(G){if(G.y>=0){G.vy=-780;G.y=-1;pgSfx('pop')}},
  tick(G,dt){const v=330+G.t*14;G.sp-=dt;
   if(G.sp<=0&&G.t<G.dur-1.5){G.obs.push({g:pgEl(pgIcon(rnd(['car','bus','cow']),1.5)),x:1080});G.sp=(1.1+Math.random()*1.1)*330/v}
   G.vy+=2000*dt;G.y=Math.min(0,G.y+G.vy*dt);if(G.y>=0)G.vy=0;G.m.at(220,GROUND_Y+G.y);
   G.obs=G.obs.filter(o=>{o.x-=v*dt;pgAt(o.g,o.x,GROUND_Y-46);
    if(Math.abs(o.x-220)<58&&G.y>-62){o.g.remove();pgAdd(-1,220,GROUND_Y-180,'AÏE !');G.m.flash({mood:'triste'},400);return false}
    if(!o.ok&&o.x<150){o.ok=1;pgAdd(1,220,GROUND_Y-200,'HOP !')}
    if(o.x<-80){o.g.remove();return false}return true})}},

 /* 4. tape-taupes : taper les proies qui sortent des trous, pas les bombes */
 taupe:{par:12,init(G){G.h=[];for(let j=0;j<2;j++)for(let i=0;i<3;i++){const x=250+i*250,y=330+j*170;pgAt(pgEl(`<ellipse rx="92" ry="30" fill="#5a3d2b" stroke="${L}" stroke-width="4"/><ellipse cy="6" rx="70" ry="17" fill="#3b2619"/>`),x,y);G.h.push({x,y,o:null})}G.sp=.4},
  tick(G,dt){G.sp-=dt;if(G.sp<=0){const fr=G.h.filter(h=>!h.o);if(fr.length){const h=rnd(fr),bad=Math.random()<.25;
     h.o={bad,t:Math.max(.6,1.25-G.t*.03),g:pgEl(`<g class="popin">${bad?bombArt():pgIcon(rnd(FOODS[G.k])[0],1.4)}</g>`)};pgAt(h.o.g,h.x,h.y-48)}G.sp=Math.max(.3,.75-G.t*.02)}
   G.h.forEach(h=>{if(h.o&&(h.o.t-=dt)<=0){h.o.g.remove();h.o=null}})},
  down(G,x,y){const h=G.h.find(h=>h.o&&Math.abs(h.x-x)<98&&y>h.y-125&&y<h.y+35);if(!h)return;pgAdd(h.o.bad?-1:1,h.x,h.y-100,h.o.bad?'BOUM !':'PAF !');h.o.g.remove();h.o=null}},

 /* 5. jonglage : garder les ballons en l'air en les touchant */
 jongle:{par:18,init(G){G.m=pgMon(500,GROUND_Y,.7,{});G.b=[]},
  drop(o){o.x=200+Math.random()*600;o.y=-50;o.vx=(Math.random()-.5)*120;o.vy=60},
  tick(G,dt){if(G.b.length<Math.min(4,1+Math.floor(G.t/5))){const o={g:pgEl(pgBall())};PGS.jongle.drop(o);G.b.push(o)}
   G.b.forEach(o=>{o.vy+=330*dt;o.x+=o.vx*dt;o.y+=o.vy*dt;if(o.x<40){o.x=40;o.vx=Math.abs(o.vx)}if(o.x>960){o.x=960;o.vx=-Math.abs(o.vx)}
    if(o.y>GROUND_Y-30){pgTxt(o.x,GROUND_Y-70,'PAF !','#ff6b6b');pgSfx('non');PGS.jongle.drop(o)}pgAt(o.g,o.x,o.y,1.5)})},
  down(G,x,y){const o=G.b.find(o=>Math.hypot(o.x-x,o.y-y)<85);if(!o)return;o.vy=-330-Math.random()*60;o.vx=Math.max(-260,Math.min(260,(o.x-x)*4+(Math.random()-.5)*80));pgAdd(1,o.x,o.y-50,'BOING !')}},

 /* 6. rugissement : maintenir pour gonfler le cri, relâcher dans la zone verte */
 rugit:{par:7,hint:[430,300],init(G){G.m=pgMon(430,GROUND_Y,.9,{});pgEl(`<rect x="850" y="120" width="60" height="380" rx="30" fill="#fff" stroke="${L}" stroke-width="5"/>`);G.z=pgEl('');G.c=pgEl('');G.p=0;PGS.rugit.zone(G)},
  zone(G){G.zh=Math.max(.13,.26-G.score*.02);G.z0=.3+Math.random()*(.66-G.zh);G.z.innerHTML=`<rect x="855" y="${f(496-(G.z0+G.zh)*372)}" width="50" height="${f(G.zh*372)}" rx="8" fill="#5ed36a"/>`},
  down(G){G.hold=true;G.p=0},
  up(G){if(!G.hold)return;G.hold=false;
   if(G.p>=G.z0&&G.p<=G.z0+G.zh){pgAdd(1,430,170,'GRAOU !');pgSfx('roar');G.m.flash({pose:'frappe',mood:'colere'},500);PGS.rugit.zone(G)}
   else{pgTxt(430,170,G.p<G.z0?'PFFF…':'KOF !','#ff6b6b');pgSfx('non');G.m.flash({mood:'triste'},400)}G.p=0},
  tick(G,dt){if(G.hold){G.p+=dt*(.75+G.score*.08);if(G.p>1){G.p=0;G.hold=false;pgTxt(430,170,'KOF !','#ff6b6b');pgSfx('non')}}
   G.c.innerHTML=`<rect x="868" y="${f(496-G.p*372)}" width="24" height="${f(G.p*372+.1)}" rx="9" fill="#ff8a3c" stroke="${L}" stroke-width="3"/>`}},

 /* 7. mémo : retrouver les six paires */
 memo:{par:6,dur:45,init(G){const ic=['apple','fish','car','boat','heli','cow'],d=ic.concat(ic).map(n=>[Math.random(),n]).sort((a,b)=>a[0]-b[0]).map(a=>a[1]);G.open=[];G.left=6;
   G.c=d.map((n,i)=>{const c={n,x:267+(i%4)*155,y:160+Math.floor(i/4)*150,up:false,ok:false,g:pgEl('')};pgAt(c.g,c.x,c.y);PGS.memo.draw(c);return c})},
  draw(c){c.g.innerHTML=`<rect x="-65" y="-65" width="130" height="130" rx="22" fill="${c.up?'#fff':'#ff8fc0'}" stroke="${L}" stroke-width="5"/>`+(c.up?pgIcon(c.n,1.4):`<polygon points="${star(0,0,34,15,5)}" fill="#ffd23f" stroke="${L}" stroke-width="3" stroke-linejoin="round"/>`);c.g.style.opacity=c.ok?.6:1},
  down(G,x,y){if(G.lock)return;const c=G.c.find(c=>!c.up&&Math.abs(c.x-x)<68&&Math.abs(c.y-y)<68);if(!c)return;c.up=true;PGS.memo.draw(c);pgSfx('pop');G.open.push(c);if(G.open.length<2)return;
   const a=G.open[0],b=G.open[1];G.open=[];
   if(a.n==b.n){a.ok=b.ok=true;PGS.memo.draw(a);PGS.memo.draw(b);pgAdd(1,b.x,b.y-70,'DING !');if(!--G.left)G.later(()=>pgEnd(false),600)}
   else{G.lock=true;G.later(()=>{a.up=b.up=false;PGS.memo.draw(a);PGS.memo.draw(b);G.lock=false},650)}}},

 /* 8. tir : toucher le ciel pour lancer un rocher vers les ballons qui passent */
 tir:{par:10,hint:[500,200],init(G){G.m=pgMon(500,GROUND_Y,.7,{});G.tg=[];G.rk=[];G.sp=.3;G.cd=0},
  tick(G,dt){G.cd-=dt;G.sp-=dt;if(G.sp<=0){const d=rnd([-1,1]);G.tg.push({g:pgEl(pgBall()),x:d>0?-50:1050,y:100+Math.random()*190,v:d*(130+Math.random()*120+G.t*5)});G.sp=.9}
   G.tg=G.tg.filter(o=>{o.x+=o.v*dt;pgAt(o.g,o.x,o.y,1.3);if(o.x<-80||o.x>1080){o.g.remove();return false}return true});
   G.rk=G.rk.filter(r=>{r.x+=r.vx*dt;r.y+=r.vy*dt;pgAt(r.g,r.x,r.y);const t=G.tg.find(o=>Math.hypot(o.x-r.x,o.y-r.y)<50);
    if(t){t.g.remove();G.tg=G.tg.filter(o=>o!==t);r.g.remove();pgAdd(1,t.x,t.y,'POP !');return false}
    if(r.y<-40||r.x<-40||r.x>1040){r.g.remove();return false}return true})},
  down(G,x,y){const sx=500,sy=GROUND_Y-150;if(G.cd>0||y>sy-20)return;G.cd=.4;const d=Math.hypot(x-sx,y-sy)||1;
   G.rk.push({g:pgEl(`<circle r="16" fill="#8a84a3" stroke="${L}" stroke-width="4"/><circle cx="-5" cy="-5" r="4" fill="#fff" opacity=".5"/>`),x:sx,y:sy,vx:(x-sx)/d*850,vy:(y-sy)/d*850});pgSfx('thud');G.m.flash({pose:'frappe'},250)}},

 /* 9. danse : toucher la bonne colonne quand l'étoile arrive sur le rond */
 danse:{par:16,init(G){G.m=pgMon(130,GROUND_Y,.6,{});G.lx=[400,600,800];
   G.pd=G.lx.map((x,i)=>{pgEl(`<rect x="${x-4}" y="70" width="8" height="400" rx="4" fill="#fff" opacity=".35"/>`);const g=pgEl(`<circle r="54" fill="${PGCOL[i]}" fill-opacity=".4" stroke="${L}" stroke-width="5"/>`);pgAt(g,x,470);return g});G.nt=[];G.sp=.5;G.dir=1},
  tick(G,dt){const v=300+G.t*8;G.sp-=dt;
   if(G.sp<=0&&G.t<G.dur-1.6){const i=ri(3);G.nt.push({i,y:-40,g:pgEl(`<polygon points="${star(0,0,40,20,5)}" fill="${PGCOL[i]}" stroke="${L}" stroke-width="4" stroke-linejoin="round"/>`)});G.sp=Math.max(.42,.75-G.t*.015)}
   G.nt=G.nt.filter(n=>{n.y+=v*dt;pgAt(n.g,G.lx[n.i],n.y);if(n.y>570){n.g.remove();return false}return true})},
  down(G,x,y){const i=G.lx.findIndex(l=>Math.abs(l-x)<100);if(i<0)return;const n=G.nt.find(n=>n.i==i&&Math.abs(n.y-470)<64);
   pgAt(G.pd[i],G.lx[i],470,1.15);G.later(()=>pgAt(G.pd[i],G.lx[i],470),120);
   if(n){n.g.remove();G.nt=G.nt.filter(o=>o!==n);pgAdd(1,G.lx[i],390,'TCHAC !');G.dir=-G.dir;G.m.at(130,GROUND_Y,G.dir)}else pgAdd(-1,G.lx[i],390,'COUAC !')}},

 /* 10. chatouilles : frotter la tête, le ventre ou les pieds pour trouver l'endroit qui le fait rire */
 chat:{par:6,hint:[500,400],init(G){G.m=pgMon(500,GROUND_Y,1.25,{});G.z=ri(3);G.a=0;G.w=0},
  down(G,x,y){G.px=x;G.py=y},up(G){G.px=null},
  move(G,x,y){if(!G.dn){G.px=null;return}if(G.px!=null){const d=Math.hypot(x-G.px,y-G.py),z=Math.abs(x-500)>190||y<235||y>GROUND_Y+10?-1:y<348?0:y<448?1:2;
    if(z==G.z){G.a+=d;if(!G.lol){G.lol=1;G.m.set({mood:'miam'})}
     if(G.a>520){G.a=0;G.w=0;G.lol=0;pgAdd(1,500,200,'HIHIHI !');let n;do n=ri(3);while(n==G.z);G.z=n;G.m.flash({mood:'miam'},500)}}
    else if(z>=0){G.w+=d;if(G.lol){G.lol=0;G.m.set({})}if(G.w>320){G.w=0;pgTxt(x,y-40,'HMPF…','#ff6b6b')}}}
   G.px=x;G.py=y}}
};

/* rotation : les dix jeux passent tous avant qu'un seul ne revienne */
const PGIDS=Object.keys(PGS);
function pgPick(){if(!S.bag||!S.bag.length){S.bag=PGIDS.map(n=>[Math.random(),n]).sort((a,b)=>a[0]-b[0]).map(a=>a[1]);if(S.bag.length>1&&S.bag[S.bag.length-1]==S.lastG)S.bag.reverse()}
 let id=S.bag.pop();if(!PGS[id])id=PGIDS[0];S.lastG=id;return id}
startCatch=function(){if(!mini)pgStart(pgPick())};

/* ---------- mini-jeu « Laver » : eau, savon, rinçage, serviette ---------- */
const LAVE_ART=[
 ()=>`<g transform="rotate(-25)"><rect x="-8" y="-70" width="16" height="52" rx="7" fill="#c9d3e6" stroke="${L}" stroke-width="3.5"/><path d="M-34 -18 L34 -18 L26 6 L-26 6 Z" fill="#8fa3c9" stroke="${L}" stroke-width="3.5" stroke-linejoin="round"/><g fill="#4db8ff"><ellipse cx="-18" cy="20" rx="4" ry="8"/><ellipse cx="0" cy="26" rx="4" ry="8"/><ellipse cx="18" cy="20" rx="4" ry="8"/></g></g>`,
 ()=>`<g transform="rotate(-12)"><rect x="-36" y="-22" width="72" height="44" rx="16" fill="#ff8fc0" stroke="${L}" stroke-width="3.5"/><ellipse cx="-12" cy="-8" rx="14" ry="6" fill="#fff" opacity=".6"/><circle cx="30" cy="-24" r="10" fill="#fff" stroke="${L}" stroke-width="2.5"/><circle cx="42" cy="-8" r="6" fill="#fff" stroke="${L}" stroke-width="2.5"/></g>`,
 null,
 ()=>`<g transform="rotate(8)"><path d="M-40 -34 L40 -34 L40 30 Q20 40 0 30 Q-20 20 -40 30 Z" fill="#ffe14d" stroke="${L}" stroke-width="3.5" stroke-linejoin="round"/><path d="M-40 -18 L40 -18 M-40 -6 L40 -6" stroke="#ff9a3c" stroke-width="6"/></g>`];
LAVE_ART[2]=LAVE_ART[0];
const LAVE_W=['SPLASH !','FROTT !','PLOUF !','PFOUF !'];
PGS_LAVE={par:4,dur:45,sky:'#6fc3f0',hint:[500,400],
 init(G){G.m=pgMon(500,GROUND_Y,1.25,{});G.bl=pgEl('');G.pips=pgEl('');G.tool=pgEl('');G.ph=-1;G.tx=780;G.ty=240;PGS_LAVE.next(G)},
 next(G){G.ph++;G.a=0;G.score=Math.min(4,G.ph);$('mgsc').textContent=G.score+' / 4';
  G.pips.innerHTML=LAVE_ART.map((a,i)=>`<g transform="translate(${70+i*84},118) scale(.62)" opacity="${i<G.ph?.35:1}"><circle r="56" fill="${i==G.ph?'#ffe14d':'#fff'}" stroke="${L}" stroke-width="5"/>${a()}</g>`).join('');
  if(G.ph>=4){G.bl.innerHTML='';G.tool.innerHTML='';G.m.set({mood:'miam'});return pgEnd(false)}
  if(G.ph==3)G.bl.innerHTML='';G.tool.innerHTML=LAVE_ART[G.ph]();pgAt(G.tool,G.tx,G.ty,1.3)},
 fx(G,x,y){const r=()=>(Math.random()-.5)*70;
  if(G.ph==0||G.ph==2)for(let i=0;i<3;i++)pgPuff(`<ellipse rx="5" ry="10" fill="#4db8ff" stroke="${L}" stroke-width="2"/>`,x+r(),y+r()*.4,0,90,520);
  if(G.ph==1)pgAt(pgEl(`<circle r="${f(12+Math.random()*14)}" fill="#fff" fill-opacity=".85" stroke="#bfe6ff" stroke-width="3"/><circle cx="-5" cy="-5" r="4" fill="#fff"/>`,G.bl),x+r(),y+r());
  if(G.ph==2&&G.bl.firstChild){G.bl.firstChild.remove();if(G.bl.firstChild)G.bl.firstChild.remove()}
  if(G.ph==3)pgPuff(`<polygon points="${star(0,0,16,6,4)}" fill="#fff6a0" stroke="${L}" stroke-width="2"/>`,x+r(),y+r(),0,-40,600)},
 down(G,x,y){G.px=x;G.py=y;G.tx=x;G.ty=y-40;pgAt(G.tool,G.tx,G.ty,1.3)},up(G){G.px=null},
 move(G,x,y){if(G.ph>3)return;G.tx=x;G.ty=y-40;pgAt(G.tool,G.tx,G.ty,1.3);if(!G.dn){G.px=null;return}
  if(G.px!=null&&Math.abs(x-500)<200&&y>230&&y<GROUND_Y+10){const d=Math.hypot(x-G.px,y-G.py);G.a+=d;G.e=(G.e||0)+d;if(G.e>42){G.e=0;PGS_LAVE.fx(G,x,y)}
   if(G.a>850){pgTxt(500,190,LAVE_W[G.ph],'#7dff7a');pgSfx('bulles');PGS_LAVE.next(G)}}
  G.px=x;G.py=y},
 // fin : le lavage d'origine s'applique toujours ; les quatre étapes faites rendent le monstre tout propre
 end(G,skip){const full=!skip&&G.ph>=4;LAVE0();if(full){S.propre=100;S.humeur=clamp(S.humeur+8);done()}}};
var PGS_LAVE;
const LAVE0=DO.wash;
DO.wash=function(){if(mini||busy())return;if(S.asleep)return pop('ZZZ…');PG_LAVE_GO()};
function PG_LAVE_GO(){PGS.lave=PGS_LAVE;pgStart('lave');delete PGS.lave}
