const Usuario = require('../Models/Usuario');

exports.crearUsuario = async (req, res, next) => {
    const usuarios = new Usuario(req.body);
    try {
        //almacenar un registro
        await usuarios.save();
        res.json({mensaje: 'Se agrego un nuevo usuario'});
    } catch (error) {
        //si hay un error
        res.send(error);
        next();
    }
};


exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

// Mostrar Usuario por ID
exports.mostrarUsuarioID = async(req,res,next)=>{
    const usuarios = await Usuario.findByPk(req.params.idUsu);

     if(!usuarios) {
         res.json({mensaje : 'Ese Usuario no existe'});
         return next();
     }

     // Mostrar  el caso
     res.json(usuarios);
 }

exports.actualizarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            res.status(404).send('Usuario no encontrado');
            return;
        }
        usuario = await Usuario.update(req.body, {
            where: { id: req.params.id }
        });
        res.send(usuario);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            res.status(404).send('Usuario no encontrado');
            return;
        }
        await Usuario.destroy({
            where: { id: req.params.id }
        });
        res.send({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};