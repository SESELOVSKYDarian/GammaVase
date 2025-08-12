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

// Crear una o varias familias dentro de una gran familia
router.post('/', async (req, res) => {
    const { gran_familia, tipo_familia, tipos_familia } = req.body;

    try {
        // Si llega un array de tipos, insertar todas en una sola operación
        if (Array.isArray(tipos_familia) && tipos_familia.length) {
            const values = [gran_familia, ...tipos_familia];
            const placeholders = tipos_familia
                .map((_, i) => `($1, $${i + 2})`)
                .join(',');

            const result = await pool.query(
                `INSERT INTO familias (gran_familia, tipo_familia) VALUES ${placeholders} RETURNING *`,
                values
            );
            return res.json(result.rows);
        }

        // Inserción simple si se envía un solo tipo
        const result = await pool.query(
            'INSERT INTO familias (gran_familia, tipo_familia) VALUES ($1, $2) RETURNING *',
            [gran_familia, tipo_familia]
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

// Actualizar una familia existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { gran_familia, tipo_familia } = req.body;
    try {
        const result = await pool.query(
            'UPDATE familias SET gran_familia = $1, tipo_familia = $2 WHERE id = $3 RETURNING *',
            [gran_familia, tipo_familia, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
