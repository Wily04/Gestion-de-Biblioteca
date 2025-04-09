'use strict';

const express = require('express');
const librosController = require('../controllers/librosController');
const apiRoutes = express.Router();

apiRoutes
    .get('/getAllLibros', async (req, res) => await librosController.getLibros(req, res))
    .post('/insertLibro', async (req, res) => await librosController.insertLibro(req, res));

module.exports = apiRoutes;
