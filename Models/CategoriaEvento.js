const {DataTypes} = require('sequelize');
const db = require('../config/db.js');


const CategoriaEvento =  db.define('eventoCat',{
   
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    }

})

// // Definir la relación entre Usuario y Casos


module.exports = CategoriaEvento;
