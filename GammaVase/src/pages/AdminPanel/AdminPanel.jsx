import React, { useState, useEffect } from "react";
import UsuarioForm from "../../components/Admin/UsuarioForm"; // <- IMPORTANTE
import FamiliaForm from "../../components/Admin/FamiliaForm";
import ProductoForm from "../../components/Admin/ProductoForm";
import ConfirmDialog from "../../components/Admin/ConfirmDialog";
import PrecioForm from "../../components/Admin/PrecioForm";
import IdeaCategoryForm from "../../components/Admin/IdeaCategoryForm";
import IdeaItemForm from "../../components/Admin/IdeaItemForm";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [familias, setFamilias] = useState([]);
  const [showFamiliaForm, setShowFamiliaForm] = useState(false);
  const [productos, setProductos] = useState([]);
  const [showProductoForm, setShowProductoForm] = useState(false);
  const [precios, setPrecios] = useState([]);
  const [showPrecioForm, setShowPrecioForm] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [editingFamilia, setEditingFamilia] = useState(null);
  const [editingProducto, setEditingProducto] = useState(null);
  const [editingPrecio, setEditingPrecio] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [ideaCategories, setIdeaCategories] = useState([]);
  const [showIdeaCategoryForm, setShowIdeaCategoryForm] = useState(false);
  const [showIdeaItemForm, setShowIdeaItemForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [ideasError, setIdeasError] = useState(false);

  const fetchIdeas = () => {
    setIdeasError(false);
    fetch('http://localhost:3000/api/ideas')
      .then((res) => res.json())
      .then((data) => setIdeaCategories(data))
      .catch((err) => {
        console.error('Error al cargar ideas', err);
        setIdeasError(true);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('adminAuthed')) {
      window.location.href = '/admin';
    }
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

    fetch('http://localhost:3000/api/precios')
      .then((res) => res.json())
      .then((data) => setPrecios(data));

    fetchIdeas();
  }, []);

  const guardarFamilia = async (familia) => {
    try {
      if (editingFamilia) {
        const res = await fetch(
          `http://localhost:3000/api/familias/${editingFamilia.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(familia),
          }
        );
        const data = await res.json();
        setFamilias((prev) =>
          prev.map((f) => (f.id === editingFamilia.id ? data : f))
        );
      } else {
        const res = await fetch("http://localhost:3000/api/familias", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(familia),
        });
        const data = await res.json();
        const nuevas = Array.isArray(data) ? data : [data];
        setFamilias((prev) => [...prev, ...nuevas]);
      }
    } catch (err) {
      alert("Error al guardar familia: " + err.message);
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

  const guardarProducto = async (formData) => {
    try {
      let url = "http://localhost:3000/api/productos";
      let method = "POST";
      if (editingProducto) {
        url += `/${editingProducto.id}`;
        method = "PUT";
      }
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error al guardar producto");
      }
      const data = await res.json();
      if (editingProducto) {
        setProductos((prev) =>
          prev.map((p) => (p.id === editingProducto.id ? data : p))
        );
      } else {
        setProductos((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("Error al guardar producto: " + err.message);
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

  const guardarPrecio = async (precio) => {
    try {
      let url = 'http://localhost:3000/api/precios';
      let method = 'POST';
      if (editingPrecio) {
        url += `/${precio.lista_de_precio_id}`;
        method = 'PUT';
      }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(precio),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar precio');
      if (editingPrecio) {
        setPrecios((prev) =>
          prev.map((p) =>
            p.lista_de_precio_id === precio.lista_de_precio_id ? data : p
          )
        );
      } else {
        setPrecios((prev) => [...prev, data]);
      }
    } catch (err) {
      alert('Error al guardar precio: ' + err.message);
    }
  };

  const eliminarPrecio = async (listaId) => {
    try {
      await fetch(`http://localhost:3000/api/precios/${listaId}`, {
        method: 'DELETE',
      });
      setPrecios((prev) =>
        prev.filter((p) => p.lista_de_precio_id !== listaId)
      );
    } catch (err) {
      console.error('Error al eliminar lista de precios', err);
    }
  };

  const guardarIdeaCategoria = async (name) => {
    try {
      const res = await fetch('http://localhost:3000/api/ideas/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      setIdeaCategories((prev) => [...prev, { ...data, cards: [] }]);
    } catch (err) {
      alert('Error al guardar categoría: ' + err.message);
    }
  };

  const guardarIdeaItem = async (item) => {
    try {
      const res = await fetch('http://localhost:3000/api/ideas/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      setIdeaCategories((prev) =>
        prev.map((cat) =>
          cat.id === data.category_id
            ? {
                ...cat,
                cards: [
                  ...cat.cards,
                  { id: data.id, title: data.title, type: data.type, url: data.url },
                ],
              }
            : cat
        )
      );
    } catch (err) {
      alert('Error al guardar idea: ' + err.message);
    }
  };

  const eliminarIdeaCategoria = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/ideas/categories/${id}`, {
        method: 'DELETE',
      });
      setIdeaCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error al eliminar categoría', err);
    }
  };

  const eliminarIdeaItem = async (id, categoryId) => {
    try {
      await fetch(`http://localhost:3000/api/ideas/items/${id}`, {
        method: 'DELETE',
      });
      setIdeaCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? { ...cat, cards: cat.cards.filter((card) => card.id !== id) }
            : cat
        )
      );
    } catch (err) {
      console.error('Error al eliminar idea', err);
    }
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

  const guardarUsuario = async (usuario) => {
    try {
      let url = "http://localhost:3000/api/usuarios";
      let method = "POST";
      if (editingUsuario) {
        url += `/${editingUsuario.id}`;
        method = "PUT";
      }
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();
      if (editingUsuario) {
        setUsuarios((prev) =>
          prev.map((u) => (u.id === editingUsuario.id ? data : u))
        );
      } else {
        setUsuarios((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("Error al guardar usuario: " + err.message);
      console.error(err);
    }
  };

  const confirmDelete = (
    action,
    message = 'Are you sure you want to delete this item?',
    confirmLabel = 'Yes',
    cancelLabel = 'No'
  ) => {
    setConfirm({
      message,
      confirmLabel,
      cancelLabel,
      onConfirm: () => {
        action();
        setConfirm(null);
      },
      onCancel: () => setConfirm(null),
    });
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
          <span
            className="actions"
            onClick={() => {
              setEditingUsuario(null);
              setShowForm(true);
            }}
          >
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
    <th>Lista</th>
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
      <td>{usuario.lista_de_precio || ''}</td>
      <td>
        <button
          onClick={() => {
            setEditingUsuario(usuario);
            setShowForm(true);
          }}
        >
          ✏️
        </button>
        <button onClick={() => confirmDelete(() => eliminarUsuario(usuario.id))}>
          🗑️
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
        {showForm && (
          <UsuarioForm
            onClose={() => {
              setShowForm(false);
              setEditingUsuario(null);
            }}
            onSave={guardarUsuario}
            initialData={editingUsuario}
          />
        )}
      </div>
      {/* Sección Familias */}
      <div className="admin-section">
        <h2>
          Familias{" "}
          <span
            className="actions"
            onClick={() => {
              setEditingFamilia(null);
              setShowFamiliaForm(true);
            }}
          >
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
                  <button
                    onClick={() => {
                      setEditingFamilia(familia);
                      setShowFamiliaForm(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button onClick={() => confirmDelete(() => eliminarFamilia(familia.id))}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showFamiliaForm && (
          <FamiliaForm
            onClose={() => {
              setShowFamiliaForm(false);
              setEditingFamilia(null);
            }}
            onSave={guardarFamilia}
            initialData={editingFamilia}
          />
        )}
      </div>
      <div className="admin-section">
        <h2>
          Productos{" "}
          <span
            className="actions"
            onClick={() => {
              setEditingProducto(null);
              setShowProductoForm(true);
            }}
          >
            ➕
          </span>
        </h2>
        <table>
        <thead>
  <tr>
    <th>ID</th>
    <th>Artículo</th>
    <th>Gran Familia</th>
    <th>Tipo Familia</th>
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
      <td>{p.tipo_familia}</td>
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
        <button
          onClick={() => {
            setEditingProducto(p);
            setShowProductoForm(true);
          }}
        >
          ✏️
        </button>
        <button onClick={() => confirmDelete(() => eliminarProducto(p.id))}>
          🗑️
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
        {showProductoForm && (
          <ProductoForm
            onClose={() => {
              setShowProductoForm(false);
              setEditingProducto(null);
            }}
            onSave={guardarProducto}
            initialData={editingProducto}
          />
        )}
      </div>
      <div className="admin-section">
        <h2>
          Listas de precios{" "}
          <span
            className="actions"
            onClick={() => {
              setEditingPrecio(null);
              setShowPrecioForm(true);
            }}
          >
            ➕
          </span>
        </h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Lista</th>
              <th>Porcentaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {precios.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.lista_de_precio_id}</td>
                <td>{p.porcentaje_a_agregar}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingPrecio(p);
                      setShowPrecioForm(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() =>
                      confirmDelete(
                        () => eliminarPrecio(p.lista_de_precio_id),
                        '¿Está seguro de borrar esta lista de precios?',
                        'Sí',
                        'No'
                      )
                    }
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPrecioForm && (
          <PrecioForm
            onClose={() => {
              setShowPrecioForm(false);
              setEditingPrecio(null);
            }}
            onSave={guardarPrecio}
            initialData={editingPrecio || {}}
          />
        )}
      </div>

      <div className="admin-section">
        <h2>
          Ideas{" "}
          <span
            className="actions"
            onClick={() => {
              setShowIdeaCategoryForm(true);
            }}
          >
            ➕
          </span>
        </h2>
        {ideasError ? (
          <div>
            <p>No se pudieron cargar las ideas</p>
            <button onClick={fetchIdeas}>Reintentar</button>
          </div>
        ) : (
          ideaCategories.map((cat) => (
            <div key={cat.id} className="idea-admin-category">
              <h3>
                {cat.name}{" "}
                <button
                  onClick={() => {
                    setCurrentCategory(cat.id);
                    setShowIdeaItemForm(true);
                  }}
                >
                  ➕ Item
                </button>
                <button
                  onClick={() =>
                    confirmDelete(() => eliminarIdeaCategoria(cat.id))
                  }
                >
                  🗑️
                </button>
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>URL</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.cards.map((card) => (
                    <tr key={card.id}>
                      <td>{card.title}</td>
                      <td>{card.type}</td>
                      <td>{card.url}</td>
                      <td>
                        <button
                          onClick={() =>
                            confirmDelete(() =>
                              eliminarIdeaItem(card.id, cat.id)
                            )
                          }
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
        {showIdeaCategoryForm && (
          <IdeaCategoryForm
            onClose={() => setShowIdeaCategoryForm(false)}
            onSave={guardarIdeaCategoria}
          />
        )}
        {showIdeaItemForm && (
          <IdeaItemForm
            categories={ideaCategories}
            defaultCategoryId={currentCategory}
            onClose={() => {
              setShowIdeaItemForm(false);
              setCurrentCategory(null);
            }}
            onSave={guardarIdeaItem}
          />
        )}
      </div>

      {/* Las otras secciones como Ideas pueden seguir igual */}
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={confirm.onCancel}
          confirmLabel={confirm.confirmLabel}
          cancelLabel={confirm.cancelLabel}
        />
      )}
    </div>
  );
};

export default AdminPanel;
