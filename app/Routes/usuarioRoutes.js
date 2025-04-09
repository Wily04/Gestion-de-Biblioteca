const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController'); 

router.post('/insertarusuarios', usuarioController.insertUsuario);

router.post('/login', usuarioController.loginUsuario);

router.get('/listarusuarios', usuarioController.getUsuarios);

module.exports = router;