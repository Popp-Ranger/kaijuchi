/* ---------- Grondo v2 : silhouette propre, volume, expressions, poses ---------- */
const GRONDO_V1=Object.assign({},D[0],{id:'g0'});
const GPL='M-22 8 L-28 -8 L-16 -10 L-22 -30 L-9 -27 L0 -60 L9 -27 L22 -31 L17 -10 L29 -9 L22 8 Z';
SH.gplate=t=>`<path class="ol" d="${GPL}" fill="${t.gs}"/><path d="M-10 6 L-12 -8 L-6 -12 L0 -44 L6 -12 L11 -8 L10 6 Z" fill="#fff" opacity=".55"/><path d="M0 -40 L0 4 M-13 -9 L-4 -1 M13 -10 L4 -1" stroke="${t.c.sp2}" stroke-width="2.2" fill="none" opacity=".75" stroke-linecap="round"/>`;
SH.gfar=t=>`<path class="ol" d="${GPL}" fill="${t.c.spd}"/>`;
SH.gbump=t=>`<path class="ol" d="M-18 8 C-23 -10,-12 -36,0 -42 C12 -36,23 -10,18 8 Z" fill="${t.gs}"/><path d="M-7 4 C-9 -10,-4 -24,0 -30 C4 -24,8 -10,7 4 Z" fill="#fff" opacity=".55"/>`;
SH.gbumpFar=t=>`<path class="ol" d="M-18 8 C-23 -10,-12 -36,0 -42 C12 -36,23 -10,18 8 Z" fill="${t.c.spd}"/>`;
// expression : sourcil, paupière (part fermée), inclinaison de paupière, mâchoire (degrés), bouche
const GMOOD={
 content:{b:8,lid:.1,sl:0,jaw:0,m:'smile'},
 faim:{b:-12,lid:.06,sl:-.1,jaw:10,m:'open',py:4},
 triste:{b:-26,lid:.36,sl:-.3,jaw:0,m:'frown',py:5},
 fatigue:{b:-8,lid:.58,sl:-.05,jaw:7,m:'open',pup:.8,py:3},
 colere:{b:30,lid:.3,sl:.34,jaw:5,m:'grit',pup:.62},
 dodo:{b:-4,lid:1,sl:0,jaw:0,m:'smile'},
 miam:{b:12,lid:1,sl:0,jaw:25,m:'open',happy:1}};

function geye(t,x,y,r,M){const{p,c,G}=t,ir=r*.66,px=r*.22,py=r*.04+(M.py||0),id=G('ce'),rx=r*.93;
 let s=`<g transform="translate(${x},${y}) scale(${f2(p.es)})">`;
 if(p.glow&&M.lid<1)s+=`<circle r="${f(r*1.45)}" fill="${c.glow}" opacity=".75" filter="${t.fl}"/>`;
 s+=`<clipPath id="${id}"><ellipse rx="${f(rx)}" ry="${r}"/></clipPath>`;
 if(M.lid>=1){ // œil fermé
  s+=`<ellipse class="ol" rx="${f(rx)}" ry="${r}" fill="${c.body}"/><ellipse cx="${f(-r*.2)}" cy="${f(-r*.35)}" rx="${f(r*.5)}" ry="${f(r*.3)}" fill="#fff" opacity=".18"/>`;
  s+=M.happy?`<path d="M${f(-r*.68)} ${f(r*.28)} Q0 ${f(-r*.7)} ${f(r*.68)} ${f(r*.28)}" stroke="${L}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`
   :`<path d="M${f(-r*.68)} ${f(-r*.05)} Q0 ${f(r*.62)} ${f(r*.68)} ${f(-r*.05)}" stroke="${L}" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M${f(-r*.5)} ${f(r*.22)} l-5 7 M${f(-r*.1)} ${f(r*.34)} l-2 8 M${f(r*.34)} ${f(r*.28)} l3 7" stroke="${L}" stroke-width="2.6" stroke-linecap="round"/>`;
  return s+'</g>'}
 s+=`<ellipse rx="${f(rx)}" ry="${r}" fill="#fff"/><g clip-path="url(#${id})"><ellipse cx="0" cy="${f(r*.9)}" rx="${f(rx)}" ry="${f(r*.5)}" fill="#c9d3ee" opacity=".7"/>
 <circle cx="${f(px)}" cy="${f(py)}" r="${f(ir)}" fill="url(#${G('ge')})"/><circle cx="${f(px)}" cy="${f(py)}" r="${f(ir)}" fill="none" stroke="${L}" stroke-width="2" opacity=".55"/>
 <path d="M${f(px-ir*.7)} ${f(py+ir*.4)} A${f(ir*.8)} ${f(ir*.8)} 0 0 0 ${f(px+ir*.7)} ${f(py+ir*.4)}" stroke="#fff" stroke-width="2" fill="none" opacity=".45"/>`;
 const pr=ir*(p.pup||.46)*(M.pup||1);
 s+=p.slit?`<ellipse cx="${f(px+2)}" cy="${f(py)}" rx="${f(r*.16*(M.pup||1))}" ry="${f(ir*.86)}" fill="${L}"/>`:`<circle cx="${f(px+2)}" cy="${f(py)}" r="${f(pr)}" fill="${L}"/>`;
 s+=`<circle cx="${f(r*.5)}" cy="${f(py-r*.3)}" r="${f(r*.22)}" fill="#fff"/><circle cx="${f(r*.02)}" cy="${f(py+r*.36)}" r="${f(r*.1)}" fill="#fff"/>`;
 const y0=-r+2*r*M.lid-M.sl*r,y1=-r+2*r*M.lid+M.sl*r; // paupière
 s+=`<path d="M${-r-2} ${-r-2} L${r+2} ${-r-2} L${r+2} ${f(y1)} Q0 ${f((y0+y1)/2+r*.14)} ${-r-2} ${f(y0)} Z" fill="${c.body}"/><path d="M${-r-2} ${f(y0)} Q0 ${f((y0+y1)/2+r*.14)} ${r+2} ${f(y1)}" stroke="${L}" stroke-width="3" fill="none"/>
 <path d="M${-r} ${-r} L${r} ${-r} L${r} ${f(-r*.55)} Q0 ${f(-r*.2)} ${-r} ${f(-r*.55)} Z" fill="${L}" opacity=".16"/></g>`;
 if(t.mood=='fatigue')s+=`<path d="M${f(-r*.6)} ${f(r*1.2)} Q0 ${f(r*1.5)} ${f(r*.6)} ${f(r*1.2)}" stroke="${c.dark}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>`;
 if(M.lid<.5)s+=`<ellipse class="lid" rx="${f(r*.98)}" ry="${f(r*1.05)}" fill="${c.body}" stroke="${L}" stroke-width="3"/>`;
 return s+`<ellipse class="ol" rx="${f(rx)}" ry="${r}" fill="none"/></g>`}

Object.assign(D[0],{H:[52,-262],hand:[140,-134],hat:[0,-4,1.12],
 c:{body:'#5b6c9a',hi:'#b4c4ea',dark:'#2c375e',deep:'#1c2444',belly:'#f6f8ff',belly2:'#aeb8de',bl:'#8590bf',sp:'#f2ffff',sp2:'#2fb8e6',spd:'#1a6f9c',i1:'#ffe27a',i2:'#e8590c',glow:'#7df9ff'},
 body(t){const{c,gb,p,G}=t,baby=t.k=='bebe',pl=baby?'gbump':'gplate',pf=baby?'gbumpFar':'gfar';
  const TAILP='M-36 -128 C-96 -132,-158 -112,-198 -74 C-214 -58,-230 -52,-246 -66 C-256 -76,-268 -74,-268 -60 C-268 -24,-232 0,-190 0 C-140 0,-88 -6,-36 -10 Z',
   BODYP='M-78 -62 C-100 -134,-66 -222,2 -236 C40 -244,72 -226,86 -196 C100 -166,100 -112,90 -78 C80 -40,52 -18,8 -16 C-36 -14,-68 -30,-78 -62 Z',
   LEGP='M-22 -74 C-26 -116,10 -132,44 -124 C78 -116,90 -84,80 -56 C76 -46,78 -40,86 -34 C100 -32,112 -22,112 -10 C112 -3,106 0,98 0 L22 0 C6 0,-4 -10,-2 -30 C-14 -42,-20 -58,-22 -74 Z',
   ARMP='M-14 -10 C2 -26,32 -20,50 -4 C64 6,82 16,92 28 C100 40,92 55,77 51 C58 45,40 37,22 29 C2 22,-20 12,-14 -10 Z';
  const toes=k=>ol2('M96 -27 L123 -18 L100 -8 Z',k)+ol2('M100 -13 L125 -3 L100 0 Z',k)+ol2('M72 -9 L91 -1 L72 0 Z',k),
   claws=k=>ol2('M84 29 L108 33 L90 44 Z',k)+ol2('M80 41 L103 52 L80 54 Z',k)+ol2('M71 48 L88 63 L66 58 Z',k);
  const aa=t.pose=='frappe'?-82:t.pose=='mange'?-28:0;
  const back=[[-30,-218,-30,1],[-62,-181,-52,1.3],[-81,-131,-76,1.25],[-79,-85,-98,.95]],tl=[[-100,-125,-8,.8],[-146,-111,-22,.68],[-187,-81,-40,.52],[-224,-59,-36,.38]];
  const far=a=>a.map(q=>[q[0]+12,q[1]-7,q[2]+6,q[3]*.9]);
  let s=`<g transform="translate(-56,-6)">${ol(LEGP,c.dark)}${toes('#cfc7b0')}<path d="M-22 -74 C-26 -116,10 -132,44 -124 C10 -110,0 -70,10 -30 L-2 -30 C-14 -42,-20 -58,-22 -74 Z" fill="${c.deep}" opacity=".4"/></g>`;
  // queue
  s+=orns(pf,t,far(tl),t.bs,t.ss,0)+orns(pl,t,tl,t.bs,t.ss);
  s+=`<clipPath id="${G('ct')}"><path d="${TAILP}"/></clipPath>`+ol(TAILP,gb)+`<g clip-path="url(#${G('ct')})"><path d="M-270 -52 C-256 -18,-228 -3,-190 -3 C-140 -3,-88 -8,-34 -13 L-34 -36 C-90 -34,-150 -30,-196 -22 C-226 -18,-252 -30,-262 -56 Z" fill="url(#${G('gl')})"/>
  <path d="M-70 -34 q4 12 -2 24 M-104 -31 q4 12 -2 25 M-138 -28 q4 12 -2 25 M-172 -24 q4 10 -2 22 M-204 -21 q4 8 0 18 M-232 -26 q6 8 4 18" stroke="${c.bl}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M-36 -128 C-96 -132,-158 -112,-198 -74 C-214 -58,-230 -52,-246 -66 L-250 -40 C-230 -34,-212 -42,-196 -56 C-158 -90,-100 -106,-36 -104 Z" fill="${c.deep}" opacity=".28"/>
  ${marks([[-84,-96],[-116,-88],[-148,-74],[-100,-70],[-134,-58],[-176,-56],[-66,-78],[-166,-40],[-206,-44]],c.deep,.45)}</g>
  <path d="M-50 -122 C-104 -124,-156 -104,-190 -72" stroke="${c.hi}" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/><path class="ol" d="${TAILP}" fill="none"/>`;
  // dos
  s+=orns(pf,t,far(back),t.bs,t.ss,0)+orns(pl,t,back,t.bs,t.ss);
  // membres du fond
  s+=`<g transform="translate(66,-184) rotate(${f(aa*.45+8)})">${ol(ARMP,c.dark)}${claws('#cfc7b0')}</g>`;
  // torse
  let bl='',hl='';for(let y=-214;y<-24;y+=24){bl+=`<path d="M14 ${y} Q66 ${y+15} 118 ${y}"/>`;hl+=`<path d="M22 ${y+6} Q66 ${y+20} 110 ${y+6}"/>`}
  let sc=[];for(let r=0;r<8;r++)for(let q=0;q<5;q++)sc.push([-92+q*24+(r%2)*12,-206+r*23]);
  s+=`<clipPath id="${G('cb')}"><path d="${BODYP}"/></clipPath><clipPath id="${G('cl')}"><ellipse cx="68" cy="-120" rx="46" ry="104"/></clipPath><path d="${BODYP}" fill="${gb}"/><g clip-path="url(#${G('cb')})">
  ${marks(sc,c.deep,.4)}
  <path d="M-110 -40 C-100 -150,-60 -230,10 -250 C-30 -200,-52 -130,-36 -72 C-28 -44,-8 -26,14 -10 L-110 0 Z" fill="${c.deep}" opacity=".3"/>
  <ellipse cx="68" cy="-120" rx="46" ry="104" fill="url(#${G('gl')})"/><g clip-path="url(#${G('cl')})"><g stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7">${hl}</g><g stroke="${c.bl}" stroke-width="3.5" fill="none" stroke-linecap="round">${bl}</g>
  <path d="M22 -230 C40 -190,44 -100,26 -10 L10 -10 L10 -230 Z" fill="${c.bl}" opacity=".35"/></g>
  <ellipse cx="68" cy="-120" rx="46" ry="104" fill="none" stroke="${c.dark}" stroke-width="3" opacity=".45"/>

  <path d="M-100 -44 C-60 -6,0 0,96 -20 L96 0 L-110 0 Z" fill="${c.deep}" opacity=".3"/>
  <path d="M30 -238 C58 -232,80 -210,88 -178" stroke="${c.hi}" stroke-width="6" fill="none" opacity=".6" stroke-linecap="round"/></g><path class="ol" d="${BODYP}" fill="none"/>
  <ellipse cx="-34" cy="-200" rx="24" ry="9" fill="#fff" opacity=".2" transform="rotate(-34 -34 -200)"/>`;
  // patte avant
  s+=`<g transform="translate(4,0)"><clipPath id="${G('cg')}"><path d="${LEGP}"/></clipPath>${ol(LEGP,gb)}<g clip-path="url(#${G('cg')})"><path d="M-30 -60 C-10 -20,40 -14,90 -40 L120 0 L-30 0 Z" fill="${c.deep}" opacity=".3"/>${marks([[0,-78],[20,-62],[40,-80],[10,-48],[-8,-60]],c.deep,.4)}
  <path d="M-6 -104 C14 -124,50 -124,72 -104" stroke="${c.hi}" stroke-width="6" fill="none" opacity=".55" stroke-linecap="round"/></g>
  <path d="M8 -58 C28 -40,56 -42,74 -58" stroke="${c.deep}" stroke-width="3" fill="none" opacity=".45" stroke-linecap="round"/><path d="M86 -4 q2 -12 12 -16 M72 -2 q0 -8 6 -12" stroke="${L}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".6"/>
  <ellipse cx="34" cy="-100" rx="20" ry="9" fill="#fff" opacity=".22" transform="rotate(-14 34 -100)"/><path class="ol" d="${LEGP}" fill="none"/>${toes(IV)}</g>`;
  // bras avant (pivot à l'épaule)
  t.front=`<g transform="translate(42,-178) rotate(${aa})"><clipPath id="${G('ca')}"><path d="${ARMP}"/></clipPath>`+(t.held&&!aa?`<g transform="translate(96,46) rotate(-24)">${car(0,0,'#ff5a5a',1,1.25)}</g>`:'')+`${ol(ARMP,gb)}<g clip-path="url(#${G('ca')})"><path d="M-20 14 C10 30,50 44,96 56 L96 70 L-20 40 Z" fill="${c.deep}" opacity=".32"/>${marks([[4,-6],[24,2],[44,14]],c.deep,.4)}</g>
  <path d="M-4 -14 C12 -20,32 -12,46 0" stroke="${c.hi}" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/><path d="M40 6 q8 10 4 22" stroke="${c.deep}" stroke-width="3" fill="none" opacity=".45" stroke-linecap="round"/><path class="ol" d="${ARMP}" fill="none"/>${claws(IV)}</g>`;
  return s},
 head(t){const{c,gb,p,G,fl}=t,baby=t.k=='bebe',M=GMOOD[t.mood]||GMOOD.content;
  const sn=baby?-16:0,jaw=Math.max(M.jaw,t.pose=='mange'?28:0),a=jaw*Math.PI/180,jx=-36+(142+sn)*Math.cos(a),jy=8+(142+sn)*Math.sin(a);
  const UP=baby?'M-66 -2 C-72 -54,-34 -86,12 -84 C44 -82,62 -64,70 -46 C90 -46,106 -34,106 -16 C106 2,96 12,82 14 L18 22 C-24 30,-62 22,-66 -2 Z'
   :'M-66 -4 C-72 -50,-36 -80,10 -78 C38 -76,54 -64,64 -52 C84 -54,104 -48,114 -34 C124 -20,122 2,106 10 C100 13,92 14,86 14 L18 22 C-24 30,-62 22,-66 -4 Z',
   JAW=baby?'M-48 4 L92 8 C96 34,80 50,48 54 C0 58,-46 40,-48 4 Z':'M-48 4 L108 8 C112 38,92 54,52 58 C0 62,-46 42,-48 4 Z';
  const tilt=t.pose=='mange'?-10:t.pose=='frappe'?5:t.mood=='triste'||t.mood=='fatigue'?7:0;
  let s=`<g transform="rotate(${tilt} -30 30)">`;
  s+=orns(baby?'gbumpFar':'gfar',t,[[-38,-52,-46,.56],[-10,-76,-20,.64]],t.hs,t.ss,0)+orns(baby?'gbump':'gplate',t,[[-52,-46,-52,.62],[-24,-70,-26,.72]],t.hs,t.ss);
  s+=ol('M-50 -34 C-78 -52,-100 -34,-96 -8 C-80 -16,-64 -10,-50 2 Z',c.dark)+`<path d="M-58 -28 C-74 -34,-86 -26,-88 -16 M-60 -16 C-72 -18,-80 -14,-84 -8" stroke="${c.hi}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>`;
  if(jaw>2)s+=`<path d="M-36 8 L${112+sn} 6 L${f(jx)} ${f(jy)} Z" fill="#5a1030"/><path d="M-10 10 L${60+sn} 8 L${f(-36+90*Math.cos(a))} ${f(8+90*Math.sin(a))} Z" fill="#8a1c40"/>`;
  // mâchoire
  s+=`<g transform="rotate(${jaw} -36 8)">`;
  if(jaw>2)s+=ol2(`M4 9 C24 -9,${70+sn} -11,${98+sn} 7 Z`,'#ff7d9c')+`<path d="M22 4 Q${52+sn/2} -4 ${82+sn} 4" stroke="#e2557a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  s+=`<clipPath id="${G('cj')}"><path d="${JAW}"/></clipPath>`+ol(JAW,c.body)+`<g clip-path="url(#${G('cj')})"><path d="M-48 22 C-20 50,40 60,112 30 L112 70 L-48 70 Z" fill="${c.deep}" opacity=".4"/><path d="M-20 30 C10 44,50 48,90 36" stroke="${c.belly2}" stroke-width="16" fill="none" opacity=".35" stroke-linecap="round"/></g><path class="ol" d="${JAW}" fill="none"/>`;
  if(jaw>2&&!baby)for(let i=0;i<Math.min(3,p.teeth);i++)s+=tooth(30+i*14,7.5,5,-9);
  s+='</g>';
  // crâne et museau
  s+=`<clipPath id="${G('ch')}"><path d="${UP}"/></clipPath>`+ol(UP,gb)+`<g clip-path="url(#${G('ch')})"><path d="M-70 -10 C-40 14,-10 20,20 14 L90 6 L124 -4 L124 30 L-70 30 Z" fill="${c.deep}" opacity=".3"/>
  <path d="M-80 -10 C-80 -60,-44 -90,0 -90 C-34 -70,-48 -40,-46 -4 C-46 8,-40 16,-30 24 L-80 24 Z" fill="${c.deep}" opacity=".26"/>
  ${marks([[-46,-40],[-34,-58],[-52,-18],[-30,-28]],c.deep,.45)}
  <path d="M56 -50 C78 -52,100 -46,112 -32" stroke="${c.hi}" stroke-width="7" fill="none" opacity=".6" stroke-linecap="round"/><ellipse cx="-2" cy="-66" rx="32" ry="8" fill="#fff" opacity=".28" transform="rotate(-6 -2 -66)"/></g>
  <path d="M-42 2 C-32 -12,-12 -18,4 -8" stroke="${c.deep}" stroke-width="3" fill="none" opacity=".45" stroke-linecap="round"/><path class="ol" d="${UP}" fill="none"/>
  <ellipse cx="${102+sn}" cy="-24" rx="5.4" ry="3.8" fill="${L}" transform="rotate(22 ${102+sn} -24)"/><path d="M${94+sn} -32 q8 -6 16 0" stroke="${c.deep}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>`;
  // dents du haut, crocs du bas
  const tx=baby?[66]:TX[p.teeth];tx.forEach(x=>s+=tooth(x,lipY(x),5.5,baby?7:p.teeth<3?10:13));
  if(!baby)s+=ol2('M102 11 L106 23 L111 8 Z','#fff');
  if(!baby&&p.teeth>1)s+=`<g transform="rotate(${jaw} -36 8)">${ol2('M45 30 L50 7 L59 28 Z','#fff')+ol2('M84 25 L90 3 L97 22 Z','#fff')}</g>`;
  // coin de bouche
  if(M.m=='smile')s+=`<path d="M18 22 C8 20,2 13,3 4" stroke="${L}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(M.m=='frown')s+=`<path d="M18 22 C8 23,1 30,0 40" stroke="${L}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(p.cheek||t.mood=='content'||t.mood=='miam')s+=`<ellipse cx="-14" cy="2" rx="14" ry="8.5" fill="#ff7fa8" opacity="${p.cheek?.6:.35}"/>`;
  s+=geye(t,24,-30,19,M)+`<g transform="rotate(${f(M.b+p.brow*.5)} 26 -56)">${ol2('M-8 -50 C8 -70,42 -72,60 -54 C42 -62,14 -60,-2 -44 Z',c.dark)}<path d="M2 -56 C16 -66,38 -66,52 -58" stroke="${c.hi}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".5"/></g>`+scar(t,44,-72);
  // accessoires d'expression
  if(t.mood=='triste')s+=`<path class="ol2" d="M44 -6 C36 8,36 20,44 20 C52 20,52 8,44 -6 Z" fill="#7fd4ff"/><circle cx="41" cy="12" r="2" fill="#fff"/>`;
  if(t.mood=='faim')s+=`<g transform="rotate(${jaw} -36 8)"><path class="ol2" d="M96 8 C90 24,90 36,97 36 C104 36,104 24,96 8 Z" fill="#bfeaff"/></g>`;
  if(t.mood=='colere')s+=`<path d="M-34 -96 q10 6 4 16 M-22 -100 q-6 10 4 16 M-40 -78 q10 -4 16 4 M-12 -84 q-10 0 -12 10" stroke="#ff3b4e" stroke-width="5" fill="none" stroke-linecap="round"/><circle class="smk" cx="${118+sn}" cy="-34" r="9" fill="#fff" opacity=".8"/><circle class="smk" cx="${126+sn}" cy="-42" r="7" fill="#fff" opacity=".8" style="animation-delay:-1.7s"/>`;
  if(t.mood=='miam')s+=`<polygon points="${star(96,-82,13,5,4)}" fill="#fff" stroke="${L}" stroke-width="2"/><polygon points="${star(126,-56,9,3.5,4)}" fill="#ffd23f" stroke="${L}" stroke-width="2"/><polygon points="${star(70,-104,8,3,4)}" fill="#ffd23f" stroke="${L}" stroke-width="2"/>`;
  if(t.mood=='fatigue')s+=`<path class="ol2" d="M-6 -80 C-14 -66,-14 -56,-6 -56 C2 -56,2 -66,-6 -80 Z" fill="#bfeaff"/>`;
  return s+'</g>'}
});
/* ---------- Mochi, Braz, Plouf, Krok v2 : même système que Grondo ---------- */
const V1=[GRONDO_V1].concat(D.slice(1).map(d=>Object.assign({},d,{id:d.id+'0'})));
const gopen=(t,M)=>Math.max(M.jaw,t.pose=='mange'?28:0);
const garm=t=>t.pose=='frappe'?-82:t.pose=='mange'?-28:0;
const gtilt=t=>t.pose=='mange'?-10:t.pose=='frappe'?5:t.mood=='triste'||t.mood=='fatigue'?7:0;
const gline=(d,w=4.5)=>`<path d="${d}" stroke="${L}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
function gclip(t,id,path,fill,inner){return `<clipPath id="${t.G(id)}"><path d="${path}"/></clipPath><path d="${path}" fill="${fill}"/><g clip-path="url(#${t.G(id)})">${inner}</g><path class="ol" d="${path}" fill="none"/>`}
function gjaw(t,jaw,o){const c=t.c,a=jaw*Math.PI/180,hx=o.hx,hy=o.hy,len=o.len,jx=hx+len*Math.cos(a),jy=hy+len*Math.sin(a);let s='';
 if(jaw>2)s+=`<path d="M${hx} ${hy} L${hx+len+6} ${hy-3} L${f(jx)} ${f(jy)} Z" fill="${o.inside||'#5a1030'}"/>`+(o.fire?`<ellipse cx="${f(hx+len*.55)}" cy="${f(hy+len*.3*Math.sin(a))}" rx="${f(len*.3)}" ry="${f(4+jaw*.45)}" fill="#ffb02e" filter="${t.fl}"/>`:'');
 s+=`<g transform="rotate(${jaw} ${hx} ${hy})">`;
 if(jaw>2)s+=ol2(`M${hx+38} ${hy+1} C${hx+58} ${hy-17},${hx+len-38} ${hy-19},${hx+len-10} ${hy-1} Z`,o.fire?'#ffd23f':'#ff7d9c');
 s+=gclip(t,'cj',o.path,o.fill||c.body,`<path d="M-200 ${hy+30} L200 ${hy+12} L200 200 L-200 200 Z" fill="${c.deep}" opacity=".32"/>`);
 if(jaw>2)(o.teeth||[]).forEach(x=>s+=tooth(x,hy-.5,5,-9));
 if(t.mood=='faim'){const x=hx+len-12;s+=`<path class="ol2" d="M${x} ${hy} c-6 16,-6 28,1 28 c7 0,7 -12,-1 -28 Z" fill="#bfeaff"/>`}
 return s+(o.extra||'')+'</g>'}
function gbrow(t,M,x,y,k=1,sc=1){const c=t.c;return `<g transform="translate(${x},${y}) scale(${sc}) rotate(${f((M.b+t.p.brow*.5)*k)})">${ol2('M-34 6 C-18 -14,16 -16,34 2 C16 -6,-12 -4,-28 12 Z',c.dark)}<path d="M-24 0 C-10 -10,12 -10,26 -2" stroke="${c.hi}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".5"/></g>`}
const gcorner=(M,x,y)=>M.m=='frown'?gline(`M${x} ${y} c-10 1,-17 8,-18 18`,4):M.m=='grit'?'':gline(`M${x} ${y} c-10 -2,-16 -9,-15 -18`,4);
function gextra(t,o){const m=t.mood;let s='';
 if(m=='triste'){const[x,y]=o.tear;s+=`<path class="ol2" d="M${x} ${y} c-8 14,-8 26,0 26 c8 0,8 -12,0 -26 Z" fill="#7fd4ff"/><circle cx="${x-3}" cy="${y+18}" r="2" fill="#fff"/>`}
 if(m=='colere'){const[x,y]=o.anger;s+=`<g transform="translate(${x},${y})"><path d="M-12 -10 q10 6 4 16 M0 -14 q-6 10 4 16 M-18 8 q10 -4 16 4 M10 2 q-10 0 -12 10" stroke="#ff3b4e" stroke-width="5" fill="none" stroke-linecap="round"/></g>`}
 if(m=='miam'){const[x,y]=o.spark;s+=`<polygon points="${star(x,y,13,5,4)}" fill="#fff" stroke="${L}" stroke-width="2"/><polygon points="${star(x+30,y+26,9,3.5,4)}" fill="#ffd23f" stroke="${L}" stroke-width="2"/><polygon points="${star(x-26,y-22,8,3,4)}" fill="#ffd23f" stroke="${L}" stroke-width="2"/>`}
 if(m=='fatigue'){const[x,y]=o.sweat;s+=`<path class="ol2" d="M${x} ${y} c-8 14,-8 24,0 24 c8 0,8 -10,0 -24 Z" fill="#bfeaff"/>`}
 return s}

/* ===== Mochi ===== */
Object.assign(D[1].c,{deep:'#3c8a24',spd:'#d94a86'});
Object.assign(D[1],{hat:[6,-24,1.12],
 body(t){const{c,gb}=t,aa=garm(t),B='M-100 -96 C-100 -160,-52 -196,6 -196 C66 -196,106 -152,106 -94 C106 -42,66 -10,6 -10 C-56 -10,-100 -42,-100 -96 Z',
   TL='M-66 -78 C-104 -90,-142 -76,-152 -50 C-158 -30,-148 -10,-124 -8 C-100 -6,-76 -10,-56 -20 Z',FT='M-30 -34 C-8 -50,38 -42,46 -18 C50 -6,42 0,32 0 L-24 0 C-40 0,-44 -18,-30 -34 Z',
   AR='M0 0 C16 -12,46 -4,52 14 C54 24,44 31,34 27 C20 22,6 18,-2 12 C-8 8,-6 2,0 0 Z',toes=`<path d="M22 -2 q2 -11 11 -8 M7 -2 q2 -11 11 -9" stroke="${L}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".75"/>`;
  let s=`<g transform="translate(-34,-2)">${ol(FT,c.dark)}</g>`;
  s+=orns('gum',t,[[-124,-76,-36,.62],[-148,-54,-66,.5]],t.bs,t.ss)+gclip(t,'ct',TL,gb,`<path d="M-160 -24 C-130 -10,-90 -12,-50 -26 L-50 0 L-160 0 Z" fill="${c.belly2}" opacity=".8"/><path d="M-66 -78 C-104 -90,-142 -76,-152 -50 L-138 -44 C-128 -62,-100 -70,-66 -60 Z" fill="${c.deep}" opacity=".25"/><circle cx="-112" cy="-52" r="7" fill="${c.hi}" opacity=".6"/>`);
  s+=orns('gum',t,[[-93,-60,-112,.85],[-103,-112,-84,1.05],[-86,-162,-56,1.1],[-50,-191,-30,.95]],t.bs,t.ss);
  s+=`<g transform="translate(84,-132) rotate(${f(aa*.4)})">${ol(AR,c.dark)}</g>`;
  s+=torso(t,B,[46,-92,56,74],{shade:'M-110 -42 C-60 -6,0 -2,80 -18 L80 0 L-110 0 Z',inside:`<path d="M-110 -40 C-104 -150,-60 -200,0 -206 C-40 -170,-58 -110,-44 -62 C-36 -38,-14 -22,8 -8 L-110 0 Z" fill="${c.deep}" opacity=".24"/><ellipse cx="46" cy="-92" rx="56" ry="74" fill="none" stroke="${c.dark}" stroke-width="3" opacity=".4"/>`});
  s+=`<circle cx="-60" cy="-130" r="10" fill="${c.hi}" opacity=".6"/><circle cx="-74" cy="-96" r="7" fill="${c.hi}" opacity=".6"/><circle cx="-42" cy="-160" r="6" fill="${c.hi}" opacity=".6"/><circle cx="-52" cy="-66" r="8" fill="${c.hi}" opacity=".6"/><circle cx="-30" cy="-112" r="5" fill="${c.hi}" opacity=".6"/>
  <path d="M24 -192 C62 -190,92 -160,100 -124" stroke="${c.hi}" stroke-width="6" fill="none" opacity=".75" stroke-linecap="round"/>`;
  s+=`<g transform="translate(38,0)">${gclip(t,'cg',FT,gb,`<path d="M-44 -14 C-10 -2,30 -4,52 -18 L52 0 L-44 0 Z" fill="${c.deep}" opacity=".3"/><ellipse cx="6" cy="-32" rx="16" ry="6" fill="#fff" opacity=".32" transform="rotate(-10 6 -32)"/>`)}${toes}</g>`;
  t.front=(aa?'':t.held)+`<g transform="translate(60,-126) rotate(${aa} 4 8)">${gclip(t,'ca',AR,gb,`<path d="M-8 14 C10 22,30 30,54 30 L54 40 L-8 32 Z" fill="${c.deep}" opacity=".3"/>`)}<path d="M8 2 C22 -2,36 4,44 14" stroke="#fff" stroke-width="4" fill="none" opacity=".38" stroke-linecap="round"/><path d="M41 27 q6 -3 8 -9 M31 26 q5 -2 6 -6" stroke="${L}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".55"/></g>`;
  return s},
 head(t){const{c,gb,p}=t,M=GMOOD[t.mood]||GMOOD.content,j=gopen(t,M),HP='M-90 0 C-92 -58,-46 -96,6 -96 C52 -96,82 -72,94 -42 C114 -38,128 -24,128 -6 C128 14,114 26,96 30 C84 62,46 84,0 84 C-50 84,-88 50,-90 0 Z';
  let s=`<g transform="rotate(${gtilt(t)} -20 60)">`+orns('gum',t,[[-66,-64,-48,.8],[-32,-90,-22,.95],[10,-96,4,.75]],t.hs,t.ss);
  s+=gclip(t,'ch',HP,gb,`<path d="M-100 20 C-60 84,50 98,112 30 L112 100 L-100 100 Z" fill="${c.deep}" opacity=".24"/><path d="M-100 0 C-100 -70,-50 -104,0 -104 C-40 -80,-62 -40,-60 0 C-58 30,-40 56,-14 72 L-100 72 Z" fill="${c.deep}" opacity=".18"/><ellipse cx="-12" cy="-76" rx="38" ry="9" fill="#fff" opacity=".34" transform="rotate(-8 -12 -76)"/><path d="M96 -38 Q116 -34 122 -18" stroke="#fff" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/><circle cx="-56" cy="34" r="9" fill="${c.hi}" opacity=".5"/><circle cx="-40" cy="52" r="6" fill="${c.hi}" opacity=".5"/>`);
  if(j>8)s+=ol2(`M46 26 C66 36,96 32,110 18 C${f(118+j*.2)} ${f(36+j*1.1)},74 ${f(50+j*1.5)},46 26 Z`,'#7d1b40')+`<path d="M62 ${f(40+j*.5)} C76 ${f(34+j*.5)},92 ${f(34+j*.4)},102 ${f(30+j*.3)} C100 ${f(44+j)},76 ${f(50+j)},62 ${f(40+j*.5)} Z" fill="#ff7d9c"/>`+tooth(92,27,5,9);
  else if(M.m=='frown')s+=gline('M56 46 Q82 26 106 38');
  else if(M.m=='grit')s+=ol2('M54 28 L108 22 L106 38 L58 46 Z','#fff')+gline('M68 27 l2 17 M82 25 l2 17 M95 24 l1 16',2.4);
  else if(t.mood=='dodo')s+=gline('M58 32 Q84 46 106 26');
  else if(t.mood=='fatigue')s+=gline('M60 36 Q82 40 104 30');
  else s+=ol2('M52 30 C70 40,96 36,108 22 C108 48,72 62,52 30 Z','#7d1b40')+`<path d="M66 44 C76 38,92 38,100 34 C96 48,78 54,66 44 Z" fill="#ff7d9c"/>`+tooth(92,29,5,9);
  if(t.mood=='faim')s+=`<path class="ol2" d="M100 40 c-6 16,-6 28,1 28 c7 0,7 -12,-1 -28 Z" fill="#bfeaff"/>`;
  s+=`<ellipse cx="117" cy="-12" rx="4" ry="3" fill="${L}"/><ellipse cx="18" cy="32" rx="18" ry="10.5" fill="#ff7fa8" opacity=".65"/><circle cx="-46" cy="-22" r="3" fill="${c.dark}" opacity=".6"/><circle cx="-56" cy="-8" r="2.4" fill="${c.dark}" opacity=".6"/><circle cx="-42" cy="-4" r="2.2" fill="${c.dark}" opacity=".6"/>`;
  return s+geye(t,42,-14,24,M)+gbrow(t,M,44,-50,.7,.72)+gextra(t,{tear:[66,14],anger:[-34,-116],spark:[108,-88],sweat:[-22,-108]})+'</g>'}});

/* ===== Braz ===== */
Object.assign(D[2].c,{deep:'#560c1c',spd:'#c23a10'});
Object.assign(D[2],{
 body(t){const{c,gb,fl}=t,aa=garm(t),B='M-70 -70 C-100 -140,-72 -226,0 -240 C72 -248,114 -200,106 -136 C100 -80,72 -24,16 -18 C-30 -14,-58 -34,-70 -70 Z',
   TL='M-44 -112 C-104 -112,-150 -124,-184 -160 C-196 -172,-222 -170,-226 -150 C-230 -100,-190 -44,-130 -26 C-96 -17,-66 -14,-40 -14 Z';
  const crack=(d,w=4.5)=>`<path d="${d}" stroke="#ff7a00" stroke-width="${w+7}" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="${fl}" opacity=".9"/><path d="${d}" stroke="#ffd23f" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>`;
  let s=`<g transform="translate(-58,-4)">${ol(LEG,c.dark)}${NAILS}</g>`;
  s+=orns('flame',t,[[-212,-166,-44,1.25],[-114,-116,-6,.7],[-156,-134,-24,.62]],t.bs,t.ss);
  s+=gclip(t,'ct',TL,gb,`<path d="M-232 -110 C-200 -50,-110 -24,-40 -18 L-40 0 L-240 0 Z" fill="${c.belly2}" opacity=".5"/><path d="M-44 -112 C-104 -112,-150 -124,-184 -160 C-196 -172,-222 -170,-226 -150 L-208 -140 C-188 -150,-168 -120,-130 -102 C-100 -92,-70 -92,-44 -92 Z" fill="${c.deep}" opacity=".3"/>`)+crack('M-150 -70 l14 -14 l12 10 l12 -16 M-198 -122 l12 -8 l8 14');
  s+=orns('flame',t,[[-80,-84,-98,.85],[-89,-130,-80,1.15],[-76,-182,-58,1.35],[-42,-224,-34,1.15]],t.bs,t.ss);
  s+=`<g transform="translate(34,-16) rotate(${f(aa*.4)} 28 -166)">${ol(ARM,c.dark)}${CLAWS}</g>`;
  s+=torso(t,B,[82,-130,54,98],{inside:`<path d="M-110 -40 C-104 -160,-70 -230,6 -252 C-34 -200,-50 -130,-34 -74 C-26 -46,-6 -28,16 -12 L-110 0 Z" fill="${c.deep}" opacity=".3"/><ellipse cx="82" cy="-130" rx="54" ry="98" fill="none" stroke="${c.deep}" stroke-width="3" opacity=".4"/>`+crack('M-66 -152 l16 16 l-8 18 l18 14 M-30 -212 l12 20 l-12 14 l10 16 M-58 -84 l20 8 l-4 16 l16 10 M-14 -128 l-12 18 l14 14 l-6 14')});
  s+=`<path d="M30 -240 C66 -238,96 -212,102 -172" stroke="${c.hi}" stroke-width="6" fill="none" opacity=".65" stroke-linecap="round"/>`;
  s+=`<g transform="translate(6,0)">${gclip(t,'cg',LEG,gb,`<path d="M-30 -56 C-10 -18,40 -12,90 -36 L120 0 L-30 0 Z" fill="${c.deep}" opacity=".32"/><path d="M-4 -100 C16 -118,48 -118,70 -100" stroke="${c.hi}" stroke-width="6" fill="none" opacity=".55" stroke-linecap="round"/>`)}${NAILS}${crack('M10 -70 l14 10 l-4 14 l14 8',3.5)}</g>`;
  t.front=(aa?'':t.held)+`<g transform="translate(10,-10) rotate(${aa} 28 -166)">${gclip(t,'ca',ARM,gb,`<path d="M10 -150 C50 -140,90 -118,126 -100 L126 -80 L10 -128 Z" fill="${c.deep}" opacity=".32"/>`)}${CLAWS}${armHi}${ol2('M34 -186 L30 -208 L52 -190 Z','#fff3d0')}${crack('M50 -164 l12 8 l-2 10 l12 6',3)}</g>`;
  return s},
 head(t){const{c,gb,p,fl}=t,M=GMOOD[t.mood]||GMOOD.content,jaw=gopen(t,M),HORN='M-28 -58 C-44 -94,-80 -106,-108 -94 C-86 -88,-66 -70,-52 -42 Z',
   UP='M-62 -8 C-66 -48,-36 -72,6 -72 C34 -72,52 -60,64 -48 L98 -40 C114 -36,122 -22,118 -8 C116 6,104 12,88 13 L18 22 C-22 30,-58 22,-62 -8 Z';
  let s=`<g transform="rotate(${gtilt(t)} -30 30)"><g transform="translate(18,8)">${ol(HORN,'#cdb48a')}</g>`;
  s+=gjaw(t,jaw,{hx:-36,hy:8,len:136,path:'M-46 4 L100 8 C104 36,86 52,52 56 C2 60,-44 42,-46 4 Z',inside:'#6b1420',fire:1,teeth:[34,50,66].slice(0,Math.min(3,p.teeth))});
  s+=gclip(t,'ch',UP,gb,`<path d="M-70 -10 C-40 14,-10 20,20 14 L90 6 L124 -4 L124 30 L-70 30 Z" fill="${c.deep}" opacity=".3"/><path d="M-80 -10 C-80 -56,-44 -84,0 -84 C-34 -66,-48 -38,-46 -4 C-46 8,-40 16,-30 24 L-80 24 Z" fill="${c.deep}" opacity=".26"/><ellipse cx="-6" cy="-60" rx="28" ry="7" fill="#fff" opacity=".28" transform="rotate(-6 -6 -60)"/><path d="M60 -46 L98 -38 C108 -34,114 -26,116 -16" stroke="${c.hi}" stroke-width="6" fill="none" opacity=".55" stroke-linecap="round"/>`);
  s+=ol(HORN,'#fff3d0')+`<path d="M-50 -64 q8 -8 16 -6 M-72 -80 q8 -8 14 -4" stroke="#c9a56a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M-36 -62 C-52 -86,-76 -96,-98 -92" stroke="#fff" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>`+ol2('M82 -42 L100 -74 L108 -36 Z','#fff3d0');
  s+=`<path d="M-42 -30 l12 10 l-6 12 M-12 -58 l8 12 l-6 8" stroke="#ff7a00" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="${fl}"/><path d="M-42 -30 l12 10 l-6 12 M-12 -58 l8 12 l-6 8" stroke="#ffd23f" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="106" cy="-20" rx="4.6" ry="3.4" fill="${L}" transform="rotate(20 106 -20)"/><circle class="smk" cx="116" cy="-32" r="9" fill="#fff" opacity=".7"/><circle class="smk" cx="124" cy="-40" r="7" fill="#fff" opacity=".7" style="animation-delay:-1.7s"/>`;
  TX[p.teeth].forEach(x=>s+=tooth(x,lipY(x)+.5,6,p.teeth<3?10:14));
  s+=gcorner(M,18,22);if(p.cheek)s+=`<ellipse cx="-14" cy="4" rx="14" ry="8.5" fill="#ffb02e" opacity=".7"/>`;
  return s+geye(t,22,-28,19,M)+gbrow(t,M,24,-55,1.2)+scar(t,40,-68)+gextra(t,{tear:[42,-4],anger:[-6,-100],spark:[118,-92],sweat:[-10,-78]})+'</g>'}});

/* ===== Plouf ===== */
Object.assign(D[3].c,{deep:'#084a66',spd:'#c93f84'});
Object.assign(D[3],{
 body(t){const{c,gb,gs,fl}=t,aa=garm(t),B='M-60 -56 C-86 -120,-56 -192,-4 -216 C32 -232,64 -214,74 -174 C84 -124,74 -56,24 -20 C-14 -8,-48 -22,-60 -56 Z',
   TL='M-36 -96 C-92 -104,-150 -90,-190 -58 C-204 -46,-204 -22,-184 -12 C-132 -2,-80 -6,-36 -14 Z',
   TF='M-176 -50 C-198 -96,-246 -114,-274 -94 C-256 -76,-250 -58,-256 -36 C-262 -12,-238 6,-212 -2 C-196 -6,-184 -14,-178 -24 Z',
   SAIL='M2 -200 C-18 -252,-70 -266,-102 -234 C-106 -222,-100 -214,-98 -208 C-126 -202,-150 -172,-138 -146 C-134 -138,-128 -134,-124 -130 C-144 -116,-150 -88,-130 -68 L-40 -60 Z',
   WL='M-10 -66 C-10 -100,16 -108,36 -102 C58 -96,66 -74,60 -52 C58 -42,66 -36,80 -32 C96 -34,112 -22,112 -8 C112 -2,106 0,98 0 L22 0 C4 0,-4 -12,-2 -32 C-8 -42,-10 -54,-10 -66 Z',
   web=`<path d="M76 -28 L104 -8 M68 -18 L90 -2" stroke="${L}" stroke-width="2.6" stroke-linecap="round" opacity=".6"/>`,
   AW='M22 -170 C44 -180,84 -158,102 -138 C112 -138,126 -134,128 -124 C122 -120,126 -110,118 -106 C110 -110,104 -104,96 -108 C74 -118,48 -130,24 -138 C12 -144,12 -164,22 -170 Z';
  const ray=d=>`<path d="${d}" stroke="${c.sp2}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/>`;
  const spot=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r*2}" fill="${c.glow}" opacity=".8" filter="${fl}"/><circle cx="${x}" cy="${y}" r="${r}" fill="#eaffff"/>`;
  let s=`<g transform="translate(-52,-4)">${ol(WL,c.dark)}</g>`+(t.glow?`<path d="${TF}" fill="${c.sp2}" filter="${fl}"/><path d="${SAIL}" fill="${c.sp2}" filter="${fl}"/>`:'');
  s+=`<g transform="translate(14,-8)">${ol(TF,c.spd)}</g>`+gclip(t,'cf',TF,gs,`<path d="M-176 -50 C-198 -96,-246 -114,-274 -94 L-262 -86 C-240 -98,-210 -84,-190 -50 Z" fill="#fff" opacity=".4"/>`)+ray('M-190 -44 L-254 -90 M-198 -36 L-248 -58 M-198 -24 L-246 -20');
  s+=gclip(t,'ct',TL,gb,`<path d="M-210 -16 C-132 -4,-84 -8,-36 -18 L-36 0 L-210 0 Z" fill="${c.belly2}" opacity=".8"/><path d="M-36 -96 C-92 -104,-150 -90,-190 -58 L-180 -46 C-150 -70,-96 -82,-36 -76 Z" fill="${c.deep}" opacity=".28"/>`)+spot(-150,-52,5)+spot(-112,-66,6)+spot(-76,-72,4.5);
  s+=`<g transform="translate(12,-8)">${ol(SAIL,c.spd)}</g>`+gclip(t,'cs',SAIL,gs,`<path d="M2 -200 C-18 -252,-70 -266,-102 -234 L-92 -226 C-70 -248,-30 -236,-12 -196 Z" fill="#fff" opacity=".45"/>`)+ray('M-30 -180 L-74 -240 M-34 -196 L-42 -240 M-46 -160 L-130 -174 M-50 -150 L-104 -214 M-48 -110 L-134 -98 M-46 -126 L-128 -130');
  s+=`<g transform="translate(22,-8) rotate(${f(aa*.4)} 22 -158)">${ol(AW,c.dark)}</g>`;
  s+=torso(t,B,[42,-112,40,92],{shade:'M-80 -40 C-50 -8,0 -6,50 -22 L50 0 L-90 0 Z',inside:`<path d="M-90 -40 C-90 -140,-56 -200,0 -226 C-30 -180,-40 -120,-28 -70 C-22 -44,-6 -28,14 -14 L-90 0 Z" fill="${c.deep}" opacity=".28"/><ellipse cx="42" cy="-112" rx="40" ry="92" fill="none" stroke="${c.dark}" stroke-width="3" opacity=".4"/>`+spot(-32,-150,7)+spot(-44,-118,5)+spot(-38,-88,6)+spot(-18,-62,4)+spot(-10,-176,4.5)});
  s+=`<path d="M14 -220 C44 -222,64 -204,72 -172" stroke="${c.hi}" stroke-width="6" fill="none" opacity=".7" stroke-linecap="round"/>`;
  s+=`<g>${gclip(t,'cg',WL,gb,`<path d="M-20 -50 C0 -16,40 -10,84 -30 L116 0 L-20 0 Z" fill="${c.deep}" opacity=".3"/><ellipse cx="30" cy="-86" rx="18" ry="9" fill="#fff" opacity=".3" transform="rotate(-18 30 -86)"/>`)}${web}</g>`;
  t.front=(aa?'':t.held)+`<g transform="rotate(${aa} 24 -158)">${gclip(t,'ca',AW,gb,`<path d="M10 -146 C50 -134,90 -116,130 -104 L130 -90 L10 -130 Z" fill="${c.deep}" opacity=".3"/>`)}<path d="M34 -164 C52 -164,76 -150,92 -134" stroke="#fff" stroke-width="5" fill="none" opacity=".32" stroke-linecap="round"/><path d="M108 -132 L120 -122 M106 -124 L116 -112" stroke="${L}" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>${spot(52,-150,3.5)}</g>`;
  return s},
 head(t){const{c,gb,gs,p,fl}=t,M=GMOOD[t.mood]||GMOOD.content,jaw=gopen(t,M),FR='M0 0 C-16 -16,-42 -20,-64 -8 C-48 -6,-38 2,-30 13 C-20 11,-8 7,0 0 Z',
   UP='M-58 -6 C-62 -46,-30 -68,10 -66 C44 -64,70 -54,92 -42 C112 -36,124 -22,120 -6 C116 8,102 13,86 14 L18 22 C-20 30,-54 20,-58 -6 Z';
  const frond=(x,y,r,d)=>`<g transform="translate(${x},${y}) rotate(${r})"><g class="wig" style="animation-delay:${d}s">${t.glow?`<path d="${FR}" fill="${c.sp2}" filter="${fl}"/>`:''}${ol2(FR,gs)}<path d="M-8 2 L-52 -6 M-20 -8 l-4 10 M-32 -10 l-4 11 M-44 -10 l-3 9" stroke="${c.sp2}" stroke-width="2.6" fill="none" stroke-linecap="round"/></g></g>`;
  const dim=t.mood=='dodo'||t.mood=='triste'||t.mood=='fatigue';
  let s=`<g transform="rotate(${gtilt(t)} -30 30)">`+frond(-40,-40,28,0)+frond(-50,-12,-2,-.5)+frond(-44,16,-32,-1);
  s+=`<path d="M2 -58 C0 -98,26 -122,58 -110" stroke="${L}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M2 -58 C0 -98,26 -122,58 -110" stroke="${c.body}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="64" cy="-106" r="26" fill="#fff27a" opacity="${dim?.3:.85}" filter="${fl}"/><circle class="ol2${dim?'':' pulse'}" cx="64" cy="-106" r="13" fill="${dim?'#d9cf8a':'#fff27a'}"/><circle cx="60" cy="-110" r="4.5" fill="#fff"/>`;
  s+=gjaw(t,jaw,{hx:-34,hy:8,len:146,path:'M-40 8 L114 2 C110 26,86 40,50 44 C6 48,-36 36,-40 8 Z',fill:c.belly});
  s+=gclip(t,'ch',UP,gb,`<path d="M-70 -8 C-40 14,-10 19,20 14 L90 6 L124 -6 L124 30 L-70 30 Z" fill="${c.deep}" opacity=".28"/><path d="M-70 -10 C-70 -52,-40 -76,0 -78 C-30 -60,-44 -36,-42 -4 C-42 8,-36 16,-28 24 L-70 24 Z" fill="${c.deep}" opacity=".24"/><ellipse cx="-2" cy="-55" rx="30" ry="7" fill="#fff" opacity=".32" transform="rotate(-4 -2 -55)"/><path d="M76 -42 Q102 -36 112 -20" stroke="#fff" stroke-width="5" fill="none" opacity=".4" stroke-linecap="round"/>`);
  s+=gcorner(M,18,22)+`<ellipse cx="106" cy="-20" rx="4.2" ry="3.2" fill="${L}" transform="rotate(20 106 -20)"/>
  <circle cx="-36" cy="-30" r="8" fill="${c.glow}" opacity=".8" filter="${fl}"/><circle cx="-36" cy="-30" r="4" fill="#eaffff"/><circle cx="-24" cy="-46" r="6" fill="${c.glow}" opacity=".8" filter="${fl}"/><circle cx="-24" cy="-46" r="3" fill="#eaffff"/>`;
  if(p.teeth>1)s+=tooth(56,lipY(56)+.5,4.5,8)+tooth(80,lipY(80)+.5,4.5,8);else s+=tooth(70,lipY(70)+.5,4.5,8);
  if(p.teeth>3)s+=tooth(100,lipY(100)-1,4.5,8);
  s+=`<ellipse cx="-10" cy="4" rx="14" ry="8.5" fill="#ff7fa8" opacity=".6"/>`;
  return s+geye(t,34,-22,21,M)+gbrow(t,M,36,-52,.8,.82)+gextra(t,{tear:[54,2],anger:[-10,-98],spark:[116,-74],sweat:[-18,-80]})+'</g>'}});

/* ===== Krok ===== */
Object.assign(D[4].c,{deep:'#3a1f86',spd:'#b85a10'});
Object.assign(D[4],{
 body(t){const{c,gb,gs,G}=t,aa=garm(t),B='M-96 -60 C-116 -120,-82 -182,-10 -190 C60 -196,112 -162,112 -106 C112 -56,76 -20,16 -16 C-44 -12,-84 -26,-96 -60 Z',
   TL='M-60 -84 C-112 -92,-152 -76,-180 -54 C-192 -44,-190 -22,-174 -14 C-130 -6,-90 -8,-54 -14 Z',
   SHL='M-4 -194 C-70 -216,-146 -172,-144 -100 C-143 -62,-120 -36,-94 -30 C-70 -52,-52 -92,-40 -132 C-32 -160,-20 -182,-4 -194 Z',
   KL='M-20 -60 C-22 -96,12 -106,40 -100 C68 -94,78 -70,74 -46 C72 -30,82 -22,86 -12 C90 -2,82 0,72 0 L8 0 C-6 0,-14 -10,-12 -28 C-18 -38,-20 -48,-20 -60 Z',
   KN=ol2('M34 0 C34 -13,48 -13,48 0 Z',IV)+ol2('M51 0 C51 -14,66 -14,66 0 Z',IV)+ol2('M69 0 C69 -13,83 -13,83 0 Z',IV),
   KA='M30 -150 C54 -160,96 -138,112 -114 C120 -102,108 -88,94 -94 C74 -102,50 -112,28 -118 C16 -124,18 -144,30 -150 Z',
   KC=ol2('M103 -117 L124 -114 L109 -104 Z',IV)+ol2('M102 -105 L121 -97 L102 -93 Z',IV);
  let s=`<g transform="translate(-66,-4)">${ol(KL,c.dark)}${KN}</g>`;
  s+=gclip(t,'ct',TL,gb,`<path d="M-196 -18 C-130 -8,-90 -10,-54 -18 L-54 0 L-196 0 Z" fill="${c.belly2}" opacity=".8"/><path d="M-60 -84 C-112 -92,-152 -76,-180 -54 L-170 -44 C-146 -62,-110 -72,-60 -66 Z" fill="${c.deep}" opacity=".28"/>`)+marks([[-120,-60],[-146,-46],[-100,-42]],c.deep,.5);
  s+=orns('cone',t,[[-232,-52,-78,.8],[-222,-70,-40,.8],[-200,-76,4,.75],[-226,-30,-116,.75],[-206,-10,-170,.7]],t.bs,1)+`<circle class="ol" cx="-204" cy="-42" r="30" fill="${gs}"/><path d="M-228 -28 a30 30 0 0 0 44 10 a34 34 0 0 1 -44 -10 Z" fill="${c.spd}" opacity=".5"/><path d="M-222 -56 a24 24 0 0 1 30 -10" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/><path d="M-216 -36 l12 8 l14 -8 M-204 -28 v14" stroke="${c.sp2}" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".8"/>`;
  s+=`<g transform="translate(24,-8) rotate(${f(aa*.4)} 30 -136)">${ol(KA,c.dark)}${KC}</g>`;
  s+=torso(t,B,[74,-100,52,76],{inside:`<ellipse cx="74" cy="-100" rx="52" ry="76" fill="none" stroke="${c.dark}" stroke-width="3" opacity=".4"/>`});
  s+=`<path d="M30 -190 C70 -188,102 -166,108 -130" stroke="${c.hi}" stroke-width="6" fill="none" opacity=".7" stroke-linecap="round"/>`;
  s+=orns('cone',t,[[-52,-204,-24,1],[-104,-184,-52,1.1],[-139,-134,-80,1.1],[-140,-82,-104,.95],[-114,-42,-140,.8]],t.bs,t.ss);
  s+=gclip(t,'cs',SHL,gs,`<path d="M-124 -164 L-92 -142 L-98 -102 L-134 -84 M-92 -142 L-56 -164 L-40 -196 M-98 -102 L-66 -84 L-72 -46 M-134 -84 L-122 -44 M-66 -84 L-40 -100 M-56 -164 L-30 -150" stroke="${c.sp2}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>
  <path d="M-150 -100 C-146 -60,-120 -34,-94 -28 L-70 -52 C-104 -56,-128 -80,-130 -116 Z" fill="${c.spd}" opacity=".4"/><path d="M-24 -196 C-78 -206,-132 -170,-136 -108" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".55"/><path d="M-94 -30 C-70 -52,-52 -92,-40 -132 C-32 -160,-20 -182,-4 -194" stroke="${c.sp2}" stroke-width="12" fill="none" opacity=".55"/>`);
  s+=orns('cone',t,[[-84,-152,-50,.72],[-108,-112,-78,.72],[-70,-106,-58,.62],[-92,-66,-100,.62]],t.bs,t.ss,0);
  s+=`<g transform="translate(2,0)">${gclip(t,'cg',KL,gb,`<path d="M-30 -44 C-10 -14,40 -10,88 -30 L100 0 L-30 0 Z" fill="${c.deep}" opacity=".3"/><path d="M-6 -86 C12 -100,44 -100,66 -84" stroke="${c.hi}" stroke-width="6" fill="none" opacity=".5" stroke-linecap="round"/>`)}${KN}<ellipse class="ol2" cx="34" cy="-80" rx="21" ry="13" fill="${gs}" transform="rotate(-14 34 -80)"/><ellipse cx="28" cy="-84" rx="8" ry="4" fill="#fff" opacity=".65" transform="rotate(-14 28 -84)"/></g>`;
  t.front=(aa?'':t.held)+`<g transform="rotate(${aa} 30 -136)">${gclip(t,'ca',KA,gb,`<path d="M16 -122 C50 -110,86 -96,116 -84 L116 -70 L16 -108 Z" fill="${c.deep}" opacity=".3"/>`)}${KC}<path d="M40 -146 C58 -146,82 -132,98 -116" stroke="#fff" stroke-width="5" fill="none" opacity=".3" stroke-linecap="round"/><ellipse class="ol2" cx="48" cy="-140" rx="20" ry="13" fill="${gs}" transform="rotate(22 48 -140)"/><ellipse cx="44" cy="-145" rx="8" ry="4" fill="#fff" opacity=".65" transform="rotate(22 44 -145)"/></g>`;
  return s},
 head(t){const{c,gb,gs,p}=t,M=GMOOD[t.mood]||GMOOD.content,jaw=gopen(t,M),HORN='M2 -54 C8 -92,34 -120,64 -128 C52 -104,44 -78,36 -50 Z',
   UP='M-56 -4 C-60 -44,-30 -64,8 -62 C40 -60,62 -48,78 -36 C100 -32,114 -22,114 -6 C114 6,106 12,94 14 L18 22 C-20 30,-52 20,-56 -4 Z';
  const studs=[100,128,156,184,212,240].map(a=>{const q=a*Math.PI/180;return[f(-36+64*Math.cos(q)),f(-24-74*Math.sin(q)),90-a,.6]});
  let s=`<g transform="rotate(${gtilt(t)} -30 30)">`+orns('cone',t,studs,t.hs,1)+`<ellipse class="ol" cx="-36" cy="-24" rx="64" ry="74" fill="${gs}"/><ellipse cx="-40" cy="-24" rx="45" ry="55" fill="${c.hi}" opacity=".6"/><path d="M-98 -10 C-96 30,-70 50,-40 50 C-70 36,-84 10,-84 -20 Z" fill="${c.spd}" opacity=".4"/><path d="M-40 -24 L-86 -62 M-40 -24 L-96 -20 M-40 -24 L-84 22 M-40 -24 L-52 -90" stroke="${c.sp2}" stroke-width="3" opacity=".6" stroke-linecap="round"/><path d="M-60 -88 C-84 -74,-96 -50,-96 -26" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>`;
  s+=`<g transform="translate(-22,6)">${ol(HORN,'#d6c49a')}</g>`;
  s+=gjaw(t,jaw,{hx:-34,hy:8,len:132,path:'M-40 8 L98 12 C94 34,76 44,50 46 C4 50,-36 36,-40 8 Z',extra:ol2('M70 44 C86 42,98 32,100 14 L82 16 C84 28,78 38,70 44 Z','#ffc45e')});
  s+=gclip(t,'ch',UP,gb,`<path d="M-70 -6 C-40 14,-10 19,20 14 L90 8 L118 -2 L118 30 L-70 30 Z" fill="${c.deep}" opacity=".28"/><path d="M-70 -10 C-70 -50,-40 -72,0 -74 C-30 -58,-42 -34,-40 -4 C-40 8,-34 16,-26 24 L-70 24 Z" fill="${c.deep}" opacity=".24"/><ellipse cx="-6" cy="-52" rx="26" ry="6" fill="#fff" opacity=".3" transform="rotate(-4 -6 -52)"/>`);
  s+=ol('M80 -36 C104 -36,122 -20,120 2 C118 16,110 26,100 30 C102 20,96 14,84 13 C90 0,90 -18,80 -36 Z','#ffd98a')+`<path d="M90 -30 C104 -28,114 -16,114 -2" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/><path d="M100 28 C108 22,114 12,116 2 C112 12,104 16,96 16 Z" fill="#e2a45c" opacity=".6"/><ellipse cx="106" cy="-10" rx="3.6" ry="2.8" fill="${L}" transform="rotate(30 106 -10)"/>`;
  s+=ol(HORN,IV)+`<path d="M12 -70 q10 -6 18 -2 M22 -90 q8 -6 16 -2" stroke="#d9b877" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M12 -58 C18 -88,36 -110,56 -120" stroke="#fff" stroke-width="3" fill="none" opacity=".8" stroke-linecap="round"/>`+ol2('M66 -40 L84 -72 L92 -34 Z',IV);
  if(p.teeth>1)s+=tooth(42,lipY(42)+.4,5,9)+tooth(62,lipY(62)+.4,5,9);else s+=tooth(56,lipY(56)+.4,5,8);
  s+=gcorner(M,18,22);if(p.cheek)s+=`<ellipse cx="-14" cy="6" rx="13" ry="8" fill="#ff7fa8" opacity=".6"/>`;
  return s+geye(t,30,-18,18,M)+gbrow(t,M,30,-43,1,.86)+scar(t,46,-56)+gextra(t,{tear:[48,4],anger:[-70,-104],spark:[124,-70],sweat:[-14,-74]})+'</g>'}});
