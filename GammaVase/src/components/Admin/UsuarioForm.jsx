import React, { useState, useEffect } from 'react';
import './UsuarioForm.css';

const UsuarioForm = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    id: '',
    cliente: '',
    contrasena: '',
    rol: 'cliente',
    lista_de_precio: '',
  });
  const [listas, setListas] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    fetch('http://localhost:3000/api/precios')
      .then((res) => res.json())
      .then((data) => setListas(data));
  }, []);

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
        <h2>{initialData ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
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
          <option value="cliente">Cliente</option>
          <option value="mayorista">Mayorista</option>
          <option value="admin">Administrador</option>
        </select>

        <select
          name="lista_de_precio"
          value={formData.lista_de_precio}
          onChange={handleChange}
          required
        >
          <option value="">Lista de precio</option>
          {listas.map((l) => (
            <option key={l.lista_de_precio_id} value={l.lista_de_precio_id}>
              {l.lista_de_precio_id}
            </option>
          ))}
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
