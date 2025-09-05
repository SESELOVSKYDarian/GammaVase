import React, { useState, useEffect } from "react";
import "../Admin/UsuarioForm.css"; // asumimos que ahí está tu CSS, si no, ponelo donde corresponda

const FamiliaForm = ({ onClose, onSave, initialData }) => {
  const [granFamilia, setGranFamilia] = useState("");
  const [tipos, setTipos] = useState([""]);
  const [usarImagen, setUsarImagen] = useState(false);
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
      if (initialData) {
        setGranFamilia(initialData.gran_familia);
        setTipos([initialData.tipo_familia]);
        setUsarImagen(Boolean(initialData.usar_imagen));
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
        const formData = new FormData();
        formData.append("gran_familia", granFamilia);
        formData.append("tipo_familia", tipos[0]);
        formData.append("usar_imagen", usarImagen);
        if (imagen) formData.append("imagen", imagen);
        onSave({ formData, nuevos_tipos: nuevos });
      } else {
        const formData = new FormData();
        formData.append("gran_familia", granFamilia);
        tipos.forEach((t) => formData.append("tipos_familia", t));
        formData.append("usar_imagen", usarImagen);
        if (imagen) formData.append("imagen", imagen);
        onSave(formData);
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
            <label htmlFor="usar_imagen">¿Usar imagen como subtítulo?</label>
            <select
              id="usar_imagen"
              value={usarImagen ? "si" : "no"}
              onChange={(e) => setUsarImagen(e.target.value === "si")}
            >
              <option value="no">No</option>
              <option value="si">Sí</option>
            </select>
            {usarImagen && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            )}
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
