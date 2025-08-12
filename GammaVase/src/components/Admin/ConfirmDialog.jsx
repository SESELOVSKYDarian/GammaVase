import React from 'react';
import './UsuarioForm.css';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="modal-backdrop">
    <div className="modal">
      <p>{message}</p>
      <div className="modal-actions">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
