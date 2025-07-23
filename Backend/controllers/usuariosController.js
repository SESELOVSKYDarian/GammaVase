const pool = require('../db/db');


exports.getUsuarios = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message }); // 👈 esto devuelve { error: ... }
    }
};

exports.createUsuario = async (req, res) => {
    const { id, cliente, contrasena, precios } = req.body;
    console.log("Datos recibidos:", { id, cliente, contrasena, precios }); // 👈
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (id, cliente, contrasena, precios) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, cliente, contrasena, precios]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error en createUsuario:", err); // 👈
        res.status(500).json({ error: err.message });
    }
};


exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { cliente, contrasena, precios } = req.body;
    try {
        const result = await pool.query(
            'UPDATE usuarios SET cliente=$1, contrasena=$2, precios=$3 WHERE id=$4 RETURNING *',
            [cliente, contrasena, precios, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE id=$1', [id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
