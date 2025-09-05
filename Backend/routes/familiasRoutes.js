const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../GammaVase/public/assets/familias'),
  filename: (_, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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
    const { gran_familia, tipo_familia, tipos_familia, usar_imagen } = req.body;
    const imgPath = req.file ? `/familias/${req.file.filename}` : null;

    // Normalizar los distintos nombres de campos para los tipos
    const tipos = tipos_familia
        ? Array.isArray(tipos_familia) ? tipos_familia : [tipos_familia]
        : tipo_familia ? [tipo_familia] : [];

    if (!gran_familia || tipos.length === 0) {
        return res.status(400).json({ error: 'Gran familia y al menos un tipo son requeridos' });
    }

    try {
        const inserted = [];
        for (const tipo of tipos) {
            const r = await pool.query(
                'INSERT INTO familias (gran_familia, tipo_familia, usar_imagen, imagen_subtitulo) VALUES ($1,$2,$3,$4) RETURNING *',
                [gran_familia, tipo, usar_imagen === 'true', imgPath]
            );
            inserted.push(r.rows[0]);
        }
        res.json(inserted.length === 1 ? inserted[0] : inserted);
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
    const { gran_familia, tipo_familia, usar_imagen } = req.body;
    const imgPath = req.file ? `assets/familias/${req.file.filename}` : null;
    try {
        let query = 'UPDATE familias SET gran_familia = $1, tipo_familia = $2, usar_imagen = $3';
        const params = [gran_familia, tipo_familia, usar_imagen === 'true'];
        if (imgPath) {
            query += ', imagen_subtitulo = $4 WHERE id = $5 RETURNING *';
            params.push(imgPath, id);
        } else {
            query += ' WHERE id = $4 RETURNING *';
            params.push(id);
        }
        const result = await pool.query(query, params);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
