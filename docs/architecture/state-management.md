# Gerenciamento de Estado

A feature de produtos usa NgRx para manter o estado previsível e facilitar debug.

## Feature Store

- A feature `products` é provida via `provideProductsStore()` e `provideProductsEffects()`.
- O reducer (`products.reducer.ts`) mantém estrutura enxuta do estado: `products`, `selectedProduct`, `loading`, `error`.
- Actions agrupadas com `createActionGroup` padronizam nomenclatura e payloads.

## Effects Funcionais

- Effects são declarados como funções puras (`loadProductsEffect`, `createProductEffect` etc.) usando a API funcional do NgRx 17.
- Cada effect injeta `Actions`, `ProductService` e `MessageService`.
- Mensagens de feedback são disparadas via `MessageService` para o usuário final.

## Facade

- `ProductsFacadeService` centraliza interações com a store e expõe signals para a camada de UI.
- Alinha o componente `ProductsListPage` a uma API declarativa (`products$`, `loading$`, `setSelectedProduct`, etc.).
- Simplifica testes de componente, que validam somente a interação com o facade.

## Selectors

- `selectAllProducts`, `selectProductsLoading`, `selectSelectedProduct` e derivados expõem dados normalizados.
- _Signals_ são criados com `store.selectSignal(selector)`, permitindo binding direto no template sem `async pipe`.

## Boas Práticas Adotadas

- Evita memory leaks, pois nenhum `subscribe` manual é utilizado; a store gerencia ciclo de vida.
- Controle granular de loading/error, garantindo UX previsível.
- Facilita time travel debugging com Store Devtools, habilitado automaticamente em `development`.

Para detalhes sobre a separação de responsabilidades entre container e componentes de apresentação, veja [`patterns.md`](patterns.md). A camada de UI está descrita em [`ui.md`](ui.md).
