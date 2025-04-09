'use strict'

const express = require('express');
const AutorController = require('../controllers/autorController');
const apiRoutes = express.Router();


apiRoutes.get('/listarautores', AutorController.getAutor);
apiRoutes.post('/insertarautores', AutorController.insertAutor);
apiRoutes.delete('/eliminarautores/:id', AutorController.eliminarAutor); 

module.exports = apiRoutes;