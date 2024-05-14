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
            /*  
    #swagger.tags = ['Autenticação']
    #swagger.description = 'Endpoint para autenticar um usuário e retornar um token JWT.'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        description: 'Dados de acesso do usuário',
        schema: {
            $email: 'email@dominio.com',
            $password: 'senha123'
        }
    }
    #swagger.responses[200] = {
        description: 'Autenticação bem-sucedida. Token JWT retornado.',
        schema: {
            Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        }
    }
    #swagger.responses[400] = {
        description: 'Dados inválidos fornecidos pelo usuário. Pode ser email ou senha faltando.',
        schema: [
            { message: 'O email é obrigatório' },
            { message: 'A senha é obrigatória' },
            { message: 'Nenhum usuário corresponde ao email fornecido!' }
        ]
    }
    #swagger.responses[403] = {
        description: 'Credenciais inválidas - senha incorreta.',
        schema: { mensagem: 'Usuário não encontrado' }
    }
    #swagger.responses[500] = {
        description: 'Erro interno do servidor.',
        schema: { error: 'Detalhes do erro', message: 'Algo deu errado!' }
    }
*/

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
                return res.status(403).json({mensagem: 'Senha Incorreta'})
            }
            const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome }
            const token = sign(payload, process.env.SECRET_JWT, { expiresIn: '1d'})

            return res.json({ Token: token })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: error.message, message: 'Algo deu errado!' })
        }
    }
}

module.exports = new LoginController()