//<<<<<<< Updated upstream
//=======

//>>>>>>> Stashed changes
const doccliente = require('../Models/DocClientes.js');
const multer = require('multer');
const shortid = require('shortid');

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

exports.agregardoccliente = async (req, res,next) => {
    const Doccliente = new doccliente(req.body);

    try{
        //almacenar registro
        await Doccliente.save();
        res.json({ mensaje: 'Se agrego un nuevo documento'})

    }catch(error){
        console.log(error);
        next()
    }
};
//<<<<<<< Updated upstream
  
//=======
//>>>>>>> Stashed changes
