'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
    libro_id: {
      type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(255),
    },
    autor_id: {
      type: DataTypes.INTEGER,
    },
    editorial_id: {
      type: DataTypes.INTEGER,
    },
    genero: {
      type: DataTypes.STRING(50),
    },
    fecha_publicacion: {
      type: DataTypes.DATEONLY,
    },
    copias_disponibles: {
      type: DataTypes.INTEGER,
    },
    copias_totales: {
      type: DataTypes.INTEGER,
    },
  };

  const options = {
    tableName: 'Libros',
    timestamps: false,
  };

  return sequelize.define('Libro', attributes, options);
};
