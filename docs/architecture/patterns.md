# Padrões e Boas Práticas

Principais padrões usados no projeto para garantir escalabilidade e manutenção simplificada.

## Standalone Components

- Todos os componentes são standalone, eliminando módulos e facilitando lazy loading.
- Imports explícitos facilitam composição.

## Signals e Change Detection `OnPush`

- Signals para estado local (`computed`, `signal`, `effect`) garantem reatividade previsível.
- `ChangeDetectionStrategy.OnPush` reduz consumo de CPU e evita renderizações desnecessárias.
- `Store.selectSignal` expõe dados NgRx diretamente como signals, simplificando binding no template.

## Facade Pattern

- `ProductsFacadeService` encapsula complexidade do NgRx e expõe uma API de alto nível para a page.
- Elimina dependência direta de componentes com `Store`, promovendo testes mais práticos e limpos.

## Dumb x Smart Components

- Componentes “smart” (ex.: `ProductsListPage`) orquestram fluxos, consomem facade e controlam estado UI.
- Componentes “dumb” (ex.: `ProductTableComponent`, `ProductFormComponent`) recebem dados via inputs e emitem eventos, favorecendo reuso.

## BEM + Tokens SCSS

- Classes seguem o padrão BEM (`.products-page__header`, `.product-form__field`).
- Tokens em `_variables.scss` padronizam espaçamentos, tipografia e breakpoints.
- Mixins (`_mixins.scss`) encapsulam responsividade, evitando duplicação de media queries.

## Testes em Jest

- Testes unitários cobrem services, effects, reducers e componentes.
- Jest permite execução mais rápida que Karma.

Para aprofundamento nos fluxos NgRx, consulte [`state-management.md`](state-management.md). Para detalhes da UI, leia [`ui.md`](ui.md).
