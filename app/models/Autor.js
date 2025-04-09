'use strict';

const { DataTypes } = require('sequelize');


module.exports = (sequelize) =>{
 const Autor = sequelize.define('Autor', {
  autor_id: {
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
  nacionalidad: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 100],
    }
    
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fallecimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'autores',
  timestamps: false,
});

return Autor;

};