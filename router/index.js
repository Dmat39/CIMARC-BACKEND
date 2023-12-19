const express = require('express');
const router = express.Router();
const CasosController = require('../Controllers/CasosController.js');
const DocClienteController = require('../Controllers/DocClienteController.js');
const PagosController = require('../Controllers/PagosController.js');
const UsuarioController = require('../Controllers/UsuarioController.js');
const NoticiasController = require('../Controllers/NoticiasController.js');
const EventosController=require('../Controllers/EventoController.js')
const BlogsController=require('../Controllers/BlogsController.js');
const authController = require('../Controllers/authController.js');
const ClienteHomeController = require('../Controllers/Frontend/cliente/homeController.js'); 
const AdminHomeController = require('../Controllers/Frontend/admin/homeController.js');
const TrabajadorHomeController = require('../Controllers/Frontend/trabajador/homeController.js');
const homeController = require('../Controllers/Frontend/public/homeController.js')
const ControllerContacto = require('../handlers/emails.js');
module.exports = function () {

    
    //**-----------------------Home------------------**/
    router.get('/',homeController.home)

    //** Contacto Us**/
    router.get('/contactos',homeController.Contactos)
    router.post('/enviar', ControllerContacto.emailContacto)
    //** About Us**/
    router.get('/sobre-nosotros',homeController.About)
    //**Noticias */
    router.get('/noticias',homeController.NoticiasVista)
    router.get('/noticias/:id',homeController.noticiaDetail)
    router.get('/home6',homeController.home6)
    /**Service*/
    router.get('/service',homeController.service);
    router.get('/service/conciliacion',homeController.serviceConciliacion);
    router.get('/service/arbitraje',homeController.ServiceArbitraje);

    /**Olvide contraseña */
    router.get('/contrasena',(req,res) => {
        res.render('contrasena',{
            isHome: false,
            isCliente: false,
            isJobs: false,
            isAdmin: false,
            isFooter: false
        });
    })

    //**-----------------------ADMIN------------------**/
    /**HOME*/
    router.get('/admin/home',
        authController.usuarioAutenticado,
        AdminHomeController.homeAdmin
    );
    /**Blog*/
    router.get('/admin/blog/blogRegister',
        authController.usuarioAutenticado,
        AdminHomeController.blogRegister);
    router.get('/admin/blog',
        authController.usuarioAutenticado,
        AdminHomeController.blogHome);
    
    /**Mantenimiento Usuarios */
    router.get('/admin/mantenimientoUsu',
        authController.usuarioAutenticado,
        AdminHomeController.formMantenimientoUsu
    )
    /** Register**/
    router.get('/admin/register',
        authController.usuarioAutenticado,
        AdminHomeController.register
    );

    /**NOTICIA Lista**/
    router.get('/admin/noticiaList',
    authController.usuarioAutenticado,
    // AdminHomeController.noticiaList
    );

    /**NOTICIA**/
     router.get('/admin/noticias/register',
     authController.usuarioAutenticado,
     AdminHomeController.noticiaRegister
     );
     router.get('/admin/noticias/editar/:idNoticias',
     authController.usuarioAutenticado,
     AdminHomeController.NoticiasEditar
     );
     router.get('/admin/noticias',
     authController.usuarioAutenticado,
     AdminHomeController.Noticias
     );
    /**EVENTOS**/
     router.get('/admin/eventos/register',
     authController.usuarioAutenticado,
     AdminHomeController.eventoRegister
     );
     router.get('/admin/eventos/editar',
     authController.usuarioAutenticado,
     AdminHomeController.eventoRegister
     );
     router.get('/admin/eventos',
     authController.usuarioAutenticado,
     AdminHomeController.Eventos
     );



    //**-----------------------Cliente------------------**/
    /**HOME*/
    router.get('/cliente/home',
        authController.usuarioAutenticado,
        ClienteHomeController.homeCliente
    );
    /**Subir Documentos */
    router.get('/cliente/AddDocument',
        authController.usuarioAutenticado,
        ClienteHomeController.SubirDocumentosCliente
    );

    //**-----------------------Trabajador------------------**/
    /**HOME*/
    router.get('/trabajador/home',
        authController.usuarioAutenticado,
        TrabajadorHomeController.homeTrabajador
    );

    router.get('/trabajador/pagoRegister',
        authController.usuarioAutenticado,
        TrabajadorHomeController.pagoRegister
    );











    /**INICIO DE SESION */

    router.get('/iniciar-sesion',UsuarioController.formIniciarSesion);
    
    router.post('/iniciar-sesion', authController.autenticarUsuario);
    // cerrar sesion
    router.get('/cerrar-sesion',
        authController.usuarioAutenticado,
        authController.cerrarSesion
    );






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
    router.post('/updatenoticias/:idNoticias',
        NoticiasController.subirImagen,
        NoticiasController.actualizarNoticias
    );
    //Eliminar Noticias
    router.get('/deletenoticias/:idNoticias',

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


    // Mostrar Documento
    router.get('/documento',

        DocClienteController.mostrardoccliente
    );

    // Agregar Documento
    router.post('/documento',

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
    router.get('/documento/:idDocCliente/user/:userid',

        DocClienteController.buscarDocByUser
    );

    //actualizar Documento ByUserId y DocumentoId
    router.put('/documento/:idDocCliente/user/:userid',

        DocClienteController.subirArchivo,
        DocClienteController.actualizarDocIdByUser
    );

    //Eliminar Documentos ByUserId y DocumentoId
    router.delete('/documento/:idDocCliente/user/:userid',

        DocClienteController.eliminarDocIdByUser
    );

    //Actualizar Documento
    router.put('/documento/:idDocCliente',

        DocClienteController.subirArchivo,
        DocClienteController.actualizardoc
    )

        

    //Eventos//

    //Metodo par Mostrar Eventos
    router.get('/eventos',

        EventosController.mostrarEventos
    );

 

     //Agregar Eventos
     router.post('/eventos',

        EventosController.subirArchivoEvento,
        EventosController.nuevoEvento
     )
     // Mostrar Eventos por ID
     router.get('/eventos/:idEventos',
        EventosController.mostrarEventosID
     );

     // Actualizar Eventos
     router.get('/eventos/editar/:id',
        EventosController.editar
    );

    router.post('/eventos/editar/:id',
    EventosController.subirArchivoEvento,
    EventosController.actualizarEventos
    );





     //Mostrar Eventos por Userid
     router.get('/trabajador-eventos/user/:userid',
        EventosController.encontrarEventosByUser
    );
     // Mostrar Eventos en especifico
     router.get('/trabajador-eventos/:userid/eventos/:idEventos',
        EventosController.buscarEventosByUser
    );


    //Actualizar Eventos ByUserId and EventosId
     router.put('/trabajador-eventos/:userid/eventos/:idEventos',
        EventosController.subirArchivoEvento,
        EventosController.actualizarEventoIdByUser
    );

     //Eliminar Eventos ByUserId and EventosId
     router.delete('/trabajador-eventos/:userid/eventos/:idEventos',
        EventosController.eliminarEventoIdByUser
    );

     // Actualizar Eventos
     router.put('/trabajador-eventos/:idEventos',
        EventosController.subirArchivoEvento,
        EventosController.actualizarEventos
    );


     // Eliminar Eventos
    router.delete('/eventos/eliminar/:idEventos',
        EventosController.eliminarEventos
    );



    /**Blogs*/

     //Agregar Blogs
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

    );

    return router;
}
