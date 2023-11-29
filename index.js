const express = require('express');
const routes = require('./router');
const docClienteController = require('./router/DocClienteRoutes.js');
const db = require('./config/db.js');

// crear el servidor
const app = express();

// Definir una función asincrónica para la conexión a la base de datos
const conectarBD = async () => {
  try {
    await db.authenticate();
    console.log('Conexión Correcta a la BD');
  } catch (error) {
    console.log(error);
  }
};

// Llamar a la función asincrónica para conectar a la base de datos
conectarBD();

// Rutas de la app
app.use('/auth', routes());
app.use('/subir-documetos', docClienteController);
app.use('/documetos', docClienteController);

// Puerto
const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
