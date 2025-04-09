const express = require('express');
const cors = require('cors');
const App = express();

const autorRoutes = require('./Routes/AutorRoutes');
const usuarioRoutes = require('./Routes/usuarioRoutes');
const librosRoutes = require('./Routes/librosRoutes');

App.use(express.json());
App.use(express.urlencoded({extended:false}));
App.use(cors());

App.use('/api/autores', autorRoutes);
App.use('/api/usuarios', usuarioRoutes);
App.use('/api/libros', librosRoutes);

module.exports=App;