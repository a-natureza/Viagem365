const { connection } = require("../database/connection");
const { DataTypes } = require("sequelize");
const { hash } = require('bcryptjs');

const Usuario = connection.define('usuarios', {
nome: {
    type: DataTypes.STRING,
    allowNull: false
    },
data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
},    
sexo: {
    type: DataTypes.STRING,
    allowNull: false
},
cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true,
    validate: {
        isNumeric: true,
        len: [11, 11]
    }
},
cep: {
    type: DataTypes.INTEGER,
    allowNull: false 
    },
endereco: {
    type: DataTypes.STRING,
    allowNull: false
},
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
},
password: {
    type: DataTypes.STRING,
    allowNull: false
}
})

// HOOK PARA HASH DA SENHA ANTES DE SALVAR
Usuario.beforeSave(async (usuario) => {
    if (usuario.changed('password')) {
        usuario.password = await hash(usuario.password, 8)
        return usuario
    }
   
})

module.exports = Usuario