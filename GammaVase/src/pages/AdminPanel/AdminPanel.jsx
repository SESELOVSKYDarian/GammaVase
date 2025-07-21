import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UsuarioForm from "../../components/Admin/UsuarioForm"; // <- IMPORTANTE
import "./AdminPanel.css";

const AdminPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false); // Nuevo estado para mostrar el modal

  useEffect(() => {
    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error al cargar usuarios", err));
  }, []);

  const eliminarUsuario = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "DELETE",
      });
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error al eliminar", err);
    }
  };

  const agregarUsuario = async (nuevoUsuario) => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();
      setUsuarios((prev) => [...prev, data]); // 👈 actualiza la tabla
    } catch (err) {
      alert("Error al agregar usuario: " + err.message); // 👈 muestra si hay error
      console.error(err);
    }
  };


  return (
    <div className="admin-panel">
      <div className="admin-banner">
        <h1>Administración</h1>
      </div>

      {/* Sección Usuarios */}
      <div className="admin-section">
        <h2>
          Usuarios{" "}
          <span className="actions" onClick={() => setShowForm(true)}>➕</span>
        </h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Contraseña</th>
              <th>Precios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.cliente}</td>
                <td>{usuario.contrasena}</td>
                <td>{usuario.precios}</td>
                <td>
                  <button onClick={() => eliminarUsuario(usuario.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showForm && (
          <UsuarioForm
            onClose={() => setShowForm(false)}
            onSave={agregarUsuario}
          />
        )}

      </div>

      {/* Las otras secciones como Precios e Ideas pueden seguir igual */}
    </div>
  );
};

export default AdminPanel;
