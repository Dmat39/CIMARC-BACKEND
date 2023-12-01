const Sequelize = require('sequelize');
require('dotenv').config({path:'.env'});
// CONEXION DE BD
const db = new Sequelize('cimarc_node','root','123456', {
    host: 'localhost',  // Cambia esto según la ubicación de tu servidor MySQL
    dialect: 'mysql',
    port: 3306,  // Puerto de MySQL
    define:{
        timestamps: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
  });

module.exports = db;