const { Router } = require('express');
const usuarioRoutes = require('./usuarios.route')
const loginRoutes = require('./login.route');
const destinoRoutes = require('./destinos.route');

const routes = new Router()
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./doc.swagger.json')


// Rota do swagger
routes.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Rotas de usuários
routes.use('/usuario', usuarioRoutes)

// Rota de login
routes.use('/login', loginRoutes)

// Rotas de destino
routes.use('/local', destinoRoutes)

// Exportando as rotas

module.exports = routes
