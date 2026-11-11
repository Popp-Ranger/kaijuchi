# Kaijuchi — plan de développement v2

Ce document sert de cahier des charges à un modèle Claude qui n'a pas suivi la conception du jeu.
Chaque lot (section 5) est autonome : il se lit seul, se code seul, se teste seul.

Jeu en ligne : https://popp-ranger.github.io/kaijuchi/ — dépôt `Popp-Ranger/kaijuchi`, branche `main`.

---

## 1. But de la v2

Le jeu actuel se finit en vingt minutes et n'offre plus rien une fois le monstre devenu titan.
La v2 doit le rendre **long** (plusieurs jours de visites courtes), **amusant** (de vraies actions de jeu
au lieu de boutons) et **plus beau** (personnages plus détaillés et plus expressifs).

Ce qui ne change pas : jeu web statique sans serveur, sauvegarde dans le navigateur, jouable au doigt
sur mobile, style cartoon coloré à contours épais, textes en français, monstres originaux
(ne jamais copier un personnage existant, ni son nom ni son apparence).

---

## 2. État actuel du code

Le jeu livré est `index.html` (un seul fichier, aucune dépendance sauf la police Google « Baloo 2 »), assemblé par `./build.sh` à partir de `src/` : `style.css`, `page.html`, puis `00-outils.js`, `01-stades.js`, `02-objets.js`, `03-immeubles.js`, `04-monde.js`, `05-briques.js`, `06-monstres.js`, `07-rendu.js`, `08-icones.js`, `09-scene.js`, `10-jeu.js` (une section du tableau par fichier ; les numéros de ligne ci-dessous sont ceux de `index.html`).
`maquette.html` et `propositions.html` sont des références figées : **ne pas les modifier**.

| Lignes | Repère dans le fichier | Contenu |
|---|---|---|
| 9–147 | `<style>` | Mise en page, puis `/* dessin */` (contours, animations), puis `/* jeu */` |
| 184 | `stades` | `ST` : réglages des 5 stades (`oeuf`, `bebe`, `ado`, `adulte`, `titan`), `ORDER` |
| 203 | `petits objets` | Fonctions de dessin : `car`, `bus`, `person`, `tree`, `heli`, `cargo`, `cow`, `fire`… |
| 297 | `immeubles` | `PAL`, `building()`, `ruin()` |
| 322 | `le monde` | `world()` : ville procédurale à graine fixe, renvoie `[arrière-plan, premier plan]` |
| 381 | `briques communes` | `ol`, `tooth`, `orn`, `orns`, `torso`, `eye`, `brow`, formes `SH` |
| 417 | `les cinq monstres` | Tableau `D` : Grondo, Mochi, Braz, Plouf, Krok (chacun `body(t)` et `head(t)`) |
| 579 | `rendu` | `mon(d,k,u,full)` assemble un monstre ; `egg(u,d)` dessine l'œuf |
| 608 | `icônes` | `UI` (interface), `IC` (proies, avec leur viewBox) |
| 633 | `construction de la page` | Scène SVG `#scene` (viewBox `0 0 1000 600`), `zoomTo()` |
| 666 | `le jeu` | `FOODS`, `NEED`, état `S`, `decay`, `hud`, effets, actions, démarrage |

### Notions à connaître

- **Dessin** : tout est du SVG produit par des fonctions JS qui renvoient des chaînes, injectées par `innerHTML`.
- **Monstre** : pieds à l'origine `(0,0)`, regarde vers la droite. `mon()` le place dans `#mon`,
  lui-même en `translate(500,470) scale(m)`. `t` contient la palette `c`, les dégradés `gb`/`gs`,
  le filtre de lueur `fl` et les réglages du stade `p` (`bs` échelle du corps, `hs` tête, `ss` épines,
  `es` œil, `brow`, `teeth`, `glow`, `slit`).
- **Identifiants SVG** : chaque dégradé ou clipPath porte un suffixe `G('nom')` = nom + monstre + stade + usage.
  Deux dessins du même monstre sur la page doivent avoir un suffixe d'usage différent (`'s'` scène, `'c'` carte, `'p'` choix).
- **Caméra** : la ville (`#world`, `#worldF`) est zoomée autour des pieds du monstre selon le stade
  (`ST[k].z` : 5, 4, 2, 1, 0,5). Coordonnées du monde : origine aux pieds du monstre, sol à `y=0`, haut négatif.
- **État** : `S = {v, mon, stage, xp, faim, humeur, energie, propre, asleep, born, t, dmg, want}`,
  sauvegardé chaque seconde sous la clé `kaijuchi-v1`.
- **Mots à l'écran** : les éclats sont des onomatopées (« MIAM ! », « BOUM ! »), jamais des phrases.

### Pièges déjà rencontrés (à respecter absolument)

1. **Jamais de transformation CSS sur `#world` ou `#worldF`.** Une transformation ou transition CSS sur ces
   très gros groupes les fait disparaître à grande taille. On anime leur attribut `transform` en JS (`zoomTo`).
2. **Une animation CSS écrase l'attribut `transform`** de l'élément qu'elle anime. Toujours animer un `<g>`
   intérieur qui n'a pas d'attribut `transform`.
3. **Épaisseur des traits** : les classes `.ol`/`.ol2` (monstre) utilisent `--lw`, les classes `.o`/`.o2`/`.o3`
   (décor) utilisent `--k`. Tout groupe mis à l'échelle doit redéfinir la variable (`1/échelle`), sinon les contours
   deviennent trop fins ou trop gros.
4. **`python` et `node` sont absents** sur la machine. Outils disponibles : Git Bash (`sed`, `grep`, `cat`), PowerShell, `gh`.
5. **Heredoc Bash** : un bloc contenant des apostrophes échoue. Écrire le contenu avec l'outil Write, puis `cat`.

---

## 3. Méthode de travail pour le modèle sous-traitant

### Test

- L'aperçu intégré ouvre les fichiers locaux en « instantané statique » : les scripts s'exécutent mais
  **`localStorage` y lève une erreur** et un `<script src>` externe ne se charge pas.
  C'est pourquoi le jeu livré reste **un seul fichier** (voir lot 0).
- Dans l'aperçu, piloter le jeu avec l'outil JavaScript : `start(i)` lance une partie, `S` est l'état,
  `lockT=0` lève l'anti-clic, `drawAll()` redessine. Ne jamais lire toute la console : en cas d'erreur
  elle contient la page entière. Tester plutôt `typeof start`.
- Les captures ont un temps de retard : attendre 3 s après une action avant de capturer.
- La sauvegarde se vérifie uniquement sur le site en ligne, après publication.
- Vérifier chaque lot en largeur ordinateur **et** en 375 × 812, sans défilement horizontal
  (`document.documentElement.scrollWidth === innerWidth`).

### Publication

`git add`, `git commit`, `git push origin main` ; GitHub Pages republie en une minute environ.
Un lot = un commit. Ne publier qu'un lot testé.

### Règles de sauvegarde

Toute nouvelle donnée dans `S` reçoit une valeur par défaut au chargement (`load()`), pour que les parties
existantes continuent de fonctionner. On ne change la clé `kaijuchi-v1` qu'en dernier recours.

### Quel modèle pour quel lot

- **Modèle léger (Haiku ou Sonnet)** : lots de logique et d'interface, dont le cahier des charges ci-dessous est précis.
- **Modèle le plus capable** : lots de dessin (marqués 🎨). Le dessin SVG écrit à la main est ce qu'un modèle
  léger réussit le moins bien ; lui confier ces lots coûte moins cher au départ mais risque de produire des
  personnages moins beaux qu'aujourd'hui, donc à refaire.

---

## 4. Vue d'ensemble des lots

| Lot | Contenu | Dépend de | Modèle conseillé | Taille |
|---|---|---|---|---|
| 0 | Découper le code en fichiers sources + script d'assemblage | — | léger | petite |
| 1 | Rythme sur plusieurs jours | 0 | léger | petite |
| 2 | Ville destructible et niveaux de ville | 0 | léger (dessin des ruines déjà existant) | grande |
| 3 | Proies cliquables dans le décor | 2 | léger | moyenne |
| 4 | Mini-jeu « Jouer » : attrape | 0 | léger | moyenne |
| 5 | Mini-jeu « Détruire » : frappe au bon moment | 2 | léger | moyenne |
| 6 🎨 | Personnages plus détaillés et expressions | 0 | le plus capable | grande |
| 7 🎨 | Évolutions selon les soins (3 formes adultes par monstre) | 1, 6 | le plus capable (dessin), léger (règles) | grande |
| 8 | Album et succès | 2, 7 | léger | moyenne |
| 9 | La ville riposte | 2, 3 | léger (🎨 pour chars et avions) | moyenne |
| 10 | Pouvoirs à débloquer | 2, 6 | léger (🎨 pour les effets) | moyenne |
| 11 | Imprévus et cadeau quotidien | 1 | léger | petite |
| 12 | Son | 0 | léger | petite |

Ordre conseillé : 0 → 1 → 2 → 6 → 3 → 4 → 5 → 7 → 8 → 9 → 10 → 11 → 12.
Les lots 4, 6 et 12 peuvent se faire en parallèle des autres dès que le lot 0 est terminé.

---

## 5. Les lots

### Lot 0 — Découper le code (FAIT)

**Pourquoi** : un modèle qui modifie un fichier de 100 Ko le relit en entier à chaque fois. Des fichiers
courts divisent le coût de tous les lots suivants.

**À faire**
- Créer `src/` avec un fichier par section du tableau de la section 2 :
  `style.css`, `page.html` (le contenu de `<body>` hors script), `01-stades.js`, `02-objets.js`,
  `03-immeubles.js`, `04-monde.js`, `05-briques.js`, `06-monstres.js`, `07-rendu.js`, `08-icones.js`,
  `09-scene.js`, `10-jeu.js`.
- Créer `build.sh` (Bash, sans dépendance) qui recolle le tout dans `index.html` : en-tête, `<style>`,
  `page.html`, `<script>` avec les `.js` dans l'ordre numérique.
- Ajouter un `README.md` de dix lignes : comment assembler, tester, publier.

**Terminé quand** : `./build.sh` produit un `index.html` au comportement identique à l'actuel
(partie complète œuf → titan rejouée dans l'aperçu), et le site en ligne fonctionne après publication.

**Règle pour la suite** : on ne modifie plus jamais `index.html` à la main, seulement `src/`.

---

### Lot 1 — Rythme sur plusieurs jours

**But** : atteindre le titan en une à deux semaines de visites courtes.

**Règles**
- Chaque stade exige **deux conditions** : assez de points (`NEED`) **et** un âge minimal dans le stade.

| Passage | Points | Durée minimale dans le stade |
|---|---|---|
| Œuf → Bébé | 60 | aucune (le premier contact reste immédiat) |
| Bébé → Ado | 150 | 1 jour |
| Ado → Adulte | 600 | 3 jours |
| Adulte → Titan | 2 000 | 6 jours |

- Ajouter `S.since` (date d'entrée dans le stade). La barre d'évolution affiche les points ; quand ils sont
  atteints mais pas la durée, le texte de droite indique le temps restant (« encore 2 j 4 h »).
- **Plafond quotidien** : les points gagnés par jour sont limités (bébé 80, ado 220, adulte 400) pour qu'on
  ne puisse pas tout faire en une séance. Au-delà, les actions continuent d'agir sur les jauges mais ne donnent
  plus de points ; une petite icône de lune sur la barre le signale.
- **Soins** : ajouter `S.care` (0–100), moyenne glissante des quatre jauges relevée à chaque visite.
  Elle servira au lot 7.
- Page fermée : garder le temps quatre fois plus lent, et ne jamais descendre une jauge sous 15 hors ligne.
- Constante `DEBUG_SPEED` (1 par défaut) qui multiplie l'écoulement du temps, pour tester.

**Terminé quand** : avec `DEBUG_SPEED` élevé, une partie parcourt les quatre passages dans l'ordre, aucune
évolution ne se déclenche avant sa durée minimale, et une sauvegarde de la v1 se charge sans erreur.

---

### Lot 2 — Ville destructible et niveaux de ville

**But** : donner un objectif permanent, surtout après le stade titan. C'est le lot le plus important.

**Règles**
- `world()` renvoie aujourd'hui deux chaînes figées. Le transformer pour que chaque immeuble soit un objet
  `{id, x, w, h, couleur, pv, pvMax, état}` et soit dessiné dans son propre `<g data-b="id">`,
  afin de pouvoir le redessiner seul.
- Trois états visuels : intact (`building()`), fissuré (même dessin + fissures et fumée), ruine (`ruin()` + `fire()`).
- `S.city = {niveau, pv: {id: pv}}`. Détruire un immeuble rapporte des points et incrémente `S.dmg`.
- Quand tous les immeubles sont en ruine : éclat « BADABOUM ! », récompense, puis **ville suivante**.

| Niveau | Nom | Stade requis | Immeubles | Points de vie |
|---|---|---|---|---|
| 1 | Hameau | Ado | 6 maisons | 1 |
| 2 | Village | Ado | 10 | 2 |
| 3 | Petite ville | Adulte | 14 | 4 |
| 4 | Port | Adulte | 16 + bateaux | 6 |
| 5 | Capitale | Titan | 20 + tour et grande roue | 10 |
| 6+ | Mégapole n | Titan | 20 | 10 × 1,4ⁿ |

- Chaque niveau change la graine de `mb()` et la palette, pour que la ville ait un autre visage.
- Le bouton « Détruire » se débloque dès le stade ado (au lieu d'adulte) et frappe l'immeuble le plus proche
  du monstre ; le lot 5 remplacera ce clic par un mini-jeu. Dégâts par coup : ado 1, adulte 3, titan 8.
- Puce « Dégâts » remplacée par « Ville : Port 7/16 ».

**Attention** : le piège n° 1 s'applique. On redessine un immeuble en remplaçant le `innerHTML` de son `<g>`,
sans jamais poser de transformation CSS sur `#world`.

**Terminé quand** : on rase une ville entière immeuble par immeuble, la suivante apparaît, l'état de chaque
immeuble survit à un rechargement (à vérifier en ligne), et la caméra fonctionne toujours aux cinq stades.

---

### Lot 3 — Proies cliquables dans le décor

**But** : nourrir en attrapant ce qui passe, au lieu de cliquer dans un menu.

**Règles**
- Les voitures, bus, bateaux, hélicoptères, passants, vaches et papillons deviennent des objets
  `{type, x, y, vitesse}` déplacés par une boucle `requestAnimationFrame` (attribut `transform`, pas de CSS).
- Seules les proies du stade courant (`FOODS[stade]`) sont cliquables : elles ont un léger halo.
  Un clic les envoie dans la gueule (réutiliser `fly()`), puis elles réapparaissent au bord après quelques secondes.
- Zone de clic d'au moins 44 px à l'écran, quel que soit le zoom.
- Le menu « Au menu » reste, comme solution de repli et pour les proies demandées dans la bulle.
- Au plus douze objets mobiles à la fois ; la boucle s'arrête quand l'onglet est caché (`visibilitychange`).

**Terminé quand** : à chaque stade, au moins deux types de proies circulent et se mangent d'un clic ou d'un
appui, sans ralentissement visible sur mobile.

---

### Lot 4 — Mini-jeu « Jouer » : attrape

**But** : remplacer le bouton « Jouer » par vingt secondes de jeu.

**Règles**
- Le bouton ouvre une couche plein écran au-dessus de la scène (même cadre, fond ciel).
- Des objets tombent du haut : ballons et proies (bons, +1), bombes et brocolis (mauvais, −1).
  Le monstre (réutiliser `mon()` au stade courant) suit le doigt ou la souris horizontalement.
- Durée 20 s, vitesse croissante. Fin : éclat avec le score.
- Récompense : humeur +10 à +30 et points +2 à +12 selon le score ; énergie −10 dans tous les cas.
- Meilleur score conservé dans `S.best.catch`.
- Bouton « Passer » pour quitter ; quitter donne la récompense minimale.

**Terminé quand** : le mini-jeu se joue à la souris et au doigt, se termine seul, applique la récompense et
revient à la scène sans laisser d'élément à l'écran.

---

### Lot 5 — Mini-jeu « Détruire » : frappe au bon moment

**But** : rendre la destruction active.

**Règles**
- Un curseur va et vient sur une barre avec une zone verte étroite et une zone jaune autour.
  Appuyer dans le vert : coup critique (dégâts × 3, « CRAAAC ! ») ; jaune : coup normal ; ailleurs : raté (« PFFF… »).
- Trois frappes par action, la zone verte rétrécit à chaque frappe.
- Les dégâts s'appliquent aux immeubles du lot 2 (le plus proche d'abord), avec la secousse d'écran existante.
- Coût : énergie −15 pour la série de trois.

**Terminé quand** : trois frappes s'enchaînent, les dégâts correspondent à la zone touchée, et les immeubles
changent d'état en conséquence.

---

### Lot 6 🎨 — Personnages plus détaillés et expressions

**But** : répondre à la demande « mieux faits visuellement ». À confier au modèle le plus capable.

**Défauts actuels à corriger**
- Les cinq monstres partagent presque les mêmes pattes et bras (`LEG`, `ARM`) : silhouettes trop proches.
- Un seul œil, un seul visage : aucune émotion visible.
- Une seule pose ; les animations se limitent à respirer, hocher la tête, sauter, s'écraser.
- Le bébé est l'adulte réduit avec une grosse tête, pas un vrai bébé.
- Ombres et lumières sommaires : un dégradé par forme.

**À faire**
1. **Silhouette propre à chaque monstre** : pattes, bras, mains et pieds redessinés pour chacun
   (Grondo massif, Mochi boudiné, Braz griffu, Plouf palmé, Krok en piliers).
2. **Volume** : ombre portée d'une forme sur l'autre (bras sur le ventre, tête sur le cou), reflet de bord,
   ombre de contact au sol, texture de peau propre à chacun (écailles, taches, craquelures, plaques).
3. **Expressions** : paramètre `t.mood` parmi `content`, `faim`, `triste`, `fatigue`, `colere`, `dodo`, `miam`.
   Il modifie sourcil, paupière, pupille, bouche et joues. Le jeu choisit l'expression d'après les jauges.
4. **Poses** : paramètre `t.pose` parmi `debout`, `mange` (gueule grande ouverte), `frappe` (bras levé),
   `assis` (triste ou fatigué), `couche` (sommeil).
5. **Animations** : queue qui balance, bras articulé à l'épaule, clignement, mâchoire qui s'ouvre pour manger.
   Respecter le piège n° 2.
6. **Bébés redessinés** : proportions de bébé (tête ronde, membres courts, pas de crocs), pas une réduction.
7. **Saleté visible** : mouches et taches quand la propreté est basse.

**Contraintes**
- Garder la signature `mon(d,k,u,full)` et l'identité de chaque monstre (couleurs, attributs listés dans `propositions.html`).
- Garder les repères `d.H` (tête), `d.hand` (main), `d.bm` (gueule) : le jeu s'en sert pour viser.
- Travailler un monstre à la fois, sur une planche `planche.html` qui affiche les 5 stades × expressions,
  et **la faire valider par l'utilisateur avant d'intégrer au jeu**.
- Rendu fluide sur mobile : pas plus de deux filtres de flou par monstre.

**Terminé quand** : pour chaque monstre, la planche montre cinq stades, sept expressions et cinq poses,
l'utilisateur l'a validée, et le jeu affiche l'expression correspondant aux jauges.

---

### Lot 7 🎨 — Évolutions selon les soins

**But** : donner envie de recommencer avec le même monstre.

**Règles**
- Au passage à l'âge adulte, la forme dépend de `S.care` (lot 1) et du régime :

| Forme | Condition | Apparence |
|---|---|---|
| Noble | soins ≥ 70 | couleurs vives, ornements dorés, posture fière |
| Sauvage | soins < 40 | couleurs sombres, cicatrices, cornes ou piquants en plus |
| Glouton | plus de 60 % des points gagnés en mangeant | plus gros, ventre large, bajoues |
| Commune | sinon | l'apparence actuelle |

- `S.form` est conservé jusqu'au titan, qui en hérite.
- Côté dessin : chaque forme est une variation du monstre de base (palette + deux ou trois éléments ajoutés
  ou modifiés), pas un nouveau personnage. 5 monstres × 3 variantes = 15 variations.
- La forme reste une surprise : l'album du lot 8 montre des silhouettes tant qu'elle n'est pas découverte.

**Terminé quand** : en forçant `S.care` et le régime, chaque monstre évolue vers chacune des quatre formes,
et le titan conserve la forme.

---

### Lot 8 — Album et succès

**But** : une collection à compléter sur plusieurs parties.

**Règles**
- Nouvelle clé de sauvegarde `kaijuchi-album`, **indépendante de la partie** : « Nouvelle partie » ne l'efface pas.
- Contenu : monstres et formes découverts (5 × 4), proies goûtées, villes rasées, meilleurs scores.
- Une vingtaine de succès, par exemple : première éclosion, premier titan, les cinq monstres élevés,
  toutes les formes d'un monstre, dix villes rasées, cent proies attrapées dans le décor, sept jours de suite.
- Écran « Album » accessible depuis la barre du haut et depuis l'écran de choix.
- Un succès obtenu affiche un bandeau trois secondes.
- « Nouvelle partie » sur un titan devient « Relâcher dans la nature » : le monstre rejoint l'album avec sa date.

**Terminé quand** : l'album survit à une nouvelle partie, les silhouettes se dévoilent au fur et à mesure,
et au moins cinq succès ont été déclenchés en test.

---

### Lot 9 — La ville riposte

**Règles**
- À partir du stade adulte, des vagues d'attaque arrivent toutes les trois à six minutes de jeu actif :
  chars au sol, hélicoptères et avions dans le ciel (objets mobiles du lot 3).
- Ils tirent de petits projectiles : chaque impact, humeur −3. Un clic sur l'attaquant le fait croquer
  (points + faim).
- Une vague dure trente secondes ; la repousser entièrement donne un bonus.
- Jamais de vague pendant le sommeil ni pendant un mini-jeu. Le monstre ne peut ni mourir ni régresser.

**Terminé quand** : une vague apparaît, peut être repoussée au clic, et s'arrête seule.

---

### Lot 10 — Pouvoirs à débloquer

**Règles**
- Trois pouvoirs par monstre, débloqués à l'ado, à l'adulte et au titan, chacun avec un temps de recharge.

| Monstre | Ado | Adulte | Titan |
|---|---|---|---|
| Grondo | Coup de queue | Rugissement | Souffle atomique |
| Mochi | Roulade | Câlin écrasant | Rot géant |
| Braz | Crachat de braise | Pluie de lave | Éruption |
| Plouf | Jet d'eau | Raz-de-marée | Éclair des abysses |
| Krok | Coup de massue | Charge | Séisme |

- Effet de jeu : dégâts de zone sur les immeubles (lot 2) ou étourdissement des attaquants (lot 9).
- Trois boutons ronds sous la scène, grisés avec un compte à rebours pendant la recharge.
- Le souffle du titan, aujourd'hui permanent à l'écran, ne s'affiche plus que pendant le pouvoir.

**Terminé quand** : chaque pouvoir se déclenche, applique son effet, et respecte sa recharge après rechargement de la page.

---

### Lot 11 — Imprévus et cadeau quotidien

**Règles**
- **Maladie** : propreté sous 15 pendant plus d'une heure de jeu → malade (teint verdâtre, thermomètre).
  Se soigne avec un nouveau bouton « Soigner » ; tant qu'il est malade, aucun point d'évolution.
- **Bêtises** : humeur sous 20 → il casse un objet du décor tout seul et boude.
- **Envie rare** : une fois par jour, il réclame une proie précise ; la lui donner rapporte un gros bonus.
- **Cadeau quotidien** : la première visite de chaque jour donne une récompense ; une série de jours
  consécutifs l'augmente (jusqu'à sept jours).

**Terminé quand** : chaque événement peut être déclenché en forçant l'état, et se résout comme décrit.

---

### Lot 12 — Son

**Règles**
- Sons produits par l'API Web Audio (oscillateurs et bruit), **aucun fichier audio** : croc, pop, boum,
  rugissement, pluie de bulles, jingle d'évolution.
- Bouton haut-parleur dans la barre du haut ; choix conservé ; muet par défaut tant que l'utilisateur n'a pas cliqué.
- Le contexte audio ne démarre qu'au premier appui (exigence des navigateurs mobiles).

**Terminé quand** : chaque action a son son, le bouton coupe tout, et rien ne joue avant le premier appui.

---

## 6. Modèle de consigne à donner au sous-traitant

> Tu travailles sur le jeu Kaijuchi, dans le dossier de ce dépôt.
> Lis `PLAN.md` : sections 2 et 3 en entier, puis **uniquement le lot N** de la section 5.
> Réalise ce lot et rien d'autre. Modifie les fichiers de `src/`, jamais `index.html` à la main,
> puis lance `./build.sh`. Teste comme indiqué en section 3, sur ordinateur et en 375 × 812.
> Quand les critères « Terminé quand » sont tous remplis, fais un commit et pousse sur `main`.
> Termine par un compte rendu : ce qui est fait, ce qui a été vérifié et comment, ce qui reste douteux.
> Si une règle du lot est impossible ou contredit le code, arrête-toi et pose la question au lieu d'improviser.

## 7. Décisions laissées à l'utilisateur

1. **Durée totale** : le lot 1 vise dix jours jusqu'au titan. Plus court ou plus long ?
2. **Lots de dessin** : les confier au modèle le plus capable (recommandé) ou tenter le modèle léger.
3. **Ordre** : commencer par le plaisir de jeu (lots 2 à 5) ou par l'apparence (lot 6).
