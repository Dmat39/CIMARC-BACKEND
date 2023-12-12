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

exports.about = (req,res) =>{
    res.render('about',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: true
    })
}