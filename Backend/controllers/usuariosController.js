const pool = require('../db/db');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear usuario
exports.createUsuario = async (req, res) => {
  const { id, cliente, contrasena, rol } = req.body;
  console.log("Datos recibidos:", { id, cliente, contrasena, rol });

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (id, cliente, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, cliente, contrasena, rol]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error en createUsuario:", err);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar usuario
exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { cliente, contrasena, rol } = req.body;

  try {
    const result = await pool.query(
      'UPDATE usuarios SET cliente=$1, contrasena=$2, rol=$3 WHERE id=$4 RETURNING *',
      [cliente, contrasena, rol, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id=$1', [id]);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
