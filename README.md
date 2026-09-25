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

## As dez telas

| # | Tela | O que entrega |
| --- | --- | --- |
| 01 | Abertura | Logotipo da Los Los em destaque e a tese em uma frase |
| 02 | O ponto cego | Mapa do Brasil com 6.200 lojas, 2.800 no raio de visita e 3.400 fora |
| 03 | Nossa leitura | O que parece contra o que é, mais três números de categoria |
| 04 | Shopper e canais | Os seis segundos do freezer e as quatro missões de compra |
| 05 | Como a 75 LAB trabalha | Quatro princípios e o que a proposta não exige de ninguém |
| 06 | As soluções | Cinco soluções, cada uma com o que é e o que chega na mão |
| 07 | Freezer Padrão | O freezer real da marca e as quatro zonas do planograma |
| 08 | QR de Instalação | Os quatro passos da prova e o painel de cobertura simulado |
| 09 | O caminho | Oito semanas até a rua e as quatro ondas do ano |
| 10 | Investimento e decisão | Cenários P, M e G, próximos passos e o bloco institucional |

## As cinco soluções

| # | Solução | O que chega |
| --- | --- | --- |
| 01 | Freezer Padrão | Cartaz dentro da tampa, adesivos de sabor e régua de preço |
| 02 | Kit de Canal | Testeira, adesivo de porta e material de balcão, por endereço |
| 03 | Régua de Sabores | Peça no freezer e a mesma régua no celular, pelo QR |
| 04 | QR de Instalação | Painel de cobertura por loja e relatório de uma página |
| 05 | Peça em 3D | Link e QR que abrem a peça em tamanho real no chão da loja |

Todas executadas pela 75 LAB, sem depender de dado de venda do cliente, sem aplicativo,
sem sensor e **sem fase de piloto**: a primeira onda já vai para todas as lojas do canal escolhido.

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

- Razão social, CNPJ e telefone da 75 LAB não constam em fonte pública e estão marcados na tela 10
- A solução 05 depende de a 75 LAB modelar em 3D cada peça que desenhar, o que faz parte do escopo
  de produção e não existe ainda para nenhuma peça Los Los
- Números e regiões do painel de rastreamento são simulação de tela, não resultado real
- Os cenários M e G são simulações da 75 LAB, não proposta fechada
