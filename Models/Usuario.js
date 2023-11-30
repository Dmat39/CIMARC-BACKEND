const {DataTypes} = require('sequelize');
const db = require('../config/db.js');
const bcrypt = require('bcrypt');

const Usuario = db.define('user',{  
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: {
                msg: 'El nombre de usuario solo puede contener letras y números'
            }
        }
    },
    email:{
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
    password:{
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
    activo:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tokenPassword : DataTypes.STRING,
    expiraToken : DataTypes.DATE
},{
    hooks:{
        //Metodo para ocultar los password
        beforeCreate(usuario){
            usuario.password = Usuario.prototype.hashPassword(usuario.password);
        }
    }
});

// Metodo para comprar los password
Usuario.prototype.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
Usuario.prototype.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuario;