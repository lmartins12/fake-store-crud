# Camada de UI

## Design System

- PrimeNG fornece componentes avançados (tabela, dataview, diálogos, toast, confirmação).
- Temas são controlados pelo `ThemeService`, que injeta dinamicamente a folha de estilo Aura (light/dark).
- Tokens em `_variables.scss` unificam espaçamentos (`$spacing-*`) e breakpoints (`$breakpoint-*`).

## BEM e SCSS

- Todos os estilos seguem naming BEM (`.products-page__header`, `.product-form__actions`).
- Arquivos SCSS compartilham mixins (`respond-to`, `custom-scrollbar`) para responsividade e acessibilidade.
- Variáveis e mixins reduzem duplicação e facilitam manutenção.

## Componentização

- `HeaderComponent`: toolbar com toggle de tema e atalhos, usa `TooltipModule` para feedback.
- `ProductTableComponent` e `ProductCatalogComponent`: variações visuais que extendem uma classe base (`BaseProductListComponent`).
- `ProductFormComponent`: form reativo com validação customizada (`urlValidator`).
- `ProductDetailsComponent`: detalhamento com fallback para imagens, utilizando `CardModule` e `TagModule`.

## Acessibilidade

- Botões via ícones utilizam `tooltip` e `aria-label` para indicar ações.
- Componentes de visualização oferecem teclado (`keyup.enter`) para alternar modos (tabela ↔ catálogo).
- Fallback para imagens que falham.

## Feedback ao Usuário

- Toasts (`MessageService`) apresentam confirmações e erros do CRUD.
- `ConfirmDialog` protege ações destrutivas com mensagem de confirmação.

Outras camadas de arquitetura estão documentadas em [`overview.md`](overview.md). Padrões e fluxos completos em [`patterns.md`](patterns.md) e [`state-management.md`](state-management.md).
