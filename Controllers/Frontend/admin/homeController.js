const Usuario = require('../../../Models/Usuario'); // Importa tu modelo de usuario si lo tienes
const Evento=require('../../../Models/Eventos'); 
const Noticias=require('../../../Models/Noticias'); 
const blog=require('../../../Models/Blogs');
exports.homeAdmin = (req,res) =>{
    res.render('admin/home',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false
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
        isFooter: false,
        successMessage
});
}

exports.blogRegister = (req,res) =>{
    res.render('admin/blog/blogRegister',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false,
});
}

exports.blogHome = async (req,res) =>{
    const blogs = await blog.findAll() //Obtener todo los usuarios en la tabla
    res.render('admin/blog/home',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false,
        blogs
});
}

exports.Noticias = async (req,res) =>{
    const successMessage = req.session.successMessage;
    const noticias = await Noticias.findAll() //Obtener todo los usuarios en la tabla
    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
    res.render('admin/noticias/home',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        noticias,
        successMessage,
        isFooter: false

});
}

exports.noticiaRegister = (req,res) =>{
    const successMessage = req.session.successMessage;

    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
    res.render('admin/noticias/noticiaRegister',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        successMessage,
        isFooter: false

});
}

exports.Eventos = async (req,res) =>{

try {
    // Obtener usuarios desde la base de datos
    const eventos = await Evento.findAll() //Obtener todo los usuarios en la tabla
// Obtener el mensaje de la sesión si existe
const successMessage = req.session.successMessage;

// Limpiar el mensaje para que no se muestre más de una vez
delete req.session.successMessage;
    res.render('admin/evento/home', {
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false,
        eventos: eventos,
        successMessage// Pasar la lista de usuarios a la vista
    });
} catch (error) {
    // Manejar el error apropiadamente
    res.status(500).send('Error obteniendo usuarios');
}
}

exports.eventoRegister = (req,res) =>{


    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
    res.render('admin/evento/eventoRegister',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false

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
            isFooter: false,
            usuarios: usuarios,
            successMessage// Pasar la lista de usuarios a la vista
        });
    } catch (error) {
        // Manejar el error apropiadamente
        res.status(500).send('Error obteniendo usuarios');
    }
}