import { DataTypes } from 'sequelize';
import { SequelizeInstance } from '../config/db.js';

export const Autor = SequelizeInstance.define('Autor', {
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
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
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
});