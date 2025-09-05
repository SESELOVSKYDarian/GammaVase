const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const upload = require('../middlewares/familiaUpload');

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
router.post('/', upload.single('imagen'), async (req, res) => {
    const { gran_familia, tipo_familia, usar_imagen } = req.body;
    const tipos_familia = req.body.tipos_familia ? JSON.parse(req.body.tipos_familia) : null;
    const usarImagenBool = usar_imagen === 'true' || usar_imagen === true;
    const imgPath = req.file ? `/imgFamilias/${req.file.filename}` : (req.body.img_subtitulo || null);

    try {
        if (Array.isArray(tipos_familia) && tipos_familia.length) {
            const values = [];
            const placeholders = [];
            tipos_familia.forEach((tipo, i) => {
                const base = i * 4;
                placeholders.push(`($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`);
                values.push(gran_familia, tipo, usarImagenBool, imgPath);
            });
            const result = await pool.query(
                `INSERT INTO familias (gran_familia, tipo_familia, usar_imagen, img_subtitulo) VALUES ${placeholders.join(',')} RETURNING *`,
                values
            );
            return res.json(result.rows);
        }

        const result = await pool.query(
            'INSERT INTO familias (gran_familia, tipo_familia, usar_imagen, img_subtitulo) VALUES ($1, $2, $3, $4) RETURNING *',
            [gran_familia, tipo_familia, usarImagenBool, imgPath]
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
router.put('/:id', upload.single('imagen'), async (req, res) => {
    const { id } = req.params;
    const { gran_familia, tipo_familia, usar_imagen, img_subtitulo } = req.body;
    const usarImagenBool = usar_imagen === 'true' || usar_imagen === true;
    const imgPath = req.file ? `/imgFamilias/${req.file.filename}` : (img_subtitulo || null);
    try {
        const result = await pool.query(
            'UPDATE familias SET gran_familia = $1, tipo_familia = $2, usar_imagen = $3, img_subtitulo = $4 WHERE id = $5 RETURNING *',
            [gran_familia, tipo_familia, usarImagenBool, imgPath, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
