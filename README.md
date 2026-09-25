# Los Los Trade Growth System · 75 LAB

Apresentação HTML de 10 telas do plano de trade, execução, escala e crescimento proposto pela
**75 LAB** para a **Sorvetes Los Los**. Horizonte: outubro de 2026 a setembro de 2027.

**No ar:** https://projetos.75lab.com.br/los-los-trade-growth/

## Como é feita

Palco fixo de 1600 × 900 escalado para qualquer tela, sem dependências além das fontes do Google.
Nada de framework: HTML, CSS e um motor próprio de cerca de 300 linhas de JavaScript.

```
src/
  head.html        meta, fontes e sistema de design (tokens, chrome, cursor, lightbox, fundo)
  comp.css         componentes por tela + bloco mobile que reorganiza cada composição
  app.js           motor: navegação, cursor, contadores, lightbox, índice, modo mobile
  partials/        mapa.html e mapinha.html, gerados a partir de coordenadas reais
  slides/01..10    uma tela por arquivo
assets/
  logo/            logotipos Los Los (ink e branco) e 75 LAB (preto e paper)
  img/             freezer, carrinho e packshots oficiais da marca
  varejo/          logotipos das redes onde a marca está presente
build.py           monta index.html a partir de src/ e falha se achar travessão
sync.sh            build + cópia para o scratchpad do preview local
```

Para gerar: `python3 build.py`. O `index.html` é o resultado e não deve ser editado à mão.

## As nove telas

| # | Tela | O que entrega |
| --- | --- | --- |
| 01 | Abertura | Logotipo da Los Los em destaque e a tese em uma frase |
| 02 | O ponto cego | Mapa do Brasil com 6.200 lojas, 2.800 no raio de visita e 3.400 fora |
| 03 | Nossa leitura | O que parece contra o que é, mais três números de categoria |
| 04 | Shopper e canais | Os seis segundos do freezer e as quatro missões de compra |
| 05 | Entregas · pensar e criar | Quatro entregas em detalhe, com escopo, prazo e valor |
| 06 | Entregas · levar e rastrear | Guia, catálogo, One Shot e OnTiming, com escopo, prazo e valor |
| 07 | Cronograma | Calendário de 12 meses em barras, por trimestre e por entrega |
| 08 | Valor por entrega | Tabela com as oito entregas, formato, prazo e investimento |
| 09 | Cenários de investimento | As mesmas entregas somadas em P, M e G, com o bloco institucional |

## As oito entregas e os valores

| Entrega | Formato | Investimento |
| --- | --- | --- |
| **Estratégia por Canal** | Plano em PDF, 3 semanas | R$ 16.800 por canal |
| **Calendário de Trade** | Planilha viva, 2 semanas | R$ 9.800 por ano |
| **Arquitetura do Freezer** | Manual e artes, 4 semanas | R$ 19.600 projeto |
| **Conceito e Enxoval de PDV** | Manual 3D e artes, 6 semanas por onda | R$ 32.000 por onda |
| **Guia de Execução** | Página, PDF e vídeo, 2 semanas | R$ 8.400 projeto |
| **Catálogo do Distribuidor** | Catálogo digital, 3 semanas | R$ 12.600 por ano |
| **One Shot** · rastreio estático | Por ponto de venda, único | R$ 13,64 por PDV |
| **OnTiming** · rastreio ao vivo | Assinatura de 6 a 12 meses | R$ 27,27 por PDV à vista |

O Conceito e Enxoval inclui o **manual de merchandising com as peças em 3D**, uma versão por canal,
só com material que funciona naquele tipo de loja.

Os preços de One Shot e OnTiming seguem a régua da 75 LAB (preço = custo ÷ 0,55), a mesma do deck
de rastreamento. **Os valores das seis entregas de projeto são proposta e precisam de validação
comercial antes do envio ao cliente.**

## Cenários

| | P · Fundação | M · Aceleração | G · Escala |
| --- | --- | --- | --- |
| Premissa | 1 canal, 2 ondas, 1.000 lojas | 2 canais, 3 ondas, 2.500 lojas | 4 canais, 4 ondas, 6.200 lojas |
| Estratégia, criação e rastreio | R$ 122.440 | R$ 214.100 | R$ 411.984 |
| Produção física estimada | R$ 180 a 240 mil | R$ 300 a 420 mil | R$ 480 a 720 mil |
| **Total no ano** | **R$ 302 a 362 mil** | **R$ 514 a 634 mil** | **R$ 892 mil a 1,13 mi** |

## Navegação

Setas, espaço, Page Up e Page Down, rolagem, clique, toque e a tecla **M** para o índice por capítulos.
As fotos de produto ampliam em lightbox (ESC ou clique fora fecha, setas navegam a galeria).
O botão de impressão gera um PDF de uma tela por página.

## Identidade

Coral `#EC7F84`, ink `#12141C` e Poppins vêm do site da Los Los. Big Shoulders Display, Space Mono,
cantos retos e grão vêm do sistema da 75 LAB. Cada camada de produto tem a sua cor: coral no Motor,
lima no Ativar e verde-azulado no Escalar.

Os mapas não são imagem de banco: são desenhados a partir de coordenadas reais de latitude e longitude,
projetadas em SVG, com os pontos distribuídos conforme a densidade populacional do país.

## Fontes

- Marca e parque instalado: sorvetesloslos.com.br e ABRAMARK
- Categoria: ABIS e Abrasorvete, via Estadão Conteúdo
- Shopper e canal: Kantar Brasil (2024) e Nielsen
- Base primária do diagnóstico: reunião Los Los × 75 LAB de 14 de setembro de 2026

## Pendências

- Razão social, CNPJ e telefone da 75 LAB não constam em fonte pública e estão marcados na tela 09
- Os valores das seis entregas de projeto são proposta da 75 LAB e precisam de validação comercial
- O volume de lojas de cada cenário é premissa de cálculo, a ser substituído pelo cadastro do canal
- A comprovação por QR depende de a 75 LAB publicar a página de cada peça, o que faz parte do escopo
  de produção e ainda não existe para nenhuma peça Los Los
