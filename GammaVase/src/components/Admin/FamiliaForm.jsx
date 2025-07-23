import React, { useState } from "react";
import "../Admin/UsuarioForm.css"; // asumimos que ahí está tu CSS, si no, ponelo donde corresponda

const FamiliaForm = ({ onClose, onSave }) => {
  const [familia, setFamilia] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!familia || !tipo) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    onSave({ familia, tipo });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Agregar Familia</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Familia"
            value={familia}
            onChange={(e) => setFamilia(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamiliaForm;
