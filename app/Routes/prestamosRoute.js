'use strict'

const express = require('express');
const prestamoController = require('../controllers/prestamoController');
const apiRoutes = express.Router();

apiRoutes
    .get('/getAllPrestamos', async (req, res) => await prestamoController.getPrestamos(req, res))
    .post('/insertPrestamo', async (req, res) => await prestamoController.insertPrestamo(req, res));

module.exports = apiRoutes;
