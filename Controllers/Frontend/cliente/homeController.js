exports.homeCliente = (req,res) =>{
    res.render('cliente/home',{
        isHome: false,
        isCliente:true,
        isJobs: false,
        isAdmin: false,
});
}
