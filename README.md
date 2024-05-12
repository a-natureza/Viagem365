# Viagem365

## Sobre o Projeto

**Viagem365** é uma plataforma projetada para promover turismo sustentável, permitindo que os usuários explorem, descubram, e compartilhem experiências sobre destinos turísticos, praias, atrações naturais e atividades recreativas. A plataforma serve como um recurso valioso para aqueles que buscam aventuras sustentáveis e experiências autênticas ao redor do mundo.

### Problema que Resolve

O Viagem365 endereça a necessidade crescente de turismo responsável, fornecendo informações detalhadas sobre práticas sustentáveis e destinos que suportam a preservação ambiental. Ajudando os usuários a fazer escolhas conscientes, contribui para a redução do impacto ambiental associado ao turismo.

### Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

- **Node.js**: Plataforma de desenvolvimento para o backend.
- **Express**: Framework para aplicação web para Node.js.
- **PostgreSQL**: Sistema de banco de dados relacional.
- **Sequelize**: ORM de Node.js para Postgres, MySQL, MariaDB, SQLite e Microsoft SQL Server.
- **JWT (JSON Web Tokens)**: Utilizado para a autenticação de usuários.
- **Bcrypt.js**: Biblioteca para hashing de senhas.
- **dotenv**: Módulo para carregar variáveis de ambiente.
- **Trello**: Ferramenta Kanban para organização das tarefas antes de começar a desenvolver. `https://trello.com/b/5FN70UKV/viagem365`

### Como Executar

#### Pré-requisitos

- Node.js instalado.
- PostgreSQL rodando localmente ou em um servidor remoto.

#### Instalação e Execução

## Rodar o repositório:

### Na primeira vez é necessário instalar as dependencias:

1. `npm install`
2. Se for em ambiente local: `npm install --dev`
3. `cp .env_example .env`

### Para rodar o repositório em ambiente local

`npm run start:dev`

## Trabalhando com migrations:

### Criar uma migration

1. `npx sequelize-cli migration:generate --name criar_tabela_usuarios`
2. `npx sequelize-cli migration:generate --name criar_tabela_destinos`

### Rodar uma migration.

`npx sequelize db:migrate`

### Reverter a última migration:

`npx sequelize-cli db:migrate:undo`

## Documentação do Sequelize:

`https://sequelize.org/docs/v6/core-concepts/model-basics/`

## Criando o primeiro Seed

`npx sequelize-cli seed:generate --name demo-user`

### Rodando Seeds

`npx sequelize-cli db:seed:all`

### Reverter Seed

1. Reverter o último seed: `npx sequelize-cli db:seed:undo`
2. Reverter um seed específico: `npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`
3. Reverter todos os seeds: `npx sequelize-cli db:seed:undo:all`

## Swagger

### Instalar o Swagger UI

`npm install swagger-ui-express`

### Instalar o Swagger AutoGen para gerar o documento Swagger de forma automatica

`npm install swagger-autogen`

**Passo 1: Instalação dos Pacotes**
`npm install swagger-autogen swagger-ui-express`

**Passo 2: Configuração do Swagger Autogen**
`autoGen.swagger.js`

**Passo 3: Configurar as Rotas para Usar Swagger**
`./src/routes/routes.js`

**Passo 4: Documentação Específica das Rotas**
`/** #swagger */`

**Passo 5: Executar o Swagger Autogen**
`node swagger`

Isso irá gerar a documentação baseada nas anotações feitas em suas rotas e torná-la acessível em `localhost:3000/docs`

Após executar o swagger executar o servidor: `npm run start:dev`

## Novas Bibliotecas utilizadas:

### instalar o sequelize

`npm install sequelize`

### instalar o driver do PostgreSQL

`npm install pg`

### instalar o CLI do sequelize

`npm install -g sequelize-cli`

### instalar o dotenv

`npm install dotenv`

### instalar o JsonWebToken ( JWT )

`npm install jsonwebtoken`

### instalar o Bcrypt.js para criptografia da senha

`npm install bcrypt.js`

## instalar o axios

`npm install axios`

## instalar o express-async-errors

`npm install express-async-errors`

## instalar o cors

`npm install cors`

## instalar o yup

`npm install yup`

## instalar o express-validator

`npm install express-validator`

## Instalar as dependências necessárias:

1. `npm install node`
2. `npm init -y`
3. `npm install --save sequelize`
4. `npm install --save-dev sequelize-cli`
5. `npm install --save express`
6. `npm install --save pg`
7. `npm install --save cors`
8. `npm install --savedotenv`
9. `npm install --save pg connection-string`
10. |-- .env_example .env
11. `cp .env_example .env`
12. `npx sequelize-cli init`
13. `npx sequelize-cli migration:generate --name criar_tabela_destinos`
14. `npx sequelize-cli migration:generate --name criar_tabela_usuarios`
15. `npm install --save-dev nodemon dotenv`

## Branch de Produção

main

## Branch de Desenvolvimento

develop

## GitFlow

- git add .
- git pull origin feature/src
- git pull origin develop
- git checkout develop
- git merge feature/src
- git push origin develop
- git push origin feature/src
- git push origin develop

- git checkout develop
- git merge feature/src
- git push origin develop

**Branchs Utilizadas**

- develop
- feature/src
- feature/modelagem-dados
- rotas
- rota_destino
- auth
