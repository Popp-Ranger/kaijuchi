/* ---------- mini-jeu « Détruire » : frappe au bon moment ---------- */
// Un curseur va et vient sur une barre : vert = coup critique (dégâts x 3), jaune = coup normal, ailleurs = raté.
// Trois frappes par action, la zone verte rétrécit à chaque frappe. Coût de la série : énergie -15.
const STRIKE_G=[.15,.10,.06],STRIKE_Y=[.42,.34,.27],STRIKE_N=3;
let SG=null;
function strikeZones(){const n=SG.n,c=.3+Math.random()*.4;SG.c=c;SG.gw=STRIKE_G[n];SG.yw=STRIKE_Y[n];
 const y=$('st-y'),g=$('st-g');y.style.left=((c-SG.yw/2)*100)+'%';y.style.width=(SG.yw*100)+'%';g.style.left=((c-SG.gw/2)*100)+'%';g.style.width=(SG.gw*100)+'%'}
function startStrike(){if(mini)return;mini=true;
 SG={n:0,p:0,dir:1,wait:.4,last:performance.now(),raf:0,res:[],done:false};
 $('st-p').innerHTML='<i></i><i></i><i></i>';strikeZones();$('st').hidden=false;
 const hit=e=>{if(e.target.closest('button'))return;e.preventDefault();strikeTap()};
 const key=e=>{if(e.key==' '||e.key=='Enter'){e.preventDefault();strikeTap()}};
 SG.hit=hit;SG.key=key;$('st').addEventListener('pointerdown',hit);document.addEventListener('keydown',key);
 $('st-skip').onclick=()=>strikeEnd();
 SG.raf=requestAnimationFrame(strikeTick)}
function strikeTick(now){if(!SG||SG.done)return;SG.raf=requestAnimationFrame(strikeTick);const dt=Math.min(.05,(now-SG.last)/1000);SG.last=now;
 if(SG.wait>0)SG.wait-=dt;
 SG.p+=SG.dir*(1.1+.25*SG.n)*dt;if(SG.p>=1){SG.p=1;SG.dir=-1}else if(SG.p<=0){SG.p=0;SG.dir=1}
 $('st-c').style.left=(SG.p*100)+'%'}
function strikeTap(){if(!SG||SG.done||SG.wait>0)return;
 const d=Math.abs(SG.p-SG.c),crit=d<=SG.gw/2,ok=d<=SG.yw/2,res=crit?'crit':ok?'ok':'miss',dmg=HIT[S.stage];
 SG.res.push(res);SG.wait=.5;SG.n++;
 const pip=$('st-p').children[SG.n-1];if(pip)pip.className=res;
 if(res=='miss'){pop('PFFF…');react('no');strike('debout','fatigue',600)}
 else{react('jump');strike('frappe','colere',600);strikeCity(crit?dmg*3:dmg,crit?'CRAAAC !':null)}
 if(SG.n>=STRIKE_N||!nearest()){SG.done=true;cancelAnimationFrame(SG.raf);setTimeout(strikeEnd,700)}
 else strikeZones()}
// fin de la série : coût en énergie, retour à la scène
function strikeEnd(){if(!SG)return;const g=SG;SG=null;g.done=true;cancelAnimationFrame(g.raf);
 $('st').removeEventListener('pointerdown',g.hit);document.removeEventListener('keydown',g.key);$('st').hidden=true;mini=false;
 if(g.n>0){S.energie=clamp(S.energie-15);S.faim=clamp(S.faim-8);S.humeur=clamp(S.humeur+12)}
 done()}
