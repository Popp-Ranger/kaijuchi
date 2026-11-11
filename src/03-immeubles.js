/* ---------- immeubles ---------- */
const PAL=[['#ff9ec4','#ffd3e4','#ff6f9c'],['#ffd166','#fff0b8','#ff8c42'],['#b9a4ff','#e0d6ff','#7c5cf0'],['#8ee6c9','#cff8ea','#2fb894'],['#ff9273','#ffc9b8','#e5484d'],['#7cc8ff','#cbeaff','#2f8fe0'],['#fff1d0','#ffffff','#ffb02e'],['#ff7e8a','#ffc4ca','#c2305a']];
function building(x,w,h,c,R,shop=true){let s=`<g transform="translate(${f(x)},-46)"><rect class="o" x="0" y="${-h}" width="${f(w)}" height="${h}" fill="${c[0]}"/>`;
 const n=Math.max(2,Math.floor((w-10)/17)),ww=9,gap=(w-14-n*ww)/(n-1);
 for(let y=-h+16;y<(shop?-48:-16);y+=21)for(let i=0;i<n;i++){const lit=R()<.28,wx=7+i*(ww+gap);
  s+=`<rect class="o2" x="${f(wx)}" y="${y}" width="${ww}" height="12" rx="1.5" fill="${lit?'#fff2a0':'#c4ecff'}"/>`+(lit?'':`<path d="M${f(wx+1.5)} ${y+9} l5 -6" stroke="#fff" stroke-width="1.5" opacity=".85"/>`)+`<rect x="${f(wx-1)}" y="${y+12}" width="${ww+2}" height="2" fill="${c[1]}"/>`}
 s+=`<rect x="${f(w*.74)}" y="${-h+1}" width="${f(w*.26-1)}" height="${h-2}" fill="${L}" opacity=".13"/><rect x="2" y="${-h+2}" width="4" height="${h-4}" fill="#fff" opacity=".35"/>`;
 if(shop){s+=`<rect class="o2" x="5" y="-27" width="${f(w-10)}" height="27" fill="#3b2f5c"/><rect class="o2" x="9" y="-22" width="${f(w*.42)}" height="15" fill="#bfeaff"/><path d="M11 -9 l8 -11" stroke="#fff" stroke-width="2" opacity=".8"/>
  <rect class="o2" x="${f(w-23)}" y="-22" width="12" height="22" rx="2" fill="#ffcf5c"/><circle cx="${f(w-13.5)}" cy="-11" r="1.2" fill="${L}"/><path class="o2" d="M1 -38 L${f(w-1)} -38 L${f(w+3)} -27 L-3 -27 Z" fill="${c[2]}"/>`;
  for(let i=5;i<w-8;i+=13)s+=`<path d="M${i} -37.5 l6 0 l.8 10 l-7.4 0 Z" fill="#fff" opacity=".9"/>`}
 s+=`<rect class="o" x="-4" y="${-h-9}" width="${f(w+8)}" height="10" rx="3" fill="${c[1]}"/>`;
 const t=R(),tx=w*.2;
 if(t<.24)s+=`<path class="o2" d="M${f(tx+3)} ${-h-9} v-8 M${f(tx+19)} ${-h-9} v-8" fill="none"/><rect class="o2" x="${f(tx)}" y="${-h-36}" width="22" height="20" rx="3" fill="#c98d5a"/><path d="M${f(tx+6)} ${-h-35} v18 M${f(tx+12)} ${-h-35} v18" stroke="${L}" stroke-width=".8" opacity=".4"/><path class="o2" d="M${f(tx-2)} ${-h-36} l13 -9 l13 9 Z" fill="#8a5a36"/>`;
 else if(t<.46)s+=`<path class="o2" d="M${f(w/2)} ${-h-9} v-46 M${f(w/2-8)} ${-h-38} h16 M${f(w/2-5)} ${-h-28} h10" fill="none"/><circle class="o2" cx="${f(w/2)}" cy="${-h-57}" r="3.5" fill="#ff4f5e"/>`;
 else if(t<.68)s+=`<path class="o2" d="M${f(w*.25)} ${-h-9} v-8 M${f(w*.75)} ${-h-9} v-8" fill="none"/><rect class="o2" x="${f(w*.1)}" y="${-h-42}" width="${f(w*.8)}" height="26" rx="3" fill="#fff"/><circle cx="${f(w*.3)}" cy="${-h-29}" r="7" fill="${c[2]}"/><path d="M${f(w*.48)} ${-h-33} h${f(w*.34)} M${f(w*.48)} ${-h-26} h${f(w*.24)}" stroke="${L}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
 else if(t<.84)s+=`<rect class="o2" x="${f(w*.52)}" y="${-h-26}" width="21" height="17" fill="#eee9f8"/><rect x="${f(w*.52+4)}" y="${-h-20}" width="8" height="11" fill="#3b2f5c"/><rect class="o2" x="${f(w*.12)}" y="${-h-19}" width="15" height="10" rx="1.5" fill="#cfd6e6"/><path d="M${f(w*.12+3)} ${-h-16} h9 M${f(w*.12+3)} ${-h-13} h9" stroke="${L}" stroke-width=".9"/>`;
 else s+=`<circle class="o2" cx="${f(w*.3)}" cy="${-h-17}" r="9" fill="#48c768"/><circle class="o2" cx="${f(w*.55)}" cy="${-h-20}" r="11" fill="#6fd24a"/><circle class="o2" cx="${f(w*.78)}" cy="${-h-16}" r="8" fill="#48c768"/>`;
 return s+'</g>'}
function ruin(x,w,h,c){let s=`<g transform="translate(${x},-46)"><path class="o" d="M0 0 L0 ${-h+34} L9 ${-h+14} L19 ${-h+40} L31 ${-h+4} L42 ${-h+34} L52 ${-h+12} L${w} ${-h+30} L${w} 0 Z" fill="${c[0]}"/>`;
 for(let y=-h+52;y<-46;y+=21)for(let i=0;i<3;i++)s+=`<rect class="o2" x="${8+i*18}" y="${y}" width="9" height="12" rx="1.5" fill="${(i+y)%2?'#3b2f5c':'#c4ecff'}"/>`;
 s+=`<path class="o2" d="M19 ${-h+40} l4 22 l-8 14 l7 20 M42 ${-h+34} l-4 18 l6 12" fill="none"/><rect x="${w*.74}" y="${-h+30}" width="${w*.26-1}" height="${h-31}" fill="${L}" opacity=".13"/>
 <rect class="o2" x="5" y="-27" width="${w-10}" height="27" fill="#3b2f5c"/><path class="o2" d="M1 -38 L${w-1} -38 L${w+3} -27 L-3 -27 Z" fill="${c[2]}"/></g>`;return s}
function fire(x,y,sc=1){return `<g transform="translate(${x},${y}) scale(${sc})"><circle class="smk" cx="0" cy="-34" r="13" fill="#6b6385"/><circle class="smk" style="animation-delay:-1.2s" cx="10" cy="-30" r="11" fill="#8a84a3"/><circle class="smk" style="animation-delay:-2.4s" cx="-10" cy="-30" r="10" fill="#57506f"/>
<g class="flm"><path class="o3" d="M0 0 C-16 0,-18 -16,-9 -26 C-9 -18,-4 -16,-3 -20 C-4 -30,2 -38,7 -42 C5 -32,16 -26,15 -12 C14 -4,8 0,0 0 Z" fill="#ff7a2e"/><path d="M1 -2 C-8 -2,-9 -12,-3 -17 C-2 -12,2 -13,3 -22 C8 -16,10 -10,8 -6 C7 -3,4 -2,1 -2 Z" fill="#ffe14d"/></g></g>`}

