const Usuario = require('../Models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.formIniciarSesion = (req,res) =>{
    res.render('iniciar-sesion',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
    });
}
exports.crearUsuario = async (req, res, next) => {
    const usuarios = new Usuario(req.body);
    try {
        //almacenar un registro
        await usuarios.save();
        req.session.successMessage = 'El usuario se creó correctamente.';

        res.redirect('/admin/mantenimientoUsu');
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

// exports.autenticarUsuario = async (req, res, next) => {
//     try {
//         // Buscar el usuario
//         const { email, password } = req.body;
//         const usuario = await Usuario.findOne({ where: { email } });

//         if (!usuario) {
//             // Si el usuario no existe
//             return res.status(401).json({ mensaje: 'Ese usuario no existe' });
//         }

//         // Verificar si la contraseña es correcta
//         const contrasenaCorrecta = await bcrypt.compare(password, usuario.password);

//         if (!contrasenaCorrecta) {
//             // Si la contraseña es incorrecta
//             return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
//         }

//         // Contraseña correcta, firma el token
//         const token = jwt.sign(
//             {
//                 email: usuario.email,
//                 usuario: usuario.nombre,
//                 _id: usuario.id,
//             },
//             process.env.JWT_SECRET || 'LLAVESECRETA',
//             {
//                 expiresIn: '1h',
//             }
//         );

//         // Retornar el TOKEN
//         return res.json({ token });
//     } catch (error) {
//         console.error('Error en autenticarUsuario:', error);
//         return res.status(500).json({ mensaje: 'Error interno del servidor' });
//     }
// };