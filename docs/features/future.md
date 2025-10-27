# Roadmap de Evolução

Este documento descreve iniciativas planejadas para expandir o `Fake Store CRUD`.

## Autenticação e Autorização

- Implementar página de login com formulário reativo e feedback de erros.
- Aplicar guards (`CanActivateFn`) para proteger rotas sensíveis quando o usuário não estiver autenticado.
- Persistir sessão utilizando armazenamento seguro (token JWT ou session storage) e expor estado via NgRx.

## Carrinho de Compras

- Criar página dedicada ao carrinho, com listagem de itens, totais e manipulação de quantidades.
- Permitir adicionar/editar/remover itens diretamente dos fluxos de listagem/detalhes de produto.
- Utilizar NgRx para sincronização do carrinho entre páginas.
