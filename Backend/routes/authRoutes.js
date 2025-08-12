const express = require('express');
const router = express.Router();
const pool = require('../db/db');

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

module.exports = router;
