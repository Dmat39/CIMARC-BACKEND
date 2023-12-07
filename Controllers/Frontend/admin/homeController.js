exports.homeAdmin = (req,res) =>{
    res.render('admin/home',{
        isHome: false
});
}

exports.register = (req,res) =>{
    res.render('admin/register',{
        isHome: false
});
}
