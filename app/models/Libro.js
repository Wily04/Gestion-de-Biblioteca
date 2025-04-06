'use strict';

const { DataTypes } = require('sequelize');
const { SequelizeInstance } = require('../config/db.js');

module.exports = (sequelize) => {
  const Libro = sequelize.define('Libro', {
    libro_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255],
      },
    },
    autor: {  
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    editorial: {  
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    fecha_publicacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isBefore: new Date().toISOString(),
      },
    },
    copias_disponibles: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    copias_totales: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  }, {
    tableName: 'libros',
    timestamps: false,
  });

  return Libro; 
};