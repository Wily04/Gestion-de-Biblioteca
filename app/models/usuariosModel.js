'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const usuariosModel = sequelize.define('usuariosModel', {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [10, 100],
      }
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255],
      }
    },
    rol: {
      type: DataTypes.ENUM("admini", "miembro"),
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Usuarios',
  });

  return usuariosModel;
};