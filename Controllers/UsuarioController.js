const Usuario = require('../Models/Usuario');
const bcrypt = require('bcrypt');

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
        let usuario = await Usuario.findByPk(req.params.idUsu);

        if (!usuario) {
            res.status(404).send('Usuario no encontrado');
            return;
        }

        // Construir un objeto con los campos a actualizar
        const updateObj = {
            email: req.body.email,
        };

        // Verificar si la contraseña se proporciona y cifrarla
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateObj.password = hashedPassword;
        }

        // Actualizar el usuario en la base de datos
        await Usuario.update(updateObj, {
            where: { id: req.params.idUsu }
        });

        // Recuperar el usuario actualizado
        usuario = await Usuario.findByPk(req.params.idUsu);

        res.send(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findByPk(req.params.idUsu);
        if (!usuario) {
            res.status(404).send('Usuario no encontrado');
            return;
        }
        await Usuario.destroy({
            where: { id: req.params.idUsu }
        });
        res.send({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};