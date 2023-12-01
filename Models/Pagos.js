const { DataTypes } = require("sequelize");
const db = require('../config/db.js');
const Usuario = require('./Usuario.js');

const Pagos= db.define('Pagos',{

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
// // Definir la relación entre Usuario y Casos
Usuario.hasMany(Pagos, { foreignKey: 'userid' });
Pagos.belongsTo(Usuario, { foreignKey: 'userid' });

module.exports = Pagos;