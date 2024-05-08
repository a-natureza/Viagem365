const { Router } = require("express");
const loginController = require('../controllers/loginController');
const { check, validationResult } = require("express-validator");

const loginRoutes = new Router()

loginRoutes.post("/", 
    [
        check('email', 'Por favor, insira um email válido').isEmail(),
        check('password', 'A senha é obrigatória').notEmpty()
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    },
    loginController.login
)

module.exports = loginRoutes
