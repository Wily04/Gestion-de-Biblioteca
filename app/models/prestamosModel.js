'use strict';
const { timeStamp } = require('console');
const { DatabaseSync } = require('node:sqlite');
const {DataTypes}= require('sequelize');

module.exports=(sequelize)=>{
    const attributes={
        prestamo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        usuario_id: {
            type: DataTypes.INTEGER
        },
        libro_id: {
            type: DataTypes.INTEGER
        },
        fecha_prestamo: {
            type: DataTypes.DATE
        },
        fecha_vencimiento: {
            type: DataTypes.DATE
        },
        fecha_devolucion: {
            type: DataTypes.DATE
        },
        estado: {
            type: DataTypes.STRING        
        }
    };
    const options={
        defaultScope: {
            attributes: {excludes: ['createdAt','updateAt']}
        },
        scopes: {},
        tableName: 'Prestamos',
        timeStamp: 'false'
    };

    return sequelize.define('prestamo',attributes,options);
};






