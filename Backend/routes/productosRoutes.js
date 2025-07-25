const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Obtener todos los productos
router.get('/', async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, f.familia, f.tipo 
      FROM productos p
      JOIN familias f ON p.familia_id = f.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar un producto
router.post('/', async (req, res) => {
  const { articulo, familia_id, linea, img_articulo, pdf_colores, stock } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO productos (articulo, familia_id, linea, img_articulo, pdf_colores, stock)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [articulo, familia_id, linea, img_articulo, pdf_colores, stock]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM productos WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

