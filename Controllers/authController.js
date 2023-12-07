const passport = require('passport');
const Usuario = require('../Models/Usuario'); // Asegúrate de importar correctamente el modelo de Usuario

exports.autenticarUsuario = (req, res, next) => {
    passport.authenticate('local', (err, usuario, info) => {
        if (err) {
            return next(err);
        }

        if (!usuario) {
            // Puedes manejar la lógica de redirección en caso de falla aquí
            return res.redirect('/iniciar-sesion');
        }

        // Define las rutas según el rol del usuario
        let redirectPath = '/';
        if (usuario.role === 'admin') {

            redirectPath = '/admin-interface';
        } else if (usuario.role === 'trabajador') {
            redirectPath = '/trabajador-interface';
        } else if (usuario.role === 'cliente') {
            redirectPath = '/cliente-interface';

            redirectPath = '/admin/home';
        } else if (usuario.role === 'trabajador') {
            redirectPath = '/trabajador/home';
        } else if (usuario.role === 'cliente') {
            redirectPath = '/cliente/home';

        }

        req.logIn(usuario, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect(redirectPath);
        });
    })(req, res, next);

};



