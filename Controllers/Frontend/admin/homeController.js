exports.homeAdmin = (req,res) =>{
    res.render('admin/home',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
});
}

exports.register = (req,res) =>{
    res.render('admin/register',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
});
}

exports.blogRegister = (req,res) =>{
    res.render('admin/blogRegister',{
        isHome: false
});
}
