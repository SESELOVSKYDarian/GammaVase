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
  codigo_color,
  stock,
  url,
  precio,
  precio_minorista,
  precio_mayorista,
  slider
} = req.body;


  try {
    const img_articulo = req.files.map((file) => `/imgCata/${file.filename}`);
    const sliderValue = slider === "true" || slider === true;
  const result = await pool.query(
    `INSERT INTO productos
    (articulo, descripcion, familia_id, linea, img_articulo, codigo_color, stock, url, precio, precio_minorista, precio_mayorista, slider)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING *`,
    [
      articulo,
      descripcion,
      familia_id,
      linea,
      img_articulo,
      codigo_color,
      stock,
      url,
      precio,
      precio_minorista,
      precio_mayorista,
      sliderValue
    ]
  );


    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al guardar producto:", err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los productos con su familia
router.get("/", async (req, res) => {
  const { gran_familia, tipo_familia, codigo_color, q, limit } = req.query;
  let query = `SELECT productos.*, familias.gran_familia, familias.tipo_familia
               FROM productos
               JOIN familias ON productos.familia_id = familias.id`;
  const conditions = [];
  const values = [];
  if (gran_familia) {
    conditions.push(`familias.gran_familia = $${conditions.length + 1}`);
    values.push(gran_familia);
  }
  if (tipo_familia) {
    conditions.push(`familias.tipo_familia = $${conditions.length + 1}`);
    values.push(tipo_familia);
  }
  if (codigo_color) {
    const clean = codigo_color.replace('#', '');
    conditions.push(`REPLACE(productos.codigo_color, '#', '') ILIKE $${conditions.length + 1}`);
    values.push(`%${clean}%`);
  }
  if (q) {
    const palabras = q.trim().split(/\s+/);
    palabras.forEach((palabra) => {
      conditions.push(
        `(productos.articulo ILIKE $${values.length + 1} OR productos.descripcion ILIKE $${values.length + 1} OR familias.gran_familia ILIKE $${values.length + 1} OR familias.tipo_familia ILIKE $${values.length + 1})`
      );
      values.push(`%${palabra}%`);
    });
  }
  if (conditions.length) {
    query += ` WHERE ` + conditions.join(" AND ");
  }
  if (limit) {
    query += ` LIMIT ${parseInt(limit, 10)}`;
  }
  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Listado de códigos de color distintos para filtros/sugerencias
router.get("/color-codes", async (req, res) => {
  const { gran_familia, tipo_familia, q } = req.query;
  let query = `SELECT DISTINCT codigo_color FROM productos JOIN familias ON productos.familia_id = familias.id`;
  const conditions = [];
  const values = [];
  if (gran_familia) {
    conditions.push(`familias.gran_familia = $${conditions.length + 1}`);
    values.push(gran_familia);
  }
  if (tipo_familia) {
    conditions.push(`familias.tipo_familia = $${conditions.length + 1}`);
    values.push(tipo_familia);
  }
  if (q) {
    const clean = q.replace('#', '');
    conditions.push(`REPLACE(productos.codigo_color, '#', '') ILIKE $${conditions.length + 1}`);
    values.push(`%${clean}%`);
  }
  if (conditions.length) {
    query += ` WHERE ` + conditions.join(" AND ");
  }
  try {
    const result = await pool.query(query, values);
    res.json(result.rows.map((r) => r.codigo_color));
  } catch (err) {
    console.error("❌ Error al obtener códigos de color:", err);
    res.status(500).json({ error: "Error al obtener códigos de color" });
  }
});

// Actualizar un producto
router.put("/:id", upload.array("imagenes", 5), async (req, res) => {
  const { id } = req.params;
  const {
    articulo,
    descripcion,
    familia_id,
    linea,
    codigo_color,
    stock,
    url,
    precio,
    precio_minorista,
    precio_mayorista,
    slider,
  } = req.body;

  try {
    const img_articulo = req.files && req.files.length
      ? req.files.map((file) => `/imgCata/${file.filename}`)
      : null;
    const sliderValue = slider === "true" || slider === true;
    const baseFields = [
      articulo,
      descripcion,
      familia_id,
      linea,
      codigo_color,
      stock,
      url,
      precio,
      precio_minorista,
      precio_mayorista,
      sliderValue,
    ];
    let query = `UPDATE productos SET articulo=$1, descripcion=$2, familia_id=$3, linea=$4, codigo_color=$5, stock=$6, url=$7, precio=$8, precio_minorista=$9, precio_mayorista=$10, slider=$11`;
    if (img_articulo) {
      query += `, img_articulo=$12 WHERE id=$13 RETURNING *`;
      baseFields.push(img_articulo, id);
    } else {
      query += ` WHERE id=$12 RETURNING *`;
      baseFields.push(id);
    }
    const result = await pool.query(query, baseFields);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al actualizar producto:", err);
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM productos WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

// Obtener producto por slug (URL), incluyendo nombre de familia y tipo
router.get('/slug/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const result = await pool.query(
      `SELECT productos.*, familias.gran_familia, familias.tipo_familia
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
      `SELECT productos.*, familias.gran_familia, familias.tipo_familia
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

// Productos marcados para el slider principal
router.get("/slider", async (_req, res) => {
  try {
      const result = await pool.query(
        `SELECT productos.*, familias.gran_familia, familias.tipo_familia
         FROM productos
         JOIN familias ON productos.familia_id = familias.id
         WHERE productos.slider = true`
      );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener productos del slider:", err);
    res.status(500).json({ error: "Error al obtener productos del slider" });
  }
});

// Actualizar bandera slider de un producto
router.patch("/:id/slider", async (req, res) => {
  const { id } = req.params;
  const { slider } = req.body;
  try {
    const result = await pool.query(
      "UPDATE productos SET slider = $1 WHERE id = $2 RETURNING *",
      [slider, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al actualizar slider:", err);
    res.status(500).json({ error: "Error al actualizar slider" });
  }
});


module.exports = router;
