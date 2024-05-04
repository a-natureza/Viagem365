const { Sequelize, DataTypes } = require("sequelize");
const Usuario = require("./Usuario");

const Destino = Sequelize.define('Destino', {
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
Destino.belongsTo(Usuario, { foreignKey: 'usuarioId' })
Usuario.hasMany(Destino, {
    foreignKey: 'usuarioId',
    onDelete: 'RESTRICT' // Impede a deleção de um usuário que tenha destinos associados
})

module.exports = Destino