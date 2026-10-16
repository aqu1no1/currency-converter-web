# Changelog

Todas as mudanças relevantes do site ficam registradas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue o [Semantic Versioning](https://semver.org/lang/pt-BR/). Versões `0.x.y` até a primeira publicação.

## [Unreleased]

### Added

- Projeto criado com Vite, React, TypeScript e Tailwind CSS v4, com a estrutura de pastas e os aliases de import.
- Qualidade e CI: oxlint, oxfmt, Vitest com Testing Library, workflows de CI e de release no GitHub Actions e template de PR.
- Textos em português, inglês e espanhol, com o seletor PT / EN / ES. O idioma segue a escolha salva ou o idioma do navegador, e valores, taxas e datas são formatados no idioma ativo.
- Comunicação com a API: moedas, conversão, últimas cotações, histórico e status da sincronização, com respostas validadas e mensagens de erro no idioma do site.
- Tema claro e escuro com o seletor claro / escuro / automático no topo. O automático segue o tema do sistema, a escolha fica salva e o tema certo já aparece ao abrir o site, sem piscar.
- Cabeçalho e rodapé com a navegação entre as páginas (Início, Conversor, Cotações do dia, Histórico e Status), link para pular ao conteúdo e página 404.
- Página inicial com as cotações de hoje em reais, a faixa de cotações, o que dá para fazer no site, como as cotações chegam e as moedas suportadas.
- Página Conversor: valor com vírgula ou ponto, moedas De e Para com botão de inverter, resultado com as taxas direta e inversa e a data da cotação, conversões frequentes e link compartilhável com o valor e as moedas.
- Página Cotações do dia: escolha da moeda base, tabela com quanto 1 unidade vale em cada moeda e o inverso, e clique na linha para abrir o histórico do par.
- Avisos quando a API está fora do ar, quando as cotações ainda não foram sincronizadas e quando a última sincronização falhou.

### Fixed

- Tabelas quebravam a página no navegador por causa da versão CommonJS do `react-data-table-component`.
