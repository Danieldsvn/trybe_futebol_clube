# Trybe Futebol Clube
23º projeto na Trybe. API RESTful em Node.js com arquitetura MSC(model-service-controller) em POO com testes de integração.

## O que é

O Trybe Futebol Clube é um site informativo sobre partidas e classificações de futebol. O Front-End já foi provido. A API contruída possibilita o Front-End renderizar  partidas a classificação dos times. Nesta aplicação, o usuário pode:

1. Filtrar partidas por todas, em andamento e finalizadas.
2. Filtrar a classificação por (Geral*, mandantes e visitantes)

*__O back-end de "Classificação geral" não está implementado.__


## Tecnologias empregadas:

Docker, TypeScript, Node.js, Docker e bibliotecas:
* Sequelize (ORM)
* Express(endpoints)
* Sinon(testes)
* Mocha(testes)
* CHAI(testes)
* jsonwebtoken (validação de token)
* bcrypto (encriptação de senhas)


## Habilidades praticadas

  * Integrar ORM Sequelize com TypesScript

  * Praticar POO

  * Construção de API com a arquitetura em camadas  

  * Construção de API RESTful

  * Rodar a aplicação com Docker

  * Testes de integração com princípio TDD

## O que é de minha autoria:

Os arquivos dos diretórios: 
* `./app/backend/src/controllers`
* `./app/backend/src/database/migrations`
* `./app/backend/src/database/models`
* `./app/backend/src/helpers`
* `./app/backend/src/interfaces`
* `./app/backend/src/middlewares`
* `./app/backend/src/playground`
* `./app/backend/src/services`
* `./app/backend/src/tests`
* `./app/backend/src/validations`
* `./app/backend/src/app.ts`

## Como visualizar com Docker:

Para executar o projeto faça o clone do repositório, entre na pasta do projeto e na raiz do projeto execute o comando `npm run compose:up` no terminal. 
Depois, abra seu navegador Chrome e acesse o endereço http://localhost:3000/

