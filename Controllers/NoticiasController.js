const Noticias = require('../Models/Noticias');
const Usuario = require('../Models/Usuario');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs').promises;
const path = require('path'); // Importar el módulo path
const { nuevoCaso } = require('./CasosController');

const configuracionMulter = {
    limits: { fileSize: 100000 },  // límite de tamaño en bytes
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname + '../../uploads/imagenes'); // Change the destination folder to 'uploads/imagenes'
        },
        filename: (req, file, next) => {
            const extension = file.originalname.split('.').pop();  // obtener la extensión del archivo original
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter: (req, file, next) => {
        const allowedImageTypes = ['image/jpeg', 'image/png']; // Update the allowed image MIME types

        if (allowedImageTypes.includes(file.mimetype)) {
            // el formato es válido
            next(null, true);
        } else {
            // el formato no es válido
            next(new Error('Formato de imagen no válido'), false);
        }
    }
};

const upload = multer(configuracionMulter).single('imagen');  // Use 'imagen' as the field name for image uploads

// sube archivo en el servidor
exports.subirImagen = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'La imagen es muy grande');
                } else {
                    req.flash('error', error.message);
                }
            } else if (error.hasOwnProperty('message')) {
                req.flash('error', error.message);
            }
            res.redirect('back');
            return;
            // TODO: Manejar errores
        } else {
            next();
        }
    });
};


exports.crearNoticias = async (req, res, next) => {
    const noticias = new Noticias(req.body);
    try {
        // Verificar si se ha subido un documento
        if( req.file && req.file.filename){
            noticias.imagen = req.file.filename;
        }
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
    const noticias = await Noticias.findByPk(req.params.idNoticias);
    if (!noticias) {
        res.json({mensaje: 'Ese Noticias no existe'});
        return next();
    }
    //mostrar el cliente
    res.json(noticias);
}

exports.actualizarNoticias = async (req, res, next) => {
    try {
        //Contruir un nuevo caso
        let nuevoNoticia = req.body;

        // Verificar si hay un imagen nuevo 
        if(req.file && req.file.filename){
            nuevoNoticia.imagen = req.file.filename;

            // Obtener el caso anterior para borrar la imagen antigua
            let noticiaAnterior = await Noticias.findByPk(req.params.idNoticias);
            if(noticiaAnterior.imagen){
                // Construir la ruta completa al imagen antigua
                const rutaImagenAntiguo = path.join(__dirname,`../uploads/imagenes/${noticiaAnterior.imagen}`);
                
                // Borrar el imagen antiguo
                await fs.unlink(rutaImagenAntiguo);
            }
        }else{
            // Obtener la noticia anterior para mantener el nombre de la imagen
            let imagenAnterior = await Noticias.findByPk(req.params.idNoticias);
            nuevoNoticia.imagen = imagenAnterior.imagen;
        }
        // Actualizar la imagen en la BD y obtener el numero de fila
        const [numFilasActualizadas] = await Noticias.update(nuevoNoticia,{
            where: { id: req.params.idNoticias},
        })

        // Verificar si se actualizo con exito
        if (numFilasActualizadas > 0){
            // Obtener la noticia actualizado despues de la actualizacion
            const NoticiaActualizada = await Noticias.findByPk(req.params.idNoticias);
            
            // Enviar la respueta JSON con la noticia actualizado
            res.json(NoticiaActualizada);
        }else{
            // Si numFilasActualizadas es 0, significa que el noticia no fue encontrado
            console.log('No se actualizaron filas.');
            return res.status(404).json({ mensaje: 'Noticia no encontrado' });
        }
      
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.eliminarNoticias = async (req, res, next) => {
    try {
        const noticias = await Noticias.findByPk(req.params.idNoticias);

        if (!noticias) {
            return res.status(404).json({ mensaje: 'Pago no encontrado' });
        }

        // Borrar el archivo asociado al caso si existe
        if (noticias.imagen) {
            const rutaArchivo = path.join(__dirname, `../uploads/imagenes/${noticias.imagen}` );
           await fs.unlink(rutaArchivo);
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
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
            return next();
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