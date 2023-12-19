const Noticias = require('../../../Models/Noticias');
const usuarios = require('../../../Models/Usuario');
exports.home = (req,res) =>{
    res.render('public/home',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
});
}
exports.service = (req,res) =>{
    res.render('public/service',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}
exports.serviceConciliacion = (req,res) =>{
    res.render('public/service-conciliacion',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}

exports.ServiceArbitraje = (req,res) =>{
    res.render('public/service-arbitraje',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}

exports.Contactos = (req,res) =>{
    res.render('public/contacto',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true,
        mensajeEnviado: false 
    })
}

exports.NoticiasVista= async (req,res) =>{
    const noticias = await Noticias.findAll({ include: usuarios }); // Asegúrate de incluir la relación con la tabla de usuarios
    res.render('public/noticias',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true,
        noticias: noticias,
    })
}

exports.About = (req,res) =>{
    res.render('public/about',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}
exports.Blogs = (req,res) =>{
    res.render('public/blogs',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}
exports.home6 = (req,res) =>{
    res.render('public/home6',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}

exports.noticiaDetail = async (req, res) => {
    // Obtener el ID de la noticia desde los parámetros de la URL
    const noticiaId = req.params.id;
    const noticia = await Noticias.findByPk(noticiaId, {
        include: usuarios,
      });    // Lógica para obtener los detalles de la noticia con el ID proporcionado
    // Esta lógica dependerá de cómo recuperas los datos de la noticia en tu aplicación

    // Renderizar la vista de detalle de la noticia (por ejemplo, 'detalleNoticia.ejs')
    res.render('public/noticia-detail', {     isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true,
        noticia }); // Pasar el ID de la noticia a la vista
}