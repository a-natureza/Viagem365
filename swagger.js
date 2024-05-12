const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Minha API',
    description: 'API para gerenciamento de usuários e destinos'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'authorization', // name of the header, query parameter or cookie
      description: 'Token de Autenticação'
    }
  }
}

const outputFile = './src/routes/swagger.json'
const endpointsFiles = ['./src/server.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
