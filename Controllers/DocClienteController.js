const doccliente = require('../Models/DocClientes.js');
const Usuario = require('../Models/Usuario');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs').promises;
const path = require('path'); // Importar el módulo path


const configuracionMulter = {
    limits: { fileSize: 100000 },  // límite de tamaño en bytes
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname + '../../uploads/documentocliente');
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

const upload = multer(configuracionMulter).single('formato');  // Cambiado a 'formato' en lugar de 'documentos'

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

exports.agregardoccliente = async (req, res,next) => {
    const Doccliente = new doccliente(req.body);

    try{
        //verificar si se ha subido un docmuento 
        if( req.file && req.file.filename){
            Doccliente.formato=req.file.filename;
        }
        //almacenar registro
        await Doccliente.save();
        res.json({ mensaje: 'Se agrego un nuevo documento'})

    }catch(error){
        console.log(error);
        next()
    }
};

// Mostrar Documento
exports.mostrardoccliente = async(req,res,next) =>{
    
    try {
        // obtener todos los casos
        const docCliente = await doccliente.findAll({});
        res.json(docCliente);
    } catch (error) {
        console.log(error);
        next();
    }

}

// Mostrar Documento del cliente por Id
exports.mostrardocclienteID = async(req,res,next)=>{
    const docCliente = await doccliente.findByPk(req.params.idDocCliente);

    if(!docCliente) {
        res.json({mensaje : 'Este Documento no existe'});
        return next();
    }

     // Mostrar  el documento
    res.json(docCliente);
}


//actualizar un docmuento via Id

exports.actualizardoc=async (req,res,next)=> {

    try{
        //construir nuevo documento
        let nuevodoc=req.body;

        // verificar si hay un archivo nuevo
        if (req.file && req.file.filename) {
            nuevodoc.formato = req.file.filename;

            //obtener el documento anterior para borrar el archivo antiguo 
            let docAnterior = await doccliente.findByPk(req.params.idDocCliente);
            if(docAnterior.formato){

                //construir la ruta completa al archivo antiguo
                const rutaArchivoAntiguo = path.join(__dirname, `../uploads/documentocliente/${docAnterior.formato}`);

                // Borrar el archivo antiguo
                await fs.unlink(rutaArchivoAntiguo);

            }
        }
        else{

             // Obtener el documento anterior para mantener el nombre del documento
             let casoAnterior = await doccliente.findByPk(req.params.idDocCliente);
             nuevodoc.formato = casoAnterior.formato;

        }

        // Actualizar el documento en la base de datos y obtener el número de filas afectadas
        const [numFilasActualizadas] = await doccliente.update(nuevodoc, {
            where: { id: req.params.idDocCliente },
        });

        // verificar si se actualizo con exito
        if (numFilasActualizadas > 0) {
            // Obtener el documento actualizado después de la actualización
            const docActualizado = await doccliente.findByPk(req.params.idDocCliente);

            // Enviar la respuesta JSON con el documneto actualizado
            res.json(docActualizado);
        } else {
            // Si numFilasActualizadas es 0, significa que el documento no fue encontrado o no se actualizó correctamente
            console.log('No se actualizaron filas.');
            return res.status(404).json({ mensaje: 'Documento no encontrado' });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//mostrar  todo los documentos por usuario
exports.encontrarDocByUser = async (req, res, next) => {
    try {
        const Userid  = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
           res.status(404).json({ mensaje: 'Usuario no encontrado' });
           return next();
        }
        const docCliente = await doccliente.findAll({
            where: { userid: req.params.userid },
        });
        res.json(docCliente);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


//mostrar documento por userid y docid
exports.buscarDocByUser = async (req,res,next) =>{
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(req.params.userid);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        // Verificar si el documento existe para este usuario
        const documento = await doccliente.findOne({
            where: {
                id: req.params.idDocCliente,
                userid: req.params.userid,
            },
        });
        if (!documento) {
            return res.status(404).json({ mensaje: 'Documento no encontrado para este usuario' });
        }
        
        res.json(documento);

    } catch (error) {
        console.error(error);
        next(error);
    }
}

// actualizar documento por userid y casoid
exports.actualizarDocIdByUser = async (req, res, next) => {
    try {
        const Userid = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const documento = await doccliente.findOne({
            where: {
                id: req.params.idDocCliente, // Suponiendo que tienes un parámetro para identificar el docuemnto
                userid: req.params.userid,
            },
        });

        if (!documento ) {
            return res.status(404).json({ mensaje: 'Caso no encontrado para este usuario' });
        }
    // Construir un nuevo documento
    let nuevoDoc = req.body;

    // Verificar si hay un archivo nuevo
    if (req.file && req.file.filename) {
        nuevoDoc.formato = req.file.filename;

        // Obtener el documento anterior para borrar el archivo antiguo
        let docAnterior = await Casos.findByPk(req.params.idCasos);
        if (docAnterior.formato) {
            // Construir la ruta completa al archivo antiguo
            const rutaArchivoAntiguo = path.join(__dirname, `../uploads/documentocliente/${docAnterior.formato}`);

            // Borrar el archivo antiguo
            await fs.unlink(rutaArchivoAntiguo);
        }
    } else {
        // Obtener el documento anterior para mantener el nombre del documento
        let docAnterior = await doccliente.findByPk(req.params.idDocCliente);
        nuevoDoc.formato = docAnterior.formato;
    }

    // Actualizar el documento en la base de datos y obtener el número de filas afectadas
    const [numFilasActualizadas] = await doccliente.update(nuevoDoc, {
        where: { id: req.params.idDocCliente, userid: req.params.userid },
    });

    // Verificar si se actualizó con éxito
    if (numFilasActualizadas > 0) {
        // Obtener el documento actualizado después de la actualización
        const docActualizado = await doccliente.findByPk(req.params.idDocCliente);

        // Enviar la respuesta JSON con el documento actualizado
        res.json(docActualizado);
    } else {
        // Si numFilasActualizadas es 0, significa que el documento no fue encontrado o no se actualizó correctamente
        console.log('No se actualizaron filas.');
        return res.status(404).json({ mensaje: 'Documento no encontrado' });
    }
    
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//eliminar documento por userid y docid
exports.eliminarDocIdByUser = async(req,res,next) => {
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(req.params.userid);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Verificar si el documento existe para este usuario
        const documento = await doccliente.findOne({
            where: {
                id: req.params.idDocCliente,
                userid: req.params.userid,
            },
        });

        if (!documento) {
            return res.status(404).json({ mensaje: 'Documento no encontrado para este usuario' });
        }

        // Verificar y eliminar el archivo asociado al documento (si existe)
        if (documento.formato) {
            const rutaArchivo = path.join(__dirname, `../uploads/documentocliente/${documento.formato}`);
            await fs.unlink(rutaArchivo);
        }

        // Eliminar el caso de la base de datos
        await doccliente.destroy({
            where: {
                id: req.params.idDocCliente,
                userid: req.params.userid,
            },
        });

        // Enviar respuesta JSON indicando que el caso ha sido eliminado correctamente
        res.json({ mensaje: 'Caso eliminado correctamente' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

//elimnar docmuento por id
exports.eliminardocCliente = async (req, res, next) => {
    try {
        const eliminarDocumento = await doccliente.findByPk(req.params.idDocCliente);

        if (!eliminarDocumento) {
            return res.status(404).json({ mensaje: 'Documento no encontrado' });
        }

        // Borrar el formato asociado al documento si existe
        if (eliminarDocumento.formato) {
             const rutaArchivo = path.join(__dirname, `../uploads/documentocliente/${elimarDocCliente.idDocCliente}` );
            await fs.unlink(rutaArchivo);
         }

         // Eliminar el docuemnto de la base de datos
         await eliminarDocumento.destroy();
  
        //console.log('Ruta del archivo a eliminar:', rutaArchivo); verificar la ruta
        res.json({ mensaje: 'Documento eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};






  
