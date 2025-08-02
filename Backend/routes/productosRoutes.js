const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const upload = require("../middlewares/upload"); // importa multer

// Agregar producto con imagen
router.post("/", upload.array("imagenes", 5), async (req, res) => {
 const {
  articulo,
  descripcion,
  familia_id,
  linea,
  pdf_colores,
  stock,
  url,
  precio,
  precio_minorista,
  precio_mayorista
} = req.body;


  try {
    const img_articulo = req.files.map((file) => `/imgCata/${file.filename}`); // ✅ corregido
const result = await pool.query(
  `INSERT INTO productos 
  (articulo, descripcion, familia_id, linea, img_articulo, pdf_colores, stock, url, precio, precio_minorista, precio_mayorista)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
   RETURNING *`,
  [
    articulo,
    descripcion,
    familia_id,
    linea,
    img_articulo,
    pdf_colores,
    stock,
    url,
    precio,
    precio_minorista,
    precio_mayorista
  ]
);


    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al guardar producto:", err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener producto por slug (URL), incluyendo nombre de familia y tipo
router.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await pool.query(
      `SELECT productos.*, familias.familia, familias.tipo
       FROM productos
       JOIN familias ON productos.familia_id = familias.id
       WHERE productos.url = $1`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al obtener producto por slug:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener productos por familia_id (de la misma familia)
router.get("/familia/:familia_id", async (req, res) => {
  const { familia_id } = req.params;

  try {
    // Asumiendo que familia_id es numérico (ajustalo si es string)
    const result = await pool.query(
      `SELECT productos.*, familias.familia, familias.tipo 
       FROM productos 
       JOIN familias ON productos.familia_id = familias.id
       WHERE productos.familia_id = $1`,
      [familia_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener productos por familia:", err);
    res.status(500).json({ error: "Error al obtener productos relacionados" });
  }
});


module.exports = router;
