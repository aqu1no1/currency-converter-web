# Stack

Todas as tecnologias do site, separadas por área, com a versão do `package.json` e o uso no projeto.

---

## Base

| Tecnologia                                   | Versão | Uso                                                     |
| -------------------------------------------- | ------ | ------------------------------------------------------- |
| [React](https://react.dev)                   | 19.3   | Interface                                               |
| [TypeScript](https://www.typescriptlang.org) | 6.0    | Tipagem do app, da config e dos testes                  |
| [Vite](https://vite.dev)                     | 8.3    | Servidor de desenvolvimento e build                     |
| [React Router](https://reactrouter.com)      | 8.4    | Rotas, com as páginas carregadas sob demanda (`lazy()`) |
| Node.js                                      | 24     | Ambiente de desenvolvimento e CI                        |
| [pnpm](https://pnpm.io)                      | 12     | Gerenciador de pacotes                                  |

## Interface

| Tecnologia                                                                                                | Versão    | Uso                                                                     |
| --------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| [Tailwind CSS](https://tailwindcss.com)                                                                   | 4.3       | Estilos, com as cores do tema em variáveis CSS (`src/styles/index.css`) |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) + [clsx](https://github.com/lukeed/clsx)      | 3.7 / 2.1 | Função `cn()` para montar classes condicionais                          |
| [ApexCharts](https://apexcharts.com) + [react-apexcharts](https://github.com/apexcharts/react-apexcharts) | 7.7 / 2.1 | Gráfico de área do Histórico, carregado só nessa página                 |
| [react-data-table-component](https://react-data-table-component.netlify.app)                              | 7.7       | Tabelas das Cotações e das execuções, com paginação no servidor         |
| [styled-components](https://styled-components.com)                                                        | 6.6       | Dependência do react-data-table-component                               |
| [Material Design Icons](https://pictogrammers.com/library/mdi/) (`@mdi/js`)                               | 7.4       | Ícones em SVG                                                           |
| [Fontsource](https://fontsource.org): Bricolage Grotesque e Instrument Sans                               | 5.3       | Fontes de títulos e de texto, servidas pelo próprio site                |

## Dados

| Tecnologia                                         | Versão | Uso                                                           |
| -------------------------------------------------- | ------ | ------------------------------------------------------------- |
| [TanStack Query](https://tanstack.com/query)       | 5.104  | Cache, cancelamento e novas tentativas das chamadas à API     |
| [Axios](https://axios-http.com)                    | 1.20   | Cliente HTTP (`apiClient`), com o idioma no `Accept-Language` |
| [Zod](https://zod.dev)                             | 4.6    | Validação das respostas da API (`src/dtos/`)                  |
| [decimal.js](https://mikemcl.github.io/decimal.js) | 10.6   | Inverter taxas sem erro de ponto flutuante                    |

## Idiomas

| Tecnologia                                 | Versão | Uso                                               |
| ------------------------------------------ | ------ | ------------------------------------------------- |
| [i18next](https://www.i18next.com)         | 26.4   | Traduções em pt-BR, en e es (`src/locales/`)      |
| [react-i18next](https://react.i18next.com) | 17.0   | `useTranslation` e `Trans` nos componentes        |
| `Intl` (nativo)                            | —      | Valores, taxas e datas formatados no idioma ativo |

## Qualidade e testes

| Tecnologia                                                         | Versão | Uso                                               |
| ------------------------------------------------------------------ | ------ | ------------------------------------------------- |
| [oxlint](https://oxc.rs/docs/guide/usage/linter) + oxlint-tsgolint | 1.88   | Lint com regras de tipo; barra imports relativos  |
| [oxfmt](https://oxc.rs)                                            | 0.73   | Formatação                                        |
| [Vitest](https://vitest.dev)                                       | 5.0    | Testes unitários, de componentes e de integração  |
| [Testing Library](https://testing-library.com)                     | 16.3   | Render e interações como o usuário (`user-event`) |
| [jsdom](https://github.com/jsdom/jsdom)                            | 30.1   | DOM dos testes                                    |
| `@vitest/coverage-v8`                                              | 5.0    | Cobertura                                         |
| GitHub Actions                                                     | —      | CI e release (veja [CI.md](CI.md))                |
