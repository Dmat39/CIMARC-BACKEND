const Pagos = require('../Models/Pagos');

exports.CrearPagos = async (req, res, next) => {
    const pagos = new Pagos(req.body);
    try {
        //almacenar un registro
        await pagos.save();
        res.json({mensaje: 'Se agrego un nuevo pago'});
    } catch (error) {
        //si hay un error
        res.send(error);
        next();
    }
};


exports.obtenerPagos = async (req, res) => {
    try {
        const pagos = await Pagos.findAll();
        res.send(pagos);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

