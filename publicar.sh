#!/bin/bash
# Publica el sitio: sube el número de versión, commitea y hace push.
# Uso:  ./publicar.sh "mensaje del commit"
set -e
cd "$(dirname "$0")"

actual=$(cat version.txt)
nueva=$((actual + 1))

echo "$nueva" > version.txt
sed -i '' "s/?v=$actual/?v=$nueva/g" index.html
sed -i '' "s/data-version=\"$actual\"/data-version=\"$nueva\"/" index.html

git add -A
git commit -m "${1:-Actualiza el sitio}"
git push origin main

echo
echo "Publicado como versión $nueva."
echo "En un par de minutos estará en https://jaimefajardo1989.github.io/Estrategia2031_app/"
echo "Quien tenga la página abierta la va a recargar sola."
