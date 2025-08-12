import "../Admin/UsuarioForm.css";
import React, { useState, useEffect } from "react";

const ProductoForm = ({ onClose, onSave, initialData }) => {
  const [familias, setFamilias] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [granSel, setGranSel] = useState("");
  const [form, setForm] = useState({
    articulo: "",
    descripcion: "",
    familia_id: "",
    linea: "",
    codigo_color: "",
    stock: 0,
    precio_minorista: "",
    precio_mayorista: "",
    slider: false,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/familias")
      .then((res) => res.json())
      .then((data) => setFamilias(data));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        articulo: initialData.articulo,
        descripcion: initialData.descripcion || "",
        familia_id: initialData.familia_id,
        linea: initialData.linea || "",
        codigo_color: initialData.codigo_color || "",
        stock: initialData.stock || 0,
        precio_minorista: initialData.precio_minorista || "",
        precio_mayorista: initialData.precio_mayorista || "",
        slider: initialData.slider,
      });
      setGranSel(initialData.gran_familia || "");
    }
  }, [initialData]);

  const generateSlug = (nombre) =>
    nombre
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
    formData.append("codigo_color", form.codigo_color);
    formData.append("stock", form.stock);
    formData.append("url", generateSlug(form.articulo)); // 👈 Agrega el slug
formData.append("precio", form.precio_minorista); // opcional, usa el mismo que el minorista
formData.append("precio_minorista", form.precio_minorista);
    formData.append("precio_mayorista", form.precio_mayorista);
    formData.append("slider", form.slider);

    imagenes.forEach((img) => {
      formData.append("imagenes", img);
    });

    await onSave(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initialData ? "Editar Producto" : "Agregar Producto"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="articulo"
            placeholder="Artículo"
            onChange={handleChange}
            required
          />
          <select
            value={granSel}
            onChange={(e) => {
              setGranSel(e.target.value);
              setForm((prev) => ({ ...prev, familia_id: "" }));
            }}
            required
          >
            <option value="">Seleccione Gran Familia</option>
            {[...new Set(familias.map((f) => f.gran_familia))].map((gf) => (
              <option key={gf} value={gf}>
                {gf}
              </option>
            ))}
          </select>
          <select
            name="familia_id"
            value={form.familia_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Familia</option>
            {familias
              .filter((f) => !granSel || f.gran_familia === granSel)
              .map((f) => (
                <option key={f.id} value={f.id}>
                  {f.tipo_familia}
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
          <label>Código de color</label>
          <input
            name="codigo_color"
            placeholder="#FFFFFF"
            onChange={handleChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            min="0"
          />
          <label className="slider-check">
            <input
              type="checkbox"
              name="slider"
              checked={form.slider}
              onChange={handleChange}
            />
            Mostrar en slider principal
          </label>
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
