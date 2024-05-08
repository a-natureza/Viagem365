const express = require('express') 
require('dotenv').config()
const cors = require('cors')
const { connection } = require('./database/connection') 
const routes = require('./routes/routes')

console.log('SECRET_JWT:', process.env.SECRET_JWT)
// const loginRoutes = require('./routes/login.route')

// const app = express()

// app.use(express.json())
// app.use('/login', loginRoutes)

const PORT_API = process.env.PORT_API || 3000

class Server {
    constructor (server = express())
    { 
      this.middlewares(server) 
      this.database()  
      server.use(routes)
      this.initializeServer(server) 
  
    }
  
    async middlewares(app) {
      app.use(cors()) 
      app.use(express.json())
    }
    // async routes(app) {
    //   app.use(routes)
    // }
  
    async database() {
      try {
        await connection.authenticate()
        console.log('Conexão bem sucedida!')
      } catch (error) {
        console.error('Não foi possível conectar no banco de dados.', error)
        throw error
      }
    }
  
    async initializeServer(app) {
      app.listen(PORT_API, () => console.log(`Servidor executando na porta ${PORT_API}`)) 
    }
}
  
module.exports = { Server }