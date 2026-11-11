/* ---------- stades ---------- */
const ST={
 oeuf:{n:'Œuf',z:5,m:.8,next:'vers Bébé',evo:35,day:'0',w:'2 kg',dmg:'aucun',age:'Jour 0',col:'#ffd166',cb:'radial-gradient(circle at 50% 35%,#fff7d6,#ffd98a)',vb:'-150 -235 300 265',
  menu:[['flame','Chaleur','éclosion'],['heart','Câlins','+ humeur']],short:'Chaleur et câlins',bub:[660,300,'heart'],pop:[340,330,'TOC TOC']},
 bebe:{n:'Bébé',z:4,m:.78,next:'vers Ado',evo:48,day:'2',w:'12 kg',dmg:'1 pot de fleurs',age:'Jours 1 à 3',col:'#b6f06a',cb:'radial-gradient(circle at 50% 35%,#f1ffd0,#b9ec7a)',vb:'-190 -296 370 328',
  bs:.55,hs:.95,ss:.5,es:1.28,brow:-10,pup:.62,teeth:1,cheek:1,hat:1,
  menu:[['butterfly','Papillon','+5 faim'],['apple','Pomme','+10 faim'],['fish','Poisson','+15 faim'],['ladybug','Coccinelle','+4 faim']],short:'Insectes, fruits, poissons',bub:[650,255,'apple'],pop:[330,310,'MIAM !']},
 ado:{n:'Ado',z:2,m:.86,next:'vers Adulte',evo:64,day:'12',w:'900 kg',dmg:'3 voitures',age:'Jours 4 à 14',col:'#5fe0a2',cb:'radial-gradient(circle at 50% 35%,#dcfff0,#84e6bd)',vb:'-250 -342 460 376',
  bs:.78,hs:.96,ss:.75,es:1.1,brow:2,pup:.54,teeth:2,cheek:1,
  menu:[['cow','Vache','+30 faim'],['tree','Arbre','+20 faim'],['car','Voiture','+45 faim'],['lamp','Lampadaire','+12 faim']],short:'Vaches, arbres, voitures',bub:[690,190,'car'],pop:[300,235,'SCRONCH !']},
 adulte:{n:'Adulte',z:1,m:.92,next:'vers Titan',evo:30,day:'31',w:'60 tonnes',dmg:'2 quartiers',age:'Jours 15 à 40',col:'#58d0c3',cb:'radial-gradient(circle at 50% 35%,#dff7ff,#8fd3f0)',vb:'-300 -410 540 436',
  bs:1,hs:1,ss:1,es:1,brow:12,pup:.46,teeth:3,hold:1,
  menu:[['boat','Bateau','+120 faim'],['heli','Hélicoptère','+90 faim'],['crowd','Foule ×10','+60 faim'],['bus','Bus','+150 faim']],short:'Bateaux, hélicos, foules',bub:[285,160,'boat'],pop:[770,300,'CROUNCH !']},
 titan:{n:'Titan',z:.5,m:1,next:'stade final',evo:100,day:'58',w:'20 000 tonnes',dmg:'4 villes',age:'Jour 41 et plus',col:'#b59cff',cb:'radial-gradient(circle at 50% 35%,#ffe3f3,#ffa9c9)',vb:'-345 -452 610 492',
  bs:1.15,hs:.96,ss:1.35,es:.92,brow:20,slit:1,teeth:4,glow:1,scar:1,beam:1,
  menu:[['building','Immeuble','+800 faim'],['cargo','Cargo','+600 faim'],['district','Quartier','+2 500 faim']],short:'Immeubles, quartiers, villes',bub:null,pop:[250,140,'GRAOUUU !']}
};
const ORDER=['oeuf','bebe','ado','adulte','titan'];

