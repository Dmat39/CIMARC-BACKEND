const Noticias = require('../Models/Noticias');
const Usuario = require('../Models/Usuario');
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
exports.obtenerNoticias = async (req, res) => {
    try {
        const noticias = await Noticias.findAll();
        if (noticias.length === 0) {
            res.status(404).send('No hay datos disponibles');
        } else {
            res.send(noticias);
        }    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

exports.mostrarNoticiasID = async (req, res, next) => {
    const noticias = await Noticias.findById(req.params.idNoticias);
    if (!noticias) {
        res.json({mensaje: 'Ese Noticias no existe'});
        next();
    }
    //mostrar el cliente
    res.json(noticias);
}

exports.actualizarNoticias = async (req, res, next) => {
    try {
        let noticias = await Noticias.findByPk(req.params.idNoticias);
        if (!noticias) {
            res.status(404).send('Noticia no encontrado');
            return;
        }

        console.log('Noticia encontrado:', noticias);

        let NoticiaActualizado = await Noticias.update(req.body, {
            where: { id: req.params.idNoticias }
        });

        console.log('Resultado de la actualización:', NoticiaActualizado);

        NoticiaActualizado = await Noticias.findByPk(req.params.idNoticias);
        res.send(NoticiaActualizado);
    } catch (error) {
        console.error('Error en actualizarNoticia:', error);
        res.status(500).send(`Hubo un error: ${error.message}`);
    }
};

exports.eliminarNoticias = async (req, res, next) => {
    try {
        const noticias = await Noticias.findByPk(req.params.idNoticias);

        if (!noticias) {
            return res.status(404).json({ mensaje: 'Pago no encontrado' });
        }

        // Eliminar el pago de la base de datos
        await noticias.destroy();
        res.json({ mensaje: 'Pago eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//mostrar  todo los casos por usuario
exports.encontrarNoticiasByUser = async (req, res, next) => {
    try {
        const Userid  = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            next();
        }
        const noticias = await Noticias.findAll({
            where: { userid: req.params.userid },
        });
        res.json(noticias);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.buscarNoticiaByIdByUser = async (req,res,next) =>{
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(req.params.userid);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        // Verificar si el caso existe para este usuario
        const noticias = await Noticias.findOne({
            where: {
                id: req.params.idNoticias,
                userid: req.params.userid,
            },
        });
        if (!noticias) {
            return res.status(404).json({ mensaje: 'Noticia no encontrado para este usuario' });
        }
        
        res.json(noticias);

    } catch (error) {
        console.error(error);
        next(error);
    }
}