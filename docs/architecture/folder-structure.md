# Estrutura de Pastas

A estrutura foi desenhada para favorecer modularização e isolamento de responsabilidades. Segue uma visão geral com ênfase nas camadas principais.

```
src/
├── app/
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── core/
│   │   ├── interfaces/
│   │   ├── services/
│   │   └── index.ts
│   ├── shared/
│   │   ├── components/
│   │   ├── utils/
│   │   └── index.ts
│   └── features/
│       └── products/
│           ├── components/
│           │   ├── base/
│           │   ├── product-catalog/
│           │   ├── product-details/
│           │   ├── product-form/
│           │   └── product-table/
│           ├── constants/
│           ├── services/
│           ├── store/
│           │   ├── actions/
│           │   ├── effects/
│           │   ├── reducers/
│           │   └── selectors/
│           ├── products-list.page.ts
│           ├── products-list.page.html
│           ├── products-list.page.scss
│           └── products-list.page.spec.ts
├── assets/
├── environments/
└── styles/
    ├── _mixins.scss
    ├── _typography.scss
    ├── _variables.scss
    └── styles.scss
```

## Diretrizes Principais

- `core`: abstrações e services compartilham dependências mínimas; só importam recursos internos do próprio `core` ou bibliotecas externas (Angular, RxJS, PrimeNG, etc.).
- `shared`: componentes e utilitários agnósticos ao domínio. Exemplos: `HeaderComponent`, `urlValidator`. Pode importar do `core`, nunca de `features`.
- `features`: dividido por contexto de negócio. Cada feature consolida componentes, store, services e testes; pode importar de `core` e `shared`, além de seus próprios submódulos.
- `styles`: centraliza tokens de design, garantindo consistência para BEM e assets PrimeNG.

## Benefícios

- Facilita extração de novas features para bibliotecas independentes.
- Permite testes unitários focados por camada (serviços, store, componentes).
- Reduz acoplamento entre domínios e possibilita lazy loading de features.
- Favorece leitura rápida para novos integrantes do time.

Para justificativas arquiteturais adicionais, consulte [`patterns.md`](patterns.md) e [`state-management.md`](state-management.md).
