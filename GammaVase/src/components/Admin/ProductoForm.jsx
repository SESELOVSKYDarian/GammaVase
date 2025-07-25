import React, { useState, useEffect } from "react";

const ProductoForm = ({ onClose, onSave }) => {
  const [familias, setFamilias] = useState([]);
  const [form, setForm] = useState({
    articulo: "",
    familia_id: "",
    linea: "",
    img_articulo: [],
    pdf_colores: "",
    stock: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/familias")
      .then((res) => res.json())
      .then((data) => setFamilias(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files).map(f => f.name);
    setForm((prev) => ({ ...prev, img_articulo: files.slice(0, 5) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input name="articulo" placeholder="Artículo" onChange={handleChange} />
          <select name="familia_id" onChange={handleChange}>
            <option value="">Seleccione Familia</option>
            {familias.map((f) => (
              <option key={f.id} value={f.id}>{f.familia}</option>
            ))}
          </select>
          <input name="linea" placeholder="Línea o marca" onChange={handleChange} />
          <label>Imágenes (máx 5)</label>
          <input type="file" multiple accept="image/*" onChange={handleImgChange} />
          <label>PDF de colores</label>
          <input name="pdf_colores" placeholder="nombre_archivo.pdf" onChange={handleChange} />
          <input type="number" name="stock" placeholder="Stock" onChange={handleChange} />
          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoForm;
