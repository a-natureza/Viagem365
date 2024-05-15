# Viagem365

![Node.js](https://img.shields.io/badge/node-%3E%3D12.18.3-brightgreen)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%3E%3D12-brightgreen)
![Express.js](https://img.shields.io/badge/Express.js-v4.17.1-informational)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

## Sobre o Projeto

**Viagem365** é uma plataforma projetada para promover turismo sustentável, permitindo que os usuários explorem, descubram, e compartilhem experiências sobre destinos turísticos, praias, atrações naturais e atividades recreativas. A plataforma serve como um recurso valioso para aqueles que buscam aventuras sustentáveis e experiências autênticas ao redor do mundo.

### Problema que Resolve

O Viagem365 endereça a necessidade crescente de turismo responsável, fornecendo informações detalhadas sobre práticas sustentáveis e destinos que suportam a preservação ambiental. Ajudando os usuários a fazer escolhas conscientes, contribui para a redução do impacto ambiental associado ao turismo.

### Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

- **Node.js**: Plataforma de desenvolvimento para o backend. [Documentação](https://nodejs.org/)
- **Express**: Framework para aplicação web para Node.js. [Documentação](https://expressjs.com/)
- **PostgreSQL**: Sistema de banco de dados relacional. [Documentação](https://www.postgresql.org/docs/)
- **Sequelize**: ORM de Node.js para Postgres, MySQL, MariaDB, SQLite e Microsoft SQL Server. [Documentação](https://sequelize.org/docs/v6/core-concepts/model-basics/)
- **JWT (JSON Web Tokens)**: Utilizado para a autenticação de usuários.
- **Bcrypt.js**: Biblioteca para hashing de senhas.
- **dotenv**: Módulo para carregar variáveis de ambiente.
- **Trello**: Ferramenta Kanban para organização das tarefas antes de começar a desenvolver.

## Criar o repositório:

1. `npm install node`
2. `npm init -y`
3. `npm install --save sequelize`
4. `npm install --save-dev sequelize-cli`
5. `npm install --save express`
6. `npm install --save pg`
7. `npm install --save cors`
8. `npm install --save dotenv`
9. `npm install --save pg connection-string`
10. |-- .env_example .env
11. `cp .env_example .env`
12. `npx sequelize-cli migration:generate --name criar_tabela_usuarios`
13. `npx sequelize-cli migration:generate --name criar_tabela_destinos`
14. `npx sequelize-cli init`
15. `npm install --save-dev nodemon dotenv`
16. `npm install bcryptjs`
17. `npm install jsonwebtoken`
18. `npm install axios`
19. `npm install yup`
20. `npm install express-validator`

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

## Criando o primeiro Seed

`npx sequelize-cli seed:generate --name usuarios`

### Rodando Seeds

`npx sequelize-cli db:seed:all`

### Reverter Seed

1. Reverter o último seed: `npx sequelize-cli db:seed:undo`
2. Reverter um seed específico: `npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`
3. Reverter todos os seeds: `npx sequelize-cli db:seed:undo:all`

## Swagger

A documentação da API é realizada através do Swagger, facilitando o entendimento e teste dos endpoints disponíveis.

### Instalar o Swagger UI

`npm install swagger-ui-express`

### Instalar o Swagger AutoGen para gerar o documento Swagger de forma automática

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

**Passo 6: Executar o Servidor**
Após executar o swagger executar o servidor: `npm run start:dev`

#### Acessando a Documentação Swagger

Para acessar a documentação da API, após iniciar o servidor, visite: `localhost:3000/docs`

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

## GitFlow

Abordagem GitFlow para o desenvolvimento, com branches principais e secundárias organizadas da seguinte maneira:

- Main (produção)
- Develop (desenvolvimento)

**Comandos típicos**

- `git checkout develop`
- `git merge feature/branch_name`
- `git push origin develop`

**Branchs Utilizadas**

- develop
- feature/src
- feature/modelagem-dados
- rotas
- rota_destino
- auth

# Propostas de Melhorias para Viagem365

Viagem365 se dedica a promover o turismo sustentável. Para continuar aprimorando nossa plataforma e enriquecer a experiência do usuário, propomos as seguintes melhorias:

## Interface do Usuário

- **Design Responsivo**: Otimizar a plataforma para dispositivos móveis.
- **Interface Multilíngue**: Adicionar suporte para vários idiomas para atrair um público global.

## Funcionalidades de Comunidade

- **Fóruns de Discussão**: Criar espaços para usuários discutirem e compartilharem experiências.
- **Sistema de Recompensas**: Implementar recompensas para usuários que contribuem ativamente na plataforma.

## Ferramentas de Personalização

- **Recomendações Personalizadas**: Desenvolver algoritmos para sugerir destinos e atividades baseados nas preferências dos usuários.
- **Itinerários Personalizáveis**: Permitir que os usuários criem e compartilhem seus próprios itinerários de viagem.

## Integrações e Parcerias

- **Reservas e Check-ins**: Integrar funcionalidades de reserva de hotéis, voos e atrações diretamente na plataforma.
- **Parcerias com Organizações Locais**: Estabelecer colaborações para promover experiências autênticas e sustentáveis.

## Segurança e Privacidade

- **Autenticação de Dois Fatores (2FA)**: Adicionar uma camada extra de segurança para as contas dos usuários.
- **Controles de Privacidade**: Aumentar o controle dos usuários sobre suas informações pessoais compartilhadas.

## Análises e Relatórios

- **Dashboards de Analytics**: Desenvolver painéis para visualizar estatísticas de uso e impactos ambientais.
- **Relatórios de Sustentabilidade**: Oferecer insights sobre como as viagens estão alinhadas com práticas sustentáveis.

## Marketing e Engajamento

- **Campanhas de Conscientização**: Promover educação sobre turismo sustentável dentro da plataforma.
- **Engajamento Social**: Facilitar o compartilhamento de conteúdo nas redes sociais para aumentar a visibilidade.

Estas melhorias visam não só enriquecer a funcionalidade e a usabilidade de Viagem365, mas também fortalecer nosso compromisso com o turismo responsável e sustentável.
