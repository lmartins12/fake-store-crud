# Funcionalidades Atuais

Este documento lista os fluxos entregues no `Fake Store CRUD` e destaca requisitos funcionais atendidos para o desafio técnico.

## Catálogo e Tabela de Produtos

- Alternância entre visualização em tabela (`ProductTableComponent`) e catálogo (`ProductCatalogComponent`).
- Paginação, ordenação e estados de carregamento utilizando componentes PrimeNG.
- Feedback visual para ausência de dados (mensagem e ícone dedicados).

## Gestão de Produtos (CRUD)

- **Listagem**: carregamento automático na inicialização via `ProductsListPage`.
- **Criação**: formulário reativo com validações (`required`, `minlength`, `min`, `urlValidator`).
- **Atualização**: reutiliza formulário com dados pré-preenchidos; mantém consistência de validações.
- **Remoção**: confirmação obrigatória (`ConfirmationService`) e feedback via toast.
- **Detalhes**: modal dedicado com resumo e fallback de imagem.

## Estado e Feedback

- Facade expõe `loading` e `error` para sincronizar UI e tratar exceções.
- Toasts comunicam sucesso ou falha em cada operação (criar, atualizar, excluir, carregar).

## Temas e Experiência de Uso

- Alternância entre tema claro e escuro com persistência em `localStorage`.
- Responsividade garantida com mixins SCSS e breakpoints padronizados.
- Acessibilidade básica com labels, tooltips e suporte a teclado para ações chave.

Para roadmap e itens planejados, consulte [`future.md`](future.md).
