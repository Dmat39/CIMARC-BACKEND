exports.homeTrabajador = (req,res) =>{
    res.render('trabajador/home',{
        isHome: false,
        isCliente: false,
        isJobs: true,
        isAdmin: false,
});
}
