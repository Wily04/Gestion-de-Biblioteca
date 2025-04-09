const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController'); 

router.post('/usuarios', usuarioController.insertUsuario);

router.post('/login', usuarioController.loginUsuario);

router.get('/usuarios', usuarioController.getUsuarios);

module.exports = router;