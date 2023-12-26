const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const routes= require('./router');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('./config/passport');

// Configuracion y Modelos BD
const db = require('./config/db.js');
      require('./Models/DocClientes.js');
      require('./Models/Casos.js');
      require('./Models/Usuario.js');
      require('./Models/CategoriaEvento.js');
      require('./Models/Eventos.js');
      require('./Models/Blogs.js');
      require('./Models/Noticias.js');
      require('./Models/Pagos.js');
      db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error)); 

// crear el servidor
const app = express();

// Configuración para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// crear la session
app.use(session({
secret: 'tu_secreto',
resave: false,
saveUninitialized: true
}));
// Agrega flash messages
app.use(flash());
app.use((req,res,next)=>{
  res.locals.mensajes = req.flash();
  const fecha = new Date();
  res.locals.year = fecha.getFullYear();
  next();
})


// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));      

// Habilitar EJS como template  engine
app.use(expressLayouts);
app.set('view engine','ejs');

// Ubicacion vistas
app.set('views', path.join(__dirname,'./views'));

// archivos staticos
app.use(express.static('public'));

// habilitar cookie parser
app.use(cookieParser());

// inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de la app
app.use('/', routes());

// Puerto
const puerto = 5000;
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});








