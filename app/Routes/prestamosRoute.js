const express = require('express');
const prestamoController = require('../controllers/prestamosController');
const router = express.Router();
const {
    obtenerPrestamos,
    obtenerPrestamosPorID,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
} = require('../controllers/prestamosController');


router.get('/mostrarprestamos', obtenerPrestamos);
router.post('/crearprestamos', crearPrestamo);
router.put('/actualizarprestamos/:id', actualizarPrestamo); 
router.delete('/borrarprestamos/:id', eliminarPrestamo); 

module.exports = router;