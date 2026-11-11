/* ---------- le jeu ---------- */
const $=id=>document.getElementById(id),KEY='kaijuchi-v1';
// icône, nom, faim rendue, points d'évolution
const FOODS={
 oeuf:[['flame','Chaleur',0,6],['heart','Câlins',0,4]],
 bebe:[['butterfly','Papillon',8,4],['apple','Pomme',14,6],['fish','Poisson',20,8],['ladybug','Coccinelle',6,3]],
 ado:[['cow','Vache',24,14],['tree','Arbre',16,9],['car','Voiture',30,18],['lamp','Lampadaire',10,6]],
 adulte:[['boat','Bateau',26,32],['heli','Hélicoptère',20,26],['crowd','Foule ×10',14,18],['bus','Bus',32,40]],
 titan:[['building','Immeuble',22,60],['cargo','Cargo',28,80],['district','Quartier',40,150]]};
const NEED={oeuf:60,bebe:80,ado:260,adulte:700,titan:0};
const BASEW={oeuf:2,bebe:12,ado:900,adulte:60000,titan:2e7};
const MIAM={bebe:['MIAM !','GLOUPS !','SLURP !'],ado:['SCRONCH !','CROC !','MIAM !'],adulte:['CROUNCH !','GLOUPS !','SCRATCH !'],titan:['GRAOUUU !','CROUNCH !','BROUM !']};
const BUB={oeuf:[660,300],bebe:[650,255],ado:[690,190],adulte:[285,160],titan:[180,330]};
['moon','soap','ball'].forEach(n=>IC[n]=['0 0 48 48',UI[n]]);
const GA=[['faim','meat','Faim','#ffb199','#ff5f3d'],['humeur','heart','Humeur','#ff9ecb','#ff4f8b'],['energie','bolt','Énergie','#ffe98a','#ffb800'],['propre','drop','Propreté','#9fe0ff','#2f9cf0']];
$('gauges').innerHTML=GA.map(g=>`<div class="gauge" id="g-${g[0]}"><div class="ic">${ui(g[1])}</div><div class="trk"><div class="fill" style="width:0%;--g1:${g[3]};--g2:${g[4]}"></div><div class="lbl"><span>${g[2]}</span><span class="pc"></span></div></div></div>`).join('');
const AC=[['feed','meat','Nourrir','#ffb36b','#f2681f'],['play','ball','Jouer','#8be08a','#2fa84f'],['sleep','moon','Dormir','#9d8cff','#5a45d6'],['wash','soap','Laver','#7fd4ff','#1f8fe0'],['destroy','boom','Détruire','#ff8a7a','#e02d4f']];
$('actions').innerHTML=AC.map(a=>`<button class="btn" data-a="${a[0]}" style="--b1:${a[3]};--b2:${a[4]}">${ui(a[1])}<span>${a[2]}</span><svg class="lock" viewBox="0 0 30 30">${UI.lock}</svg></button>`).join('');
$('species').innerHTML=D.map((d,i)=>{const vb=d.vb.join(' ');return `<div class="card" data-i="${i}" style="--cb:${d.cb}"><svg viewBox="${vb}">${rays(vb)}${mon(d,'adulte','p',false)}</svg><div class="n">${d.name}</div><div class="a">${d.tag}</div></div>`}).join('');

let S=null,CUR=null,bubKey=null,popT=0,lockT=0;
const clamp=v=>Math.max(0,Math.min(100,v)),idx=()=>ORDER.indexOf(S.stage),rnd=a=>a[Math.floor(Math.random()*a.length)];
function load(){try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.v==1&&D[s.mon]&&ST[s.stage])return s}catch(e){}return null}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

/* le temps qui passe, page ouverte ou fermée */
function decay(dt){if(S.stage=='oeuf'||dt<=0)return;dt=Math.min(dt,12*3600);
 if(S.asleep){const full=(100-S.energie)*3,d=Math.min(dt,full);S.energie=clamp(S.energie+d/3);S.faim=clamp(S.faim-d/90);dt-=d;if(S.energie>=100)S.asleep=false;if(dt<=0)return}
 const sad=(S.faim<20||S.propre<20)?2:1;
 S.faim=clamp(S.faim-dt/45);S.humeur=clamp(S.humeur-dt*sad/60);S.energie=clamp(S.energie-dt/90);S.propre=clamp(S.propre-dt/120)}

/* affichage */
function weight(){const k=S.stage,n=NEED[k],w=n?BASEW[k]+(BASEW[ORDER[idx()+1]]-BASEW[k])*Math.pow(S.xp/n,2):BASEW.titan+S.xp*4000;
 return w<1000?Math.round(w)+' kg':(w/1000).toLocaleString('fr-FR',{maximumFractionDigits:w<1e5?1:0})+' t'}
function mouth(){const p=ST[S.stage],d=CUR;return S.stage=='oeuf'?[500,470-p.m*100]:[500+p.m*(d.H[0]*p.bs+85*p.hs),470+p.m*(d.H[1]*p.bs-(1-p.bs)*(d.lift||0)+25*p.hs)]}
function need(){if(S.asleep)return 'zz';if(S.stage=='oeuf')return 'heart';
 const a=[['faim',S.faim],['moon',S.energie],['soap',S.propre],['ball',S.humeur]].sort((x,y)=>x[1]-y[1])[0];
 if(a[1]>=45)return '';const fo=FOODS[S.stage];return a[0]=='faim'?fo[S.want%fo.length][0]:a[0]}
function drawBubble(){const n=need();if(n+S.stage==bubKey)return;bubKey=n+S.stage;const B=$('bub'),[x,y]=BUB[S.stage];
 if(!n){B.innerHTML='';return}
 if(n=='zz'){const [mx,my]=mouth();B.innerHTML=`<g transform="translate(${f(mx)},${f(my-60)})"><g class="bob" style="animation-duration:2.4s"><text font-size="52" font-weight="800" fill="#fff" stroke="${L}" stroke-width="6" paint-order="stroke" stroke-linejoin="round">Z<tspan font-size="38" dy="-22">z</tspan><tspan font-size="28" dy="-18">z</tspan></text></g></g>`;return}
 const v=IC[n][0].split(' ').map(Number),k=58/Math.max(v[2],v[3]);
 B.innerHTML=`<g transform="translate(${x},${y})"><g class="bob" style="animation-duration:2.4s"><circle cx="-52" cy="58" r="6" fill="#fff" stroke="${L}" stroke-width="3"/><circle cx="-38" cy="44" r="10" fill="#fff" stroke="${L}" stroke-width="3"/><ellipse cx="0" cy="0" rx="56" ry="46" fill="#fff" stroke="${L}" stroke-width="3.5"/><ellipse cx="-20" cy="-26" rx="16" ry="6" fill="#e9f6ff"/><svg x="${-v[2]*k/2}" y="${-v[3]*k/2}" width="${v[2]*k}" height="${v[3]*k}" viewBox="${IC[n][0]}">${IC[n][1]}</svg></g></g>`}
function hud(){const k=S.stage,p=ST[k],isEgg=k=='oeuf';
 GA.forEach(g=>{const v=isEgg?100:S[g[0]],e=$('g-'+g[0]);e.querySelector('.fill').style.width=v.toFixed(0)+'%';e.querySelector('.pc').textContent=isEgg?'':v.toFixed(0)+' %';e.classList.toggle('low',v<25)});
 const cs=$('c-stage');cs.textContent=CUR.name+' · '+p.n;cs.style.setProperty('--sc',p.col);
 $('c-day').innerHTML=`Jour <b>${Math.floor((Date.now()-S.born)/864e5)+1}</b>`;$('c-w').innerHTML=`Poids <b>${weight()}</b>`;
 $('c-d').innerHTML=`Dégâts <b>${S.dmg?S.dmg+(S.dmg>1?' immeubles':' immeuble'):'aucun'}</b>`;
 $('e-next').textContent=p.next;$('e-bar').style.width=(NEED[k]?Math.min(100,100*S.xp/NEED[k]):100)+'%';
 $('scene').classList.toggle('sleep',!!S.asleep);
 document.querySelectorAll('#actions .btn').forEach(b=>{const a=b.dataset.a;b.classList.toggle('locked',isEgg||(S.asleep&&a!='sleep')||(a=='destroy'&&idx()<3));if(a=='sleep')b.querySelector('span').textContent=S.asleep?'Réveiller':'Dormir'});
 $('tray').classList.toggle('off',!!S.asleep);drawBubble()}
function drawTray(){$('tray').innerHTML=`<div class="tt">Au menu</div>`+FOODS[S.stage].map((m,i)=>`<button class="food" data-i="${i}">${ic(m[0])}<div><div class="n">${m[1]}</div><div class="v">${S.stage=='oeuf'?(i?'+ humeur':'éclosion'):'+'+m[2]+' faim'}</div></div></button>`).join('')}
function drawAlbum(){const n=idx();$('stages').innerHTML=ORDER.map((k,i)=>{const p=ST[k],ok=i<=n;return `<div class="card album${i==n?' on':''}${ok?'':' lock'}" style="--cb:${p.cb}"><svg viewBox="${p.vb}">${rays(p.vb)}<g class="sil">${k=='oeuf'?egg('c',CUR):mon(CUR,k,'c',false)}</g></svg><div class="n">${ok?p.n:'???'}</div><div class="a">${ok?p.short:'à découvrir'}</div></div>`}).join('')}
function drawMon(){const k=S.stage,p=ST[k];$('scene').dataset.s=k;zoomTo(p.z);
 MON.setAttribute('transform',`translate(500,470) scale(${p.m})`);MON.innerHTML=`<g id="act"><g class="popin">${k=='oeuf'?egg('s',CUR):mon(CUR,k,'s',true)}</g></g>`}
function drawAll(){drawMon();drawTray();drawAlbum();bubKey=null;hud()}

/* effets */
function pop(t){const [x,y]=ST[S.stage].pop,P=$('pop');clearTimeout(popT);
 P.innerHTML=`<g transform="translate(${x},${y}) rotate(-9)"><g class="popin"><polygon points="${star(0,0,96,62,13)}" fill="#ffe14d" stroke="${L}" stroke-width="4" stroke-linejoin="round"/><polygon points="${star(0,0,80,54,13)}" fill="#fff6b0"/><text x="0" y="11" text-anchor="middle" font-size="${t.length>8?27:31}" font-weight="800" fill="#ff4f5e" stroke="${L}" stroke-width="5" paint-order="stroke" stroke-linejoin="round">${t}</text></g></g>`;
 popT=setTimeout(()=>P.innerHTML='',1100)}
function react(c){const a=$('act');if(!a)return;a.setAttribute('class','');a.getBoundingClientRect();a.setAttribute('class',c)}
function fx(html,frames,ms){const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.innerHTML=html;$('fx').appendChild(g);
 const end=()=>g.remove(),an=g.animate?g.animate(frames,{duration:ms,easing:'ease-in',fill:'forwards'}):null;if(an)an.onfinish=end;setTimeout(end,ms+80)}
function fly(n){const v=IC[n][0].split(' ').map(Number),k=90/Math.max(v[2],v[3]),[mx,my]=mouth();
 fx(`<svg x="${-v[2]*k/2}" y="${-v[3]*k/2}" width="${v[2]*k}" height="${v[3]*k}" viewBox="${IC[n][0]}" style="--k:1.4">${IC[n][1]}</svg>`,
  [{transform:`translate(${f(mx+330)}px,${f(my+170)}px) scale(1)`},{transform:`translate(${f(mx+150)}px,${f(my-40)}px) scale(.9)`,offset:.55},{transform:`translate(${f(mx)}px,${f(my)}px) scale(.25)`}],480)}
function bubbles(){const p=ST[S.stage],h=p.m*p.bs*300,w=p.m*p.bs*170;for(let i=0;i<14;i++){const x=500+(Math.random()*2-1)*w,y=470-Math.random()*h,r=8+Math.random()*14;
 fx(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#fff" opacity=".65" stroke="#9fe0ff" stroke-width="3"/><circle cx="${f(x-r*.3)}" cy="${f(y-r*.3)}" r="${f(r*.25)}" fill="#fff"/>`,
  [{transform:'translateY(20px)',opacity:0},{transform:'translateY(0)',opacity:1,offset:.25},{transform:'translateY(-90px)',opacity:0}],700+Math.random()*600)}}
function boom(){const x=600+Math.random()*320,y=300+Math.random()*130;
 fx(`<g transform="translate(${f(x)},${f(y)})"><polygon points="${star(0,0,70,34,11)}" fill="#fff" stroke="${L}" stroke-width="3"/><polygon points="${star(0,0,50,22,11)}" fill="#ffd23f"/><polygon points="${star(0,0,30,13,11)}" fill="#ff7a2e"/></g>`,
  [{opacity:1},{opacity:1,offset:.7},{opacity:0}],650);
 const sc=$('screen');sc.classList.remove('shake');sc.getBoundingClientRect();sc.classList.add('shake')}
function flash(){fx(`<rect width="1000" height="600" fill="#fff"/>`,[{opacity:1},{opacity:0}],700)}

/* actions */
const busy=()=>Date.now()<lockT||(lockT=Date.now()+420,false);
function evolve(){const k=S.stage,n=NEED[k];if(!n||S.xp<n)return false;S.xp-=n;S.stage=ORDER[idx()+1];S.want=0;
 if(k=='oeuf')Object.assign(S,{faim:60,humeur:80,energie:80,propre:100});else S.humeur=clamp(S.humeur+20);
 drawAll();flash();pop(k=='oeuf'?'CRAC !':'GRAOU !');return true}
function done(){if(!evolve())hud();save()}
function refuse(t){pop(t);react('no')}
function feed(i){const k=S.stage,fo=FOODS[k];if(busy())return;
 if(k=='oeuf'){S.xp+=fo[i][3];if(i)S.humeur=clamp(S.humeur+3);react('chomp');pop(i?'SMACK !':'TOC TOC');return done()}
 if(S.asleep)return pop('ZZZ…');
 if(i==null){const w=need();i=fo.findIndex(m=>m[0]==w);if(i<0)i=Math.floor(Math.random()*fo.length)}
 if(S.faim>=96)return refuse('BEURK !');
 const m=fo[i],wanted=need()==m[0];fly(m[0]);
 setTimeout(()=>{if(!S||S.stage!=k)return;S.faim=clamp(S.faim+m[2]);S.xp+=m[3];S.propre=clamp(S.propre-3);if(wanted){S.humeur=clamp(S.humeur+6);S.want++}
  react('chomp');pop(rnd(MIAM[k]));done()},430)}
function play(){if(busy())return;if(S.asleep)return pop('ZZZ…');if(S.energie<10)return refuse('PFFF…');
 S.humeur=clamp(S.humeur+18);S.energie=clamp(S.energie-10);S.faim=clamp(S.faim-6);S.xp+=2+idx()*2;react('jump');pop(rnd(['YOUPI !','BOING !','HIHI !']));done()}
function sleep(){if(busy())return;S.asleep=!S.asleep;if(!S.asleep)pop('OUAAAH !');done()}
function wash(){if(busy())return;if(S.asleep)return pop('ZZZ…');S.propre=clamp(S.propre+40);bubbles();react('chomp');pop(rnd(['SPLASH !','PLOUF !','FROTT !']));done()}
function destroy(){if(idx()<3||busy())return;if(S.asleep)return pop('ZZZ…');if(S.energie<15)return refuse('PFFF…');
 S.energie=clamp(S.energie-15);S.faim=clamp(S.faim-8);S.humeur=clamp(S.humeur+12);S.xp+=S.stage=='titan'?70:30;S.dmg++;react('jump');boom();pop(rnd(['BOUM !','CRAAAC !','BADABOUM !']));done()}
const DO={feed:()=>feed(null),play,sleep,wash,destroy};

/* démarrage */
function show(){$('app').classList.toggle('home',!S);if(S){CUR=D[S.mon];drawAll()}}
function start(i){const now=Date.now();S={v:1,mon:i,stage:'oeuf',xp:0,faim:60,humeur:80,energie:80,propre:100,asleep:false,born:now,t:now,dmg:0,want:0};save();show();scrollTo(0,0)}
$('species').addEventListener('click',e=>{const c=e.target.closest('.card');if(c)start(+c.dataset.i)});
$('tray').addEventListener('click',e=>{const c=e.target.closest('.food');if(c&&S)feed(+c.dataset.i)});
$('actions').addEventListener('click',e=>{const c=e.target.closest('.btn');if(c&&S&&S.stage!='oeuf')DO[c.dataset.a]()});
$('b-new').addEventListener('click',()=>{if(confirm('Recommencer avec un nouvel œuf ? Ton monstre actuel sera perdu.')){try{localStorage.removeItem(KEY)}catch(e){}S=null;show()}});
setInterval(()=>{if(!S)return;const now=Date.now();decay((now-S.t)/1000);S.t=now;hud();save()},1000);
S=load();if(S){decay((Date.now()-S.t)/4000);S.t=Date.now()} // page fermée : le temps compte quatre fois moins
show();
