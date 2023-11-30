const Noticias = require('../Models/Noticias');

exports.crearNoticias = async (req, res, next) => {
    const noticias = new Noticias(req.body);
    try {
        //almacenar un registro
        await noticias.save();
        res.json({mensaje: 'Se agrego un nuevo Noticias'});
    } catch (error) {
        //si hay un error
        res.send(error);
        next();
    }
};

