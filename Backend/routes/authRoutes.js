const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const nodemailer = require('nodemailer');

let adminCode = null;
let adminCodeExp = null;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/login', async (req, res) => {
  const { id, contrasena } = req.body;
  try {
    const result = await pool.query(
      `SELECT u.*, p.porcentaje_a_agregar
       FROM usuarios u
       LEFT JOIN precios p ON u.lista_de_precio = p.lista_de_precio_id
       WHERE u.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }
    const usuario = result.rows[0];
    if (contrasena !== usuario.contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }
    res.json({ usuario });
  } catch (error) {
    console.error('Error al loguear:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.post('/admin/login', async (req, res) => {
  const { admin, contrasena } = req.body;
  if (
    admin !== process.env.ADMIN_USER ||
    contrasena !== process.env.ADMIN_PASS
  ) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  adminCode = code;
  adminCodeExp = Date.now() + 5 * 60 * 1000;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'Código de verificación',
      text: `Tu código de verificación es: ${code}`,
    });
    res.json({ mensaje: 'Código enviado' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

router.post('/admin/verify', (req, res) => {
  const { code } = req.body;
  if (code === adminCode && adminCodeExp && Date.now() < adminCodeExp) {
    adminCode = null;
    adminCodeExp = null;
    return res.json({ success: true });
  }
  res.status(401).json({ mensaje: 'Código incorrecto' });
});

module.exports = router;
