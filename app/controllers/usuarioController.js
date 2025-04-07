'use strict';
const db = require('../config/db');
const Usuario = db.Usuarios;
const bcrypt = require('bcrypt');

function insertUsuario(req, res) {
    // Validación básica
    if (!req.body.email || !req.body.contraseña) {
        return res.status(400).send({ message: 'Email y contraseña son requeridos' });
    }

    bcrypt.hash(req.body.contraseña, 10)
        .then(hashedPassword => {
            return Usuario.create({
                nombre: req.body.nombre,
                email: req.body.email,
                contraseña: hashedPassword,
                rol: req.body.rol || 'miembro'
            });
        })
        .then(usuario => {
            const usuarioData = usuario.get({ plain: true });
            delete usuarioData.contraseña;
            res.status(201).send(usuarioData);
        })
        .catch(err => {
            // Manejo específico para errores de duplicado
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).send({ message: 'El email ya está registrado' });
            }
            res.status(500).send({
                message: err.message || 'Error al registrar el usuario'
            });
        });
}

function getUsuarios(req, res) {
    Usuario.findAll({
        attributes: { exclude: ['contraseña'] }
    })
    .then(usuarios => {
        if (!usuarios || usuarios.length === 0) {
            return res.status(404).send({ message: 'No se encontraron usuarios' });
        }
        res.status(200).send(usuarios);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Error al obtener los usuarios'
        });
    });
}

module.exports = { insertUsuario, getUsuarios };