const { Router } = require('express');
const usuarioRoutes = require('./usuarios.route')
const loginRoutes = require('./login.route');
const destinoRoutes = require('./destinos.route');

const routes = new Router()

// Rota de teste
routes.get('/', (req, res) => res.send('Hello World!'))

// Rotas de usuários
routes.use('/usuarios', usuarioRoutes)

// Rota de login
routes.use('/login', loginRoutes)

// Rotas de destino
routes.use('/destinos', destinoRoutes)

// Exportando as rotas

module.exports = routes
