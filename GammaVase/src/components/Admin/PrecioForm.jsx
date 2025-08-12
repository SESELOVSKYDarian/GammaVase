import React, { useState } from 'react';
import './UsuarioForm.css';

const PrecioForm = ({ onClose, onSave, initialData }) => {
  const [porcentaje, setPorcentaje] = useState(initialData.porcentaje_a_agregar || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({
      lista_de_precio_id: initialData.lista_de_precio_id,
      porcentaje_a_agregar: porcentaje,
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Editar Lista {initialData.lista_de_precio_id}</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={initialData.lista_de_precio_id}
            disabled
          />
          <input
            type="number"
            step="0.01"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            placeholder="Porcentaje a agregar"
            required
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

export default PrecioForm;
