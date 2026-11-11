/* ---------- le monde ---------- */
function world(lv=1,pvs={}){const R=mb(11+lv*31);let b='',fg='';
 // sol, plage, mer
 b+=`<rect x="-360" y="-52" width="1500" height="362" fill="url(#gGrass)"/>`;
 for(let i=0;i<40;i++)b+=`<ellipse cx="${f(-250+R()*1500)}" cy="${f(10+R()*300)}" rx="${f(30+R()*50)}" ry="${f(5+R()*6)}" fill="#8fe06a" opacity=".5"/>`;
 b+=`<path d="M-420 -52 L-290 -52 C-270 -20,-300 20,-270 70 C-250 140,-280 240,-270 310 L-420 310 Z" fill="#ffe3a3"/><path d="M-300 -52 C-285 -20,-312 20,-284 70 C-266 140,-296 240,-286 310" stroke="#f0c878" stroke-width="3" fill="none" stroke-dasharray="2 9" stroke-linecap="round"/>`;
 b+=`<path d="M-1100 -52 L-335 -52 C-318 -22,-346 14,-322 66 C-304 130,-336 240,-326 310 L-1100 310 Z" fill="url(#gSea)"/><path d="M-335 -52 C-318 -22,-346 14,-322 66 C-304 130,-336 240,-326 310" stroke="#fff" stroke-width="5" fill="none" opacity=".85" stroke-linecap="round"/>`;
 b+='<g class="wv">';for(let i=0;i<70;i++){const x=-1060+R()*690,y=-38+R()*300;b+=`<path transform="translate(${f(x)},${f(y)})" d="M0 0 q6 -5 12 0 q6 5 12 0" stroke="#fff" stroke-width="2.2" fill="none" opacity=".75" stroke-linecap="round"/>`}b+='</g>';
 // ligne d'horizon au loin
 for(let x=-290;x<1090;){const w=40+R()*50,h=190+R()*240;b+=`<rect x="${f(x)}" y="${f(-52-h)}" width="${f(w)}" height="${f(h)}" fill="#a9d0f2"/><rect x="${f(x)}" y="${f(-52-h)}" width="5" height="${f(h)}" fill="#c9e4fa"/>`;
  for(let y=-52-h+14;y<-70;y+=26)b+=`<rect x="${f(x+8)}" y="${f(y)}" width="${f(w-16)}" height="4" fill="#cfe7fb" opacity=".8"/>`;if(R()<.3)b+=`<path d="M${f(x+w/2)} ${f(-52-h)} v-34" stroke="#a9d0f2" stroke-width="3"/>`;x+=w+R()*26}
 // trottoir et route
 b+=`<rect x="-300" y="-52" width="1440" height="13" fill="#e6e0f2"/><path d="M-300 -39.5 H1140" stroke="${L}" stroke-width="1" opacity=".5"/>`;
 for(let x=-290;x<1100;x+=22)b+=`<path d="M${x} -52 v12" stroke="${L}" stroke-width=".6" opacity=".25"/>`;
 b+=`<rect x="-300" y="-39" width="1440" height="27" fill="#655d80"/><rect x="-300" y="-39" width="1440" height="5" fill="#575071"/><path d="M-296 -25 H1140" stroke="#fff3a6" stroke-width="2.2" stroke-dasharray="14 12"/><path class="o3" d="M-300 -12 H1140" fill="none"/><rect x="-300" y="-12" width="1440" height="3" fill="#d6cfe6"/>`;
 // jetée et phare
 b+=`<rect class="o" x="-470" y="-30" width="150" height="8" rx="2" fill="#c98d5a"/>`;for(let x=-460;x<-325;x+=22)b+=`<rect class="o2" x="${x}" y="-22" width="5" height="14" fill="#8a5a36"/>`;
 b+=lighthouse(-352,-50);
 // immeubles
 b+=ruin(-288,62,196,PAL[4]);
 cityDefs(lv).forEach(B=>{b+=`<g data-b="${B.id}">${bldSvg(B,pvOf(B,pvs))}</g>`});if(lv>=5)b+=tower(352);
 if(lv>=5)b+=wheel(840);
 // arbres, lampadaires, passants du trottoir
 for(let x=-270;x<1080;x+=70+R()*60)b+=tree(x,-42,.85+R()*.3,Math.floor(R()*3));
 for(let x=-240;x<1080;x+=150)b+=lamp(x,-41);
 const ps=[];for(let k=0;k<26;k++){const x=100+R()*950;ps.push(person(x,-41,k,R()<.8?1:-1,.9))}
 for(let k=0;k<5;k++)ps.push(person(-300+R()*60,-41,k+3,-1,.9));b+=grp(ps);
 // véhicules
 b+=car(-262,-29,'#4db8ff',-1)+car(196,-29,'#ffd23f',-1)+bus(380,-29,'#ff5a5a',-1)+car(560,-29,'#b58cff',-1)+car(720,-29,'#5ed36a',-1)+car(905,-29,'#ff8fc0',-1);
 b+=car(-150,-15,'#ff9a3c',1)+car(270,-15,'#ff5a5a',1)+car(450,-15,'#fff',1)+car(640,-15,'#4db8ff',1)+bus(800,-15,'#ffd23f',1)+car(980,-15,'#5ed36a',1);
 // bateaux
 b+=cargo(-640,-34,1,3)+cargo(-930,-40,.7,8)+sail(-430,-20,1,'#ff8fc0')+sail(-540,70,1.2,'#5ed36a');if(lv>=4)b+=sail(-800,130,1.3,'#ffd23f')+sail(-960,40,1,'#b58cff')+sail(-430,190,1.3,'#ff9a3c')+sail(-700,240,1.4,'#ff8fc0');
 // hélicoptères
 b+=heli(262,-338,1,'#ff9320',0)+heli(-700,-330,1.5,'#4db8ff',.6)+heli(720,-700,1.5,'#ff5a8a',1.1);
 // dégâts
 b+=`<g class="prop p-adulte p-titan">${fire(-262,-232,1.3)}${fire(-244,-214,.9)}</g>`;
 // passants sur l'herbe
 const pb=[],pf=[];for(let k=0;k<22;k++){const x=150+R()*420,y=-8+R()*22;(y<0?pb:pf).push(person(x,y,k+2,1))}
 for(let k=0;k<8;k++){const x=-250-R()*40,y=2+R()*14;pf.push(person(x,y,k,-1))}
 b+=grp(pb);fg+=grp(pf);
 // premier plan
 fg+=flower(-98,16,'#ff8fc0')+flower(92,22,'#fff')+flower(-60,27,'#ffd23f')+flower(112,10,'#b58cff')+tuft(-80,24)+tuft(60,28)+tuft(-112,8)+rock(-108,30,.5)+flower(40,30,'#ff8fc0',.9)+flower(-30,31,'#fff',.8);
 fg+=bush(-200,34)+bush(215,40,1.2)+rock(170,52)+rock(-150,70,1.3)+bush(-330,60,1.1)+bush(420,50,1.3);
 for(let k=0;k<150;k++){const x=-255+R()*1320,y=36+R()*235;if(Math.abs(x)<120&&y<60)continue;const t=R();fg+=t<.45?flower(x,y,['#ff8fc0','#fff','#ffd23f','#b58cff','#ff9a3c'][k%5],.8+R()*.5):t<.85?tuft(x,y):rock(x,y,.4+R()*.5)}
 const HP=[[-225,120],[-150,168],[-245,222],[-90,236],[250,128],[335,96],[420,150],[300,196],[505,112],[590,170],[470,232],[680,118],[765,190],[640,242],[860,128],[945,196],[1020,120],[20,214],[150,230],[840,250]];
 HP.sort((a,b2)=>a[1]-b2[1]).forEach((p,k)=>{fg+=tree(p[0]-44,p[1]+2,1.05,k)+house(p[0],p[1],['#ff6b5a','#4db8ff','#ffb02e','#b58cff','#5ed36a'][k%5])+(k%2?tree(p[0]+42,p[1]+4,.9,k+1):bush(p[0]+40,p[1]+3,.8))});
 return [b,fg]}
function tower(x){let s=`<g transform="translate(${x},-46)"><path class="o" d="M-17 0 L-10 -262 L10 -262 L17 0 Z" fill="#fff"/>`;
 for(let y=-40;y>-250;y-=60){const a=17-(-y)*7/262,b2=17-(-y+26)*7/262;s+=`<path d="M${f(-a)} ${y} L${f(a)} ${y} L${f(b2)} ${y-26} L${f(-b2)} ${y-26} Z" fill="#ff4f5e"/>`}
 s+=`<path d="M6 -260 L10 -260 L16 -1 L8 -1 Z" fill="${L}" opacity=".14"/><path class="o" d="M-17 0 L-10 -262 L10 -262 L17 0 Z" fill="none"/>
 <ellipse class="o" cx="0" cy="-268" rx="36" ry="13" fill="#7c5cf0"/><rect class="o" x="-30" y="-290" width="60" height="22" rx="6" fill="#fff"/>`;
 for(let i=0;i<6;i++)s+=`<rect class="o2" x="${-26+i*9}" y="-285" width="6" height="11" rx="1.5" fill="#7cc8ff"/>`;
 return s+`<ellipse class="o" cx="0" cy="-292" rx="26" ry="9" fill="#ff4f5e"/><path class="o" d="M0 -300 V-352" fill="none"/><circle class="o2 pulse" cx="0" cy="-356" r="5" fill="#ffd23f"/></g>`}
function wheel(x){let s=`<g transform="translate(${x},-46)"><path class="o" d="M-44 0 L0 -112 L44 0" fill="none"/><circle class="o" cx="0" cy="-112" r="84" fill="none"/><circle class="o2" cx="0" cy="-112" r="72" fill="none"/>`;
 const cc=['#ff5a5a','#ffd23f','#4db8ff','#5ed36a','#b58cff','#ff8fc0','#ff9a3c','#fff'];
 for(let i=0;i<8;i++){const a=i*Math.PI/4,cx=Math.cos(a)*84,cy=-112+Math.sin(a)*84;s+=`<path class="o2" d="M0 -112 L${f(cx)} ${f(cy)}" fill="none"/><rect class="o2" x="${f(cx-9)}" y="${f(cy-2)}" width="18" height="15" rx="5" fill="${cc[i]}"/>`}
 return s+`<circle class="o" cx="0" cy="-112" r="10" fill="#ff4f5e"/></g>`}

