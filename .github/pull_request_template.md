# Pull Request

## 📌 Descrição

<!-- Descreva claramente o que esta PR faz. -->

---

## 🏷 Tipo de PR

Marque uma opção:

- [ ] 🐛 Bugfix
- [ ] ✨ Feature
- [ ] ♻️ Refactor
- [ ] ⚡ Performance
- [ ] 🧪 Testes
- [ ] 📚 Documentação
- [ ] 🔧 Chore
- [ ] 🚨 Hotfix

---

## 🔗 Links Relacionados

- Task no Linear:

- Página no design:

---

## 🧠 Contexto

<!-- Explique o problema que esta PR resolve. -->

---

## 📋 Checklist

### Código

- [ ] Código segue os padrões do projeto (pastas, nomes em inglês e imports por alias)
- [ ] Não há `console.log` desnecessários
- [ ] Não há código comentado desnecessário
- [ ] Componentes novos têm JSDoc nas props e no componente; o resto do código fica sem comentários
- [ ] Nenhum texto fixo na página: tudo passa pelo `t()` e está em `pt-BR`, `en` e `es`
- [ ] Cores vêm dos tokens do tema (classes do Tailwind ligadas às variáveis CSS, nada de hex fixo)
- [ ] Classes condicionais montadas com `cn()`
- [ ] Chamadas à API passam por um service e um hook do TanStack Query, com a resposta validada pelo Zod
- [ ] Tempos usam as constantes de `time.constants.ts`

### Qualidade

- [ ] Rodei o linter (`pnpm lint`)
- [ ] Rodei o formatter (`pnpm format`)
- [ ] Typecheck passou (`pnpm typecheck`)
- [ ] Testes passaram localmente (`pnpm test`)
- [ ] Adicionei ou atualizei os testes da mudança
- [ ] Testei no navegador, no desktop e em largura de celular
- [ ] Conferi no tema claro e no escuro
- [ ] Atualizei o `CHANGELOG.md` em `[Unreleased]` (se a mudança afeta quem usa o site)
- [ ] Atualizei a documentação (`README.md`, `docs/`), se aplicável

### Acessibilidade

- [ ] HTML semântico (`button`, `a`, `nav`, `main`...) e `aria-label` onde o texto não basta
- [ ] Tudo funciona só com o teclado, com foco visível
- [ ] Imagens e ícones informativos têm texto alternativo
- [ ] Contraste de texto ok nos dois temas

### Variáveis de ambiente (se aplicável)

- [ ] Adicionei ao `.env.example` e ao `types/env.d.ts`
- [ ] Nada secreto em variável `VITE_*`

---

## 📸 Evidências (se aplicável)

<!-- Prints ou vídeos antes/depois, nos temas claro e escuro. -->

| Antes | Depois |
| ----- | ------ |
|       |        |

---

## 🚀 Observações adicionais

<!-- Informações extras relevantes. -->
