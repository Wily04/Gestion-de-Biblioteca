'use strict';

const express = require('express');
const librosController = require('../controllers/librosController');
const apiRoutes = express.Router();

apiRoutes
    .get('/listarlibros', librosController.getLibros)
    .post('/insertarlibros', librosController.insertLibro)
    .delete('/eliminarlibro/:id', librosController.eliminarLibro); 

module.exports = apiRoutes;