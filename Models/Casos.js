const {DataTypes} = require('sequelize');
const db = require('../config/db.js');

const Casos =  db.define('casos',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty : {
                msg: 'Agregar un Titulo'
            }
        }
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull : false,
        validate: {
            notEmpty :{
                msg: 'Agrega una fecha para el Caso'
            }
        }
    },
    pago: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    documentos: {
        type: DataTypes.STRING,  // Almacena el contenido del archivo PDF como un Binary Large Object
        allowNull: true  // Puedes cambiar a false si quieres requerir un archivo PDF en cada pago
    }

})

// // Definir la relación entre Usuario y Casos
// Usuario.hasMany(Casos, { foreignKey: 'userId' });
// Casos.belongsTo(Usuario, { foreignKey: 'userId' });

module.exports = Casos;
