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


router.get('/prestamos', obtenerPrestamos);
router.get('/prestamos/:id', obtenerPrestamosPorID);
router.post('/prestamos', crearPrestamo);
router.put('/prestamos/:id', actualizarPrestamo); 
router.delete('/prestamos/:id', eliminarPrestamo); 

module.exports = router;
