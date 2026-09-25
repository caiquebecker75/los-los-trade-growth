#!/bin/sh
# copia o build para o scratchpad (o servidor de preview nao le /Volumes)
SC="/private/tmp/claude-501/-Users-caiquebecker/0bff4b5e-0a2f-4c24-af2e-87735520da8c/scratchpad/preview"
P="/Volumes/hd caique becker/Mac Caique/Projetos/los-los-trade-growth"
cd "$P" && python3 build.py || exit 1
rm -rf "$SC"/* 2>/dev/null
cp "$P/index.html" "$SC/"
cp -R "$P/assets" "$SC/"
echo "sync ok -> $SC"
