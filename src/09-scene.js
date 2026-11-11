/* ---------- construction de la page ---------- */
function rays(vb){const [x,y,w,h]=vb.split(' ').map(Number),cx=x+w/2,cy=y+h*.55;let s='';for(let i=0;i<12;i++){const a=i*Math.PI/6,b=a+.2;s+=`<path d="M${cx} ${cy} L${f(cx+Math.cos(a)*900)} ${f(cy+Math.sin(a)*900)} L${f(cx+Math.cos(b)*900)} ${f(cy+Math.sin(b)*900)} Z" fill="#fff" opacity=".35"/>`}return s}

const [wb,wf]=world();
function cloud(x,y,s,d){return `<g transform="translate(${x},${y}) scale(${s})"><g class="drift" style="animation-delay:-${d}s"><ellipse cx="0" cy="12" rx="74" ry="17" fill="#cfeaff"/><circle cx="-36" cy="0" r="24" fill="#fff"/><circle cx="-2" cy="-16" r="33" fill="#fff"/><circle cx="36" cy="-2" r="26" fill="#fff"/><ellipse cx="0" cy="7" rx="68" ry="15" fill="#fff"/><circle cx="-10" cy="-26" r="12" fill="#fff"/></g></g>`}
let sunRays='';for(let i=0;i<12;i++)sunRays+=`<path d="M842 112 L${f(842+Math.cos(i*.5236)*150)} ${f(112+Math.sin(i*.5236)*150)} L${f(842+Math.cos(i*.5236+.22)*150)} ${f(112+Math.sin(i*.5236+.22)*150)} Z" fill="#fff6b0" opacity=".5"/>`;
scene.innerHTML=`<defs>
<linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38a4f7"/><stop offset=".55" stop-color="#8fdcff"/><stop offset=".85" stop-color="#fff0c9"/></linearGradient>
<radialGradient id="gSun" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="#fffbd0"/><stop offset="1" stop-color="#ffc21f"/></radialGradient>
<linearGradient id="gGrass" x1="0" y1="-52" x2="0" y2="320" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#8fe06a"/><stop offset="1" stop-color="#3fae55"/></linearGradient>
<linearGradient id="gSea" x1="0" y1="-52" x2="0" y2="300" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6fd6ff"/><stop offset="1" stop-color="#1b77d9"/></linearGradient></defs>
<rect width="1000" height="600" fill="url(#gSky)"/>
<g class="rays">${sunRays}</g><circle cx="842" cy="112" r="48" fill="url(#gSun)" stroke="${L}" stroke-width="3"/><path d="M822 104 q6 -7 12 0 M850 104 q6 -7 12 0 M826 122 q16 14 32 0" stroke="${L}" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="816" cy="118" rx="7" ry="4" fill="#ff9a7a" opacity=".7"/><ellipse cx="868" cy="118" rx="7" ry="4" fill="#ff9a7a" opacity=".7"/>
${cloud(170,120,1.1,3)}${cloud(480,86,.8,11)}${cloud(660,190,.7,6)}${cloud(940,220,.9,16)}${cloud(60,250,.6,9)}
<path d="M0 430 L0 330 L70 250 L130 310 L210 200 L300 320 L360 270 L450 350 L520 290 L610 220 L700 330 L780 280 L880 190 L960 290 L1000 260 L1000 430 Z" fill="#9db4ea"/>
<path d="M210 200 L182 238 L200 232 L214 246 L228 230 L246 242 Z M610 220 L584 254 L602 248 L614 262 L628 246 L644 258 Z M880 190 L852 228 L872 222 L884 238 L898 222 L916 236 Z M70 250 L52 272 L68 268 L76 278 L90 270 Z" fill="#fff"/>
<path d="M0 450 L0 380 C80 340,160 350,240 384 C320 350,420 340,520 380 C620 344,720 350,820 384 C900 356,960 360,1000 372 L1000 450 Z" fill="#8fd6a0"/>
<path d="M0 470 L0 410 C120 384,220 392,330 414 C460 388,560 392,680 414 C800 392,900 394,1000 408 L1000 470 Z" fill="#74c98a"/>
<g id="world">${wb}</g>
<g class="prop p-bebe"><g class="fly">${butterfly(640,360,'#ff8fc0','#ffd23f',1.5)}</g><g class="fly" style="animation-delay:-2s">${butterfly(330,250,'#7cc8ff','#b58cff',1.2)}</g><g class="fly" style="animation-delay:-3.4s">${butterfly(760,250,'#ffd23f','#ff9a3c',1)}</g></g>
<g id="mon"></g>
<g id="worldF">${wf}</g>
<g class="prop p-bebe">${apple(662,500,1.5)}${apple(716,512,1.2)}${ladybug(300,508,1.4)}</g>
<g class="prop p-ado">${cow(742,500,1.9,1)}<text x="690" y="372" font-size="54" font-weight="800" fill="#ff4f5e" stroke="${L}" stroke-width="3" paint-order="stroke">!</text></g>
<g class="prop p-titan"><polygon points="${star(915,372,60,30,11)}" fill="#fff" stroke="${L}" stroke-width="3"/><polygon points="${star(915,372,44,20,11)}" fill="#ffd23f"/><polygon points="${star(915,372,26,12,11)}" fill="#ff7a2e"/></g>
<rect id="night" width="1000" height="600" fill="#1a1450" opacity="0"/><g id="fx"></g><g id="bub"></g><g id="pop"></g>`;
const W=document.getElementById('world'),WF=document.getElementById('worldF'),MON=document.getElementById('mon');
let zCur=null,raf=0;
function zoomTo(z){const from=zCur||z,t0=performance.now();cancelAnimationFrame(raf);
 const step=t=>{let u=from==z?1:Math.min(1,Math.max(0,(t-t0)/1000));u=u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;zCur=from*Math.pow(z/from,u);
  [W,WF].forEach(g=>{g.setAttribute('transform',`translate(500,470) scale(${zCur.toFixed(4)})`);g.style.setProperty('--k',Math.pow(zCur,-.82).toFixed(3))});
  if(u<1)raf=requestAnimationFrame(step)};step(t0)}

