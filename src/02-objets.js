/* ---------- petits objets ---------- */
function car(x,y,col,dir=1,sc=1){return `<g transform="translate(${x},${y}) scale(${dir*sc},${sc})">
<ellipse cx="0" cy="1" rx="38" ry="4" fill="${L}" opacity=".22"/>
<path class="o" d="M-35 -9 C-35 -18,-29 -20,-21 -21 L-13 -32 C-11 -35,-7 -36,-1 -36 L12 -36 C18 -36,22 -33,25 -29 L30 -20 C37 -19,37 -12,37 -7 L37 -4 L-35 -4 Z" fill="${col}"/>
<path d="M-33 -9 L36 -9 L36 -5 L-33 -5 Z" fill="${L}" opacity=".18"/>
<path class="o2" d="M-10 -22 L-5 -31 L4 -31 L4 -22 Z" fill="#d4f2ff"/><path class="o2" d="M8 -22 L8 -31 L13 -31 C16 -31,19 -28,22 -22 Z" fill="#d4f2ff"/>
<path d="M-18 -18 L24 -18" stroke="#fff" stroke-width="1.6" opacity=".55"/>
<rect class="o2" x="31" y="-16" width="5" height="5" rx="2" fill="#fff2a0"/><rect class="o2" x="-35" y="-16" width="4" height="5" rx="1.5" fill="#ff4f5e"/>
<circle class="o2" cx="-18" cy="-4" r="7.5" fill="#3a3152"/><circle cx="-18" cy="-4" r="3" fill="#cfd6e6"/>
<circle class="o2" cx="20" cy="-4" r="7.5" fill="#3a3152"/><circle cx="20" cy="-4" r="3" fill="#cfd6e6"/></g>`}
function bus(x,y,col,dir=1){let w='';for(let i=0;i<5;i++)w+=`<rect class="o2" x="${-42+i*17}" y="-36" width="13" height="13" rx="2" fill="#d4f2ff"/>`;
return `<g transform="translate(${x},${y}) scale(${dir},1)"><ellipse cx="0" cy="1" rx="54" ry="4" fill="${L}" opacity=".22"/>
<rect class="o" x="-50" y="-44" width="100" height="40" rx="8" fill="${col}"/><rect x="-49" y="-20" width="98" height="6" fill="#fff" opacity=".85"/>${w}
<rect class="o2" x="43" y="-18" width="6" height="6" rx="2" fill="#fff2a0"/>
<circle class="o2" cx="-30" cy="-4" r="8" fill="#3a3152"/><circle cx="-30" cy="-4" r="3.2" fill="#cfd6e6"/><circle class="o2" cx="30" cy="-4" r="8" fill="#3a3152"/><circle cx="30" cy="-4" r="3.2" fill="#cfd6e6"/></g>`}
const SKIN=['#ffd9b3','#f3c19a','#c98a5e','#8d5a3b'],SHIRT=['#ff5a5a','#ffd23f','#4db8ff','#5ed36a','#b58cff','#ff8fc0','#ffffff','#ff9a3c'],HAIR=['#3a2a1e','#6b4423','#f2c04a','#1d1a2b','#c9502e'];
const grp=a=>`<g class="run">${a.filter((_,i)=>i%2).join('')}</g><g class="run" style="animation-delay:-.22s">${a.filter((_,i)=>!(i%2)).join('')}</g>`;
function person(x,y,i,dir=1,sc=1){return `<g transform="translate(${f(x)},${f(y)}) scale(${dir*sc},${sc})"><g>
<path class="o2" d="M-1.5 -6 l-3.5 6 M1.5 -6 l4.5 4.5" fill="none"/>
<rect class="o2" x="-3.4" y="-14" width="6.8" height="8.6" rx="2.6" fill="${SHIRT[i%8]}"/>
<path class="o2" d="M-3 -12.5 l-4.5 -6 M3 -12.5 l4.5 -6.5" fill="none"/>
<circle class="o2" cx="0" cy="-17.5" r="3.6" fill="${SKIN[i%4]}"/><path d="M-3.6 -18 a3.6 3.6 0 0 1 7.2 0 Z" fill="${HAIR[i%5]}"/></g></g>`}
function tree(x,y,s=1,g=0){const C=[['#48c768','#2f9e52','#8ee89f'],['#6fd24a','#45a52f','#b0f08a'],['#34b98a','#1f8f6c','#7fe3c0']][g%3];
const b=[[-11,-30,12],[11,-30,12],[0,-43,14]];return `<g transform="translate(${x},${y}) scale(${s})"><rect class="o3" x="-3.2" y="-22" width="6.4" height="22" rx="1.5" fill="#9a6a3f"/>
${b.map(c=>`<circle class="o" cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${C[0]}"/>`).join('')}${b.map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]-.6}" fill="${C[0]}"/>`).join('')}
<path d="M-18 -24 a12 12 0 0 0 22 4 a12 12 0 0 0 17 -6 a12 12 0 0 1 -12 8 l-16 0 a12 12 0 0 1 -11 -6z" fill="${C[1]}" opacity=".7"/>
<circle cx="-5" cy="-47" r="5" fill="${C[2]}" opacity=".8"/><circle cx="-14" cy="-33" r="3.5" fill="${C[2]}" opacity=".8"/><circle cx="8" cy="-34" r="3" fill="${C[2]}" opacity=".7"/></g>`}
function lamp(x,y){return `<g transform="translate(${x},${y})"><path class="o3" d="M0 0 v-36 q0 -9 9 -9" fill="none"/><rect class="o3" x="-2.5" y="-4" width="5" height="4" fill="#8a84a3"/><circle cx="11" cy="-43" r="9" fill="#fff2a0" opacity=".35"/><ellipse class="o3" cx="11" cy="-43" rx="5" ry="4" fill="#fff2a0"/></g>`}
function flower(x,y,col,s=1){let p='';for(let i=0;i<5;i++){const a=i*1.2566;p+=`<circle cx="${f(Math.cos(a)*4)}" cy="${f(-15+Math.sin(a)*4)}" r="3.2" fill="${col}" stroke="${L}" stroke-width=".8"/>`}
return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0 0 q-3 -7 0 -13 M0 -5 q5 -1 6 -5" stroke="#2e8b3d" stroke-width="1.8" fill="none" stroke-linecap="round"/>${p}<circle cx="0" cy="-15" r="2.4" fill="#ffd23f" stroke="${L}" stroke-width=".8"/></g>`}
function tuft(x,y){return `<path d="M${x} ${y} l-3 -7 M${x+3} ${y} l0 -9 M${x+6} ${y} l3 -7" stroke="#2f9e52" stroke-width="1.6" fill="none" stroke-linecap="round"/>`}
function bush(x,y,s=1){const b=[[-14,-8,10],[0,-13,13],[15,-8,10]];return `<g transform="translate(${x},${y}) scale(${s})">${b.map(c=>`<circle class="o" cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="#3fbf63"/>`).join('')}${b.map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]-.6}" fill="#3fbf63"/>`).join('')}<rect x="-22" y="-8" width="45" height="8" fill="#3fbf63"/><path class="o" d="M-24 0 L25 0" /><circle cx="-4" cy="-18" r="4" fill="#8ee89f"/><circle cx="-12" cy="-8" r="2.4" fill="#ff5a7a"/><circle cx="8" cy="-10" r="2.4" fill="#ff5a7a"/><circle cx="16" cy="-5" r="2.2" fill="#ff5a7a"/></g>`}
function rock(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})"><path class="o" d="M-14 0 C-16 -9,-8 -15,0 -14 C9 -14,15 -8,14 0 Z" fill="#b9b3cf"/><path d="M-8 -9 q6 -4 12 -1" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/></g>`}
function house(x,y,col){return `<g transform="translate(${x},${y})"><rect class="o3" x="9" y="-50" width="8" height="16" fill="#c96b4a"/><rect class="o" x="-22" y="-27" width="44" height="27" fill="#fff4dc"/><rect x="10" y="-26" width="11" height="25" fill="${L}" opacity=".1"/>
<path class="o" d="M-29 -26 L0 -50 L29 -26 Z" fill="${col}"/><path d="M-20 -29 L0 -45" stroke="#fff" stroke-width="2" opacity=".5"/>
<rect class="o3" x="-5" y="-15" width="10" height="15" rx="1.5" fill="#8a5a36"/><rect class="o3" x="-18" y="-21" width="9" height="9" fill="#bfeaff"/><rect class="o3" x="10" y="-21" width="9" height="9" fill="#bfeaff"/></g>`}
function heli(x,y,sc=1,col='#ff9320',d=0){return `<g transform="translate(${x},${y}) scale(${sc})"><g class="bob" style="animation-delay:-${d}s">
<path class="o" d="M40 -6 L122 -15 L124 -6 L44 9 Z" fill="${col}"/><path class="o" d="M110 -38 L126 -38 L125 -6 L114 -8 Z" fill="#ffd23f"/>
<ellipse class="o2 rot" cx="121" cy="-24" rx="5" ry="17" fill="#eef3fb" opacity=".85"/>
<path class="o" d="M-52 4 C-54 -22,-30 -37,0 -37 C28 -37,48 -25,50 -4 C52 14,34 24,6 24 L-26 24 C-42 24,-51 16,-52 4 Z" fill="${col}"/>
<path d="M-50 10 C-30 16,20 16,49 4 C48 16,32 23,6 23 L-26 23 C-40 23,-48 18,-50 10 Z" fill="${L}" opacity=".18"/>
<path d="M-6 -4 L49 -8 L50 -1 L-6 4 Z" fill="#fff" opacity=".9"/>
<path class="o" d="M-47 3 C-47 -18,-29 -31,-7 -31 L-7 7 L-41 13 C-45 11,-47 7,-47 3 Z" fill="#c9f0ff"/><path d="M-40 -6 C-36 -17,-28 -24,-17 -26" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".9"/>
<rect class="o2" x="2" y="-27" width="17" height="14" rx="3.5" fill="#c9f0ff"/>
<path class="o" d="M-42 39 L38 39 M-22 24 L-27 39 M18 24 L23 39" fill="none"/><rect class="o2" x="-3.5" y="-48" width="7" height="12" fill="#8a84a3"/>
<ellipse class="rot" cx="0" cy="-50" rx="96" ry="6" fill="#eef3fb" opacity=".8" stroke="${L}" stroke-width="1.4"/><circle class="o2" cx="0" cy="-50" r="4.5" fill="#3a3152"/></g></g>`}
function cargo(x,y,sc=1,seed=3){const R=mb(seed);let c='';const cc=['#ffd23f','#4db8ff','#5ed36a','#ff8fc0','#ff9a3c','#b58cff','#fff'];
for(let r=0;r<3;r++)for(let i=0;i<7;i++){if(r==2&&R()<.45)continue;c+=`<rect class="o2" x="${-68+i*27}" y="${-50-r*15}" width="26" height="15" fill="${cc[Math.floor(R()*7)]}"/><path d="M${-62+i*27} ${-47-r*15} v9 M${-55+i*27} ${-47-r*15} v9 M${-48+i*27} ${-47-r*15} v9" stroke="${L}" stroke-width=".8" opacity=".35"/>`}
return `<g transform="translate(${x},${y}) scale(${sc})">
<circle class="smk" cx="-104" cy="-126" r="9" fill="#e8e3f5"/><circle class="smk" style="animation-delay:-1.7s" cx="-100" cy="-126" r="7" fill="#e8e3f5"/>
<rect class="o" x="-112" y="-116" width="16" height="26" fill="#ffd23f"/><rect x="-112" y="-110" width="16" height="6" fill="#ff4f5e"/>
<rect class="o" x="-128" y="-92" width="48" height="58" fill="#fff"/><rect class="o" x="-132" y="-98" width="56" height="9" rx="2" fill="#dfe6f5"/>
<rect class="o2" x="-123" y="-84" width="38" height="9" fill="#7cc8ff"/><rect class="o2" x="-123" y="-68" width="8" height="8" fill="#7cc8ff"/><rect class="o2" x="-110" y="-68" width="8" height="8" fill="#7cc8ff"/><rect class="o2" x="-97" y="-68" width="8" height="8" fill="#7cc8ff"/>
${c}
<path class="o" d="M-140 -36 L128 -36 L158 -44 L142 -4 C138 4,132 8,122 8 L-122 8 C-132 8,-138 2,-140 -6 Z" fill="#e5484d"/>
<path d="M-140 -8 L143 -8 L141 -3 C137 4,132 7,122 7 L-122 7 C-131 7,-137 3,-140 -6 Z" fill="#3a3152"/><path d="M-139 -26 L150 -26" stroke="#fff" stroke-width="3" opacity=".9"/>
<circle class="o2" cx="120" cy="-18" r="3" fill="#fff"/><circle class="o2" cx="100" cy="-18" r="3" fill="#fff"/><circle class="o2" cx="80" cy="-18" r="3" fill="#fff"/>
<path d="M-150 9 q10 -7 20 0 q10 7 20 0 q10 -7 20 0 q10 7 20 0 q10 -7 20 0 q10 7 20 0 q10 -7 20 0 q10 7 20 0 q10 -7 20 0 q10 7 20 0 q10 -7 20 0 q10 7 20 0 q10 -7 20 0 q10 7 20 0 q10 -7 20 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></g>`}
function sail(x,y,sc=1,col='#ff8fc0'){return `<g transform="translate(${x},${y}) scale(${sc})"><g class="bob" style="animation-duration:3s">
<path class="o" d="M0 -8 L0 -78" fill="none"/><path class="o" d="M3 -74 L3 -14 L40 -14 Z" fill="#fff"/><path d="M3 -44 L3 -30 L30 -30 L21 -44 Z" fill="${col}"/><path class="o" d="M3 -74 L3 -14 L40 -14 Z" fill="none"/>
<path class="o" d="M-3 -66 L-3 -14 L-28 -14 Z" fill="#fff2a0"/><path class="o2" d="M0 -78 L14 -83 L0 -88 Z" fill="#ff4f5e"/>
<path class="o" d="M-36 -10 L44 -10 L32 6 L-26 6 Z" fill="#fff"/><path d="M-33 -4 L40 -4 L32 5 L-26 5 Z" fill="#4db8ff"/><path class="o" d="M-36 -10 L44 -10 L32 6 L-26 6 Z" fill="none"/>
<path d="M-40 7 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0 q8 -6 16 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></g></g>`}
function lighthouse(x,y){return `<g transform="translate(${x},${y})"><path d="M0 -112 L-120 -146 L-120 -100 Z" fill="#fffbe0" opacity=".3"/>
<path class="o" d="M-30 2 C-32 -12,-16 -20,2 -19 C20 -19,32 -10,30 2 Z" fill="#a9a3c2"/>
<path class="o" d="M-13 -14 L-9 -98 L9 -98 L13 -14 Z" fill="#fff"/><path d="M-12 -40 L12 -40 L11 -58 L-11 -58 Z M-10 -78 L10 -78 L9 -96 L-9 -96 Z" fill="#ff4f5e"/><path d="M4 -97 L9 -97 L12 -15 L6 -15 Z" fill="${L}" opacity=".12"/>
<path class="o" d="M-13 -14 L-9 -98 L9 -98 L13 -14 Z" fill="none"/><rect class="o3" x="-3" y="-30" width="6" height="12" rx="3" fill="#3a3152"/>
<rect class="o" x="-14" y="-103" width="28" height="6" rx="2" fill="#3a3152"/><rect class="o" x="-8" y="-120" width="16" height="17" fill="#fff2a0"/><path class="o" d="M-12 -120 L0 -134 L12 -120 Z" fill="#ff4f5e"/><circle class="o2" cx="0" cy="-137" r="2.5" fill="#ffd23f"/></g>`}
function cow(x,y,sc=1,dir=1){return `<g transform="translate(${x},${y}) scale(${dir*sc},${sc})"><ellipse cx="0" cy="1" rx="36" ry="4" fill="${L}" opacity=".2"/>
<path class="o3" d="M30 -30 q10 4 8 16" fill="none"/><ellipse class="o3" cx="38" cy="-12" rx="3" ry="4" fill="#3a3152"/>
<rect class="o" x="-22" y="-14" width="8" height="14" rx="3" fill="#fff"/><rect class="o" x="16" y="-14" width="8" height="14" rx="3" fill="#fff"/>
<rect class="o" x="-28" y="-40" width="60" height="30" rx="14" fill="#fff"/>
<path d="M-6 -39 c8 0 12 6 9 12 c-3 5 -12 4 -13 -3 c-1 -5 0 -9 4 -9z M16 -24 c6 -2 12 2 12 8 c0 3 -3 5 -8 5 c-6 0 -9 -9 -4 -13z" fill="#3a3152"/>
<ellipse class="o3" cx="8" cy="-9" rx="7" ry="4.5" fill="#ffb3c7"/>
<rect class="o" x="-12" y="-14" width="8" height="14" rx="3" fill="#fff"/><rect class="o" x="24" y="-14" width="8" height="14" rx="3" fill="#fff"/>
<path class="o3" d="M-40 -52 q-6 -6 -3 -12 M-24 -52 q6 -6 3 -12" fill="none"/><ellipse class="o3" cx="-45" cy="-45" rx="6" ry="3.5" fill="#fff" transform="rotate(-25 -45 -45)"/><ellipse class="o3" cx="-19" cy="-45" rx="6" ry="3.5" fill="#3a3152" transform="rotate(25 -19 -45)"/>
<rect class="o" x="-44" y="-52" width="24" height="26" rx="10" fill="#fff"/><path d="M-32 -52 c6 0 12 4 12 12 c-6 0 -10 -4 -12 -12z" fill="#3a3152"/>
<ellipse class="o3" cx="-33" cy="-27" rx="12" ry="8" fill="#ffb3c7"/><circle cx="-37" cy="-27" r="1.7" fill="${L}"/><circle cx="-29" cy="-27" r="1.7" fill="${L}"/>
<circle cx="-38" cy="-41" r="3.6" fill="#fff" stroke="${L}" stroke-width="1"/><circle cx="-38.5" cy="-41" r="1.7" fill="${L}"/><circle cx="-27" cy="-41" r="3.6" fill="#fff" stroke="${L}" stroke-width="1"/><circle cx="-27.5" cy="-41" r="1.7" fill="${L}"/></g>`}
function butterfly(x,y,col,col2,sc=1){return `<g transform="translate(${x},${y}) scale(${sc})"><g class="flut">
<path class="o3" d="M0 -2 C-8 -22,-26 -22,-24 -6 C-23 2,-10 4,0 2 Z" fill="${col}"/><path class="o3" d="M0 -2 C8 -22,26 -22,24 -6 C23 2,10 4,0 2 Z" fill="${col}"/>
<path class="o3" d="M0 2 C-8 4,-20 6,-17 15 C-14 22,-3 16,0 8 Z" fill="${col2}"/><path class="o3" d="M0 2 C8 4,20 6,17 15 C14 22,3 16,0 8 Z" fill="${col2}"/>
<circle cx="-14" cy="-9" r="3.5" fill="#fff" opacity=".8"/><circle cx="14" cy="-9" r="3.5" fill="#fff" opacity=".8"/></g>
<ellipse class="o3" cx="0" cy="3" rx="2.6" ry="11" fill="#3a3152"/><path class="o2" d="M-1 -8 q-4 -8 -8 -8 M1 -8 q4 -8 8 -8" fill="none"/></g>`}
function apple(x,y,sc=1){return `<g transform="translate(${x},${y}) scale(${sc})"><ellipse cx="0" cy="1" rx="16" ry="3.5" fill="${L}" opacity=".2"/>
<path class="o3" d="M1 -26 q2 -8 8 -9" fill="none"/><path class="o3" d="M4 -30 C10 -38,20 -36,22 -32 C16 -26,8 -26,4 -30 Z" fill="#5ed36a"/>
<path class="o" d="M0 -26 C-8 -32,-20 -26,-19 -13 C-18 -2,-9 3,0 0 C9 3,18 -2,19 -13 C20 -26,8 -32,0 -26 Z" fill="#ff4f5e"/>
<path d="M12 -22 C17 -18,17 -6,9 -1 C14 -8,15 -16,12 -22Z" fill="#c22b45" opacity=".6"/><ellipse cx="-9" cy="-18" rx="4" ry="6" fill="#fff" opacity=".7" transform="rotate(25 -9 -18)"/></g>`}
function fish(x,y,sc=1){return `<g transform="translate(${x},${y}) scale(${sc})"><path class="o" d="M-16 0 L-32 -12 L-30 0 L-32 12 Z" fill="#ff9a3c"/><path class="o3" d="M-4 -10 C2 -20,12 -18,12 -10 Z" fill="#ff9a3c"/>
<path class="o" d="M-20 0 C-10 -16,14 -16,24 0 C14 16,-10 16,-20 0 Z" fill="#ffb347"/><path d="M-8 -8 C-4 -2,-4 2,-8 8 M0 -10 C4 -3,4 3,0 10" stroke="#fff" stroke-width="2.5" fill="none" opacity=".85"/>
<path d="M-16 4 C-6 12,12 12,22 2 C14 14,-8 14,-16 4Z" fill="#e2702a" opacity=".6"/><circle cx="14" cy="-3" r="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><circle cx="15" cy="-3" r="2" fill="${L}"/></g>`}
function ladybug(x,y,sc=1){return `<g transform="translate(${x},${y}) scale(${sc})"><path class="o2" d="M-10 -2 l-5 4 M0 -1 l0 5 M10 -2 l5 4" fill="none"/><circle class="o3" cx="13" cy="-9" r="6" fill="#3a3152"/><circle cx="15" cy="-11" r="1.5" fill="#fff"/>
<path class="o" d="M-15 -2 C-15 -22,13 -22,13 -2 Z" fill="#ff4f5e"/><path class="o2" d="M-1 -17 L-1 -2" fill="none"/><circle cx="-8" cy="-9" r="2.6" fill="#3a3152"/><circle cx="5" cy="-8" r="2.6" fill="#3a3152"/><circle cx="-3" cy="-13.5" r="1.8" fill="#3a3152"/><path d="M-11 -11 q3 -6 8 -7" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/></g>`}

