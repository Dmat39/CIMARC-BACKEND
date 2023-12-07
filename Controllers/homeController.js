exports.home = (req,res) =>{
    res.render('home',{
        isHome: true,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
});
}
