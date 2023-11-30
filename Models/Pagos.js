const { DataTypes } = require("sequelize");
const db = require('../config/db.js');

const DocClientes= db.define('Pagos',{

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    DatosTrabajador: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Cargo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Fecha:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    Monto: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
    
});

module.exports = DocClientes;