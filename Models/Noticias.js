const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Noticias =  db.define('Noticias',{
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
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull : false,
        validate: {
            notEmpty :{
                msg: 'Agrega una fecha para la noticia '
            }
        }
    },
    categoria:{
        type: DataTypes.TEXT,
        allowNull : false,
    },
    imagen:{
        type:DataTypes.STRING(100)
    }


});

module.exports = Noticias;