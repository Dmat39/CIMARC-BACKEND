const Usuario = require('../Models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.formIniciarSesion = (req,res) =>{
    res.render('iniciar-sesion',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: false,
        isFooter: false
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
        // Almacenar mensaje de error en la sesión
        req.session.errorMessage = obtenerMensajesError(error);
        
        // Redirigir a la vista de registro
        res.redirect('/admin/register');
    }
};

function obtenerMensajesError(error) {
    if (error.errors) {
        return error.errors.map(err => err.message);
    } else {
        return [error.message];
    }
}

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
        const updateObj = {};

        // Verificar si la contraseña se proporciona y cifrarla
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateObj.password = hashedPassword;
        }

        // Incluir otros campos que pueden actualizarse
        updateObj.name = req.body.name;
        updateObj.Identity = req.body.Identity;
        updateObj.telf = req.body.telf;
        updateObj.activo = req.body.activo;
        updateObj.role = req.body.role;

        // Intentar realizar la actualización
        await usuario.update(updateObj);

        // Redireccionar después de la actualización
        res.redirect('/admin/mantenimientoUsu');
    } catch (error) {
        // Manejar la excepción de validación
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            res.status(400).send(`Error de validación: ${validationErrors.join(', ')}`);
        } else {
            console.error(error);
            res.status(500).send('Hubo un error');
        }
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
        res.redirect('/admin/mantenimientoUsu');
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