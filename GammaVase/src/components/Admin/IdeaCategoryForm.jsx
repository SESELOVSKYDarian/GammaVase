import React, { useState } from "react";
import "./UsuarioForm.css";

const IdeaCategoryForm = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ name: "", imageUrl: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Agregar Categoría</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="URL de imagen"
            name="imageUrl"
            value={form.imageUrl}
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

export default IdeaCategoryForm;
