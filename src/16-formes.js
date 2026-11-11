/* ---------- formes adultes selon les soins (noble, sauvage, glouton, commune) ---------- */
const FORMN={commune:'Commune',noble:'Noble',sauvage:'Sauvage',glouton:'Glouton'};
const hx2=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mix=(a,b,k)=>{const x=hx2(a),y=hx2(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*k).toString(16).padStart(2,'0')).join('')};
function formPal(c,fm){const n=Object.assign({},c),set=(k,v)=>{if(c[k])n[k]=v(c[k])};
 if(fm=='noble'){set('body',v=>mix(v,c.hi,.24));set('hi',v=>mix(v,'#ffffff',.4));set('belly',v=>mix(v,'#ffffff',.5));set('bl',v=>mix(v,'#ffb800',.45));Object.assign(n,{sp:'#fff6c2',sp2:'#ffb800',spd:'#b87900',glow:'#ffe27a'})}
 if(fm=='sauvage'){['body','hi','dark','deep'].forEach(k=>set(k,v=>mix(v,'#1a1030',.4)));['belly','belly2','bl'].forEach(k=>set(k,v=>mix(v,'#1a1030',.24)));Object.assign(n,{sp:'#ffb3bd',sp2:'#d1243c',spd:'#7a0f22',i1:'#ffe0a0',i2:'#d1001f',glow:'#ff5a6e'})}
 if(fm=='glouton'){set('body',v=>mix(v,'#ffd9a0',.16));set('belly',v=>mix(v,'#ffe9f0',.6));set('belly2',v=>mix(v,'#ffb7c8',.5))}
 return n}
// repères par monstre, dans le repère de la tête : sommet du crâne, dessous du menton
const FA={g:{top:[18,-80],chin:[24,50]},m:{top:[14,-98],chin:[14,76]},b:{top:[10,-74],chin:[24,50]},p:{top:[-18,-64],chin:[26,40]},k:{top:[-16,-60],chin:[22,42]}};
const fa=d=>FA[d.id[0]]||FA.g;
function formUnder(t,d){if(t.form!='glouton')return '';const [x,y]=fa(d).chin;
 return `<ellipse class="ol" cx="${x}" cy="${y}" rx="54" ry="25" fill="${t.c.body}"/><path d="M${x-36} ${y+8} Q${x} ${y+24} ${x+38} ${y+4}" stroke="${t.c.dark}" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/><ellipse cx="${x-14}" cy="${y-8}" rx="22" ry="7" fill="#fff" opacity=".22"/>`}
function formOver(t,d){const [x,y]=fa(d).top,c=t.c,ch=fa(d).chin;
 if(t.form=='noble')return `<g transform="translate(${x},${y}) rotate(-8)"><path class="ol2" d="M-22 2 L-27 -23 L-12 -10 L0 -32 L12 -10 L27 -23 L22 2 Z" fill="#ffd23f"/><path d="M-21 -3 L21 -3" stroke="#ff9a00" stroke-width="4" stroke-linecap="round"/><path d="M-17 -9 L-13 -15 M4 -14 L7 -20" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="0" cy="-32" r="4.5" fill="#ff4f8b" stroke="${L}" stroke-width="2"/><circle cx="-27" cy="-23" r="3.5" fill="#7fe0ff" stroke="${L}" stroke-width="2"/><circle cx="27" cy="-23" r="3.5" fill="#7fe0ff" stroke="${L}" stroke-width="2"/></g>
 <polygon points="${star(x+52,y-18,10,4,4)}" fill="#fff" stroke="${L}" stroke-width="2"/><polygon points="${star(x-46,y-24,7,3,4)}" fill="#ffd23f" stroke="${L}" stroke-width="2"/>`;
 if(t.form=='sauvage')return `<g transform="translate(${x-24},${y+8})">${ol2('M-14 6 L-24 -26 L-2 0 Z',c.deep||c.dark)+ol2('M-2 2 L0 -36 L13 0 Z',c.deep||c.dark)+ol2('M10 4 L26 -24 L23 7 Z',c.deep||c.dark)}</g><path d="M${x+16} ${y+4} l17 36 M${x+27} ${y+2} l14 29" stroke="#ffd9e8" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M${ch[0]-50} ${ch[1]-34} l10 6 l-6 8 l10 6" stroke="#ffd9e8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
 if(t.form=='glouton')return `<ellipse cx="${ch[0]-34}" cy="${ch[1]-40}" rx="19" ry="12" fill="#ff7fa8" opacity=".55"/><circle cx="${ch[0]+50}" cy="${ch[1]-14}" r="3.5" fill="#c98d52"/><circle cx="${ch[0]+38}" cy="${ch[1]-6}" r="2.6" fill="#c98d52"/>`;
 return ''}

/* règle : la forme se fixe au passage à l'âge adulte et reste jusqu'au titan */
function pickForm(){const care=S.care==null?50:S.care,m=S.meals||0,a=S.acts||0;
 if(care>=70)return 'noble';if(care<40)return 'sauvage';if(m+a>=10&&m/(m+a)>=.8)return 'glouton';return 'commune'}
if(typeof strike=="function"){const st=strike,sy=syncMood,pm=paintMon,re=react;
 strike=function(pose,mood,ms){if(S&&pose=='mange')S.meals=(S.meals||0)+1;st(pose,mood,ms)};
 react=function(c){if(S&&c=='jump')S.acts=(S.acts||0)+1;re(c)};
 paintMon=function(o){pm(Object.assign({form:S&&S.form},o))};
 syncMood=function(){if(S&&!S.form&&ORDER.indexOf(S.stage)>=3){S.form=pickForm();moodNow=''}sy()}}
