'use strict';

const express = require('express');
const librosController = require('../controllers/librosController');
const apiRoutes = express.Router();

apiRoutes
    .get('/listarlibros', async (req, res) => await librosController.getLibros(req, res))
    .post('/insertarlibros', async (req, res) => await librosController.insertLibro(req, res));

module.exports = apiRoutes;
