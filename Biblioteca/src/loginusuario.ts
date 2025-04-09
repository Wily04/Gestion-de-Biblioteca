import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const Usuario = db.Usuarios;

export async function loginUsuario(req: Request, res: Response): Promise<Response> {
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).send({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).send({ message: 'Correo no encontrado' });
    }

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return res.status(401).send({ message: 'Credenciales incorrectas' });
    }

    const usuarioData = usuario.get({ plain: true });
    delete usuarioData.contraseña;

    const token = jwt.sign({ usuarioId: usuario.usuario_id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    return res.status(200).send({
      message: 'Inicio de sesión exitoso',
      usuario: usuarioData,
      token,
    });
  } catch (error) {
    return res.status(500).send({ message: 'Error al iniciar sesión', error });
  }
}