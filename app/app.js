const express = require('express');
const cors = require('cors');

const App = express();

const usuarioRoutes = require('./Routes/usuarioRoutes');
const librosRoutes = require('./Routes/librosRoutes');
const editorialRoutes = require('./Routes/editorialRoutes');
const prestamoRoutes = require('./Routes/prestamosRoute');
const autorRoutes = require('./Routes/autorRoutes');

App.use(express.json());
App.use(express.urlencoded({extended:false}));
App.use(cors());

App.use('/api/autores', autorRoutes);
App.use('/api/usuarios', usuarioRoutes);
App.use('/api/libros', librosRoutes);
App.use('/api/editorial', editorialRoutes);
App.use('/api/prestamo', prestamoRoutes);

module.exports=App;