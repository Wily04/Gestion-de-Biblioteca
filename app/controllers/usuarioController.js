'use strict';

const bcrypt = require('bcrypt');
const { Usuario } = require('../models');
const { createToken } = require('../services/services');
const { Op } = require('sequelize');

async function registrarUsuario(req, res) {
    try {
        // Validación básica
        if (!req.body.email || !req.body.contraseña) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(req.body.contraseña, 10);

        // Crear usuario
        const usuario = await Usuario.create({
            nombre: req.body.nombre,
            email: req.body.email,
            contraseña: hashedPassword,
            rol: req.body.rol || 'miembro', // Valor por defecto
        });

        // Omitir contraseña en la respuesta
        const usuarioResponse = usuario.toJSON();
        delete usuarioResponse.contraseña;

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            usuario: usuarioResponse
        });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({
            message: error.message || 'Ocurrió un error al registrar el usuario'
        });
    }
}

async function iniciarSesion(req, res) {
    try {
        const { email, contraseña } = req.body;

        // Buscar usuario por email
        const usuario = await Usuario.findOne({
            where: { email: { [Op.eq]: email } }
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!contraseñaValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = createToken(usuario.usuario_id);

        // Omitir contraseña en la respuesta
        const usuarioResponse = usuario.toJSON();
        delete usuarioResponse.contraseña;

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            usuario: usuarioResponse,
            token: token
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({
            message: error.message || 'Ocurrió un error al iniciar sesión'
        });
    }
}

module.exports = {
    registrarUsuario,
    iniciarSesion
};