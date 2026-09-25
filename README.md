# Los Los Trade Growth System · 75 LAB

Apresentação HTML de 31 telas do plano estratégico de trade, execução, escala e crescimento
proposto pela **75 LAB** para a **Sorvetes Los Los**. Horizonte: outubro de 2026 a setembro de 2027.

**No ar:** https://projetos.75lab.com.br/los-los-trade-growth/

## Como é feita

Palco fixo de 1600 × 900 escalado para qualquer tela, sem dependências além das fontes do Google.
Nada de framework: HTML, CSS e um motor próprio de ~300 linhas de JavaScript.

```
src/
  head.html      meta, fontes e o sistema de design (tokens, chrome, cursor, lightbox, fundo)
  comp.css       componentes por tela + o bloco mobile que reorganiza cada composição
  app.js         motor: navegação, cursor, count-up, abas, lightbox, índice, modo mobile
  slides/01..31  uma tela por arquivo
assets/
  logo/          logotipos Los Los (ink e branco) e 75 LAB (preto e paper)
  img/           packshots oficiais dos picolés
build.py         monta index.html a partir de src/ (e falha se achar travessão)
sync.sh          build + cópia para o scratchpad do preview local
```

Para gerar: `python3 build.py`. O arquivo `index.html` é o resultado e não deve ser editado à mão.

## Navegação

Setas, espaço, Page Up e Page Down, scroll, clique, toque e a tecla **M** para o índice por capítulos.
Cada imagem amplia em lightbox (ESC ou clique fora fecha, setas navegam a galeria).
O botão de impressão gera um PDF de uma tela por página.

## Estrutura narrativa

| Capítulo | Telas | O que acontece |
| --- | --- | --- |
| I · O ponto cego | 01 a 05 | Abertura, o parque de 6.200 freezers, agenda, decupagem do briefing e os oito sinais da conversa |
| II · O contexto | 06 a 10 | Categoria, territórios competitivos, shopper, canais e tendências com endereço no plano |
| III · A tese | 11 a 13 | Os cinco movimentos, a regra de ouro e o reveal do sistema |
| IV · O sistema | 14 a 21 | Três camadas e os produtos: X-Ray, Freezer Performance, Restart, Flex PDV, Discovery, Scale, League |
| V · A prova | 22 a 26 | One Shot e On Timing, Los Los Eye, Pilot Lab, cronograma de 90 dias e roadmap de 12 meses |
| VI · A decisão | 27 a 31 | Cenários P, M e G, gates de tecnologia, governança, riscos, encerramento e institucional |

## Interações por tela

- **02** matriz de 620 pontos, cada um valendo 10 PDVs
- **05** os oito sinais da conversa, clicáveis, com a implicação de desenho
- **09** quatro canais com a missão de compra de cada um
- **12** portão de produção: as quatro perguntas abrem a liberação
- **15** simulador do Opportunity Score com os sete critérios ponderados
- **16** comparador do freezer, como está hoje e com o sistema
- **17** playbook do Restart por canal
- **19** packshots oficiais navegáveis, com lightbox
- **27** seletor dos cenários de investimento

## Fontes

- Marca e números de parque: sorvetesloslos.com.br e ABRAMARK
- Categoria: ABIS, Abrasorvete via Estadão Conteúdo
- Shopper e canal: Kantar Brasil (2024) e Nielsen
- Base primária do diagnóstico: transcrição da reunião Los Los × 75 LAB de 14 de setembro de 2026

## Pendências

- Razão social, CNPJ e telefone da 75 LAB não constam em fonte pública e estão marcados na tela 31
- Não há modelo 3D de freezer ou de peça Los Los, então nenhuma experiência 3D ou de realidade aumentada
  foi simulada. A tela 18 explica como isso entra quando o primeiro material for aprovado
- Os cenários M e G são simulações da 75 LAB, não proposta fechada
