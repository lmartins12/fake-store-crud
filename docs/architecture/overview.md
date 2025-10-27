# Visão Geral da Arquitetura

Este documento resume os pilares arquiteturais adotados no `Fake Store CRUD` e orienta a leitura detalhada das demais referências em `docs/architecture/*`.

## Objetivos Arquiteturais

- Manter camadas desacopladas (apresentação, domínio, infraestrutura).
- Facilitar evolução do código mantendo qualidade.
- Usar padrões modernos do Angular 17 (standalone, signals, OnPush).
- Garantir consistência visual com tokens, mixins e componentes reutilizáveis.
- Documentar decisões técnicas importantes.

## Camadas principais

- `core`: serviços, contratos e utilitários centrais (`ProductService`, `ThemeService`, interfaces).
- `shared`: componentes reutilizáveis globalmente (ex.: `HeaderComponent`) e helpers (`validators`).
- `features`: módulos funcionais organizados por contexto de negócio com componentes, facade, store e testes.
- `styles`: tokens globais (`_variables.scss`), tipografia e mixins que reforçam o design system.

## Fluxo

1. A página `ProductsListPage` inicializa e aciona o facade `ProductsFacadeService`.
2. O facade dispara ações NgRx que passam por reducer e effects.
3. Os effects consomem o `ProductService`, que integra com a Fake Store API via `HttpClient` do Angular.
4. Os dados fluem de volta para a store, são expostos como `signals` e alimentam componentes de apresentação (`ProductTableComponent`, `ProductCatalogComponent`, `ProductFormComponent`).
5. Feedbacks de sucesso/erro utilizam `MessageService` do PrimeNG e confirmações usam `ConfirmationService`.

## Leitura Recomendada

- Estrutura de pastas: [`folder-structure.md`](folder-structure.md)
- Padrões de projeto: [`patterns.md`](patterns.md)
- Gerenciamento de estado: [`state-management.md`](state-management.md)
- Camada de UI: [`ui.md`](ui.md)
