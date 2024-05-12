const { Router } = require("express");
// const axios = require('axios');
const DestinoController = require('../controllers/DestinoController');
const { auth } = require('../middleware/auth')

const destinoRoutes = new Router()

// Rota para adicionar um novo destino
destinoRoutes.post('/', DestinoController.cadastrar)

// Rota para listar todos os destinos de um usuário autenticado
destinoRoutes.get('/', auth, DestinoController.listar)

// Rota para atualizar um destino
destinoRoutes.get('/:id', auth, DestinoController.listarUm)

// Rota para atualizar um destino
destinoRoutes.put('/:id', auth, DestinoController.atualizar)

// Rota para deletar um destino
destinoRoutes.delete('/:id', auth, DestinoController.deletar) 


module.exports = destinoRoutes 