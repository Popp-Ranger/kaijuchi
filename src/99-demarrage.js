/* démarrage */
function show(){$('app').classList.toggle('home',!S);if(S){CUR=D[S.mon];buildWorld();drawAll()}else stopPrey()}
function start(i){const now=Date.now();S={v:1,mon:i,stage:'oeuf',xp:0,faim:60,humeur:80,energie:80,propre:100,asleep:false,born:now,t:now,dmg:0,want:0,since:now,care:50,dayK:-1,dayXp:0,city:{niveau:1,pv:{}}};save();show();scrollTo(0,0)}
$('species').addEventListener('click',e=>{const c=e.target.closest('.card');if(c)start(+c.dataset.i)});
$('tray').addEventListener('click',e=>{const c=e.target.closest('.food');if(c&&S)feed(+c.dataset.i)});
$('actions').addEventListener('click',e=>{const c=e.target.closest('.btn');if(c&&S&&S.stage!='oeuf')DO[c.dataset.a]()});
$('b-new').addEventListener('click',()=>{if(confirm('Recommencer avec un nouvel œuf ? Ton monstre actuel sera perdu.')){try{localStorage.removeItem(KEY)}catch(e){}S=null;show()}});
setInterval(()=>{if(!S)return;const now=Date.now();decay((now-S.t)/1000*DEBUG_SPEED);S.t=now;if(!evolve())hud();save()},1000);
S=load();if(S){const gap=Date.now()-S.t;decay(gap/4000*DEBUG_SPEED,true);S.t=Date.now();if(gap>=6e5)visite()} // page fermée : le temps compte quatre fois moins, jamais sous 15
show();
