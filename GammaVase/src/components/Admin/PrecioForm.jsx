import React, { useState } from 'react';
import './UsuarioForm.css';

const PrecioForm = ({ onClose, onSave, initialData = {} }) => {
  const [listaId, setListaId] = useState(initialData.lista_de_precio_id || '');
  const [porcentaje, setPorcentaje] = useState(initialData.porcentaje_a_agregar || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({
      lista_de_precio_id: listaId,
      porcentaje_a_agregar: porcentaje,
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>
          {initialData.lista_de_precio_id ? `Editar Lista ${initialData.lista_de_precio_id}` : 'Nueva Lista'}
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="lista_id">ID de lista</label>
          <input
            id="lista_id"
            value={listaId}
            onChange={(e) => setListaId(e.target.value)}
            placeholder="ID de lista"
            required
            disabled={!!initialData.lista_de_precio_id}
          />
          <label htmlFor="porcentaje">Porcentaje a agregar</label>
          <input
            id="porcentaje"
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
