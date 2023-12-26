const {DataTypes} = require('sequelize');
const db = require('../config/db.js');
const Usuario = require('./Usuario.js');

const CategoriaEvento =  db.define('eventoCat',{
   
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

})

// // Definir la relación entre Usuario y Casos
 Usuario.hasMany(CategoriaEvento, { foreignKey: 'userid' });
 CategoriaEvento.belongsTo(Usuario, { foreignKey: 'userid' });

module.exports = CategoriaEvento;
