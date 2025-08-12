import React, { useState } from 'react';
import './UsuarioForm.css';

const UsuarioForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    cliente: '',
    contrasena: '',
    rol: 'cliente', // valor por defecto
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Agregar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <input
            name="cliente"
            placeholder="Cliente"
            value={formData.cliente}
            onChange={handleChange}
            required
          />
          <input
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />

          <select name="rol" value={formData.rol} onChange={handleChange}>
            <option value="cliente">Cliente Minorista</option>
            <option value="mayorista">Cliente Mayorista</option>
            <option value="admin">Administrador</option>
          </select>

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

export default UsuarioForm;
