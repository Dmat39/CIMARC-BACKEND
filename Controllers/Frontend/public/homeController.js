const Noticias = require('../../../Models/Noticias');

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
        isFooter: true
    })
}

exports.NoticiasVista= async (req,res) =>{
    const noticias= await Noticias.findAll()
    
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