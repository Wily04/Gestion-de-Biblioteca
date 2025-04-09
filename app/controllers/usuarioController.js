'use strict';
const db = require('../config/db');
const Usuario = db.Usuarios;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const service = require('../services/services');

function insertUsuario(req, res) {
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
            
             const token = service.createToken(usuario.usuario_id);
            
            res.status(201).send({
                ...usuarioData,
                token: token  
            });
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).send({ message: 'El email ya está registrado' });
            }
            res.status(500).send({
                message: err.message || 'Error al registrar el usuario'
            });
        });
}

function loginUsuario(req, res) {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
        return res.status(400).send({ message: 'Email y contraseña son requeridos' });
    }

    Usuario.findOne({ where: { email: email } })
        .then(usuario => {
            if (!usuario) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }

             bcrypt.compare(contraseña, usuario.contraseña)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).send({ message: 'Credenciales incorrectas' });
                    }

                    const usuarioData = usuario.get({ plain: true });
                    delete usuarioData.contraseña;

                     const token = service.createToken(usuario.usuario_id);

                    res.status(200).send({
                        message: 'Inicio de sesión exitoso',
                        usuario: usuarioData,
                        token: token
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: 'Error al verificar contraseña' });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error al iniciar sesión'
            });
        });
}

function getUsuarios(req, res) {
    Usuario.findAll({
        attributes: { exclude: ['contraseña'] }
    })
    .then((usuarios) => {
        if (!usuarios || usuarios.length === 0) {
          return res.status(404).send({ message: 'No se encontraron usuarios' });
        }
        res.status(200).send(usuarios);
      }) 
      .catch((err) => {
        res.status(500).send({ message: err.message || 'Error al obtener los usuarios' });
      });
  
}

function eliminarUsuario(req, res) {
    const { id } = req.params;
    Usuario.destroy({
        where: {
            usuario_id: id
        }
    })
    .then(count => {
        if (count > 0) {
            res.status(200).send({ message: `Usuario con ID ${id} eliminado correctamente.` });
        } else {
            res.status(404).send({ message: `No se encontró ningún usuario con el ID ${id}.` });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message || `Error al eliminar el usuario con ID ${id}.` });
    });
}


module.exports = { 
    insertUsuario, 
    getUsuarios,
    loginUsuario,
    eliminarUsuario  
};