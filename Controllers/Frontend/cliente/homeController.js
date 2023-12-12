const DocClientes = require('../../../Models/DocClientes');

exports.homeCliente = async (req,res) =>{
    const DocumentAll = await DocClientes.findAll({
        where: {userid: req.user.id}
    })

    res.render('cliente/home',{
        isHome: false,
        isCliente:true,
        isJobs: false,
        isAdmin: false,
        isFooter: false,
        DocumentAll:DocumentAll
});
}
exports.SubirDocumentosCliente =async (req,res) =>{
    const userid=req.user.id;
    res.render('cliente/SubirDocumentos',{
        isHome: false,
        isCliente:true,
        isJobs: false,
        isAdmin: false,
        isFooter: false,
        userid:userid
});
}


