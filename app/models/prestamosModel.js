'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        prestamos_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        usuario_id: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        libro_id: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        fecha_prestamo: {
            type: DataTypes.DATE,
            allowNull: false 
        },
        fecha_vencimiento: {
            type: DataTypes.DATE,
            allowNull: false 
        },
        fecha_devolucion: {
            type: DataTypes.DATE
        },
        estado: {
            type: DataTypes.ENUM('activo', 'finalizado', 'cancelado'), 
            allowNull: false 
        }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        scopes: {},
        tableName: 'Prestamos',
        timestamps: false 
    };

    return sequelize.define('Prestamo', attributes, options);
};
