/* ---------- lot 11 : imprévus et cadeau quotidien ---------- */
// Maladie, bêtises, envie rare du jour, cadeau de la première visite de chaque jour.
EXTRA.push(s=>{if(s.sick==null)s.sick=false;if(s.dirt==null)s.dirt=0;
 if(!s.gift||s.gift.day==null)s.gift={day:-1,streak:0};if(!s.crave||s.crave.day==null)s.crave={day:-1,prey:'',done:false}});
const IMP={broken:{},sulk:0,nextBet:0,arm:0,dk:'',ck:'',tk:''};
const SICK_AFTER=3600,GIFT_XP=[10,15,20,30,40,60,100],GIFT_MOOD=[5,5,8,8,10,12,20]; // une heure de jeu sale avant la maladie ; récompenses par jour de série

/* points d'évolution : aucun tant que le monstre est malade */
{const g=gain,mo=moodOf,fl=fly;
 gain=function(n){return S&&S.sick?0:g(n)};
 moodOf=function(){if(S.sick&&!S.asleep)return 'triste';if(IMP.sulk>Date.now()&&!S.asleep)return 'colere';return mo()};
 fly=function(n,sx,sy){const c=S&&S.crave;if(c&&!c.done&&c.day==realDay()&&c.prey==n){c.done=true;setTimeout(craveReward,430,S)}return fl(n,sx,sy)}}
// points donnés en direct (récompenses), hors plafond quotidien mais pas pendant la maladie
function bonusXp(n){if(S.sick)return 0;S.xp+=n;return n}

/* maladie : propreté sous 15 pendant plus d'une heure de jeu */
UI.med=`<circle ${sw} cx="24" cy="24" r="19" fill="#fff"/><path ${sw} d="M19 9h10v10h10v10H29v10H19V29H9V19h10Z" fill="#ff4f5e"/>`;
const hb=document.createElement('button');hb.className='btn';hb.dataset.a='heal';hb.hidden=true;hb.style.cssText='--b1:#7fe3c4;--b2:#17a589';
hb.innerHTML=ui('med')+`<span>Soigner</span><svg class="lock" viewBox="0 0 30 30">${UI.lock}</svg>`;$('actions').appendChild(hb);
function heal(){if(busy())return;if(S.asleep)return pop('ZZZ…');if(!S.sick)return pop('HMPF…');
 S.sick=false;S.dirt=0;S.propre=Math.max(S.propre,30);S.humeur=clamp(S.humeur+8);bubbles();react('chomp');strike('mange','content',700);pop('GLOUP !');done()}
DO.heal=heal;

/* bêtises : humeur sous 20, il casse un objet du décor et boude */
const DECL=pbLayer('decor');
const DEC={ // x = décalage à l'écran (px) par rapport au monstre, y = hauteur au sol
 pot:{x:-175,y:24,ok:()=>`<path class="o" d="M-9 -13L9 -13 6 0-6 0Z" fill="#e0734a"/><rect class="o2" x="-11" y="-18" width="22" height="6" rx="2" fill="#f08a5d"/><path class="o2" d="M0 -18V-32" fill="none"/><circle class="o2" cx="0" cy="-35" r="6" fill="#ff8fc0"/><circle cx="0" cy="-35" r="2" fill="#ffd23f"/>`,
  bad:()=>`<path class="o" d="M-17 0L-11 -12-4 -5-6 0Z" fill="#e0734a"/><path class="o" d="M6 0L5 -9 15 -8 19 0Z" fill="#e0734a"/><ellipse cx="0" cy="-2" rx="9" ry="4" fill="#6b4a36"/><circle class="o2" cx="-24" cy="-4" r="5" fill="#ff8fc0"/><path d="M-24 -4L-30 -1" class="o2"/>`},
 banc:{x:185,y:20,ok:()=>`<rect class="o" x="-25" y="-15" width="50" height="7" rx="2" fill="#c98d5a"/><rect class="o" x="-25" y="-31" width="50" height="7" rx="2" fill="#c98d5a"/><path class="o" d="M-21 -8V0M21 -8V0M-21 -24V-15M21 -24V-15" fill="none"/>`,
  bad:()=>`<g transform="rotate(-16) translate(0 4)"><rect class="o" x="-25" y="-9" width="50" height="7" rx="2" fill="#c98d5a"/></g><rect class="o" x="-34" y="-8" width="40" height="7" rx="2" fill="#c98d5a" transform="rotate(64 -14 -4) translate(6 -6)"/><path class="o2" d="M16 -6L26 -2" fill="none"/>`},
 lamp:{x:305,y:16,ok:()=>lamp(0,0),bad:()=>`<g transform="rotate(78)">${lamp(0,0)}</g><polygon class="o2" points="${star(12,-12,10,4,6)}" fill="#ffd23f"/>`}};
function decRedraw(){const key=S?S.stage+Object.keys(IMP.broken).filter(k=>IMP.broken[k]>Date.now()):'';IMP.dk=key;
 if(!S||S.stage=='oeuf'){DECL.innerHTML='';return}const z=ST[S.stage].z,sc=1.4/z,now=Date.now();
 DECL.innerHTML=Object.keys(DEC).map(id=>{const d=DEC[id];return `<g data-d="${id}" transform="translate(${f(d.x/z)},${f(d.y)}) scale(${f2(sc)})" style="--k:${f2(Math.pow(z,.18)/1.4)}">${IMP.broken[id]>now?d.bad():d.ok()}</g>`}).join('')}
function misbehave(){if(!S||S.stage=='oeuf'||S.asleep||mini)return false;const left=Object.keys(DEC).filter(k=>!(IMP.broken[k]>Date.now()));if(!left.length)return false;
 const id=rnd(left),z=ST[S.stage].z;IMP.broken[id]=Date.now()+240000;IMP.sulk=Date.now()+25000;IMP.nextBet=Date.now()+90000;
 decRedraw();strike('frappe','colere',1100);react('no');boom(500+DEC[id].x,470+DEC[id].y*z-20);pop(rnd(['CRAC !','PATATRAC !']));syncMood();return id}

/* envie rare : une proie précise par jour, gros bonus */
function craveReward(me){if(S!==me)return;const b=Math.max(20,Math.round((CAP[S.stage]||150)*.5));bonusXp(b);S.humeur=clamp(S.humeur+25);
 react('jump');strike('debout','content',1200);pop('WOUHOU !');flash();done()}
function cravePick(){const fo=FOODS[S.stage];if(!fo)return;S.crave={day:realDay(),prey:rnd(fo)[0],done:false}}
function craveDraw(){const c=S&&S.crave,on=!!c&&c.day==realDay()&&!c.done&&!S.asleep&&S.stage!='oeuf'&&!!IC[c.prey],key=on?c.prey+S.stage:'';if(key==IMP.ck)return;IMP.ck=key;const G=$('imp-c');
 if(!on){G.innerHTML='';return}const [bx,by]=BUB[S.stage],v=IC[c.prey][0].split(' ').map(Number),k=52/Math.max(v[2],v[3]);
 G.innerHTML=`<g transform="translate(${1000-bx},${by})"><g class="bob" style="animation-duration:2s"><ellipse cx="0" cy="0" rx="58" ry="48" fill="#fff6b0" stroke="${L}" stroke-width="4"/><ellipse cx="0" cy="0" rx="48" ry="39" fill="#fff" stroke="#ffb800" stroke-width="4"/><polygon points="${star(0,-54,16,7,5)}" fill="#ffd23f" stroke="${L}" stroke-width="3"/><svg x="${f(-v[2]*k/2)}" y="${f(-v[3]*k/2)}" width="${f(v[2]*k)}" height="${f(v[3]*k)}" viewBox="${IC[c.prey][0]}">${IC[c.prey][1]}</svg></g></g>`}

/* maladie : teint verdâtre et thermomètre */
function sickDraw(){const on=!!S&&!!S.sick&&S.stage!='oeuf';MON.classList.toggle('sick',on);const key=on?S.stage:'';if(key==IMP.tk)return;IMP.tk=key;const G=$('imp-t');
 if(!on){G.innerHTML='';return}const [mx,my]=mouth();
 G.innerHTML=`<g transform="translate(${f(mx-30)},${f(my-110)}) rotate(-25)"><g class="bob" style="animation-duration:2s"><rect x="-8" y="-52" width="16" height="64" rx="8" fill="#fff" stroke="${L}" stroke-width="4"/><circle cx="0" cy="16" r="13" fill="#ff4f5e" stroke="${L}" stroke-width="4"/><rect x="-3" y="-30" width="6" height="46" rx="3" fill="#ff4f5e"/><path d="M8 -38h9M8 -26h6M8 -14h9" stroke="${L}" stroke-width="3" stroke-linecap="round"/></g></g>`}

/* cadeau quotidien */
const giftEl=document.createElement('div');giftEl.id='gift';document.body.appendChild(giftEl);
const giftStreak=()=>S.gift.day==realDay()-1?Math.min(7,S.gift.streak+1):1;
function giftShow(){const s=giftStreak();giftEl.innerHTML=`<div class="gc"><h3>Cadeau du jour !</h3><div class="gp">${[1,2,3,4,5,6,7].map(i=>`<i class="${i<s?'p':i==s?'n':''}">${i}</i>`).join('')}</div>
 <p>${s>1?'Série de <b>'+s+' jours</b> de suite !':'Première visite du jour.'}</p><p class="gr">+${GIFT_XP[s-1]} points d'évolution<br>+${GIFT_MOOD[s-1]} humeur et faim${S.sick?'<br><small>(pas de points tant qu\'il est malade)</small>':''}</p><button class="chip mini" id="gift-ok" type="button">Récupérer !</button></div>`;giftEl.classList.add('on')}
function giftClaim(){if(!S||!giftEl.classList.contains('on'))return;const s=giftStreak();S.gift={day:realDay(),streak:s};giftEl.classList.remove('on');
 bonusXp(GIFT_XP[s-1]);if(S.stage!='oeuf'){S.humeur=clamp(S.humeur+GIFT_MOOD[s-1]);S.faim=clamp(S.faim+GIFT_MOOD[s-1])}
 react('jump');pop(rnd(['YOUPI !','HIHI !']));done()}
giftEl.addEventListener('click',e=>{if(e.target.closest('#gift-ok'))giftClaim()});
const giftCheck=()=>{if(S&&S.gift.day!=realDay()&&!giftEl.classList.contains('on'))giftShow()};

addCss(`#actions.six{grid-template-columns:repeat(5,minmax(0,1fr))}.btn[hidden]{display:none}
#mon.sick{filter:sepia(.6) hue-rotate(38deg) saturate(1.7) brightness(.95)}
#gift{position:fixed;inset:0;z-index:55;background:rgba(42,33,64,.6);display:none;place-items:center;padding:16px}#gift.on{display:grid}
#gift .gc{background:var(--cream);border:4px solid var(--ink);border-radius:26px;box-shadow:0 8px 0 var(--ink);padding:18px 22px 22px;text-align:center;max-width:380px;width:100%}
#gift h3{margin:0 0 10px;font-size:28px;font-weight:800;color:#ff7a3d;text-shadow:2px 0 var(--ink),-2px 0 var(--ink),0 2px var(--ink),0 -2px var(--ink)}
#gift p{margin:6px 0;font-size:17px;font-weight:700}#gift .gr{font-size:20px;font-weight:800}
#gift .gp{display:flex;justify-content:center;gap:6px}#gift .gp i{width:34px;height:34px;border-radius:50%;border:3px solid var(--ink);background:#fff;font-style:normal;font-weight:800;display:grid;place-items:center;font-size:15px}
#gift .gp i.p{background:#5ed36a}#gift .gp i.n{background:#ffd23f;transform:scale(1.2)}
#gift #gift-ok{font-size:20px;padding:4px 26px;margin-top:8px}
@media(max-width:760px){#gift .gp i{width:30px;height:30px}}`);
{const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.id='imp';g.innerHTML='<g id="imp-c"></g><g id="imp-t"></g>';$('bub').before(g)}

/* tout se met à jour avec la jauge ; un pas par seconde pour le temps qui passe */
function impHud(){if(!S)return;const sk=!!S.sick;hb.hidden=!sk;$('actions').classList.toggle('six',sk);sickDraw();craveDraw();
 const key=S.stage+Object.keys(IMP.broken).filter(k=>IMP.broken[k]>Date.now());if(key!=IMP.dk)decRedraw();giftCheck()}
function impTick(){if(!S||S.stage=='oeuf')return;const now=Date.now();
 if(S.propre<15){if(!S.sick){S.dirt+=DEBUG_SPEED;if(S.dirt>=SICK_AFTER){S.sick=true;S.dirt=0;pop('ATCHOUM !');strike('debout','triste',900)}}}else S.dirt=0;
 if(S.humeur<20&&!S.asleep&&!mini&&!RP.on&&now>=IMP.nextBet){if(!IMP.arm)IMP.arm=now+6000;else if(now>=IMP.arm){IMP.arm=0;misbehave()}}else if(S.humeur>=20)IMP.arm=0;
 if(S.crave.day!=realDay()||(!S.crave.done&&!(FOODS[S.stage]||[]).some(m=>m[0]==S.crave.prey)))cravePick();
 impHud()}
{const h=hud,sh=show;hud=function(){h();impHud()};show=function(){IMP.ck=IMP.tk='';IMP.dk='x';sh();if(S)impHud()}}
setInterval(impTick,1000);
