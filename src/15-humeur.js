/* ---------- expressions et poses du monstre dans la scène ---------- */
let moodNow='',poseT=0,poseNow=null;
// l'expression suit la jauge la plus basse
function moodOf(){if(S.asleep)return 'dodo';const a=[['faim',S.faim],['fatigue',S.energie],['triste',S.humeur]].sort((x,y)=>x[1]-y[1])[0];return a[1]<25?a[0]:'content'}
function paintMon(o){const g=$('act');if(!g||!S||S.stage=='oeuf')return;g.innerHTML=mon(CUR,S.stage,'s',true,o)}
function syncMood(){if(!S||S.stage=='oeuf'||poseNow)return;const m=moodOf(),key=S.stage+S.mon+m;if(key==moodNow)return;moodNow=key;paintMon({mood:m})}
// pose passagère (manger, frapper, refuser), puis retour à l'expression des jauges
function strike(pose,mood,ms=750){if(!S||S.stage=='oeuf')return;clearTimeout(poseT);poseNow=pose;paintMon({pose,mood});poseT=setTimeout(()=>{poseNow=null;moodNow='';syncMood()},ms)}
{const h=hud,d=drawMon;
 hud=function(){h();syncMood()};
 drawMon=function(){d();clearTimeout(poseT);poseNow=null;moodNow=''}}
