const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const pool = require('./db/db');
const contactoRoute = require("./routes/contactoRoute");
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(',').map((url) => url.trim())
  : ['http://localhost:5173', 'http://localhost:5175'];

// ✅ 1. CORS va primero
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ 2. JSON también antes de las rutas
app.use(express.json());

// ✅ 3. Tus rutas
app.use('/api', authRoutes);
app.use("/api/contacto", contactoRoute);
app.use('/api/familias', require('./routes/familiasRoutes'));
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/productos', require('./routes/productosRoutes'));

app.use('/api/precios', require('./routes/preciosRoutes'));

app.use('/api/login', require('./routes/authRoutes'));
app.use('/api/ideas', require('./routes/ideasRoutes'));

app.use('/imgCata', express.static(path.join(__dirname, '../GammaVase/public/imgCata')));
app.use('/ideas', express.static(path.join(__dirname, '../GammaVase/public/ideas')));
app.use('/familias', express.static(path.join(__dirname, '../GammaVase/public/assets/familias')));

// Serve frontend build when available
const frontendBuildPath = path.join(__dirname, '../GammaVase/dist');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    return res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// ❗ OPCIONAL: si ya usás `/api/login` desde authRoutes.js, esta ruta extra de admin podrías dejarla o renombrarla:


// ✅ Tus rutas personalizadas para productos (no se tocan)
app.get('/api/productos', async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Get productos error:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve productos." });
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, marca, modelo, stock, etiquetas, precio } = req.body;
    await pool.query('INSERT INTO producto(nombre, marca, modelo, stock, etiquetas, precio) VALUES($1, $2, $3, $4, $5, $6)',
      [nombre, marca, modelo, stock, etiquetas, precio]);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Post productos error:", error);
    res.status(500).json({ success: false, message: "Failed to create producto." });
  }
});

app.put('/api/productos/:id', async (req, res) => {
  try {
    const { nombre, marca, modelo, stock, etiquetas, precio } = req.body;
    await pool.query('UPDATE productos SET nombre=$1, marca=$2, modelo=$3, stock=$4, etiquetas=$5, precio=$6 WHERE id=$7',
      [nombre, marca, modelo, stock, etiquetas, precio, req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Put productos error:", error);
    res.status(500).json({ success: false, message: "Failed to update producto." });
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  await pool.query('DELETE FROM productos WHERE id=$1', [req.params.id]);
  res.json({ success: true });
});

app.get('/api/productos/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM productos WHERE url = $1', [slug]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error buscando por slug:", err);
    res.status(500).json({ error: "Error interno" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
