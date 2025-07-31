const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { id, contraseña } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(401).json({ mensaje: "Usuario no encontrado" });

    const usuario = result.rows[0];

    if (contraseña !== usuario.contraseña)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      "secreto_super_seguro",
      { expiresIn: "1d" }
    );

    res.json({ token, usuario });
  } catch (error) {
    console.error("Error al loguear:", error);
    res.status(500).json({ mensaje: "Error interno" });
  }
});

module.exports = router;
