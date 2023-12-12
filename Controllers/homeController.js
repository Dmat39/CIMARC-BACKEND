exports.home = (req,res) =>{
    res.render('home',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
});
}
exports.service = (req,res) =>{
    res.render('service',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}
exports.serviceConciliacion = (req,res) =>{
    res.render('service-conciliacion',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}

exports.ServiceArbitraje = (req,res) =>{
    res.render('service-arbitraje',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}

exports.Contactos = (req,res) =>{
    res.render('contacto',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}

exports.NoticiasVista= (req,res) =>{
    res.render('noticias',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}

