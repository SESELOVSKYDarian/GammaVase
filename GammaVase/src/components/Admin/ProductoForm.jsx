import "../Admin/UsuarioForm.css";
import React, { useState, useEffect } from "react";

const ProductoForm = ({ onClose, onSave }) => {
  const [familias, setFamilias] = useState([]);
  const [imagenes, setImagenes] = useState([]);
 const [form, setForm] = useState({
  articulo: "",
  descripcion: "",
  familia_id: "",
  linea: "",
  pdf_colores: "",
  stock: 0,
  precio_minorista: "",
  precio_mayorista: ""
});

  useEffect(() => {
    fetch("http://localhost:3000/api/familias")
      .then((res) => res.json())
      .then((data) => setFamilias(data));
  }, []);

  const generateSlug = (nombre) =>
    nombre
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImagenes(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("articulo", form.articulo);
    formData.append("descripcion", form.descripcion);
    formData.append("familia_id", form.familia_id);
    formData.append("linea", form.linea);
    formData.append("pdf_colores", form.pdf_colores);
    formData.append("stock", form.stock);
    formData.append("url", generateSlug(form.articulo)); // 👈 Agrega el slug

    imagenes.forEach((img) => {
      formData.append("imagenes", img);
    });

    await onSave(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="articulo"
            placeholder="Artículo"
            onChange={handleChange}
            required
          />
          <select name="familia_id" onChange={handleChange} required>
            <option value="">Seleccione Familia</option>
            {familias.map((f) => (
              <option key={f.id} value={f.id}>
                {f.familia}
              </option>
            ))}
          </select>
          <textarea
            name="descripcion"
            placeholder="Descripción"
            onChange={handleChange}
          />
          <input
            name="linea"
            placeholder="Línea o marca"
            onChange={handleChange}
          />
          <label>Imágenes (máx 5)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImgChange}
          />
          <label>PDF de colores</label>
          <input
            name="pdf_colores"
            placeholder="nombre.pdf"
            onChange={handleChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            min="0"
          />
          <input
  type="number"
  name="precio_minorista"
  placeholder="Precio Minorista"
  onChange={handleChange}
  min="0"
  required
/>

<input
  type="number"
  name="precio_mayorista"
  placeholder="Precio Mayorista"
  onChange={handleChange}
  min="0"
  required
/>
          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoForm;
