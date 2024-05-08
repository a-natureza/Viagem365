const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const Usuario = require("./Usuario");
require('dotenv').config();

const Destino = connection.define('destino', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    nome_local: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    localidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: -90,
            max: 90
        }
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: -180,
            max: 180
        }
    }
})

// RELACIONAMENTO COM O MODELO USUARIO
Destino.belongsTo(Usuario, { foreignKey: 'usuario_id' })
Usuario.hasMany(Destino, {
    foreignKey: 'usuario_id',
    onDelete: 'RESTRICT' // Impede a deleção de um usuário que tenha destinos associados
})

// Destino.associate = models => {
//     Destino.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
//   };

//   return Destino

module.exports = Destino