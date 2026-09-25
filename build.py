#!/usr/bin/env python3
"""Monta index.html a partir de src/. Uso: python3 build.py"""
import re, pathlib, sys

R = pathlib.Path(__file__).parent
S = R / "src"

LL_I  = "assets/logo/loslos-ink.png"
LL_W  = "assets/logo/loslos-white.png"
L75_B = "assets/logo/75lab-black.png"
L75_P = "assets/logo/75lab-paper.png"

BGW = ('<div class="bgw" aria-hidden="true"><i class="blob b1"></i>'
       '<i class="blob b2"></i><i class="blob b3"></i></div>'
       '<div class="dotsw" aria-hidden="true"></div>'
       '<div class="glw" aria-hidden="true"></div>')

CHROME_TOP = f'''
<div id="prog" style="width:3.2%"></div>
<header id="top">
  <a class="brand" href="#1" data-go="0" aria-label="Início">
    <img id="logoLL" class="ll" src="{LL_I}" alt="Sorvetes Los Los">
    <span class="x">&times;</span>
    <img id="logo75" class="l75" src="{L75_B}" alt="75 LAB">
  </a>
  <div class="sp"></div>
  <span class="part" id="partlbl"></span>
  <button class="chip" id="bMenu" aria-label="Abrir índice">Índice</button>
</header>'''

CHROME_BOT = '''
<svg id="grain" aria-hidden="true"><filter id="gf"><feTurbulence type="fractalNoise"
  baseFrequency="0.8" numOctaves="3"/></filter><rect width="100%" height="100%" filter="url(#gf)"/></svg>
<div id="vig" aria-hidden="true"></div>
<footer id="bot">
  <span class="part">Plano estratégico · out/26 a set/27</span>
  <div class="sp"></div>
  <button class="nb" id="prev" aria-label="Tela anterior"><svg><use href="#lt"/></svg></button>
  <span id="count" aria-live="polite"></span>
  <button class="nb" id="next" aria-label="Próxima tela"><svg><use href="#gt"/></svg></button>
  <button class="nb" id="bPrint" aria-label="Imprimir ou salvar em PDF"><svg><use href="#pr"/></svg></button>
</footer>
<span class="hint" id="hint">setas · scroll · espaço · M para o índice</span>'''

AFTER = '''
<nav id="mob" aria-label="Navegação">
  <button id="mobMenu" onclick="document.getElementById('menu').classList.add('on')">Índice</button>
  <div class="sp"></div><span class="mono" id="mobCount"></span><div class="sp"></div>
  <button id="mobPrev">Anterior</button><button id="mobNext">Próxima</button>
</nav>
<div id="menu" role="dialog" aria-label="Índice da apresentação">
  <div class="mh">
    <img src="''' + L75_P + '''" alt="75 LAB" style="height:17px">
    <span class="mono" style="color:var(--coral)">Los Los Trade Growth System</span>
    <div class="sp"></div>
    <button class="chip" id="bClose" style="border-color:rgba(244,241,234,.3)">Fechar</button>
  </div>
  <div id="mgrid"></div>
</div>
<div id="lb" role="dialog" aria-modal="true" aria-label="Imagem ampliada">
  <button class="lbnav" id="lbp" aria-label="Imagem anterior"><svg><use href="#lt"/></svg></button>
  <img id="lbimg" alt="">
  <button class="lbnav" id="lbn" aria-label="Próxima imagem"><svg><use href="#gt"/></svg></button>
  <button id="lbx" aria-label="Fechar (ESC)"><svg><use href="#cl"/></svg></button>
  <p id="lbcap"></p>
</div>'''

DEFS = '''<svg style="display:none" aria-hidden="true"><defs>
<symbol id="ar" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="lt" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></symbol>
<symbol id="gt" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></symbol>
<symbol id="cl" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
<symbol id="pr" viewBox="0 0 24 24"><path d="M6 9V3h12v6M6 18H4v-6h16v6h-2M8 14h8v7H8z"/></symbol>
<symbol id="ck" viewBox="0 0 24 24"><path d="M4 12.5l5.2 5L20 6.5"/></symbol>
</defs></svg>'''


def merge_dup_style(html: str) -> str:
    """Junta dois atributos style na mesma tag (o segundo seria ignorado)."""
    pat = re.compile(r'(<[a-zA-Z][^>]*?)style="([^"]*)"([^>]*?)style="([^"]*)"')
    while True:
        m = pat.search(html)
        if not m:
            return html
        html = (html[:m.start()] + m.group(1) + m.group(3).rstrip() +
                ' style="' + m.group(2).rstrip('; ') + ';' + m.group(4) + '"' + html[m.end():])


def main():
    head = (S / "head.html").read_text(encoding="utf-8")
    comp = (S / "comp.css").read_text(encoding="utf-8")
    app = (S / "app.js").read_text(encoding="utf-8")

    files = sorted((S / "slides").glob("*.html"))
    if not files:
        sys.exit("nenhum slide em src/slides/")
    parts = []
    for f in files:
        html = f.read_text(encoding="utf-8").strip()
        # injeta o fundo vivo logo apos a tag de abertura da <section>
        html = re.sub(r'(<section\b[^>]*>)', r'\1' + BGW, html, count=1)
        parts.append(html)
    slides = "\n".join(parts)

    consts = (f'var LL_I="{LL_I}",LL_W="{LL_W}",L75_B="{L75_B}",L75_P="{L75_P}";\n')

    out = ("<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n" + head +
           "<style>\n" + comp + "\n</style>\n</head>\n<body>\n" + DEFS +
           '\n<div id="cur" aria-hidden="true"></div><div id="dot" aria-hidden="true"></div>\n'
           '<main id="deck"><div id="stage">' + CHROME_TOP + "\n" + slides + "\n" +
           CHROME_BOT + "\n</div></main>\n" + AFTER +
           "\n<script>\n" + consts + app + "\n</script>\n</body>\n</html>\n")

    out = merge_dup_style(out)

    bad = [c for c in ("—", "–") if c in out]
    if bad:
        for c in bad:
            for m in re.finditer(re.escape(c), out):
                print("TRAVESSAO em:", out[max(0, m.start()-70):m.start()+70].replace("\n", " "))
        sys.exit("ERRO: travessao encontrado no HTML final.")

    (R / "index.html").write_text(out, encoding="utf-8")
    print(f"index.html gerado · {len(files)} telas · {len(out)//1024} KB")


if __name__ == "__main__":
    main()
