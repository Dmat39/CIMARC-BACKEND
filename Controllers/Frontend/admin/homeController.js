const Usuario = require('../../../Models/Usuario'); // Importa tu modelo de usuario si lo tienes


exports.homeAdmin = (req,res) =>{
    res.render('admin/home',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
});
}

exports.register = (req,res) =>{
    const successMessage = req.session.successMessage;

    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
    res.render('admin/mantenimientoUsuario/register',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        successMessage
});
}

exports.blogRegister = (req,res) =>{
    res.render('admin/blogRegister',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
});
}

exports.noticiaRegister = (req,res) =>{
    res.render('admin/noticiaRegister',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
});
}

exports.formMantenimientoUsu = async (req,res) =>{
    try {
        // Obtener usuarios desde la base de datos
        const usuarios = await Usuario.findAll() //Obtener todo los usuarios en la tabla
    // Obtener el mensaje de la sesión si existe
    const successMessage = req.session.successMessage;

    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
        res.render('admin/mantenimientoUsuario/mantenimientoUsu', {
            isHome: false,
            isCliente: false,
            isJobs: false,
            isAdmin: true,
            usuarios: usuarios,
            successMessage// Pasar la lista de usuarios a la vista
        });
    } catch (error) {
        // Manejar el error apropiadamente
        res.status(500).send('Error obteniendo usuarios');
    }
}