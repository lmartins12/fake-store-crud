# FAQ

## Por que utilizar PrimeNG?

PrimeNG acelera a entrega de componentes complexos (tabela com paginação, diálogos, toast). A customização via SCSS BEM e tokens garante identidade visual consistente.

## Por que adotar NgRx nesta escala?

Embora o escopo inicial seja pequeno, NgRx oferece previsibilidade, facilita auditoria (Store Devtools) e demonstra domínio de arquitetura reativa escalável.

## Como rodar testes rapidamente?

Use `npm test` para execução única ou `npm run test:watch` para ciclo contínuo. O Jest é configurado com `jest-preset-angular`, garantindo setup adequado para Angular 17.

## Como os temas são persistidos?

O `ThemeService` injeta dinamicamente o arquivo de estilo do PrimeNG e salva a escolha do usuário em `localStorage`, garantindo experiência consistente entre sessões.
