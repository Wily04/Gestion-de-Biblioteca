'use strict';

const express = require('express');
const editorialesController = require('../controllers/editarialesController');
const apiRoutes = express.Router();

apiRoutes
    .get('/listareditoriales', async (req, res) => await editorialesController.getEditoriales(req, res))
    .post('/insertareditoriales', async (req, res) => await editorialesController.insertEditorial(req, res));

module.exports = apiRoutes;