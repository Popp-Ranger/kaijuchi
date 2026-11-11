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

Object.assign(D[0],{H:[52,-262],hand:[140,-134],
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
  // queue
  let s=orns(pf,t,far(tl),t.bs,t.ss,0)+orns(pl,t,tl,t.bs,t.ss);
  s+=`<clipPath id="${G('ct')}"><path d="${TAILP}"/></clipPath>`+ol(TAILP,gb)+`<g clip-path="url(#${G('ct')})"><path d="M-270 -52 C-256 -18,-228 -3,-190 -3 C-140 -3,-88 -8,-34 -13 L-34 -36 C-90 -34,-150 -30,-196 -22 C-226 -18,-252 -30,-262 -56 Z" fill="url(#${G('gl')})"/>
  <path d="M-70 -34 q4 12 -2 24 M-104 -31 q4 12 -2 25 M-138 -28 q4 12 -2 25 M-172 -24 q4 10 -2 22 M-204 -21 q4 8 0 18 M-232 -26 q6 8 4 18" stroke="${c.bl}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M-36 -128 C-96 -132,-158 -112,-198 -74 C-214 -58,-230 -52,-246 -66 L-250 -40 C-230 -34,-212 -42,-196 -56 C-158 -90,-100 -106,-36 -104 Z" fill="${c.deep}" opacity=".28"/>
  ${marks([[-84,-96],[-116,-88],[-148,-74],[-100,-70],[-134,-58],[-176,-56],[-66,-78],[-166,-40],[-206,-44]],c.deep,.45)}</g>
  <path d="M-50 -122 C-104 -124,-156 -104,-190 -72" stroke="${c.hi}" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/><path class="ol" d="${TAILP}" fill="none"/>`;
  // dos
  s+=orns(pf,t,far(back),t.bs,t.ss,0)+orns(pl,t,back,t.bs,t.ss);
  // membres du fond
  s+=`<g transform="translate(-56,-6)">${ol(LEGP,c.dark)}${toes('#cfc7b0')}<path d="M-22 -74 C-26 -116,10 -132,44 -124 C10 -110,0 -70,10 -30 L-2 -30 C-14 -42,-20 -58,-22 -74 Z" fill="${c.deep}" opacity=".4"/></g>`;
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
  s+=`<g transform="translate(42,-178) rotate(${aa})"><clipPath id="${G('ca')}"><path d="${ARMP}"/></clipPath>`+(t.held&&!aa?`<g transform="translate(96,46) rotate(-24)">${car(0,0,'#ff5a5a',1,1.25)}</g>`:'')+`${ol(ARMP,gb)}<g clip-path="url(#${G('ca')})"><path d="M-20 14 C10 30,50 44,96 56 L96 70 L-20 40 Z" fill="${c.deep}" opacity=".32"/>${marks([[4,-6],[24,2],[44,14]],c.deep,.4)}</g>
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
