const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");


const usuarioRoutes = new Router()

usuarioRoutes.post('/', UsuarioController.cadastrar)
usuarioRoutes.get("/", UsuarioController.listar)
usuarioRoutes.delete("/:id", UsuarioController.deletar)

module.exports = usuarioRoutes