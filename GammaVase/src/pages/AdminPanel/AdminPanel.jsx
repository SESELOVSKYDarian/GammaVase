import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UsuarioForm from "../../components/Admin/UsuarioForm"; // <- IMPORTANTE
import FamiliaForm from "../../components/Admin/FamiliaForm";
import ProductoForm from "../../components/Admin/ProductoForm";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false); // Nuevo estado para mostrar el modal
  const [familias, setFamilias] = useState([]);
  const [showFamiliaForm, setShowFamiliaForm] = useState(false);
  const [productos, setProductos] = useState([]);
  const [showProductoForm, setShowProductoForm] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/api/familias")
      .then((res) => res.json())
      .then((data) => setFamilias(data))
      .catch((err) => console.error("Error al cargar familias", err));

    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error al cargar usuarios", err));

    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const agregarFamilia = async (nuevaFamilia) => {
    try {
      const res = await fetch("http://localhost:3000/api/familias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaFamilia),
      });

      if (!res.ok) throw new Error("No se pudo agregar");

      const data = await res.json();
      setFamilias((prev) => [...prev, data]);
    } catch (err) {
      alert("Error al agregar familia: " + err.message);
    }
  };

  const eliminarFamilia = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/familias/${id}`, {
        method: "DELETE",
      });
      setFamilias((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Error al eliminar familia", err);
    }
  };

  const agregarProducto = async (formData) => {
    try {
      const res = await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        body: formData, // No pongas headers, el navegador lo hace automáticamente
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error al agregar producto");
      }

      const data = await res.json();
      setProductos((prev) => [...prev, data]);
    } catch (err) {
      alert("Error al agregar producto: " + err.message);
      console.error(err);
    }
  };

  const eliminarProducto = async (id) => {
    await fetch(`http://localhost:3000/api/productos/${id}`, {
      method: "DELETE",
    });
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

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
          <span className="actions" onClick={() => setShowForm(true)}>
            ➕
          </span>
        </h2>
        <table>
         <thead>
  <tr>
    <th>ID</th>
    <th>Cliente</th>
    <th>Contraseña</th>
    <th>Rol</th>
    <th>Acciones</th>
  </tr>
</thead>
<tbody>
  {usuarios.map((usuario) => (
    <tr key={usuario.id}>
      <td>{usuario.id}</td>
      <td>{usuario.cliente}</td>
      <td>{usuario.contrasena}</td>
      <td>{usuario.rol || "cliente"}</td>
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
      {/* Sección Familias */}
      <div className="admin-section">
        <h2>
          Familias{" "}
          <span className="actions" onClick={() => setShowFamiliaForm(true)}>
            ➕
          </span>
        </h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Familia</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {familias.map((familia) => (
              <tr key={familia.id}>
                <td>{familia.id}</td>
                <td>{familia.familia}</td>
                <td>{familia.tipo}</td>
                <td>
                  <button onClick={() => eliminarFamilia(familia.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showFamiliaForm && (
          <FamiliaForm
            onClose={() => setShowFamiliaForm(false)}
            onSave={agregarFamilia}
          />
        )}
      </div>
      <div className="admin-section">
        <h2>
          Productos{" "}
          <span className="actions" onClick={() => setShowProductoForm(true)}>
            ➕
          </span>
        </h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Artículo</th>
              <th>Familia</th>
              <th>Línea</th>
              <th>Imágenes</th>
              <th>PDF</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.articulo}</td>
                <td>{p.familia}</td>
                <td>{p.linea}</td>
                <td>{p.img_articulo?.join(", ")}</td>
                <td>{p.pdf_colores}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => eliminarProducto(p.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showProductoForm && (
          <ProductoForm
            onClose={() => setShowProductoForm(false)}
            onSave={agregarProducto}
          />
        )}
      </div>

      {/* Las otras secciones como Precios e Ideas pueden seguir igual */}
    </div>
  );
};

export default AdminPanel;
