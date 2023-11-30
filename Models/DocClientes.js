const { DataTypes } = require("sequelize");
const db = require('../config/db.js');

const DocClientes= db.define('docclientes',{

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulodocumento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    formato: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
});

module.exports = DocClientes;