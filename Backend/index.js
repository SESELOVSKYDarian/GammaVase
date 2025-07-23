const express = require('express');
require('dotenv').config();
require('./db/db');
const cors = require('cors');

const app = express(); // ✅ Ahora primero se define

app.use(cors());
app.use(express.json());

const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/api/usuarios', usuariosRoutes);
// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM admin WHERE email = $1 AND password = $2', [email, password]);
    if (result.rows.length > 0) res.json({ success: true });
    else res.status(401).json({ success: false });
});

// CRUD
app.get('/api/productos', async (_, res) => {
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
});

app.post('/api/productos', async (req, res) => {
    const { nombre, marca, modelo, stock, etiquetas, precio } = req.body;
    await pool.query('INSERT INTO producto(nombre, marca, modelo, stock, etiquetas, precio) VALUES($1, $2, $3, $4, $5, $6)',
        [nombre, marca, modelo, stock, etiquetas, precio]);
    res.json({ success: true });
});

app.put('/api/productos/:id', async (req, res) => {
    const { nombre, marca, modelo, stock, etiquetas, precio } = req.body;
    await pool.query('UPDATE producto SET nombre=$1, marca=$2, modelo=$3, stock=$4, etiquetas=$5, precio=$6 WHERE id=$7',
        [nombre, marca, modelo, stock, etiquetas, precio, req.params.id]);
    res.json({ success: true });
});

app.delete('/api/productos/:id', async (req, res) => {
    await pool.query('DELETE FROM producto WHERE id=$1', [req.params.id]);
    res.json({ success: true });
});


app.listen(3000, () => {
    console.log('🚀 Servidor escuchando en http://localhost:3000');
});
