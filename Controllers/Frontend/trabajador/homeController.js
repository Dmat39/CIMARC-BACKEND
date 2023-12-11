exports.homeTrabajador = (req,res) =>{
    res.render('trabajador/home',{
        isHome: false,
        isCliente: false,
        isJobs: true,
        isAdmin: false,
});
}

exports.pagoRegister = (req,res) =>{
    res.render('trabajador/pagoRegister',{
        isHome: false,
        isCliente: false,
        isJobs: true,
        isAdmin: false,
});
}

