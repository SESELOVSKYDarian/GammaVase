import React, { useState } from "react";
import "./UsuarioForm.css";

const IdeaItemForm = ({ categories, defaultCategoryId = "", onClose, onSave }) => {
  const [form, setForm] = useState({
    categoryId: defaultCategoryId,
    title: "",
    type: "video",
    url: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.categoryId || !form.title || !form.url) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Agregar Idea</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
          >
            <option value="">Categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
          />
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
          </select>
          <input
            name="url"
            placeholder="URL"
            value={form.url}
            onChange={handleChange}
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

export default IdeaItemForm;
