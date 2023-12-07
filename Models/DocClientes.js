const { DataTypes } = require("sequelize");
const db = require('../config/db.js');
const Usuario = require('./Usuario.js');

const DocClientes= db.define('docclientes',{

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulodocumento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty : {
                msg: 'Agregar un Titulo '
            }
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty : {
                msg: 'Agregue una descripción'
            }
        }
    },
    fecha:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        validate: {
            notEmpty : {
                msg: 'Agregar una fecha '
            }
        }
    },
    formato: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
});

// // Definir la relación entre Usuario y Documentos
Usuario.hasMany(DocClientes, { foreignKey: 'userid' });
DocClientes.belongsTo(Usuario, { foreignKey: 'userid' });


module.exports = DocClientes;