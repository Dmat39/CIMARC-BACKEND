const express = require('express');
const routes= require('./router');

// Conexion a la base de datos
const db = require('./config/db.js');
      db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error)); 

// crear el servidor
const app = express();

// Rutas de la app
app.use('/', routes());

//Puerto
app.listen(5000);