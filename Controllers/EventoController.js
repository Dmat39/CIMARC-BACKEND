const Eventos = require('../Models/Eventos');
const Usuario = require('../Models/Usuario');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs').promises;
const path = require('path'); // Importar el módulo path


const configuracionMulter = {
    limits: { fileSize: 50000000 },  // límite de tamaño en bytes
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            next(null, path.join(__dirname, '../../uploads/eventos'));
        },
        filename: (req, file, next) => {
            const extension = file.originalname.split('.').pop();  // obtener la extensión del archivo original
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter: (req, file, next) => {
        const allowedFileTypes = ['application/pdf','application/msword','image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

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
exports.subirArchivoEvento = (req, res, next) => {
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
exports.nuevoEvento = async(req,res,next) =>{
    const evento = new Eventos(req.body);

    try{
         // Verificar si se ha subido un documento
        if( req.file && req.file.filename){
            evento.documentos = req.file.filename;
        }
        //almacenar un registro
        await evento.save();
        res.json({mensaje: 'Se agrego un nuevo evento'});
    }catch(error){
        //si hay un error
        res.send(error);
        next();
    }

}
// Mostrar Eventos
exports.mostrarEventos = async(req,res,next) =>{
    
    try {
        // obtener todos los casos
        const evento = await Eventos.findAll({});
        res.json(evento);
    } catch (error) {
        console.log(error);
        next();
    }

}


    // Mostrar Evento por ID
exports.mostrarEventosID = async (req, res, next) => {
    try {
        const eventos = await Eventos.findByPk(req.params.idEventos);

        if (!eventos) {
            res.json({ mensaje: 'El evento no existe' });
            return next();
        }

        // Mostrar el Evento
        res.render('admin/evento/eventoRegister.ejs', {
            datos: eventos,
            isHome: false,
            isCliente: false,
            isJobs: false,
            isAdmin: true,
            isFooter: false
        })

    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.editar = async (req, res) => {

    const { id } = req.params

    // Validar que la propiedad exista
    const eventos = await Eventos.findByPk(id)

    if (!eventos) {
        return res.redirect('/admin/eventos/editar')
    }

    res.render('admin/evento/editarEvento.ejs', {
        datos: eventos,
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false
    })
}

 // Actualizar un Evento via id 
exports.actualizarEventos = async (req, res, next) => {
    try {
        // Construir un nuevo caso
        let nuevoEvento = req.body;

        // Verificar si hay un archivo nuevo
        if (req.file && req.file.filename) {
            nuevoEvento.documentos = req.file.filename;

            // Obtener el caso anterior para borrar el archivo antiguo
            let eventonterior = await Eventos.findByPk(req.params.idEventos);
            if ( eventonterior.documentos) {
                // Construir la ruta completa al archivo antiguo
                const rutaArchivoAntiguo = path.join(__dirname, `../uploads/eventos/${eventonterior.documentos}`);

                // Borrar el archivo antiguo
                await fs.unlink(rutaArchivoAntiguo);
            }
        } else {
            // Obtener el caso anterior para mantener el nombre del documento
            let eventonterior = await Eventos.findByPk(req.params.idEventos);
            nuevoEvento.documentos = eventonterior.documentos;
        }

        // Actualizar el caso en la base de datos y obtener el número de filas afectadas
        const [numFilasActualizadas] = await Eventos.update(nuevoEvento, {
            where: { id: req.params.idEventos },
        });

        // Verificar si se actualizó con éxito
        if (numFilasActualizadas > 0) {
            // Obtener el caso actualizado después de la actualización
            const eventoActualizado = await Eventos.findByPk(req.params.idEventos);

            // Enviar la respuesta JSON con el caso actualizado
            res.json(eventoActualizado);
            
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

exports.encontrarEventosByUser = async (req, res, next) => {
    try {
        const Userid  = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            next();
        }
        const eventos = await Eventos.findAll({
            where: { userid: req.params.userid },
        });
        res.json(eventos);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//mostrar casos por userid y casosid
exports.buscarEventosByUser = async (req,res,next) =>{
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(req.params.userid);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Evento  no encontrado' });
        }
        // Verificar si el caso existe para este usuario
        const evento = await Eventos.findOne({
            where: {
                id: req.params.idEventos,
                userid: req.params.userid,
            },
        });
        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento  no encontrado para este usuario' });
        }
        
        res.json(evento);

    } catch (error) {
        console.error(error);
        next(error);
    }
}

//actualizar casos por userid y casosid
exports.actualizarEventoIdByUser = async (req, res, next) => {
    try {
        const Userid = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const evento = await Eventos.findOne({
            where: {
                id: req.params.idEventos, // Suponiendo que tienes un parámetro para identificar el caso
                userid: req.params.userid,
            },
        });

        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento no encontrado para este usuario' });
        }
    // Construir un nuevo caso
    let nuevoEvento = req.body;

    // Verificar si hay un archivo nuevo
    if (req.file && req.file.filename) {
        nuevoEvento.documentos = req.file.filename;

        // Obtener el caso anterior para borrar el archivo antiguo
        let eventoAnterior = await Eventos.findByPk(req.params.idEventos);
        if (eventoAnterior.documentos) {
            // Construir la ruta completa al archivo antiguo
            const rutaArchivoAntiguo = path.join(__dirname, `../uploads/casos/${eventoAnterior.documentos}`);

            // Borrar el archivo antiguo
            await fs.unlink(rutaArchivoAntiguo);
        }
    } else {
        // Obtener el caso anterior para mantener el nombre del documento
        let eventoAnterior = await Eventos.findByPk(req.params.idEventos);
        nuevoEvento.documentos = eventoAnterior.documentos;
    }

    // Actualizar el caso en la base de datos y obtener el número de filas afectadas
    const [numFilasActualizadas] = await Eventos.update(nuevoEvento, {
        where: { id: req.params.idEventos, userid: req.params.userid },
    });

    // Verificar si se actualizó con éxito
    if (numFilasActualizadas > 0) {
        // Obtener el caso actualizado después de la actualización
        const eventoActualizado = await Eventos.findByPk(req.params.idEventos);

        // Enviar la respuesta JSON con el caso actualizado
        res.json(eventoActualizado);
    } else {
        // Si numFilasActualizadas es 0, significa que el caso no fue encontrado o no se actualizó correctamente
        console.log('No se actualizaron filas.');
        return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
    
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//eliminar casos por userid y casosid
exports.eliminarEventoIdByUser = async(req,res,next) => {
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(req.params.userid);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Verificar si el caso existe para este usuario
        const evento = await Eventos.findOne({
            where: {
                id: req.params.idEventos,
                userid: req.params.userid,
            },
        });

        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento no encontrado para este usuario' });
        }

        // Verificar y eliminar el archivo asociado al caso (si existe)
        if (evento.documentos) {
            const rutaArchivo = path.join(__dirname, `../uploads/eventos/${evento.documentos}`);
            await fs.unlink(rutaArchivo);
        }

        // Eliminar el caso de la base de datos
        await Eventos.destroy({
            where: {
                id: req.params.idEventos,
                userid: req.params.userid,
            },
        });

        // Enviar respuesta JSON indicando que el caso ha sido eliminado correctamente
        res.json({ mensaje: 'Evento eliminado correctamente' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.eliminarEventos = async (req, res, next) => {
    try {
        const eventoAEliminar = await Eventos.findByPk(req.params.idEventos);

        if (!eventoAEliminar) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }

        // Borrar el archivo asociado al caso si existe
        if (eventoAEliminar.documentos) {
            const rutaArchivo = path.join(__dirname, `../uploads/eventos/${eventoAEliminar.documentos}` );
            await fs.unlink(rutaArchivo);
        }

         // Eliminar el caso de la base de datos
        await eventoAEliminar.destroy();

        //console.log('Ruta del archivo a eliminar:', rutaArchivo); verificar la ruta
        res.json({ mensaje: 'Caso eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.obtenerEventos = async (req, res) => {
    try {
        const eventos = await Eventos.findAll();
        if (eventos.length === 0) {
            res.status(404).send('No hay  eventos disponibles');
        } else {
            res.send(eventos);
        }    } catch (error) {
        res.status(500).send('Hubo un error');
    }

};