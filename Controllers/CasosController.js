const Casos = require('../Models/Casos');
const Usuario = require('../Models/Usuario');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs').promises;
const path = require('path'); // Importar el módulo path


const configuracionMulter = {
    limits: { fileSize: 100000 },  // límite de tamaño en bytes
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname + '../../uploads/casos');
        },
        filename: (req, file, next) => {
            const extension = file.originalname.split('.').pop();  // obtener la extensión del archivo original
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter: (req, file, next) => {
        const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (allowedFileTypes.includes(file.mimetype)) {
            // el formato es válido
            next(null, true);
        } else {
            // el formato no es válido
            next(new Error('Formato no válido'), false);
        }
    }
};

const upload = multer(configuracionMulter).single('documentos');  // Cambiado a 'documentos' en lugar de 'imagen'

// sube archivo en el servidor
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El Archivo es muy grande');
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

// Agregar Casos
exports.nuevoCaso = async(req,res,next) =>{
    const casos = new Casos(req.body);

    try{
         // Verificar si se ha subido un documento
        if( req.file && req.file.filename){
            casos.documentos = req.file.filename;
        }
        //almacenar un registro
        await casos.save();
        res.json({mensaje: 'Se agrego un nuevo caso'});
    }catch(error){
        //si hay un error
        res.send(error);
        next();
    }

}

// Mostrar casos
exports.mostrarCasos = async(req,res,next) =>{
    
    try {
        // obtener todos los casos
        const casos = await Casos.findAll({});
        res.json(casos);
    } catch (error) {
        console.log(error);
        next();
    }

}

// Mostrar Casos por ID
 exports.mostrarCasosID = async(req,res,next)=>{
    const casos = await Casos.findByPk(req.params.idCasos);

     if(!casos) {
         res.json({mensaje : 'Ese Caso no existe'});
         return next();
     }

     // Mostrar  el caso
     res.json(casos);
 }

 // Actualizar un Caso via id 
 exports.actualizarCaso = async (req, res, next) => {
    try {
        // Construir un nuevo caso
        let nuevoCaso = req.body;

        // Verificar si hay un archivo nuevo
        if (req.file && req.file.filename) {
            nuevoCaso.documentos = req.file.filename;

            // Obtener el caso anterior para borrar el archivo antiguo
            let casoAnterior = await Casos.findByPk(req.params.idCasos);
            if (casoAnterior.documentos) {
                // Construir la ruta completa al archivo antiguo
                const rutaArchivoAntiguo = path.join(__dirname, `../uploads/casos/${casoAnterior.documentos}`);

                // Borrar el archivo antiguo
                await fs.unlink(rutaArchivoAntiguo);
            }
        } else {
            // Obtener el caso anterior para mantener el nombre del documento
            let casoAnterior = await Casos.findByPk(req.params.idCasos);
            nuevoCaso.documentos = casoAnterior.documentos;
        }

        // Actualizar el caso en la base de datos y obtener el número de filas afectadas
        const [numFilasActualizadas] = await Casos.update(nuevoCaso, {
            where: { id: req.params.idCasos },
        });

        // Verificar si se actualizó con éxito
        if (numFilasActualizadas > 0) {
            // Obtener el caso actualizado después de la actualización
            const casoActualizado = await Casos.findByPk(req.params.idCasos);

            // Enviar la respuesta JSON con el caso actualizado
            res.json(casoActualizado);
        } else {
            // Si numFilasActualizadas es 0, significa que el caso no fue encontrado o no se actualizó correctamente
            console.log('No se actualizaron filas.');
            return res.status(404).json({ mensaje: 'Caso no encontrado' });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};
//mostrar  todo los casos por usuario
exports.encontrarCasosByUser = async (req, res, next) => {
    try {
        const Userid  = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            next();
        }
        const casos = await Casos.findAll({
            where: { userid: req.params.userid },
        });
        res.json(casos);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.eliminarCasos = async (req, res, next) => {
    try {
        const casoAEliminar = await Casos.findByPk(req.params.idCasos);

        if (!casoAEliminar) {
            return res.status(404).json({ mensaje: 'Caso no encontrado' });
        }

        // Borrar el archivo asociado al caso si existe
        if (casoAEliminar.documentos) {
             const rutaArchivo = path.join(__dirname, `../uploads/casos/${casoAEliminar.documentos}` );
            await fs.unlink(rutaArchivo);
         }

         // Eliminar el caso de la base de datos
         await casoAEliminar.destroy();
  
        //console.log('Ruta del archivo a eliminar:', rutaArchivo); verificar la ruta
        res.json({ mensaje: 'Caso eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
