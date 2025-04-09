const express = require('express');
const cors = require('cors');

const App = express();

const autorRoutes = require('./Routes/autorRoutes');
const usuarioRoutes = require('./Routes/usuarioRoutes');
const librosRoutes = require('./Routes/librosRoutes');

App.use(express.json());
App.use(express.urlencoded({extended:false}));
App.use(cors());

App.use('/autores', autorRoutes);
App.use('/usuarios', usuarioRoutes);
App.use('/libros', librosRoutes);

module.exports=App;