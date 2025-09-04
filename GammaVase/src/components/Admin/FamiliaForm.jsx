import React, { useState, useEffect } from "react";
import "../Admin/UsuarioForm.css"; // asumimos que ahí está tu CSS, si no, ponelo donde corresponda

const FamiliaForm = ({ onClose, onSave, initialData }) => {
  const [granFamilia, setGranFamilia] = useState("");
  const [tipos, setTipos] = useState([""]);

  useEffect(() => {
    if (initialData) {
      setGranFamilia(initialData.gran_familia);
      setTipos([initialData.tipo_familia]);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!granFamilia || tipos.some((t) => !t)) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (initialData) {
      const nuevos = tipos.slice(1);
      onSave({
        gran_familia: granFamilia,
        tipo_familia: tipos[0],
        nuevos_tipos: nuevos.length ? nuevos : undefined,
      });
    } else {
      onSave({ gran_familia: granFamilia, tipos_familia: tipos });
    }
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
        <h2>{initialData ? "Editar Familia" : "Agregar Familia"}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="gran_familia">Gran familia</label>
          <input
            id="gran_familia"
            type="text"
            placeholder="Gran familia"
            value={granFamilia}
            onChange={(e) => setGranFamilia(e.target.value)}
          />
          {tipos.map((t, i) => (
            <div key={i}>
              <label htmlFor={`tipo_${i}`}>Tipo familia</label>
              <input
                id={`tipo_${i}`}
                type="text"
                placeholder="Tipo familia"
                value={t}
                onChange={(e) => actualizarTipo(i, e.target.value)}
              />
            </div>
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
