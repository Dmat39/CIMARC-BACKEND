// Noticias.js
const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Usuario = require('./Usuario.js');

const Noticias = db.define('Noticias', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Agregar un Titulo'
            }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Agrega una fecha para la noticia '
            }
        }
    },
    categoria: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            // Parsea la cadena JSON almacenada en la base de datos
            return JSON.parse(this.getDataValue('categoria'));
        },
        set(value) {
            // Convierte el valor a cadena JSON antes de almacenarlo
            this.setDataValue('categoria', JSON.stringify(value));
        }
    },
    imagen: {
        type: DataTypes.STRING(100)
    }
});

Usuario.hasMany(Noticias, { foreignKey: 'userid' });
Noticias.belongsTo(Usuario, { foreignKey: 'userid' });

module.exports = Noticias;
