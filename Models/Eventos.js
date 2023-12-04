const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Usuario = require('./Usuario.js');


const Eventos =  db.define('Eventos',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty : {
                msg: 'Agregar un Titulo'
            }
        }
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    ponentes:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull : false,
        validate: {
            notEmpty :{
                msg: 'Agrega una fecha para el evento '
            }
        }
    },
    categoria:{
        type: DataTypes.TEXT,
        allowNull : false,
    },
    documentos:{
        type: DataTypes.TEXT,
        allowNull : true,
    },
    ubicacion:{
        type: DataTypes.TEXT,
        allowNull : false,
    },
});

// // Definir la relación entre Usuario y Eventos
Usuario.hasMany(Eventos, { foreignKey: 'userid' });
Eventos.belongsTo(Usuario, { foreignKey: 'userid' });

module.exports = Eventos;