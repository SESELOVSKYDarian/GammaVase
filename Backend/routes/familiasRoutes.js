const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Obtener todas las familias
router.get('/', async (_, res) => {
    try {
        const result = await pool.query('SELECT * FROM familias');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear una nueva familia
router.post('/', async (req, res) => {
    const { familia, tipo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO familias (familia, tipo) VALUES ($1, $2) RETURNING *',
            [familia, tipo]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar una familia
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM familias WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
