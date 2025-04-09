const express = require('express');
const prestamoController = require('../controllers/prestamosController');
const router = express.Router();


    router.get('/listarprestamos', async (req, res) => await prestamoController.getPrestamos(req, res))
    router.post('/insertarprestamos', async (req, res) => await prestamoController.insertPrestamo(req, res));

module.exports = router;
