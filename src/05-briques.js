/* ---------- briques communes ---------- */
const ol=(d,fill,x='')=>`<path class="ol" d="${d}" fill="${fill}" ${x}/>`,ol2=(d,fill,x='')=>`<path class="ol2" d="${d}" fill="${fill}" ${x}/>`;
const tooth=(x,y,w,h)=>ol2(`M${f(x-w)} ${f(y)} L${f(x)} ${f(y+h)} L${f(x+w)} ${f(y)} Z`,'#fff');
const marks=(a,col,o=.6)=>`<path d="${a.map(q=>`M${q[0]} ${q[1]} q7 8 14 0`).join(' ')}" stroke="${col}" stroke-width="3.2" fill="none" stroke-linecap="round" opacity="${o}"/>`;
const TX={1:[70],2:[52,78],3:[38,56,74,92],4:[32,47,62,77,92]},lipY=x=>22-(x-18)*8/68;
const SH={
 spike:t=>`<path class="ol" d="M-17 8 C-16 -14,-7 -32,3 -50 C10 -32,18 -14,17 8 Z" fill="${t.gs}"/><path d="M-4 2 C-3 -12,1 -24,3 -37 C6 -24,9 -10,9 2 Z" fill="#fff" opacity=".45"/>`,
 plate:t=>`<path class="ol" d="M-20 8 L-26 -9 L-14 -9 L-19 -30 L-7 -25 L1 -56 L9 -25 L21 -31 L16 -9 L27 -11 L20 8 Z" fill="${t.gs}"/><path d="M-6 4 L-7 -14 L1 -40 L7 -14 L7 4 Z" fill="#fff" opacity=".55"/>`,
 gum:t=>`<path class="ol" d="M-17 6 C-20 -14,-11 -30,0 -30 C11 -30,20 -14,17 6 Z" fill="${t.gs}"/><ellipse cx="-5" cy="-16" rx="4" ry="7" fill="#fff" opacity=".65" transform="rotate(18 -5 -16)"/>`,
 flame:t=>`<g class="flm"><path class="ol" d="M-17 8 C-27 -12,-13 -22,-11 -40 C-2 -30,1 -22,4 -58 C17 -40,25 -18,17 8 Z" fill="${t.gs}"/><path d="M-7 6 C-11 -8,-2 -14,2 -30 C8 -18,12 -6,8 6 Z" fill="#fff6b0"/></g>`,
 cone:t=>`<path class="ol" d="M-13 6 L1 -36 L13 6 Z" fill="${IV}"/><path d="M4 2 L2 -24 L10 4 Z" fill="#e2bf7c" opacity=".7"/>`
};
function orn(k,t,x,y,r,s,ps){return `<g transform="translate(${x},${y}) rotate(${r}) scale(${f2(s)})" style="--lw:${f2(1/(s*ps))}">${SH[k](t)}</g>`}
function orns(k,t,list,ps,sc=1,glow=t.glow){const a=list.map(o=>orn(k,t,o[0],o[1],o[2],o[3]*sc,ps)).join('');return (glow?`<g filter="${t.fl}" opacity=".9">${a}</g>`:'')+a}
function torso(t,body,b,o={}){const{c,G,gb}=t;let bl='';for(let y=b[1]-b[3]+18;y<b[1]+b[3];y+=25)bl+=`<path d="M${b[0]-b[2]-8} ${y} Q${b[0]} ${y+13} ${b[0]+b[2]+8} ${y}"/>`;
 return `<clipPath id="${G('cb')}"><path d="${body}"/></clipPath><clipPath id="${G('cl')}"><ellipse cx="${b[0]}" cy="${b[1]}" rx="${b[2]}" ry="${b[3]}"/></clipPath>
 <path d="${body}" fill="${gb}"/><g clip-path="url(#${G('cb')})"><ellipse cx="${b[0]}" cy="${b[1]}" rx="${b[2]}" ry="${b[3]}" fill="url(#${G('gl')})"/><g clip-path="url(#${G('cl')})" stroke="${c.bl}" stroke-width="3.5" fill="none" stroke-linecap="round">${bl}</g>${o.inside||''}
 <path d="${o.shade||'M-90 -40 C-60 -10,0 -6,60 -16 L60 0 L-100 0 Z'}" fill="${L}" opacity=".16"/></g><path class="ol" d="${body}" fill="none"/>`}
function eye(t,x,y,r,k=1){const{p,c,G}=t,ir=r*.64,px=r*.24,py=r*.06;let s=`<g transform="translate(${x},${y}) scale(${f2(p.es*k)})">`;
 if(p.glow)s+=`<circle r="${f(r*1.4)}" fill="${c.glow}" opacity=".75" filter="${t.fl}"/>`;
 s+=`<ellipse class="ol" rx="${f(r*.93)}" ry="${r}" fill="#fff"/><circle cx="${f(px)}" cy="${f(py)}" r="${f(ir)}" fill="url(#${G('ge')})"/><circle cx="${f(px)}" cy="${f(py)}" r="${f(ir)}" fill="none" stroke="${L}" stroke-width="1.5" opacity=".5"/>`;
 s+=p.slit?`<ellipse cx="${f(px+2)}" cy="${f(py)}" rx="${f(r*.17)}" ry="${f(ir*.86)}" fill="${L}"/>`:`<circle cx="${f(px+2)}" cy="${f(py)}" r="${f(ir*p.pup)}" fill="${L}"/>`;
 return s+`<circle cx="${f(r*.5)}" cy="${f(-r*.26)}" r="${f(r*.23)}" fill="#fff"/><circle cx="${f(r*.02)}" cy="${f(r*.4)}" r="${f(r*.11)}" fill="#fff"/><ellipse class="lid" rx="${f(r*.98)}" ry="${f(r*1.05)}" fill="${c.body}" stroke="${L}" stroke-width="3"/></g>`}
const brow=(t,x,y,w,k=1)=>`<g transform="rotate(${f(t.p.brow*k)} ${x} ${y})"><path d="M${x-w/2} ${y+1} Q${x} ${f(y-w*.2)} ${x+w/2} ${y+3}" stroke="${t.c.dark}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M${x-w/2} ${y-4} Q${x} ${f(y-w*.2-5)} ${x+w/2} ${y-2}" stroke="${L}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"/></g>`;
const scar=(t,x,y)=>t.p.scar?`<path d="M${x} ${y} l16 34 M${x+10} ${y-2} l13 27" stroke="#ffd9e8" stroke-width="3.5" stroke-linecap="round" fill="none"/>`:'';
const ground=col=>`<path d="M-460 4 Q-30 -16 460 4 L460 90 L-460 90 Z" fill="${col}"/>`;

const LEG='M-14 -70 C-14 -110,18 -118,42 -112 C70 -104,80 -78,74 -52 C72 -42,80 -32,92 -27 C108 -20,104 0,88 0 L26 0 C4 0,-6 -12,-4 -34 C-10 -44,-14 -56,-14 -70 Z';
const NAILS=`<path class="ol2" d="M90 -25 L113 -15 L93 -10 Z" fill="${IV}"/><path class="ol2" d="M95 -13 L116 -3 L95 0 Z" fill="${IV}"/><path class="ol2" d="M68 -9 L84 -2 L68 0 Z" fill="${IV}"/>`;
const ARM='M28 -182 C52 -192,98 -165,116 -138 C124 -126,112 -110,98 -116 C76 -126,48 -138,26 -146 C14 -152,16 -176,28 -182 Z';
const CLAWS=`<path class="ol2" d="M107 -141 L129 -139 L113 -128 Z" fill="${IV}"/><path class="ol2" d="M106 -129 L126 -121 L106 -116 Z" fill="${IV}"/>`;
const BODY='M-75 -60 C-95 -130,-60 -215,5 -225 C65 -232,95 -180,92 -120 C90 -60,65 -22,10 -18 C-35 -15,-65 -30,-75 -60 Z';
const TAIL='M-40 -100 C-100 -105,-165 -85,-200 -50 C-215 -35,-232 -45,-238 -62 C-246 -30,-225 -2,-190 -2 C-140 -2,-90 -8,-40 -14 Z';
const legHi=`<ellipse cx="36" cy="-92" rx="22" ry="11" fill="#fff" opacity=".22" transform="rotate(-18 36 -92)"/><path d="M26 -3 L88 -3" stroke="${L}" stroke-width="4" opacity=".14"/>`;
const armHi=`<path d="M38 -176 C58 -176,84 -160,100 -142" stroke="#fff" stroke-width="5" fill="none" opacity=".25" stroke-linecap="round"/>`;

