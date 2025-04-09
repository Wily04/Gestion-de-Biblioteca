'use strict'

const Sequelize = require('sequelize');
require('dotenv').config();

const sequelizeInstance = new Sequelize (process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.dialect,
    port: process.env.MY_SQL_PORT,
    dialectOptions: {
        connectTimeout: 10000,
    },
    operatorAliases: "false",
    pool: {
        max: parseInt(process.env.POOL_MAX),
        min: parseInt(process.env.POOL_MIN),
        acquire: parseInt(process.env.POOL_ACQUIRE),
        idle: parseInt(process.env.POOL_IDLE)
    }
});

const db = {};

db.Sequelize = Sequelize;
db.SequelizeInstance = sequelizeInstance;


//modelos
db.editoriales = require('../models/editoriales')(sequelizeInstance, Sequelize);
db.libros = require('../models/librosModel')(sequelizeInstance, Sequelize);
db.Usuarios = require('../models/usuariosModel')(sequelizeInstance, Sequelize);
db.Autores = require('../models/autoresModel')(sequelizeInstance, Sequelize);
db.Prestamos = require('../models/prestamosModel')(sequelizeInstance, Sequelize);

module.exports = db;