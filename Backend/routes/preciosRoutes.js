const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Obtener todas las listas de precios
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM precios ORDER BY lista_de_precio_id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nueva lista de precios
router.post('/', async (req, res) => {
  const { lista_de_precio_id, porcentaje_a_agregar } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO precios (lista_de_precio_id, porcentaje_a_agregar) VALUES ($1, $2) RETURNING *',
      [lista_de_precio_id, porcentaje_a_agregar]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar porcentaje de una lista
router.put('/:listaId', async (req, res) => {
  const { listaId } = req.params;
  const { porcentaje_a_agregar } = req.body;
  try {
    const result = await pool.query(
      'UPDATE precios SET porcentaje_a_agregar=$1 WHERE lista_de_precio_id=$2 RETURNING *',
      [porcentaje_a_agregar, listaId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una lista de precios
router.delete('/:listaId', async (req, res) => {
  const { listaId } = req.params;
  try {
    await pool.query('DELETE FROM precios WHERE lista_de_precio_id=$1', [listaId]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
