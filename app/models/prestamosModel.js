'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Prestamo = sequelize.define('Prestamo', { 
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
      type: DataTypes.DATE,
      allowNull: true // Puede ser nulo
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'devuelto', 'vencido'), 
      allowNull: false
    }
  }, {
    tableName: 'prestamos', 
    timestamps: false 
  });

  return Prestamo;
};