'use strict'

const {DataTypes} =require('sequelize');


module.exports = (sequelize) =>{
    const attributes ={
        prestamos_id:{
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        usuario_id:{
            type:DataTypes.INTEGER, 
        },
        libro_id:{
            type:DataTypes.INTEGER, 
        },
        fecha_prestamo:{
            type:DataTypes.DATE
        },
        fecha_vencimiento:{
            type:DataTypes.DATE
        },
        fecha_devolucion:{
            type:DataTypes.DATE
        },
        estado:{
            type:DataTypes.ENUM
        }
    };
    const options ={
        defaultScope:{
            attributes:{excludes: ['createdAt',
                'updatedAt']}
        },
        scopes: {},
        tableName:'prestamos',
        timesStamps:'false'
    };

    return sequelize.define('prestamos',attributes,options);
};