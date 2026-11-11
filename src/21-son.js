/* ---------- lot 12 : son (Web Audio, aucun fichier audio) ---------- */
// Muet par défaut. Le bouton haut-parleur active le son (choix conservé) ; le contexte audio n'est créé qu'au premier appui.
const SKEY='kaijuchi-son',SND={on:false,ctx:null,master:null,buf:null};
try{SND.on=localStorage.getItem(SKEY)=='1'}catch(e){}
function sndCtx(){if(SND.ctx)return SND.ctx;const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;
 try{const c=new A(),m=c.createGain();m.gain.value=SND.on?.8:0;m.connect(c.destination);SND.ctx=c;SND.master=m;
  const b=c.createBuffer(1,c.sampleRate,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;SND.buf=b}catch(e){SND.ctx=null}
 return SND.ctx}
// le contexte n'existe qu'une fois l'utilisateur intervenu, et seulement si le son est activé
const ac=()=>SND.on&&SND.ctx&&SND.ctx.state!='closed'?SND.ctx:null;
function tone(f0,f1,dur,type='sine',vol=.2,t0=0){const c=ac();if(!c)return;const t=c.currentTime+t0,o=c.createOscillator(),g=c.createGain();
 o.type=type;o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(f1,t+dur);
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
 o.connect(g);g.connect(SND.master);o.start(t);o.stop(t+dur+.03)}
function noise(dur,vol=.2,t0=0,freq=1500,type='bandpass'){const c=ac();if(!c)return;const t=c.currentTime+t0,s=c.createBufferSource(),fl=c.createBiquadFilter(),g=c.createGain();
 s.buffer=SND.buf;fl.type=type;fl.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
 s.connect(fl);fl.connect(g);g.connect(SND.master);s.start(t);s.stop(t+dur+.03)}
const SFX={
 croc:t=>{noise(.07,.4,t,1800);tone(170,70,.09,'square',.12,t);noise(.07,.35,t+.1,2400);tone(150,60,.09,'square',.1,t+.1)},
 pop:t=>tone(480,950,.1,'sine',.25,t),
 boum:t=>{tone(150,32,.5,'sine',.55,t);noise(.4,.35,t,450,'lowpass')},
 thud:t=>{tone(200,60,.18,'sine',.45,t);noise(.12,.25,t,700,'lowpass')},
 roar:t=>{const c=ac();if(!c)return;const o=c.createOscillator(),l=c.createOscillator(),lg=c.createGain(),g=c.createGain(),fl=c.createBiquadFilter(),s=c.currentTime+t;
  o.type='sawtooth';o.frequency.setValueAtTime(95,s);o.frequency.linearRampToValueAtTime(55,s+.9);l.frequency.value=15;lg.gain.value=14;l.connect(lg);lg.connect(o.frequency);
  fl.type='lowpass';fl.frequency.value=650;g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(.4,s+.1);g.gain.exponentialRampToValueAtTime(.0001,s+.95);
  o.connect(fl);fl.connect(g);g.connect(SND.master);o.start(s);l.start(s);o.stop(s+1);l.stop(s+1);noise(.8,.15,t,500)},
 burp:t=>{tone(110,45,.55,'sawtooth',.3,t);tone(55,40,.55,'square',.15,t)},
 bulles:t=>{for(let i=0;i<8;i++){const f=380+Math.random()*700;tone(f,f*1.6,.09,'sine',.16,t+i*.08+Math.random()*.05)}},
 jingle:t=>{[523,659,784,1047,784,1047].forEach((f,i)=>tone(f,0,.16,'triangle',.25,t+i*.12))},
 dodo:t=>{tone(260,190,.7,'sine',.12,t);tone(220,160,.8,'sine',.1,t+.5)},
 non:t=>tone(230,140,.16,'square',.12,t),
 tir:t=>{noise(.09,.18,t,3500,'highpass');tone(700,180,.13,'sawtooth',.1,t)},
 zap:t=>{tone(1800,90,.28,'sawtooth',.16,t);noise(.25,.2,t,3000,'highpass')},
 sirene:t=>{tone(520,900,.4,'sine',.18,t);tone(900,520,.4,'sine',.18,t+.4)},
 atchoum:t=>{noise(.18,.4,t+.15,2500);tone(700,300,.12,'triangle',.15,t)},
 toc:t=>{tone(190,110,.1,'sine',.35,t);tone(190,110,.1,'sine',.35,t+.2)}};
function sfx(n,t=0){if(!SND.on)return;try{SFX[n](t)}catch(e){}}

/* branchement : les fonctions du jeu sont enveloppées, rien d'autre ne change */
const WORDS=[[/WIOU/,'sirene'],[/ATCHOUM/,'atchoum'],[/GRAOU/,'roar'],[/BRAAAP/,'burp'],[/ZZZAP/,'zap'],[/KABLAAM|GRRROUM|BROUUM|VROOOM/,'boum'],[/WHAM|BONK|SPLOTCH|SQUIIISH|BOUDOUM/,'thud'],
 [/SPLASH|SPLOUCH|PLOUF|FROTT/,'bulles'],[/YOUPI|HIHI|BOING|RECORD|HOURRA|WOUHOU|BADABOUM/,'jingle'],[/PFFF|BEURK|HMPF/,'non'],[/TOC|SMACK|PTOUI|GLOUP|OUAAAH|OUF/,'toc']];
{const p=pop,fl=fly,bm=boom,bb=bubbles,ev=evolve,cc=cityCleared,cf=catchFloat,ff=foeFire,fh=foeHit,sl=DO.sleep;
 pop=function(t){const w=WORDS.find(x=>x[0].test(t));if(w)sfx(w[1]);return p(t)};
 fly=function(n,sx,sy){sfx('croc',.4);return fl(n,sx,sy)};
 boom=function(x,y){sfx('boum');return bm(x,y)};
 bubbles=function(){sfx('bulles');return bb()};
 evolve=function(){const r=ev();if(r)sfx('jingle',.6);return r};
 cityCleared=function(){sfx('jingle',.5);return cc()};
 catchFloat=function(x,y,txt,col){sfx(txt=='+1'?'pop':'non');return cf(x,y,txt,col)};
 foeFire=function(o){sfx('tir');return ff(o)};
 foeHit=function(s){sfx('thud');return fh(s)};
 DO.sleep=function(){const r=sl();if(S&&S.asleep)sfx('dodo');return r}}

/* bouton haut-parleur */
const SPK=on=>`<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 4V5L7 9H3z" fill="#2a2140" stroke="#2a2140" stroke-width="1.5" stroke-linejoin="round"/>${on?'<path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" fill="none" stroke="#2a2140" stroke-width="2" stroke-linecap="round"/>':'<path d="M16 9l6 6M22 9l-6 6" fill="none" stroke="#e0364f" stroke-width="2.4" stroke-linecap="round"/>'}</svg>`;
addCss(`.chip.mini svg{width:20px;height:20px;vertical-align:middle;display:inline-block}`);
const bSon=document.createElement('button');bSon.className='chip mini';bSon.id='b-son';bSon.type='button';bSon.title='Son';bSon.setAttribute('aria-label','Son');$('b-album').before(bSon);
function sndPaint(){bSon.innerHTML=SPK(SND.on);bSon.setAttribute('aria-pressed',SND.on?'true':'false')}
sndPaint();
bSon.addEventListener('click',()=>{SND.on=!SND.on;try{localStorage.setItem(SKEY,SND.on?'1':'0')}catch(e){}
 const c=sndCtx();if(c){SND.master.gain.cancelScheduledValues(c.currentTime);SND.master.gain.value=SND.on?.8:0;if(SND.on){if(c.resume)c.resume();sfx('pop')}}sndPaint()});
// son déjà activé lors d'une visite précédente : le contexte audio ne naît qu'au premier appui
const sndFirst=()=>{if(SND.on){const c=sndCtx();if(c&&c.resume)c.resume()}document.removeEventListener('pointerdown',sndFirst,true);document.removeEventListener('keydown',sndFirst,true)};
document.addEventListener('pointerdown',sndFirst,true);document.addEventListener('keydown',sndFirst,true);
