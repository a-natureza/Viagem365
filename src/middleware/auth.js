const { config } = require('dotenv')
const { verify } = require('jsonwebtoken')
config()

async function auth(req, res, next) {
    try {
        const { authorization } = req.headers
        req['payload'] = verify(authorization, process.env.SECRET_JWT)
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: 'Autenticação falhou!',
            cause: error.message
        })
    }
}

module.exports = { auth }