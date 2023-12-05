const express = require('express');
const router = express.Router();
//<<<<<<< Updated upstream
//=======
const db = require('../config/db.js');


//>>>>>>> Stashed changes
const CasosController = require('../Controllers/CasosController.js');
const DocClienteController = require('../Controllers/DocClienteController.js');
const PagosController = require('../Controllers/PagosController.js');
const UsuarioController = require('../Controllers/UsuarioController.js');
const NoticiasController = require('../Controllers/NoticiasController.js');

//<<<<<<< Updated upstream
//=======
// const EventosController=require('../Controllers/EventosController.js')
const BlogsController=require('../Controllers/BlogsController.js');
const Blogs = require('../Models/Blogs.js');

//
//>>>>>>> Stashed changes


module.exports = function () {


    /** METODOS DE PAGOS */
    router.post('/pagos',
        PagosController.CrearPagos
    );
    //Obtener pagos
    router.get('/pagos',

        PagosController.obtenerPagos
    );

    //Metodo par Mostrar Pagos
    router.get('/mostrar-pagos',

        PagosController.mostrarPagos
    );

    // Actualizar Pagos
    router.put('/mostrar-pagos/:idPagos',

        PagosController.actualizarPago,
        PagosController.mostrarPagos
    );
    // Mostrar Pagos por ID
    router.get('/pagos/:idPagos',

        PagosController.mostrarPagosID
    );

    // Eliminar Pagos
    router.delete('/pagos/eliminar/:idPagos',

        PagosController.eliminarPagos
    );

    /**Noticias */
    router.post('/noticias',
        NoticiasController.subirImagen,
        NoticiasController.crearNoticias
    );
    //Obtener noticias
    router.get('/noticias',

        NoticiasController.obtenerNoticias
    );
    //Mostrar Noticias ID
    router.get('/noticias/:idNoticias',

        NoticiasController.mostrarNoticiasID
    );
    //Actualizar Noticias
    router.put('/noticias/:idNoticias',
        NoticiasController.subirImagen,
        NoticiasController.actualizarNoticias
    );
    //Eliminar Noticias
    router.delete('/noticias/:idNoticias',

        NoticiasController.eliminarNoticias
    )

    //Mostrar Noticias por Userid
    router.get('/noticias/user/:userid',
    
        NoticiasController.encontrarNoticiasByUser
    );

    // Mostrar Noticias en especifico por UserID
    router.get('/noticias/:idNoticias/user/:userid',
    
        NoticiasController.buscarNoticiaByIdByUser
    );
    // Actualizar Noticas en especifico por UserID
    router.put('/noticias/:idNoticias/user/:userid',
        NoticiasController.subirImagen,
        NoticiasController.actualizarNoticiaIdByUser
    );

    // Eliminar Noticias en especifico por UserID
    router.delete('/noticias/:idNoticias/user/:userid',
        NoticiasController.eliminarNoticiaIdByUser
    );

    /** USUARIO*/

    router.get('/user-roles',

        UsuarioController.obtenerUsuarios
    );
    router.post('/user-roles',

        UsuarioController.crearUsuario
    )
    router.get('/user-roles/:idUsu',
    
        UsuarioController.mostrarUsuarioID
    )
    router.put('/user-roles/:idUsu',
    
        UsuarioController.actualizarUsuario
    )
    router.delete('/user-roles/:idUsu',
    
        UsuarioController.eliminarUsuario
    )


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
    //Mostrar Casor por Userid
    router.get('/trabajador-casos/user/:userid',
    
        CasosController.encontrarCasosByUser
    );

    // Mostrar Casos en especifico
    router.get('/trabajador-casos/:userid/casos/:idCasos',
    
        CasosController.buscarCasosByUser
    );


    //Actualizar Casos ByUserId and CasoId
    router.put('/trabajador-casos/:userid/casos/:idCasos',
        CasosController.subirArchivo,
        CasosController.actualizarCasoIdByUser
    );

    //Eliminar Casos ByUserId and CasoId
    router.delete('/trabajador-casos/:userid/casos/:idCasos',
        
        CasosController.eliminarCasoIdByUser
    );

    // Actualizar Casos
    router.put('/trabajador-casos/:idCasos',

        CasosController.subirArchivo,
        CasosController.actualizarCaso
    )
    
    /** DOCUMENTO CLIENTE  */
//<<<<<<< Diego

    // Mostrar Documento
    router.get('/documento',

        DocClienteController.mostrardoccliente
    );

    // Agregar Documento
    router.post('/agregar-documento',

        DocClienteController.subirArchivo,
        DocClienteController.agregardoccliente
    );

    //Mostrar Docmuento por Id
    router.get('/documento/:idDocCliente',

        DocClienteController.mostrardocclienteID
    );

    //Mostrar Documento por UsserId
    router.get('/documento/user/:userid',

        DocClienteController.encontrarDocByUser
    );

    //Mostrar Documento en especifico 
    router.get('/documento/user/:userid/doccliente/:idDocCliente',

        DocClienteController.buscarDocByUser
    );

    //actualizar Documento ByUserId y DocumentoId
    router.put('/documento/user/:userid',

        DocClienteController.subirArchivo,
        DocClienteController.actualizarDocIdByUser
    );

    //Eliminar Documentos ByUserId y DocumentoId
    router.delete('/documento/user/:userid/doccliente/:idDocCliente',

        DocClienteController.eliminarDocIdByUser
    );

    //Actualizar Documento
    router.put('/documento/:idDocCliente',

        DocClienteController.subirArchivo,
        DocClienteController.actualizardoc
    )







//=======
//>>>>>>> main

    //agregar 
    router.post('/subir-documentos', 

        DocClienteController.agregardoccliente
    );

    // Eliminar Casos
    router.delete('/trabajador-casos/:idCasos',
    
        CasosController.eliminarCasos
    )

        
//<<<<<<< Updated upstream
//=======

    //  //Eventos//

    // //Metodo par Mostrar Eventos
    // router.get('/mostrar-eventos',
    // EventosController.mostrarEventos
    // );

    // //Agregar Eventos
    // router.post('/eventos',
    // EventosController.subirArchivoEvento,
    // EventosController.nuevoEvento
    // )
    // // Mostrar Eventos por ID
    // router.get('/eventos/:idEventos',
    // EventosController.mostrarEventosID
    // );

    // //Obtener Eventos
    // router.get('/eventos',
    // EventosController.obtenerEventos
    // );


    // // Actualizar Eventos
    // router.put('/mostrar-eventos/:idEventos',
    // EventosController.subirArchivoEvento,
    // EventosController.actualizarEventos
    // );

    // //Mostrar Eventos por Userid
    // router.get('/trabajador-eventos/user/:userid',
    
    // EventosController.encontrarEventosByUser
    // )
    // // Mostrar Eventos en especifico
    // router.get('/trabajador-eventos/:userid/eventos/:idEventos',
    // EventosController.buscarEventosByUser
    // );


    // //Actualizar Eventos ByUserId and EventosId
    // router.put('/trabajador-eventos/:userid/eventos/:idEventos',
    //     EventosController.subirArchivoEvento,
    //     EventosController.actualizarEventoIdByUser
    // );

    // //Eliminar Eventos ByUserId and EventosId
    // router.delete('/trabajador-eventos/:userid/eventos/:idEventos',
    //     EventosController.eliminarEventoIdByUser
    // );

    // // Actualizar Eventos
    // router.put('/trabajador-eventos/:idEventos',
    //     EventosController.subirArchivoEvento,
    //     EventosController.actualizarEventos

    // )


    // // Eliminar Eventos
    // router.delete('/eventos/eliminar/:idEventos',
    // EventosController.eliminarEventos
    // );
    


    /**Blogs*/

     //Agregar Blogs
//<<<<<<< Diego
     /*
//=======
//>>>>>>> main
     router.post('/blogs',
        BlogsController.subirArchivoBlog,
        BlogsController.nuevoBlog
     );
     //Obtener Blogs
      router.get('/blogs',

        BlogsController.mostrarBlog
     );
     // Mostrar Blogs por ID
      router.get('/blogs/:idBlogs',

        BlogsController.mostrarBlogID
     );   
     // Actualizar Blogs
      router.put('/blogs/:idBlogs',
        BlogsController.subirArchivoBlog,
        BlogsController.actualizarBlog,
     );
     // Eliminar Blogs
      router.delete('/blogs/:idBlogs',
        BlogsController.eliminarBlog
    );
     // Mostrar Blogs por ByUserId
      router.get('/blogs/user/:userid',
        
        BlogsController.encontrarBlogByUser
    );
     // Mostrar Blogs por idBlogs y ByUserID
      router.get('/blogs/:idBlogs/user/:userid',

        BlogsController.buscarBlogByUser
    );
     // Actualizar Blogs en especifico por ByUserID
       router.put('/blogs/:idBlogs/user/:userid',
        BlogsController.subirArchivoBlog,
        BlogsController.actualizarBlogIdByUser
    ); 
     // Eliminar Blogs en especifico por ByUserID
        router.delete('/blogs/:idBlogs/user/:userid',
        
        BlogsController.eliminarBlogIdByUser
//<<<<<<< Diego
    );*/
//=======
    );
//>>>>>>> main

    return router;
}