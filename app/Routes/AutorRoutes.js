'use strict'

const express = require('express');
const AutorController = require('../controllers/AutorController');
const apiRoutes = express.Router();

/* apiRoutes.get('/getAllAutor', async (req, res) => await AutorController.getAutor(req, res))
    .post('/insertAutor', async (req, res) => await AutorController.insertAutor(req, res)); */

apiRoutes.get('/autores', AutorController.getAutor);
apiRoutes.post('/autores', AutorController.insertAutor);


module.exports = apiRoutes;