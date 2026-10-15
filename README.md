# currency-converter-web

Site do Converter: conversor de moedas, cotações do dia e histórico, consumindo a [api-converter](../../api-converter).

Feito com Vite, React, TypeScript e Tailwind CSS v4.

## Requisitos

- Node 24
- pnpm 12 (versão no campo `packageManager` do `package.json`)

## Como rodar

```sh
pnpm install
cp .env.example .env   # ajuste VITE_API_URL se a API não estiver em http://localhost:3000
pnpm dev
```

## Comandos

| Comando          | O que faz                                |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | servidor de desenvolvimento do Vite      |
| `pnpm build`     | typecheck + build de produção em `dist/` |
| `pnpm preview`   | serve o `dist/` localmente               |
| `pnpm typecheck` | checagem de tipos com o `tsc`            |

## Variáveis de ambiente

| Variável       | Descrição                         |
| -------------- | --------------------------------- |
| `VITE_API_URL` | URL base da api-converter         |

Toda variável nova entra no `.env.example` e no `src/types/env.d.ts`. Variáveis `VITE_*` vão para o bundle, então nada secreto nelas.

## Estrutura

```
src/
├── pages/        # uma pasta por página; componentes só da página em pages/<pagina>/components/
├── components/   # componentes usados em duas páginas ou mais, por grupo
├── hooks/        # hooks de dados e de UI
├── services/     # ApiService + uma classe por recurso
├── theme/        # ThemeProvider + useTheme
├── styles/       # index.css: Tailwind, tokens do tema e @theme
├── constants/    # constantes (ex.: time.constants.ts)
├── dtos/ · models/ · interfaces/ · enums/ · utils/
├── lib/          # query-client, i18n
├── locales/      # pt-BR, en, es
├── types/        # declarações globais (env.d.ts)
└── assets/
public/           # favicons, manifest, og-image
test/             # unit, components, integration, setup, fixtures, utils
```

Nomes de pastas, arquivos, componentes, rotas e chaves de tradução ficam sempre em inglês; português só nos textos de `locales/pt-BR`. Imports entre pastas usam os aliases (`@components/*`, `@utils/*`...), definidos no `tsconfig.app.json` e no `vite.config.ts`.
