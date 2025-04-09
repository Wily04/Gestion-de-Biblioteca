'use strict';

const express = require('express');
const prestamoController = require('../controllers/prestamosController');
const router = express.Router();
const {
    obtenerPrestamos,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
} = require('../controllers/prestamosController');


router.get('/mostrarprestamos', prestamoController.obtenerPrestamos);
router.post('/crearprestamos', prestamoController.crearPrestamo);
router.put('/actualizarprestamos/:id', prestamoController.actualizarPrestamo); 
router.delete('/borrarprestamos/:id', prestamoController.eliminarPrestamo); 

module.exports = router;