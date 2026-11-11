/* ---------- les cinq monstres ---------- */
const D=[
/* 1 — le classique */
{id:'g',name:'Grondo',tag:'Le classique',col:'#5b6c9a',H:[48,-258],hand:[128,-128],hat:[0,-2,1],vb:[-266,-360,484,383],cb:'radial-gradient(circle at 50% 30%,#f2f5ff,#aab9e8)',
 txt:"Le kaiju de cinéma : massif, dos hérissé de plaques, mâchoire pleine de crocs. Le plus proche de ce qu'on imagine en pensant « monstre géant ».",
 tr:['Plaques dorsales dentelées','Crocs qui dépassent','Regard féroce'],
 c:{body:'#5b6c9a',hi:'#aebee6',dark:'#2c375e',belly:'#f4f6ff',belly2:'#b3bcdf',bl:'#8a94c0',sp:'#effeff',sp2:'#2fb8e6',i1:'#ffe27a',i2:'#e8590c',glow:'#7df9ff'},
 bg(){const r=mb(7);let s='';for(let x=-262;x<215;x+=34+r()*12){const h=34+r()*74,w=24+r()*10;s+=`<rect x="${f(x)}" y="${f(-h)}" width="${f(w)}" height="${f(h+6)}" rx="3" fill="#fff" opacity=".55"/>`;for(let y=-h+8;y<-10;y+=14)s+=`<rect x="${f(x+5)}" y="${f(y)}" width="5" height="6" fill="#7f93cf" opacity=".55"/><rect x="${f(x+w-10)}" y="${f(y)}" width="5" height="6" fill="#7f93cf" opacity=".55"/>`}return s+ground('#8fa0d8')},
 body(t){const{c,gb}=t;
  let s=orns('plate',t,[[-96,-97,-10,.66],[-142,-84,-24,.56],[-182,-62,-40,.46]],t.bs,t.ss);
  s+=ol(TAIL,gb)+`<path d="M-196 -6 C-140 -6,-90 -11,-44 -17 C-90 -26,-150 -24,-200 -14 Z" fill="${c.belly2}" opacity=".7"/><ellipse cx="-112" cy="-66" rx="13" ry="7" fill="${c.dark}" opacity=".35" transform="rotate(-14 -112 -66)"/><ellipse cx="-158" cy="-46" rx="10" ry="6" fill="${c.dark}" opacity=".35" transform="rotate(-28 -158 -46)"/><path d="M-60 -92 C-110 -96,-160 -78,-192 -50" stroke="#fff" stroke-width="5" fill="none" opacity=".22" stroke-linecap="round"/>`;
  s+=orns('plate',t,[[-72,-76,-98,.8],[-79,-116,-80,1.1],[-65,-166,-58,1.3],[-36,-206,-34,1.1]],t.bs,t.ss);
  s+=`<g transform="translate(-58,-4)">${ol(LEG,c.dark)}${NAILS}</g><g transform="translate(24,-8)">${ol(ARM,c.dark)}${CLAWS}</g>`;
  s+=torso(t,BODY,[72,-116,56,98])+marks([[-52,-150],[-36,-174],[-58,-118],[-34,-130],[-52,-88],[-16,-198],[-30,-100],[-12,-152]],c.dark)+`<ellipse cx="-30" cy="-196" rx="22" ry="9" fill="#fff" opacity=".2" transform="rotate(-28 -30 -196)"/>`;
  s+=`<g transform="translate(6,0)">${ol(LEG,gb)}${NAILS}${legHi}${marks([[6,-66],[22,-48],[38,-66]],c.dark,.55)}</g>${t.held}${ol(ARM,gb)}${CLAWS}${armHi}`;
  return s},
 head(t){const{c,gb,p}=t;let s=orns('plate',t,[[-52,-46,-52,.6],[-24,-68,-26,.7]],t.hs,t.ss);
  s+=ol('M-50 -32 C-76 -48,-96 -32,-92 -8 C-78 -14,-62 -8,-50 2 Z',c.dark)+`<path d="M-60 -26 C-74 -30,-82 -24,-84 -16" stroke="${c.hi}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>`;
  s+=ol('M-46 4 C-44 42,0 62,52 58 C90 54,112 38,108 8 Z',c.body)+`<path d="M-30 32 C-10 50,30 56,58 52 C86 48,102 38,104 24 C92 40,62 46,30 46 C6 46,-16 40,-30 32Z" fill="${c.dark}" opacity=".5"/>`;
  s+=ol('M-64 -6 C-68 -52,-30 -76,12 -74 C40 -72,56 -60,66 -48 C92 -48,118 -36,118 -12 C118 6,104 13,86 14 L18 22 C-22 30,-60 22,-64 -6 Z',gb);
  s+=`<ellipse cx="-4" cy="-60" rx="30" ry="8" fill="#fff" opacity=".25" transform="rotate(-6 -4 -60)"/><path d="M70 -42 Q96 -40 110 -22" stroke="#fff" stroke-width="5" fill="none" opacity=".3" stroke-linecap="round"/><path d="M-58 2 C-40 18,-10 20,18 16 L18 21 C-20 29,-56 22,-62 0 Z" fill="${L}" opacity=".15"/>
  <ellipse cx="102" cy="-24" rx="5" ry="3.6" fill="${L}" transform="rotate(20 102 -24)"/><circle cx="-38" cy="-30" r="3" fill="${c.dark}" opacity=".6"/><circle cx="-30" cy="-42" r="2.4" fill="${c.dark}" opacity=".6"/><circle cx="-44" cy="-18" r="2.2" fill="${c.dark}" opacity=".6"/>`;
  TX[p.teeth].forEach(x=>s+=tooth(x,lipY(x),5.5,p.teeth<3?9:12));
  s+=ol2('M100 12 L104 23 L109 9 Z','#fff');
  if(p.teeth>1)s+=ol2('M45 31 L49 9 L58 29 Z','#fff')+ol2('M82 26 L88 5 L95 23 Z','#fff');
  if(p.cheek)s+=`<ellipse cx="-14" cy="4" rx="14" ry="8.5" fill="#ff7fa8" opacity=".6"/>`;
  return s+eye(t,24,-28,19)+brow(t,26,-55,58,1.25)+scar(t,42,-70)}},

/* 2 — le dodu */
{id:'m',name:'Mochi',tag:'Le dodu',col:'#8fd93f',H:[14,-216],hand:[122,-106],hat:[6,-30,1.3],bm:[14,16],lift:60,sh:130,vb:[-240,-352,470,372],cb:'radial-gradient(circle at 50% 30%,#fffbe0,#ffd0e2)',
 txt:"Tout rond, tout mignon, et toujours affamé. Le décalage fait rire : une peluche adorable qui croque des immeubles.",
 tr:['Grosse tête, petites pattes','Bosses façon bonbons','Joues roses'],
 c:{body:'#a6e658',hi:'#e6ffa8',dark:'#5fb335',belly:'#fffbd6',belly2:'#ffe08a',bl:'#efc45c',sp:'#ffc4dc',sp2:'#ff5f9c',i1:'#8fe9ff',i2:'#2a7fe0',glow:'#ffd0f0'},
 bg(){let s='';[[-190,-290,13,'#fff'],[150,-300,10,'#ff8fc0'],[190,-170,12,'#fff'],[-205,-150,9,'#ffd23f'],[105,-338,7,'#fff'],[-120,-326,8,'#ff8fc0']].forEach(q=>s+=`<polygon points="${star(q[0],q[1],q[2],q[2]*.42,4)}" fill="${q[3]}" opacity=".9"/>`);
  s+=ground('#ffb3cf');[[-200,-2,'#fff'],[-150,10,'#ffd23f'],[150,0,'#fff'],[196,10,'#ff5f9c'],[-90,14,'#ff5f9c']].forEach(q=>{for(let i=0;i<5;i++)s+=`<circle cx="${f(q[0]+Math.cos(i*1.257)*6)}" cy="${f(q[1]+Math.sin(i*1.257)*6)}" r="4.5" fill="${q[2]}"/>`;s+=`<circle cx="${q[0]}" cy="${q[1]}" r="3.5" fill="#ffb02e"/>`});return s},
 body(t){const{c,gb}=t,B='M-100 -96 C-100 -160,-52 -196,6 -196 C66 -196,106 -152,106 -94 C106 -42,66 -10,6 -10 C-56 -10,-100 -42,-100 -96 Z',
   TL='M-66 -78 C-104 -90,-142 -76,-152 -50 C-158 -30,-148 -10,-124 -8 C-100 -6,-76 -10,-56 -20 Z',FT='M-30 -34 C-8 -50,38 -42,46 -18 C50 -6,42 0,32 0 L-24 0 C-40 0,-44 -18,-30 -34 Z',
   AR='M0 0 C16 -12,46 -4,52 14 C54 24,44 31,34 27 C20 22,6 18,-2 12 C-8 8,-6 2,0 0 Z',toes=`<path d="M22 -2 q2 -11 11 -8 M7 -2 q2 -11 11 -9" stroke="${L}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".75"/>`;
  let s=orns('gum',t,[[-124,-76,-36,.62],[-148,-54,-66,.5]],t.bs,t.ss)+ol(TL,gb)+`<path d="M-140 -14 C-110 -8,-80 -12,-58 -22 C-90 -26,-120 -24,-144 -20 Z" fill="${c.belly2}" opacity=".7"/>`;
  s+=orns('gum',t,[[-93,-60,-112,.85],[-103,-112,-84,1.05],[-86,-162,-56,1.1],[-50,-191,-30,.95]],t.bs,t.ss);
  s+=`<g transform="translate(-34,-2)">${ol(FT,c.dark)}</g><g transform="translate(84,-132)">${ol(AR,c.dark)}</g>`;
  s+=torso(t,B,[46,-92,56,74],{shade:'M-110 -42 C-60 -6,0 -2,80 -18 L80 0 L-110 0 Z'});
  s+=`<circle cx="-60" cy="-130" r="10" fill="${c.hi}" opacity=".6"/><circle cx="-74" cy="-96" r="7" fill="${c.hi}" opacity=".6"/><circle cx="-42" cy="-160" r="6" fill="${c.hi}" opacity=".6"/><circle cx="-52" cy="-66" r="8" fill="${c.hi}" opacity=".6"/><circle cx="-30" cy="-112" r="5" fill="${c.hi}" opacity=".6"/>`;
  s+=`<g transform="translate(38,0)">${ol(FT,gb)}${toes}<ellipse cx="6" cy="-32" rx="16" ry="6" fill="#fff" opacity=".25" transform="rotate(-10 6 -32)"/></g>${t.held}<g transform="translate(60,-126)">${ol(AR,gb)}<path d="M8 2 C22 -2,36 4,44 14" stroke="#fff" stroke-width="4" fill="none" opacity=".3" stroke-linecap="round"/></g>`;
  return s},
 head(t){const{c,gb,p}=t;let s=orns('gum',t,[[-66,-64,-48,.8],[-32,-90,-22,.95],[10,-96,4,.75]],t.hs,t.ss);
  s+=ol('M-90 0 C-92 -58,-46 -96,6 -96 C52 -96,82 -72,94 -42 C114 -38,128 -24,128 -6 C128 14,114 26,96 30 C84 62,46 84,0 84 C-50 84,-88 50,-90 0 Z',gb);
  s+=`<ellipse cx="-12" cy="-76" rx="38" ry="9" fill="#fff" opacity=".28" transform="rotate(-8 -12 -76)"/><path d="M-82 30 C-54 76,44 88,86 44 C50 74,-40 76,-82 30 Z" fill="${L}" opacity=".13"/><path d="M96 -38 Q116 -34 122 -18" stroke="#fff" stroke-width="5" fill="none" opacity=".35" stroke-linecap="round"/>`;
  s+=ol2('M52 30 C70 40,96 36,108 22 C108 48,72 62,52 30 Z','#7d1b40')+`<path d="M66 44 C76 38,92 38,100 34 C96 48,78 54,66 44 Z" fill="#ff7d9c"/>`+tooth(92,29,5,9);
  if(p.teeth>3)s+=tooth(76,33.5,5,9);
  s+=`<ellipse cx="117" cy="-12" rx="4" ry="3" fill="${L}"/><ellipse cx="18" cy="32" rx="18" ry="10.5" fill="#ff7fa8" opacity=".65"/><circle cx="-46" cy="-22" r="3" fill="${c.dark}" opacity=".6"/><circle cx="-56" cy="-8" r="2.4" fill="${c.dark}" opacity=".6"/><circle cx="-42" cy="-4" r="2.2" fill="${c.dark}" opacity=".6"/>`;
  return s+eye(t,42,-14,27,.88)+brow(t,44,-52,44,.45)}},

/* 3 — le volcan */
{id:'b',name:'Braz',tag:'Le volcan',col:'#e04a2f',H:[56,-268],hand:[138,-138],glow:1,vb:[-282,-398,520,412],cb:'radial-gradient(circle at 50% 35%,#fff0c2,#ff9d6b)',
 txt:"Né dans la lave : cornes, crête de flammes, ventre incandescent. Le plus agressif des cinq, il fume du museau en permanence.",
 tr:['Flammes animées','Fissures de lave','Cornes et corne de nez'],
 c:{body:'#d8402e',hi:'#ff9166',dark:'#7a1626',belly:'#fff3a0',belly2:'#ff9a2e',bl:'#d4581a',sp:'#ffe45c',sp2:'#ff5a1f',i1:'#fff27a',i2:'#ff7a00',glow:'#ffd23f'},
 bg(){let s=`<path d="M-290 0 L-232 -120 L-196 -120 L-140 0 Z" fill="#b13a2a" opacity=".4"/><path d="M-236 -120 L-226 -98 L-214 -110 L-204 -94 L-192 -120 Z" fill="#ffd23f" opacity=".8"/><path d="M120 0 L176 -90 L204 -90 L250 0 Z" fill="#b13a2a" opacity=".4"/><path d="M172 -90 L182 -72 L192 -82 L208 -90 Z" fill="#ffd23f" opacity=".8"/>`+ground('#c95a3a');
  [[-250,-200,5],[-210,-270,4],[190,-210,5],[215,-300,4],[150,-340,3],[-150,-350,4],[90,-380,3],[-270,-320,3]].forEach((q,i)=>s+=`<g class="bob" style="animation-delay:${-i*.4}s"><circle cx="${q[0]}" cy="${q[1]}" r="${q[2]}" fill="#fff27a"/><circle cx="${q[0]}" cy="${q[1]}" r="${q[2]*2}" fill="#ff7a00" opacity=".35"/></g>`);return s},
 body(t){const{c,gb,fl}=t,B='M-70 -70 C-100 -140,-72 -226,0 -240 C72 -248,114 -200,106 -136 C100 -80,72 -24,16 -18 C-30 -14,-58 -34,-70 -70 Z',
   TL='M-44 -112 C-104 -112,-150 -124,-184 -160 C-196 -172,-222 -170,-226 -150 C-230 -100,-190 -44,-130 -26 C-96 -17,-66 -14,-40 -14 Z';
  const crack=(d,w=4.5)=>`<path d="${d}" stroke="#ff7a00" stroke-width="${w+7}" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="${fl}" opacity=".9"/><path d="${d}" stroke="#ffd23f" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>`;
  let s=orns('flame',t,[[-212,-166,-44,1.25],[-114,-116,-6,.7],[-156,-134,-24,.62]],t.bs,t.ss);
  s+=ol(TL,gb)+`<path d="M-200 -80 C-170 -40,-110 -22,-44 -17 C-90 -30,-150 -48,-186 -84 Z" fill="${c.belly2}" opacity=".55"/>`+crack('M-150 -70 l14 -14 l12 10 l12 -16 M-198 -122 l12 -8 l8 14');
  s+=orns('flame',t,[[-80,-84,-98,.85],[-89,-130,-80,1.15],[-76,-182,-58,1.35],[-42,-224,-34,1.15]],t.bs,t.ss);
  s+=`<g transform="translate(-58,-4)">${ol(LEG,c.dark)}${NAILS}</g><g transform="translate(34,-16)">${ol(ARM,c.dark)}${CLAWS}</g>`;
  s+=torso(t,B,[82,-130,54,98],{inside:`<ellipse cx="-40" cy="-190" rx="26" ry="16" fill="${c.dark}" opacity=".4" transform="rotate(-30 -40 -190)"/><ellipse cx="-66" cy="-112" rx="14" ry="22" fill="${c.dark}" opacity=".35"/>`+crack('M-66 -152 l16 16 l-8 18 l18 14 M-30 -212 l12 20 l-12 14 l10 16 M-58 -84 l20 8 l-4 16 l16 10 M-14 -128 l-12 18 l14 14 l-6 14')});
  s+=`<g transform="translate(6,0)">${ol(LEG,gb)}${NAILS}${legHi}${crack('M10 -70 l14 10 l-4 14 l14 8',3.5)}</g>${t.held}<g transform="translate(10,-10)">${ol(ARM,gb)}${CLAWS}${armHi}</g>`;
  return s},
 head(t){const{c,gb,p,fl}=t,HORN='M-28 -58 C-44 -94,-80 -106,-108 -94 C-86 -88,-66 -70,-52 -42 Z';
  let s=`<g transform="translate(18,8)">${ol(HORN,'#cdb48a')}</g>`;
  s+=ol('M-44 6 C-40 42,4 60,54 54 C84 50,102 36,100 14 Z',c.body)+`<path d="M-30 30 C-10 46,30 52,56 48 C80 44,94 34,96 22 C86 36,60 42,30 42 C6 42,-16 38,-30 30Z" fill="${c.dark}" opacity=".5"/>
  <path d="M-12 10 L100 8 C100 26,84 42,54 44 C24 46,-2 34,-12 10 Z" fill="#6b1420"/><ellipse cx="34" cy="30" rx="36" ry="13" fill="#ff9a2e" filter="${fl}"/><path d="M14 36 C30 22,64 22,80 32 C64 43,32 44,14 36 Z" fill="#ffd23f"/><path d="M28 36 C40 28,58 28,68 33 C58 40,40 40,28 36 Z" fill="#fff6b0"/>`;
  for(let i=0;i<Math.min(3,p.teeth);i++){const x=46+i*17;s+=tooth(x,42-(x-50)*.2,5,-11)}
  s+=ol('M-62 -8 C-66 -48,-36 -72,6 -72 C34 -72,52 -60,64 -48 L98 -40 C114 -36,122 -22,118 -8 C116 6,104 12,88 13 L18 22 C-22 30,-58 22,-62 -8 Z',gb);
  s+=`<ellipse cx="-6" cy="-60" rx="28" ry="7" fill="#fff" opacity=".25" transform="rotate(-6 -6 -60)"/><path d="M-58 2 C-40 18,-10 20,18 16 L18 21 C-20 29,-56 22,-62 0 Z" fill="${L}" opacity=".15"/>`;
  s+=ol(HORN,'#fff3d0')+`<path d="M-50 -64 q8 -8 16 -6 M-72 -80 q8 -8 14 -4" stroke="#c9a56a" stroke-width="3" fill="none" stroke-linecap="round"/>`+ol2('M82 -42 L100 -74 L108 -36 Z','#fff3d0');
  s+=`<path d="M-42 -30 l12 10 l-6 12 M-12 -58 l8 12 l-6 8" stroke="#ff7a00" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="${fl}"/><path d="M-42 -30 l12 10 l-6 12 M-12 -58 l8 12 l-6 8" stroke="#ffd23f" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="106" cy="-20" rx="4.6" ry="3.4" fill="${L}" transform="rotate(20 106 -20)"/><circle class="smk" cx="116" cy="-32" r="9" fill="#fff" opacity=".7"/><circle class="smk" cx="124" cy="-40" r="7" fill="#fff" opacity=".7" style="animation-delay:-1.7s"/>`;
  TX[p.teeth].forEach(x=>s+=tooth(x,lipY(x)+.5,6,p.teeth<3?10:14));
  if(p.cheek)s+=`<ellipse cx="-14" cy="4" rx="14" ry="8.5" fill="#ffb02e" opacity=".7"/>`;
  return s+eye(t,22,-28,19)+brow(t,24,-55,58,1.5)+scar(t,40,-68)}},

/* 4 — l'abysse */
{id:'p',name:'Plouf',tag:"L'abysse",col:'#1fb3c6',H:[36,-246],hand:[138,-120],vb:[-296,-384,520,412],cb:'radial-gradient(circle at 50% 30%,#e6fbff,#8fd3f5)',
 txt:"Sorti des grands fonds : voile dorsale, branchies en plumeau et lanterne lumineuse sur le front. Parfait pour croquer bateaux et cargos.",
 tr:['Voile et nageoire de queue','Lanterne qui pulse','Taches lumineuses'],
 c:{body:'#22b4c8',hi:'#a6f5ee',dark:'#0d6c8e',belly:'#fff8dc',belly2:'#ffd98a',bl:'#eab94a',sp:'#ffd9ec',sp2:'#ff5fa2',i1:'#ffe27a',i2:'#ff7a3c',glow:'#b8fbff'},
 bg(){let s='';[[-250,-120,12],[-226,-200,7],[-262,-262,9],[200,-150,11],[178,-250,7],[212,-320,10],[-170,-340,6],[120,-360,5]].forEach((q,i)=>s+=`<g class="bob" style="animation-delay:${-i*.35}s"><circle cx="${q[0]}" cy="${q[1]}" r="${q[2]}" fill="#fff" opacity=".35" stroke="#fff" stroke-width="2.5"/><circle cx="${q[0]-q[2]*.3}" cy="${q[1]-q[2]*.3}" r="${q[2]*.25}" fill="#fff"/></g>`);
  s+=ground('#3fa9dc')+`<path d="M-300 6 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>`;return s},
 body(t){const{c,gb,gs,fl,G}=t,B='M-60 -56 C-86 -120,-56 -192,-4 -216 C32 -232,64 -214,74 -174 C84 -124,74 -56,24 -20 C-14 -8,-48 -22,-60 -56 Z',
   TL='M-36 -96 C-92 -104,-150 -90,-190 -58 C-204 -46,-204 -22,-184 -12 C-132 -2,-80 -6,-36 -14 Z',
   TF='M-176 -50 C-198 -96,-246 -114,-274 -94 C-256 -76,-250 -58,-256 -36 C-262 -12,-238 6,-212 -2 C-196 -6,-184 -14,-178 -24 Z',
   SAIL='M2 -200 C-18 -252,-70 -266,-102 -234 C-106 -222,-100 -214,-98 -208 C-126 -202,-150 -172,-138 -146 C-134 -138,-128 -134,-124 -130 C-144 -116,-150 -88,-130 -68 L-40 -60 Z',
   WL='M-10 -66 C-10 -100,16 -108,36 -102 C58 -96,66 -74,60 -52 C58 -42,66 -36,80 -32 C96 -34,112 -22,112 -8 C112 -2,106 0,98 0 L22 0 C4 0,-4 -12,-2 -32 C-8 -42,-10 -54,-10 -66 Z',
   web=`<path d="M76 -28 L104 -8 M68 -18 L90 -2" stroke="${L}" stroke-width="2.6" stroke-linecap="round" opacity=".6"/>`,
   AW='M22 -170 C44 -180,84 -158,102 -138 C112 -138,126 -134,128 -124 C122 -120,126 -110,118 -106 C110 -110,104 -104,96 -108 C74 -118,48 -130,24 -138 C12 -144,12 -164,22 -170 Z';
  const ray=d=>`<path d="${d}" stroke="${c.sp2}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/>`;
  const spot=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r*2}" fill="${c.glow}" opacity=".8" filter="${fl}"/><circle cx="${x}" cy="${y}" r="${r}" fill="#eaffff"/>`;
  let s=(t.glow?`<path d="${TF}" fill="${c.sp2}" filter="${fl}"/><path d="${SAIL}" fill="${c.sp2}" filter="${fl}"/>`:'');
  s+=ol(TF,gs)+ray('M-190 -44 L-254 -90 M-198 -36 L-248 -58 M-198 -24 L-246 -20')+ol(TL,gb)+`<path d="M-186 -14 C-132 -6,-84 -10,-40 -17 C-90 -26,-140 -24,-190 -22 Z" fill="${c.belly2}" opacity=".7"/>`+spot(-150,-52,5)+spot(-112,-66,6)+spot(-76,-72,4.5);
  s+=ol(SAIL,gs)+ray('M-30 -180 L-74 -240 M-34 -196 L-42 -240 M-46 -160 L-130 -174 M-50 -150 L-104 -214 M-48 -110 L-134 -98 M-46 -126 L-128 -130');
  s+=`<g transform="translate(-52,-4)">${ol(WL,c.dark)}</g><g transform="translate(22,-8)">${ol(AW,c.dark)}</g>`;
  s+=torso(t,B,[42,-112,40,92],{shade:'M-80 -40 C-50 -8,0 -6,50 -22 L50 0 L-90 0 Z',inside:spot(-32,-150,7)+spot(-44,-118,5)+spot(-38,-88,6)+spot(-18,-62,4)+spot(-10,-176,4.5)});
  s+=`<ellipse cx="-24" cy="-192" rx="18" ry="8" fill="#fff" opacity=".25" transform="rotate(-36 -24 -192)"/>`;
  s+=`<g>${ol(WL,gb)}${web}<ellipse cx="30" cy="-86" rx="18" ry="9" fill="#fff" opacity=".25" transform="rotate(-18 30 -86)"/></g>${t.held}${ol(AW,gb)}<path d="M34 -164 C52 -164,76 -150,92 -134" stroke="#fff" stroke-width="5" fill="none" opacity=".28" stroke-linecap="round"/><path d="M108 -132 L120 -122 M106 -124 L116 -112" stroke="${L}" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>`;
  return s},
 head(t){const{c,gb,gs,p,fl}=t,FR='M0 0 C-16 -16,-42 -20,-64 -8 C-48 -6,-38 2,-30 13 C-20 11,-8 7,0 0 Z';
  const frond=(x,y,r,d)=>`<g transform="translate(${x},${y}) rotate(${r})"><g class="wig" style="animation-delay:${d}s">${t.glow?`<path d="${FR}" fill="${c.sp2}" filter="${fl}"/>`:''}${ol2(FR,gs)}<path d="M-8 2 L-52 -6 M-20 -8 l-4 10 M-32 -10 l-4 11 M-44 -10 l-3 9" stroke="${c.sp2}" stroke-width="2.6" fill="none" stroke-linecap="round"/></g></g>`;
  let s=frond(-40,-40,28,0)+frond(-50,-12,-2,-.5)+frond(-44,16,-32,-1);
  s+=`<path d="M2 -58 C0 -98,26 -122,58 -110" stroke="${L}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M2 -58 C0 -98,26 -122,58 -110" stroke="${c.body}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="64" cy="-106" r="26" fill="#fff27a" opacity=".85" filter="${fl}"/><circle class="ol2 pulse" cx="64" cy="-106" r="13" fill="#fff27a"/><circle cx="60" cy="-110" r="4.5" fill="#fff"/>`;
  s+=ol('M-40 8 C-36 36,6 48,50 44 C86 40,110 26,114 2 Z',c.belly)+`<path d="M-28 28 C-8 42,30 46,58 42 C84 38,100 28,106 16 C92 30,62 36,30 36 C8 36,-14 34,-28 28Z" fill="${c.belly2}" opacity=".8"/>`;
  s+=ol('M-58 -6 C-62 -46,-30 -68,10 -66 C44 -64,70 -54,92 -42 C112 -36,124 -22,120 -6 C116 8,102 13,86 14 L18 22 C-20 30,-54 20,-58 -6 Z',gb);
  s+=`<ellipse cx="-2" cy="-55" rx="30" ry="7" fill="#fff" opacity=".28" transform="rotate(-4 -2 -55)"/><path d="M76 -42 Q102 -36 112 -20" stroke="#fff" stroke-width="5" fill="none" opacity=".3" stroke-linecap="round"/><path d="M-52 2 C-36 16,-10 19,18 16 L18 21 C-20 29,-50 20,-56 0 Z" fill="${L}" opacity=".14"/>
  <path d="M18 22 C8 20,3 13,4 5" stroke="${L}" stroke-width="3.6" fill="none" stroke-linecap="round"/><ellipse cx="106" cy="-20" rx="4.2" ry="3.2" fill="${L}" transform="rotate(20 106 -20)"/>
  <circle cx="-36" cy="-30" r="8" fill="${c.glow}" opacity=".8" filter="${fl}"/><circle cx="-36" cy="-30" r="4" fill="#eaffff"/><circle cx="-24" cy="-46" r="6" fill="${c.glow}" opacity=".8" filter="${fl}"/><circle cx="-24" cy="-46" r="3" fill="#eaffff"/>`;
  if(p.teeth>1)s+=tooth(56,lipY(56)+.5,4.5,8)+tooth(80,lipY(80)+.5,4.5,8);else s+=tooth(70,lipY(70)+.5,4.5,8);
  if(p.teeth>3)s+=tooth(100,lipY(100)-1,4.5,8);
  s+=`<ellipse cx="-10" cy="4" rx="14" ry="8.5" fill="#ff7fa8" opacity=".6"/>`;
  return s+eye(t,34,-22,22,.95)+brow(t,36,-52,48,.7)}},

/* 5 — le blindé */
{id:'k',name:'Krok',tag:'Le blindé',col:'#9a6cf2',H:[66,-204],hand:[124,-104],sh:170,vb:[-290,-362,510,404],cb:'radial-gradient(circle at 50% 30%,#fff3d6,#e6c7ff)',
 txt:"Un char d'assaut vivant : carapace à pics, collerette, trois cornes et queue-massue. Trapu et costaud, taillé pour démolir.",
 tr:['Carapace à pics','Trois cornes et collerette','Queue-massue'],
 c:{body:'#9a6cf2',hi:'#d9c4ff',dark:'#5632b0',belly:'#fff6cf',belly2:'#ffd58a',bl:'#e8b04c',sp:'#ffe27a',sp2:'#f0872a',i1:'#b8ff8a',i2:'#2f9e44',glow:'#ffe27a'},
 bg(){let s=`<path d="M-280 0 L-210 -130 L-150 0 Z" fill="#fff" opacity=".45"/><path d="M-224 -104 L-210 -130 L-196 -100 L-206 -108 L-214 -98 Z" fill="#fff" opacity=".7"/><path d="M110 0 L190 -150 L262 0 Z" fill="#fff" opacity=".45"/><path d="M174 -120 L190 -150 L206 -116 L196 -124 L186 -112 Z" fill="#fff" opacity=".7"/>`+ground('#c9a3ee');
  [[-236,8,16,9],[-196,14,9,6],[176,6,18,10],[214,14,10,6],[-110,16,8,5]].forEach(q=>s+=`<ellipse cx="${q[0]}" cy="${q[1]}" rx="${q[2]}" ry="${q[3]}" fill="#8e63d6" stroke="${L}" stroke-width="2.5"/>`);return s},
 body(t){const{c,gb,gs,G}=t,B='M-96 -60 C-116 -120,-82 -182,-10 -190 C60 -196,112 -162,112 -106 C112 -56,76 -20,16 -16 C-44 -12,-84 -26,-96 -60 Z',
   TL='M-60 -84 C-112 -92,-152 -76,-180 -54 C-192 -44,-190 -22,-174 -14 C-130 -6,-90 -8,-54 -14 Z',
   SHL='M-4 -194 C-70 -216,-146 -172,-144 -100 C-143 -62,-120 -36,-94 -30 C-70 -52,-52 -92,-40 -132 C-32 -160,-20 -182,-4 -194 Z',
   KL='M-20 -60 C-22 -96,12 -106,40 -100 C68 -94,78 -70,74 -46 C72 -30,82 -22,86 -12 C90 -2,82 0,72 0 L8 0 C-6 0,-14 -10,-12 -28 C-18 -38,-20 -48,-20 -60 Z',
   KN=ol2('M34 0 C34 -13,48 -13,48 0 Z',IV)+ol2('M51 0 C51 -14,66 -14,66 0 Z',IV)+ol2('M69 0 C69 -13,83 -13,83 0 Z',IV),
   KA='M30 -150 C54 -160,96 -138,112 -114 C120 -102,108 -88,94 -94 C74 -102,50 -112,28 -118 C16 -124,18 -144,30 -150 Z',
   KC=ol2('M103 -117 L124 -114 L109 -104 Z',IV)+ol2('M102 -105 L121 -97 L102 -93 Z',IV);
  let s=ol(TL,gb)+`<path d="M-176 -16 C-130 -8,-90 -10,-58 -17 C-100 -26,-140 -26,-180 -24 Z" fill="${c.belly2}" opacity=".7"/>`+marks([[-120,-66],[-146,-50],[-100,-46]],c.dark,.5);
  s+=orns('cone',t,[[-232,-52,-78,.8],[-222,-70,-40,.8],[-200,-76,4,.75],[-226,-30,-116,.75],[-206,-10,-170,.7]],t.bs,1)+`<circle class="ol" cx="-204" cy="-42" r="30" fill="${gs}"/><path d="M-222 -56 a24 24 0 0 1 30 -10" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/><path d="M-216 -36 l12 8 l14 -8 M-204 -28 v14" stroke="${c.sp2}" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".8"/>`;
  s+=`<g transform="translate(-66,-4)">${ol(KL,c.dark)}${KN}</g><g transform="translate(24,-8)">${ol(KA,c.dark)}${KC}</g>`;
  s+=torso(t,B,[74,-100,52,76]);
  s+=orns('cone',t,[[-52,-204,-24,1],[-104,-184,-52,1.1],[-139,-134,-80,1.1],[-140,-82,-104,.95],[-114,-42,-140,.8]],t.bs,t.ss);
  s+=`<clipPath id="${G('cs')}"><path d="${SHL}"/></clipPath>${ol(SHL,gs)}<g clip-path="url(#${G('cs')})"><path d="M-124 -164 L-92 -142 L-98 -102 L-134 -84 M-92 -142 L-56 -164 L-40 -196 M-98 -102 L-66 -84 L-72 -46 M-134 -84 L-122 -44 M-66 -84 L-40 -100 M-56 -164 L-30 -150" stroke="${c.sp2}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>
  <path d="M-24 -196 C-78 -206,-132 -170,-136 -108" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".5"/><path d="M-94 -30 C-70 -52,-52 -92,-40 -132 C-32 -160,-20 -182,-4 -194" stroke="${c.sp2}" stroke-width="12" fill="none" opacity=".55"/></g>`;
  s+=orns('cone',t,[[-84,-152,-50,.72],[-108,-112,-78,.72],[-70,-106,-58,.62],[-92,-66,-100,.62]],t.bs,t.ss,0);
  s+=`<g transform="translate(2,0)">${ol(KL,gb)}${KN}<ellipse class="ol2" cx="34" cy="-80" rx="21" ry="13" fill="${gs}" transform="rotate(-14 34 -80)"/><ellipse cx="28" cy="-84" rx="8" ry="4" fill="#fff" opacity=".6" transform="rotate(-14 28 -84)"/><path d="M10 -3 L80 -3" stroke="${L}" stroke-width="4" opacity=".14"/></g>`;
  s+=t.held+ol(KA,gb)+KC+`<ellipse class="ol2" cx="48" cy="-140" rx="20" ry="13" fill="${gs}" transform="rotate(22 48 -140)"/><ellipse cx="44" cy="-145" rx="8" ry="4" fill="#fff" opacity=".6" transform="rotate(22 44 -145)"/>`;
  return s},
 head(t){const{c,gb,gs,p}=t,HORN='M2 -54 C8 -92,34 -120,64 -128 C52 -104,44 -78,36 -50 Z';
  const studs=[100,128,156,184,212,240].map(a=>{const q=a*Math.PI/180;return[f(-36+64*Math.cos(q)),f(-24-74*Math.sin(q)),90-a,.6]});
  let s=orns('cone',t,studs,t.hs,1)+`<ellipse class="ol" cx="-36" cy="-24" rx="64" ry="74" fill="${gs}"/><ellipse cx="-40" cy="-24" rx="45" ry="55" fill="${c.hi}" opacity=".6"/><path d="M-40 -24 L-86 -62 M-40 -24 L-96 -20 M-40 -24 L-84 22 M-40 -24 L-52 -90" stroke="${c.sp2}" stroke-width="3" opacity=".6" stroke-linecap="round"/>`;
  s+=`<g transform="translate(-22,6)">${ol(HORN,'#d6c49a')}</g>`;
  s+=ol('M-40 8 C-36 36,4 50,50 46 C76 44,94 34,98 12 Z',c.body)+`<path d="M-28 28 C-8 42,28 46,52 42 C74 40,88 32,92 22 C80 32,58 36,30 36 C8 36,-14 34,-28 28Z" fill="${c.dark}" opacity=".5"/>`+ol2('M70 44 C86 42,98 32,100 14 L82 16 C84 28,78 38,70 44 Z','#ffc45e');
  s+=ol('M-56 -4 C-60 -44,-30 -64,8 -62 C40 -60,62 -48,78 -36 C100 -32,114 -22,114 -6 C114 6,106 12,94 14 L18 22 C-20 30,-52 20,-56 -4 Z',gb);
  s+=`<ellipse cx="-6" cy="-52" rx="26" ry="6" fill="#fff" opacity=".28" transform="rotate(-4 -6 -52)"/><path d="M-50 2 C-34 16,-10 19,18 16 L18 21 C-20 29,-48 20,-54 0 Z" fill="${L}" opacity=".14"/>`;
  s+=ol('M80 -36 C104 -36,122 -20,120 2 C118 16,110 26,100 30 C102 20,96 14,84 13 C90 0,90 -18,80 -36 Z','#ffd98a')+`<path d="M90 -30 C104 -28,114 -16,114 -2" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/><ellipse cx="106" cy="-10" rx="3.6" ry="2.8" fill="${L}" transform="rotate(30 106 -10)"/>`;
  s+=ol(HORN,IV)+`<path d="M12 -70 q10 -6 18 -2 M22 -90 q8 -6 16 -2" stroke="#d9b877" stroke-width="3" fill="none" stroke-linecap="round"/>`+ol2('M66 -40 L84 -72 L92 -34 Z',IV);
  if(p.teeth>1)s+=tooth(42,lipY(42)+.4,5,9)+tooth(62,lipY(62)+.4,5,9);else s+=tooth(56,lipY(56)+.4,5,8);
  if(p.cheek)s+=`<ellipse cx="-14" cy="6" rx="13" ry="8" fill="#ff7fa8" opacity=".6"/>`;
  return s+eye(t,30,-18,18)+brow(t,30,-42,50,1)+scar(t,46,-56)}}
];

