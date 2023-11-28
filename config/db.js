const Sequelize = require('sequelize');
require('dotenv').config({path:'.env'});
// CONEXION DE BD
module.exports = new Sequelize(process.env.BD_NOMBRE,process.env.DB_USER,process.env.DB_PASS,{
    host: process.env.BD_HOST,
    port: 3307,
    dialect: 'mysql',
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