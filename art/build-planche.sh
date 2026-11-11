#!/usr/bin/env bash
# Assemble planche.html : les sources de dessin du jeu + les monstres redessinés de art/.
set -e
cd "$(dirname "$0")/.."
{
  cat src/head.html
  echo "<style>"
  cat src/style.css art/planche.css
  echo "</style></head><body>"
  echo '<div class="app"><div class="top"><div class="logo">KAIJUCHI</div><div class="chip stage">Planche des personnages</div></div><div id="planche"></div></div>'
  echo "<script>"
  cat src/00-outils.js src/01-stades.js src/02-objets.js src/05-briques.js src/06-monstres.js src/07-rendu.js art/grondo.js art/planche.js
  echo "</script></body></html>"
} > planche.html
echo "planche.html assemblée"
