const express = require('express');
const router = express.Router();
const CasosController = require('../Controllers/CasosController.js');

module.exports = function () {

    /** CASOS */

    //Metodo par Mostrar Casos
    router.get('/trabajador-casos',
    
        CasosController.mostrarCasos
    );

    //Agregar Casos
    router.post('/trabajador-casos',
        
        CasosController.subirArchivo,
        CasosController.nuevoCaso
    );

    //Mostrar Casos por ID
     router.get('/trabajador-casos/:idCasos',
    
         CasosController.mostrarCasosID
    );
    
    // Actualizar Casos
    router.put('/trabajador-casos/:idCasos',

        CasosController.subirArchivo,
        CasosController.actualizarCaso
    )
    
    // Eliminar Casos
    router.delete('/trabajador-casos/:idCasos',
    
        CasosController.eliminarCasos
    )
        
    


    return router;
}