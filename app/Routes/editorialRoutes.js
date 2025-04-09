'use strict';

const express = require('express');
const editorialesController = require('../controllers/editarialesController');
const apiRoutes = express.Router();

apiRoutes
    .get('/getAllEditoriales', async (req, res) => await editorialesController.getEditoriales(req, res))
    .post('/insertEditorial', async (req, res) => await editorialesController.insertEditorial(req, res));

module.exports = apiRoutes;