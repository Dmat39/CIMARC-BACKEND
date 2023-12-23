const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const bcrypt = require('bcrypt');

const Usuario = db.define('user', {  
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userid: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            isUserValid: function (value, next) {
                // Aquí podrías agregar lógica personalizada para validar el usuario si es necesario
                // Ejemplo: Verificar si el usuario cumple con ciertos criterios
                if (value.length < 5) {
                    return next('El usuario debe tener al menos 5 caracteres');
                }
                // Otros criterios de validación...
                // Si pasa todas las validaciones, llama a next() sin argumentos
                return next();
            },
            isUnique: function (value, next) {
                var self = this;
                Usuario.findOne({ where: { userid: value } })
                    .then(function (usuario) {
                        if (usuario && self.id !== usuario.id) {
                            return next('El usuario está repetido!!!');
                        }
                        return next();
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        }
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
         validate:{
             isEmail:{msg: 'Agrega un correo valido'},
             isUnique: function(value,next){
                var self = this;
                Usuario.findOne({where: {email: value}})
                     .then(function(usuario){
                        if(usuario && self.id !== usuario.id){
                           return next('El Email esta repetido!!!');
                       }
                    return next();
                 })
                   .catch(function(err){
                         return next(err);
                    }); 
             }
         }
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La contraseña no puede ir vacía'
            },
            len: {
                args: [8, 60], // Mínimo 8 caracteres, máximo 60
                msg: 'La contraseña debe tener entre 8 y 60 caracteres'
            }
        }
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Identity: {
        type: DataTypes.STRING,
        defaultValue: '0',
        validate: {
            isAlphanumeric: {
                msg: 'La identidad debe contener solo números y/o letras'
            },
            len: {
                args: [1, 15],
                msg: 'La identidad debe tener entre 1 y 15 caracteres'
            }
        }
    },
    telf: {
        type: DataTypes.STRING(15),
        defaultValue: '0',
        validate: {
            isNumeric: {
                msg: 'El número de teléfono solo puede contener dígitos'
            },
            len: {
                args: [1, 15], 
                msg: 'El número de teléfono debe tener como máximo 15 caracteres'
            }
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'trabajador', 'cliente'),
        allowNull: false,
        defaultValue: 'cliente',
        validate: {
            isIn: {
                args: [['admin', 'trabajador', 'cliente']],
                msg: 'Rol no válido'
            }
        }
    },
    activo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tokenPassword: DataTypes.STRING,
    expiraToken: DataTypes.DATE
},
{
    hooks: {
        // Método para ocultar los password
        beforeCreate(usuario) {
            usuario.password = Usuario.prototype.hashPassword(usuario.password);
        }
    }
});

// Método para comparar los password
Usuario.prototype.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

Usuario.prototype.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuario;
