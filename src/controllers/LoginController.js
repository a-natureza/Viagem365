const Usuario = require("../models/Usuario")
const { sign } = require('jsonwebtoken')
const { compare } = require("bcryptjs")
const yup = require('yup')

const loginSchema = yup.object().shape({
    email: yup.string().email('Por favor, insira um email válido').required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatória')
})

class LoginController {
    async login(req, res) {
        try {
            // validação de entrada
            await loginSchema.validate(req.body, { abortEarly: false })
            const email = req.body.email
            const password = req.body.password

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório' })
            }
            if(!password) {
                return res.status(400).json({ message: 'A senha é obrigatória' })
            }
            const usuario = await Usuario.findOne({
                where: {
                    email: email
                }   
            })
            if (!usuario) {
                return res.status(400).json({ message: 'Nenhum usuário corresponde ao email fornecido!' })
            }
           const hashSenha = await compare(password, usuario.password)

            if(!hashSenha) {
                return res.status(403).json({mensagem: 'Usuário não encontrado'})
            }
            const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome }
            const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '1d' })

            return res.json({ Token: token })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: error.message, message: 'Algo deu errado!' })
        }
    }
}

module.exports = new LoginController()