/* ---------- rendu ---------- */
function mon(d,k,u,full,o={}){const p=ST[k],c=d.c,bs=p.bs,hs=p.hs,G=n=>n+d.id+k+u;
 const t={p,c,G,gb:`url(#${G('gb')})`,gs:`url(#${G('gs')})`,fl:`url(#${G('fl')})`,ss:p.ss,bs,hs,glow:p.glow||d.glow};
 t.k=k;t.mood=o.mood||"content";t.pose=o.pose||"debout";
 t.held=p.hold&&full?`<g transform="translate(${d.hand}) rotate(-24)">${car(0,0,'#ff5a5a',1,1.25)}</g>`:'';
 const bm=d.bm||[0,0],beam=p.beam&&full?`<g transform="translate(${bm})"><g class="beam"><path d="M90 16 L640 110 L600 250 L90 36 Z" fill="url(#${G('gbm')})" filter="${t.fl}"/><path d="M92 20 L620 150 L604 208 L92 32 Z" fill="url(#${G('gbm')})"/><path d="M94 23 L560 160 L556 178 L94 29 Z" fill="#fff" opacity=".9"/></g></g>`:'';
 const SHELL='M-66 -38 L-52 -60 L-36 -42 L-20 -66 L-2 -46 L16 -68 L34 -44 L50 -62 L66 -38 C70 -150,-70 -150,-66 -38 Z';
 const hat=p.hat&&d.hat?`<g transform="translate(${d.hat[0]},${d.hat[1]}) scale(${d.hat[2]})" style="--lw:${f2(1/(hs*d.hat[2]))}"><clipPath id="${G('csh')}"><path d="${SHELL}"/></clipPath><path d="${SHELL}" fill="#fffaf0"/><g clip-path="url(#${G('csh')})"><circle cx="-28" cy="-96" r="10" fill="${c.sp2}"/><circle cx="20" cy="-106" r="8" fill="${c.belly2}"/><circle cx="42" cy="-76" r="7" fill="${c.sp2}"/><circle cx="-48" cy="-68" r="6" fill="${c.belly2}"/><circle cx="2" cy="-78" r="5" fill="${c.hi}"/><path d="M18 -126 C54 -112,66 -72,62 -36 L90 -36 L90 -140 Z" fill="#e2a45c" opacity=".32"/><ellipse cx="-36" cy="-104" rx="8" ry="16" fill="#fff" opacity=".85" transform="rotate(34 -36 -104)"/></g><path d="M-4 -124 l8 13 l-10 9 l7 11" stroke="${L}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/><path class="ol" d="${SHELL}" fill="none"/></g>`:'';
 let s=`<defs><radialGradient id="${G('gb')}" cx=".62" cy=".28" r=".9"><stop offset="0" stop-color="${c.hi}"/><stop offset=".5" stop-color="${c.body}"/><stop offset="1" stop-color="${c.dark}"/></radialGradient>
 <linearGradient id="${G('gl')}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.belly}"/><stop offset="1" stop-color="${c.belly2}"/></linearGradient>
 <linearGradient id="${G('gs')}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${c.sp2}"/><stop offset="1" stop-color="${c.sp}"/></linearGradient>
 <radialGradient id="${G('ge')}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="${c.i1}"/><stop offset="1" stop-color="${c.i2}"/></radialGradient>
 <linearGradient id="${G('gbm')}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${c.glow}"/><stop offset="1" stop-color="${c.sp2}" stop-opacity="0"/></linearGradient>
 <filter id="${G('fl')}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7"/></filter></defs>`;
 s+=`<ellipse cx="-14" cy="3" rx="${f((d.sh||160)*bs)}" ry="${f(15*bs)}" fill="${L}" opacity=".24"/><g class="breath"><g transform="scale(${bs})" style="--lw:${f2(1/bs)}">${d.body(t)}</g>`;
 s+=`<g transform="translate(${f(d.H[0]*bs)},${f(d.H[1]*bs-(1-bs)*(d.lift||0))}) scale(${hs})" style="--lw:${f2(1/hs)}"><g class="nod">${beam}${d.head(t)}${hat}</g></g>${t.front?`<g transform="scale(${bs})" style="--lw:${f2(1/bs)}">${t.front}</g>`:""}</g>`;
 return s}
function egg(u,d){const e=d.c,ec=[e.body,e.sp2,e.belly2,e.hi,e.sp2,e.sp,e.body];return `<defs><radialGradient id="gegg${u}" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#fff3d6"/><stop offset="1" stop-color="#f3c98a"/></radialGradient>
<clipPath id="cegg${u}"><path d="M0 -206 C52 -206,84 -132,84 -82 C84 -34,48 -6,0 -6 C-48 -6,-84 -34,-84 -82 C-84 -132,-52 -206,0 -206 Z"/></clipPath></defs>
<ellipse cx="0" cy="6" rx="128" ry="15" fill="${L}" opacity=".22"/>
<path class="ol" d="M-118 -30 C-124 -52,124 -52,118 -30 C112 6,-112 6,-118 -30 Z" fill="#8a5a36"/>
<g class="wob"><path class="ol" d="M0 -206 C52 -206,84 -132,84 -82 C84 -34,48 -6,0 -6 C-48 -6,-84 -34,-84 -82 C-84 -132,-52 -206,0 -206 Z" fill="url(#gegg${u})"/>
<g clip-path="url(#cegg${u})"><circle cx="-40" cy="-150" r="15" fill="${ec[0]}"/><circle cx="46" cy="-58" r="20" fill="${ec[1]}"/><circle cx="-50" cy="-44" r="13" fill="${ec[2]}"/><circle cx="40" cy="-166" r="10" fill="${ec[3]}"/><circle cx="-84" cy="-90" r="12" fill="${ec[4]}"/><circle cx="4" cy="-28" r="8" fill="${ec[5]}"/><circle cx="74" cy="-120" r="11" fill="${ec[6]}"/>
<path d="M30 -190 C70 -150,86 -90,60 -30 L100 -30 L100 -200 Z" fill="#e2a45c" opacity=".3"/></g>
<path class="ol2" d="M-80 -112 L-56 -128 L-36 -108 L-12 -130 L12 -106 L36 -126 L58 -108 L80 -118 L82 -92 L62 -80 L38 -96 L14 -76 L-10 -98 L-34 -78 L-56 -96 L-82 -84 Z" fill="${L}"/>
<circle cx="-16" cy="-102" r="9" fill="#fff"/><circle cx="-14" cy="-102" r="4.5" fill="${L}"/><circle cx="-12.5" cy="-104" r="1.6" fill="#fff"/><circle cx="20" cy="-102" r="9" fill="#fff"/><circle cx="22" cy="-102" r="4.5" fill="${L}"/><circle cx="23.5" cy="-104" r="1.6" fill="#fff"/>
<ellipse cx="-34" cy="-170" rx="10" ry="20" fill="#fff" opacity=".8" transform="rotate(28 -34 -170)"/></g>
<path class="ol" d="M-122 -34 C-106 16,106 16,122 -34 C96 -12,-96 -12,-122 -34 Z" fill="#c98d52"/>
<path d="M-100 -12 l30 12 M-60 -4 l40 8 M-10 2 l44 -2 M40 0 l36 -10 M-84 4 l24 -10 M10 8 l30 -8 M70 2 l28 -14" stroke="#8a5a36" stroke-width="3.5" stroke-linecap="round"/>
<path class="ol2" d="M-112 -30 C-124 -44,-140 -40,-146 -30 C-134 -22,-120 -24,-112 -30 Z" fill="#5ed36a"/><path class="ol2" d="M108 -24 C122 -40,138 -34,142 -24 C130 -16,116 -18,108 -24 Z" fill="#5ed36a"/>`}

