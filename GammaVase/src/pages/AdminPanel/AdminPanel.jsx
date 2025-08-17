import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  // Nuevo: modal Ideas
  const [showIdeaForm, setShowIdeaForm] = useState(false);

  // === IDEAS ===
  const [ideas, setIdeas] = useState([]); // categorías e items

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

    // IDEAS
    fetch("http://localhost:3000/api/ideas")
      .then((res) => res.json())
      .then((data) => setIdeas(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error al cargar ideas", err));
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

  const toggleSlider = async (id, current) => {
    await fetch(`http://localhost:3000/api/productos/${id}/slider`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slider: !current }),
    });
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, slider: !current } : p))
    );
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
      setUsuarios((prev) => [...prev, data]); // actualiza la tabla
    } catch (err) {
      alert("Error al agregar usuario: " + err.message);
      console.error(err);
    }
  };

  // === HANDLERS IDEAS ===
  const agregarCategoria = async (nombre) => {
    const nombreTrim = nombre.trim();
    if (!nombreTrim) return null;
    try {
      const res = await fetch("http://localhost:3000/api/ideas/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nombreTrim }),
      });
      if (!res.ok) throw new Error("No se pudo agregar la categoría");
      const creada = await res.json();
      setIdeas((prev) => [...prev, { ...creada, cards: creada.cards || [] }]);
      return creada;
    } catch (e) {
      alert(e.message);
      return null;
    }
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm("¿Eliminar esta categoría y sus tarjetas?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/ideas/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("No se pudo eliminar");
      setIdeas((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

  const agregarTarjeta = async ({ categoryId, title, type, url }) => {
    try {
      const res = await fetch("http://localhost:3000/api/ideas/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId, title, type, url }),
      });
      if (!res.ok) throw new Error("No se pudo agregar la tarjeta");
      const nueva = await res.json();
      setIdeas((prev) =>
        prev.map((cat) =>
          cat.id === Number(categoryId)
            ? { ...cat, cards: [...(cat.cards || []), nueva] }
            : cat
        )
      );
      return nueva;
    } catch (e) {
      alert(e.message);
      return null;
    }
  };

  const eliminarTarjeta = async (catId, cardId) => {
    if (!window.confirm("¿Eliminar esta tarjeta?")) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/ideas/items/${cardId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("No se pudo eliminar la tarjeta");
      setIdeas((prev) =>
        prev.map((cat) =>
          cat.id === catId
            ? { ...cat, cards: (cat.cards || []).filter((t) => t.id !== cardId) }
            : cat
        )
      );
    } catch (e) {
      alert(e.message);
    }
  };


// === Modal simple para crear Categoría de Ideas (similar a otros forms) ===
function IdeaForm({ onClose, categories, onAddCategory, onAddCard }) {
  const [catName, setCatName] = useState("");
  const [catId, setCatId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let usedCatId = catId;
    if (catName.trim()) {
      const nueva = await onAddCategory(catName.trim());
      if (nueva) usedCatId = nueva.id;
    }
    if (!usedCatId || !title.trim() || !url.trim()) return;
    await onAddCard({
      categoryId: usedCatId,
      title: title.trim(),
      type,
      url: url.trim(),
    });
    setCatName("");
    setCatId("");
    setTitle("");
    setType("pdf");
    setUrl("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Nueva idea</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <label>Nueva categoría (opcional)</label>
          <input
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            placeholder="Nombre de la categoría"
          />
          <label>Seleccionar categoría</label>
          <select value={catId} onChange={(e) => setCatId(e.target.value)}>
            <option value="">Selecciona categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Tipo (PDF/Video)</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
          </select>
          <label>URL del recurso</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
}


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
              <th>Gran Familia</th>
              <th>Tipo Familia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {familias.map((familia) => (
              <tr key={familia.id}>
                <td>{familia.id}</td>
                <td>{familia.gran_familia}</td>
                <td>{familia.tipo_familia}</td>
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

      {/* Sección Productos */}
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
              <th>Código color</th>
              <th>Stock</th>
              <th>Precio Minorista</th>
              <th>Precio Mayorista</th>
              <th>Slider</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.articulo}</td>
                <td>{p.gran_familia}</td>
                <td>{p.linea}</td>
                <td>{p.img_articulo?.join(", ")}</td>
                <td>{p.codigo_color}</td>
                <td>{p.stock}</td>
                <td>${p.precio_minorista}</td>
                <td>${p.precio_mayorista}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={p.slider}
                    onChange={() => toggleSlider(p.id, p.slider)}
                  />
                </td>
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

      {/* Sección Ideas */}
      <div className="admin-section">
        <h2>
          Ideas{" "}
          <span className="actions" onClick={() => setShowIdeaForm(true)}>
            ➕
          </span>
        </h2>

        {/* Tabla de categorías y tarjetas */}
        <table className="ideas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Categoría / Tarjeta</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ideas.map((cat) => (
              <React.Fragment key={cat.id}>
                <tr>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{(cat.cards || []).length} subitems</td>
                  <td>
                    <button onClick={() => eliminarCategoria(cat.id)}>🗑️</button>
                  </td>
                </tr>
                {(cat.cards || []).map((card) => (
                  <tr key={card.id} className="idea-item-row">
                    <td></td>
                    <td>
                      <Link to={card.url} target="_blank" rel="noreferrer">
                        {card.title}
                      </Link>
                    </td>
                    <td>{card.type === "pdf" ? "PDF" : "Video"}</td>
                    <td>
                      <button onClick={() => eliminarTarjeta(cat.id, card.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            {ideas.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", color: "#666" }}>
                  No hay categorías
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {showIdeaForm && (
          <IdeaForm
            onClose={() => setShowIdeaForm(false)}
            categories={ideas}
            onAddCategory={agregarCategoria}
            onAddCard={agregarTarjeta}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
