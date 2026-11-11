#!/usr/bin/env bash
# Assemble src/ en un seul index.html (le jeu livré reste un fichier unique).
set -e
cd "$(dirname "$0")"
{
  cat src/head.html
  echo "<style>"
  cat src/style.css
  echo "</style>"
  echo "</head>"
  echo "<body>"
  cat src/page.html
  echo "<script>"
  for f in src/[0-9][0-9]-*.js; do cat "$f"; done
  echo "</script>"
  echo "</body>"
  echo "</html>"
} > index.html
echo "index.html assemblé ($(wc -l < index.html) lignes)"
