/* ---------- la ville destructible : état, dégâts, niveaux ---------- */
const cityList=()=>cityDefs(S.city.niveau);
const pvNow=B=>pvOf(B,S.city.pv);
const standing=()=>cityList().filter(B=>pvNow(B)>0);
const ruined=()=>cityList().length-standing().length;
// l'immeuble debout le plus proche du monstre (qui se tient en x = 0)
function nearest(){let best=null,bd=1e9;cityList().forEach(B=>{if(pvNow(B)<=0)return;const d=Math.abs(B.x+B.w/2);if(d<bd){bd=d;best=B}});return best}
// la ville entière est redessinée seulement quand le niveau change ; un immeuble se redessine seul dans son <g data-b>
function buildWorld(){const [b,fg]=world(S.city.niveau,S.city.pv);W.innerHTML=b;WF.innerHTML=fg}
function redrawB(B){const g=W.querySelector(`[data-b="${B.id}"]`);if(g)g.innerHTML=bldSvg(B,pvNow(B))}
// position de l'immeuble à l'écran (repère 1000 x 600), pour placer l'éclat
function bScreen(B){const z=zCur||1;return [Math.max(70,Math.min(930,500+z*(B.x+B.w/2))),Math.max(70,Math.min(530,470+z*(-46-B.h/2)))]}
// enlève des points de vie ; renvoie vrai si l'immeuble tombe en ruine
function hitB(B,dmg){S.city.pv[B.id]=Math.max(0,pvNow(B)-dmg);redrawB(B);
 if(S.city.pv[B.id]>0)return false;S.dmg++;gain(8+B.pvMax*5);return true}
// un coup sur l'immeuble le plus proche ; gère l'éclat, le mot et la fin de ville
function strikeCity(dmg,word){const B=nearest();if(!B)return null;const [x,y]=bScreen(B),dead=hitB(B,dmg);boom(x,y);
 pop(word||(dead?rnd(['BOUM !','CRAAAC !']):'CRAC !'));if(dead&&!standing().length)cityCleared();return {B,dead}}
function cityCleared(){const l=S.city.niveau;gain(40+20*l);S.humeur=clamp(S.humeur+25);pop('BADABOUM !');flash();cityAdvance()}
// passe à la ville suivante quand tout est rasé et que le stade du monstre le permet
function cityAdvance(){if(standing().length)return false;const n=S.city.niveau+1;if(idx()<lvInfo(n).st)return false;
 S.city={niveau:n,pv:{}};buildWorld();return true}
