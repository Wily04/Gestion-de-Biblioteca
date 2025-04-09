'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        editorial_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [3, 100],
            },
        },
        direccion: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [7, 15],
            },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        scopes: {},
        tableName: 'editoriales',
        timestamps: false, 
    };

    return sequelize.define('editorial', attributes, options);
};
