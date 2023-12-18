const nodemailer = require('nodemailer');
const fs = require('fs');
const util = require('util');
const ejs = require('ejs');
require('dotenv').config({path:'.env'});

exports.emailContacto = async(req,res,next) =>{
    
    const { name, subject ,email, messsage} = req.body;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    // Configuracion del correo
    const mailOptions = {
        from: 'Cimarc <Cristhian@cimarc.com>',
        to: email,
        subject:`Solicitud de contacto de ${subject}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${messsage}`
    };

    // Enviar el correo
    transport.sendMail(mailOptions,(error,info) =>{
        if(error){
            return console.log(error);
        }
        console.log('Correo enviado:', info.response);
        res.redirect('/contactos');
        // Renderizar la vista con mensajeEnviado configurado como verdadero
    })
}