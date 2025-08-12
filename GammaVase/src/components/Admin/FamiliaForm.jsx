import React, { useState } from "react";
import "../Admin/UsuarioForm.css"; // asumimos que ahí está tu CSS, si no, ponelo donde corresponda

const FamiliaForm = ({ onClose, onSave }) => {
  const [granFamilia, setGranFamilia] = useState("");
  const [tipos, setTipos] = useState([""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!granFamilia || tipos.some((t) => !t)) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    onSave({ gran_familia: granFamilia, tipos_familia: tipos });
    onClose();
  };

  const agregarTipo = () => setTipos((prev) => [...prev, ""]);
  const actualizarTipo = (i, val) => {
    const nuevos = [...tipos];
    nuevos[i] = val;
    setTipos(nuevos);
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
          {tipos.map((t, i) => (
            <input
              key={i}
              type="text"
              placeholder="Tipo familia"
              value={t}
              onChange={(e) => actualizarTipo(i, e.target.value)}
            />
          ))}
          <button type="button" onClick={agregarTipo}>
            + Agregar tipo
          </button>
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
