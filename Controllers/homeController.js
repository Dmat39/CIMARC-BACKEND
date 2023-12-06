

exports.home = async(req,res) =>{
    res.render('layout',{
        nombrePagina:'Inicio'
    })
}