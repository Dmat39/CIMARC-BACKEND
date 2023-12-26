const {exit}=require('node:process')
const categoriaE =require('./categoriaEvento.js')
const CategoriaE = require('../Models/CategoriaEvento.js');
const db = require('../config/db.js');

const importarDatos=async()=>{
    try{
        //autenticar
        await db.authenticate()

        //genererar
        await db.sync()

        //insertamos datos
        await CategoriaE.bulkCreate(categoriaE)
        console.log('Datos importados correctamente')
        exit(0)

    }catch(error){
        console.log(error)
        exit(1)

    }

}

const eliminarDatos=async()=>{
    try {
        await db.sync({force: true})
        console.log('Datos Eliminados Correctamente');
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }

}



if(process.argv[2]=="-i"){
    importarDatos();
}

if(process.argv[2] === "-e") {
    eliminarDatos();
}