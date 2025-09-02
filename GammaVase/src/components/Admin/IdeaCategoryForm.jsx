import React, { useState } from "react";
import "./UsuarioForm.css";

const IdeaCategoryForm = ({ onClose, onSave }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }
    onSave(name);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
