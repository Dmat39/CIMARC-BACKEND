const express = require('express');
const routes = require('./router');
//<<<<<<< HEAD

//const db = require('./config/db.js');
//=======
const bodyParser = require('body-parser');
//>>>>>>> main

// crear el servidor
const app = express();

// Configuracion y Modelos BD
const db = require('./config/db.js');
      require('./Models/Casos.js');
      require('./Models/Usuario.js');
      db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error)); 

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));      
// Rutas de la app
app.use('/', routes());


// Puerto
const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});









//  OTRA OPCION 
// // Definir una función asincrónica para la conexión a la base de datos
// const conectarBD = async () => {
//   try {
//     await db.authenticate();
//     db.sync()
//     console.log('Conexión Correcta a la BD');
//   } catch (error) {
//     console.log(error);
//   }
// };

// // Llamar a la función asincrónica para conectar a la base de datos
// conectarBD();