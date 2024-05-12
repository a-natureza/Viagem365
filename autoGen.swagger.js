const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Viagem365",
    description: "API para gerenciamento de usuários e destinos - Uma plataforma que visa promover viagens sustentáveis e experiências positivas para os usuários, fornecendo acesso a informações sobre destinos turísticos, praias, atrações naturais e atividades recreativas.",
    version: "1.0.0"
  },
  host: 'localhost:3000',
  security: [{"apiKeyAuth": []}],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Token de Autenticação'
    }
  },
  apis: ['./controllers/*.js'],
};

const outputFile = './src/routes/doc.swagger.json';
const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);