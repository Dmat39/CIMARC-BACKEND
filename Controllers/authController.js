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
// Revisa si el usuario esta auntenticado o no
exports.usuarioAutenticado = async (req, res, next) => {
    // Si el usuario está autenticado, adelante
    if (req.isAuthenticated()) {
        // Verificar el rol del usuario
        const rolUsuario = req.user.role; // Suponiendo que el rol se encuentra en el objeto de usuario

        // Definir las rutas permitidas para cada rol
        const rutasPermitidas = {

            'admin': ['/admin/home', '/admin/register','/admin/blog','/admin/blog/blogRegister','/admin/mantenimientoUsu','/admin/noticiaRegister','/admin/noticias/editar/','/admin/noticias','/admin/noticias/register','/admin/eventoRegister','/admin/eventos','/admin/eventos/register','/admin/eventos/editar','/cerrar-sesion'],
            'admin': ['/admin/home', '/admin/register','/admin/blog','/admin/blog/editar/','/admin/blog/blogRegister','/admin/mantenimientoUsu','/admin/noticiaRegister','/admin/noticias/editar/','/admin/noticias','/admin/noticias/register','/admin/eventoRegister','/admin/eventos','/admin/eventos/register','/cerrar-sesion'],
            'trabajador': ['/trabajador/home','/trabajador/pagoRegister','/cerrar-sesion'],
            'cliente': ['/cliente/home','/cerrar-sesion','/cliente/AddDocument']
        };
        const rutaActual = req.path;
        const rutaBaseEditarNoticias = '/admin/noticias/editar/';
        const rutaBaseEditarBlog = '/admin/blog/editar/';
                    
        
        if (rolUsuario === 'admin' && rutaActual.startsWith(rutaBaseEditarBlog)) {

            return next();
        }

        if (rolUsuario === 'admin' && rutaActual.startsWith(rutaBaseEditarBlog)) {
            return next();
        }
        if (rolUsuario === 'admin' && rutaActual.startsWith(rutaBaseEditarNoticias)) {

            return next();
        }
        // Verificar si la ruta actual está permitida para el rol del usuario
        if (rutasPermitidas[rolUsuario] && rutasPermitidas[rolUsuario].includes(req.path)) {
            return next();
        } else {
            // Si no está permitido, redirigir a la interfaz correspondiente
            return res.redirect(obtenerRutaPorRol(rolUsuario));
        }

    
    };
    // Si no está autenticado, redirigir a la página de inicio de sesión
    return res.redirect('/iniciar-sesion');

}
// Función auxiliar para obtener la ruta correspondiente a un rol
function obtenerRutaPorRol(rol) {
    const rutasPorRol = {
        'admin': '/admin/home',
        'trabajador': '/trabajador/home',
        'cliente': '/cliente/home'
    };
    return rutasPorRol[rol] || '/'; // Si el rol no está definido, redirigir a la página principal
}

// Cerrar sesion
exports.cerrarSesion = (req,res,next) =>{
    req.logout(req.user, err =>{
        if(err) return next(err)
    });
    req.flash('correcto', 'Cerrar sesion correctamente');
    res.redirect('/iniciar-sesion');
    next();
}
