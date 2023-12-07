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
        if (pagos.length === 0) {
            res.status(404).send('No hay datos disponibles');
        } else {
            res.send(pagos);
        }    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

// Mostrar casos
exports.mostrarPagos = async(req,res,next) =>{
    
    try {
        // obtener todos los casos
        const pagos = await Pagos.findAll({});
        res.json(pagos);
    } catch (error) {
        console.log(error);
        next();
    }

}

 // Actualizar un Caso via id 
exports.actualizarPago = async (req, res) => {
    try {
        console.log('Entrando en la función actualizarPago');

        let pago = await Pagos.findByPk(req.params.idPagos);
        if (!pago) {
            res.status(404).send('Pago no encontrado');
            return;
        }

        console.log('Pago encontrado:', pago);

        let pagoActualizado = await Pagos.update(req.body, {
            where: { id: req.params.idPagos }
        });

        console.log('Resultado de la actualización:', pagoActualizado);

        pagoActualizado = await Pagos.findByPk(req.params.id);
        res.send(pagoActualizado);
    } catch (error) {
        console.error('Error en actualizarPago:', error);
        res.status(500).send(`Hubo un error: ${error.message}`);
    }
};

exports.eliminarPagos = async (req, res, next) => {
    try {
        const pagoAEliminar = await Pagos.findByPk(req.params.idPagos);

        if (!pagoAEliminar) {
            return res.status(404).json({ mensaje: 'Pago no encontrado' });
        }

        // Eliminar el pago de la base de datos
        await pagoAEliminar.destroy();
        res.json({ mensaje: 'Pago eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Mostrar Pago por ID
exports.mostrarPagosID = async (req, res, next) => {
    try {
        const pago = await Pagos.findByPk(req.params.idPagos);

        if (!pago) {
            res.json({ mensaje: 'Ese Pago no existe' });
            return next();
        }

        // Mostrar el pago
        res.json(pago);
    } catch (error) {
        console.error(error);
        next(error);
    }
};