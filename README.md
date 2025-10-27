# Fake Store CRUD

Aplicação Angular 17 que implementa um CRUD completo de produtos consumindo a [Fake Store API](https://fakestoreapi.com). O projeto foca em escalabilidade, padrões modernos e código fácil de manter.

## Sumário

- Visão Geral
- Arquitetura e Decisões Técnicas
- Funcionalidades Implementadas
- Futuras Evoluções
- Guia de Execução
- Testes Automatizados
- Suporte

## Visão Geral

Aplicação single-page construída com Change Detection `OnPush`, componentes standalone e signals para estado local. Utiliza PrimeNG como biblioteca UI, NgRx para gerenciamento global e Jest para testes unitários. A camada de estilo segue BEM, com tokens e mixins SCSS para garantir consistência e reutilização.

## Arquitetura e Decisões Técnicas

- [`docs/architecture/overview.md`](docs/architecture/overview.md)
- [`docs/architecture/folder-structure.md`](docs/architecture/folder-structure.md)
- [`docs/architecture/patterns.md`](docs/architecture/patterns.md)
- [`docs/architecture/state-management.md`](docs/architecture/state-management.md)
- [`docs/architecture/ui.md`](docs/architecture/ui.md)

Esses documentos cobrem separação entre componentes de apresentação e containers, uso de signals, Facade Pattern com NgRx, organização modular e tokens de design.

## Funcionalidades Implementadas

Descrição detalhada em [`docs/features/current.md`](docs/features/current.md).

## Futuras Evoluções

Roadmap documentado em [`docs/features/future.md`](docs/features/future.md).

## Guia de Execução

- Pré-requisitos: Node.js 20+, npm 10+
- Instalação de dependências:
  ```bash
  npm install
  ```
- Execução local:
  ```bash
  npm start
  ```
  > _Aplicação disponível em `http://localhost:4200`._
- Build:
  ```bash
  npm run build
  ```
  Artefatos em `dist/`.

## Testes Automatizados

Testes unitários em Jest.

- Execução: `npm test`
- Cobertura: `npm run test:cov`

## Suporte

- [`docs/faq.md`](docs/faq.md)
