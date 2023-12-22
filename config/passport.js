const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;
const Usuarios = require('../Models/Usuario');

passport.use(new LocalStrategy({
    usernameField :'userid',
    passwordField :'password'
    },
    async(userid,password,next) =>{
        // codigo se ejecuta al llenar el formulario
        const usuario = await Usuarios.findOne({ where: {userid, activo: 1}});

        // revisars si existe o no
        if(!usuario) return next(null,false,{
            message: 'Ese usuario no existe'
        });
        // El usuario existe, comparar su password
        const verificarPass = usuario.validarPassword(password);
        // si el password se incorrecto
        if(!verificarPass) return next(null,false,{
            message:'Password Incorrecto'
        });

        // Todo BIEN
        return next(null, usuario);
    }

))

passport.serializeUser(function(usuario,cb){
    cb(null, usuario);
});
passport.deserializeUser(function(usuario,cb){
    cb(null, usuario);
});

module.exports = passport;
