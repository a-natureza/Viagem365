const { Router } = require("express");
const axios = require('axios');
const DestinoController = require('../controllers/DestinoController');

const destinoRoutes = new Router()

// Rota para adicionar um novo destino
destinoRoutes.post('/', DestinoController.cadastrar)


// Rota para listar todos os destinos
destinoRoutes.get('/', DestinoController.listar)

// Rota para atualizar um destino
destinoRoutes.put('/:id', DestinoController.atualizar)

// Rota para deletar um destino
destinoRoutes.delete('/:id', DestinoController.deletar) 
// Rota para listar os destinos de um usuário
destinoRoutes.get('/usuario/:id', DestinoController.listarPorUsuario)

module.exports = destinoRoutes 