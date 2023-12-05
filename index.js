const express = require('express');
//<<<<<<< Updated upstream

//<<<<<<< HEAD

//const db = require('./config/db.js');
//=======
const bodyParser = require('body-parser');
//>>>>>>> main
//=======
const routes= require('./router');
const flash = require('connect-flash');
const session = require('express-session');
// Conexion a la base de datos
const db = require('./config/db.js');

      db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error)); 
//>>>>>>> Stashed changes

// crear el servidor
const app = express();

//<<<<<<< Updated upstream
//=======
app.use(flash());

app.use(session({
secret: 'tu_secreto',
resave: true,
saveUninitialized: true
}));

//>>>>>>> Stashed changes
// Configuracion y Modelos BD
      require('./Models/DocClientes.js');
      require('./Models/Casos.js');
      require('./Models/Usuario.js');
      require('./Models/Eventos.js');
      require('./Models/Blogs.js');
      require('./Models/Noticias.js');
      require('./Models/Pagos.js');
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