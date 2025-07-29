const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db/db'); // o como lo estés importando
const contactoRoute = require("./routes/contactoRoute");
const app = express();
const path = require('path');
app.use('/imgCata', express.static(path.join(__dirname, '../GammaVase/public/imgCata')));


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5175'],
  credentials: true,
}));


app.use(express.json());

app.use("/api/contacto", contactoRoute); // Asegurate que la ruta es correcta

const productosRoutes = require('./routes/productosRoutes');
app.use('/api/productos', productosRoutes);

 // si tenés productos
app.use('/api/familias', require('./routes/familiasRoutes'));
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
// Login
app.post('/api/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const result = await pool.query('SELECT * FROM admin WHERE email = $1 AND password = $2', [email, password]);
      if (result.rows.length > 0) res.json({ success: true });
      else res.status(401).json({ success: false });
  } catch (error) {
      console.error("❌ Login error:", error);
      res.status(500).json({ success: false, message: "Login failed due to server error." });
  }
});

// CRUD
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


app.listen(3000, () => {
    console.log('🚀 Servidor escuchando en http://localhost:3000');
});
