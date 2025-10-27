# Fake Store CRUD

Aplicação Angular 17 que implementa um CRUD completo de produtos consumindo a [Fake Store API](https://fakestoreapi.com). O projeto foca em escalabilidade, padrões modernos e código fácil de manter.

- [Links](#links)
- [Visão Geral](#visão-geral)
- [Arquitetura e Decisões Técnicas](#arquitetura-e-decisões-técnicas)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Futuras Evoluções](#futuras-evoluções)
- [Guia de Execução](#guia-de-execução)
- [Testes](#testes)
- [Suporte](#suporte)

## Links

- **Documentação:** hospedada no GitHub Pages, contém detalhes sobre arquitetura, setup e exemplos de uso.  
  [Acessar documentação →](https://lmartins12.github.io/fake-store-crud/)

- **Aplicação em produção:** versão compilada do projeto Angular hospedada na Vercel.  
  [Acessar o site →](https://fake-store-crud-ten.vercel.app/products)

## Visão Geral

Single-Page Application (SPA) construída com Change Detection `OnPush`, componentes `standalone` e `signals` para estado local. Utiliza `PrimeNG` como biblioteca UI e configuração de temas, `NgRx` para gerenciamento de estado e `Jest` para testes unitários. A camada de estilo segue o padrão `BEM`, com tokens e mixins `SCSS` para garantir consistência e reutilização.

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

_Pré-requisitos:_ Git, Node.js 20+, npm 10+

- Clone o projeto:
  ```bash
  git clone https://github.com/lmartins12/fake-store-crud.git
  ```
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

## Testes

Os testes unitários do projeto são implementados com **Jest**, garantindo alta cobertura e execução rápida.

**Comandos:**

```bash
# Executar todos os testes
npm test

# Gerar relatório de cobertura
npm run test:cov
```

**Resumo da cobertura atual:**

| Statements | Branches | Functions | Lines |
| ---------- | -------- | --------- | ----- |
| 100%       | 80%      | 100%      | 100%  |

> **Nota:** A cobertura de branches está em 80% devido a _false uncovered lines_ reportadas pelo Jest em alguns **Effects** do NgRx.

## Suporte

- [`docs/faq.md`](docs/faq.md)

## Autor

Desenvolvido por [Lucas Martins](https://github.com/lmartins12).
