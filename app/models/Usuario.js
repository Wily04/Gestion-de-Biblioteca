import { DataTypes } from 'sequelize';
import { SequelizeInstance } from '../config/db.js';

export const Usuario = SequelizeInstance.define('Usuario', {
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
    type: DataTypes.ENUM(["admin", "miembro"]),
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'usuarios',
});