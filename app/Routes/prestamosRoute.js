const express = require('express');
const prestamoController = require('../controllers/prestamoController');
const router = express.Router();


    router.get('/getAllPrestamos', async (req, res) => await prestamoController.getPrestamos(req, res))
    router.post('/insertPrestamo', async (req, res) => await prestamoController.insertPrestamo(req, res));

module.exports = router;
