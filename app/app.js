const express = require('express');
const App=express();
const autorRoutes = require('./Routes/AutorRoutes');

App.use(express.json());
App.use(express.urlencoded({extended:false}));

App.use('/', autorRoutes);

module.exports=App;
