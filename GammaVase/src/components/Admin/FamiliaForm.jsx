import React, { useState } from "react";
import "../Admin/UsuarioForm.css"; // asumimos que ahí está tu CSS, si no, ponelo donde corresponda

const FamiliaForm = ({ onClose, onSave }) => {
  const [granFamilia, setGranFamilia] = useState("");
  const [tipoFamilia, setTipoFamilia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!granFamilia || !tipoFamilia) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    onSave({ gran_familia: granFamilia, tipo_familia: tipoFamilia });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Agregar Familia</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Gran familia"
            value={granFamilia}
            onChange={(e) => setGranFamilia(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo familia"
            value={tipoFamilia}
            onChange={(e) => setTipoFamilia(e.target.value)}
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
