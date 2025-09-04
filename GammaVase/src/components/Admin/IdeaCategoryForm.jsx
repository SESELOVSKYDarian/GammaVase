import React, { useState } from "react";
import "./UsuarioForm.css";

const IdeaCategoryForm = ({ onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initialData ? "Editar Categoría" : "Agregar Categoría"}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="image">Imagen</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
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
