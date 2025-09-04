import React from 'react';
import './UsuarioForm.css';

const ConfirmDialog = ({
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Sí',
  cancelLabel = 'No',
}) => (
  <div className="modal-backdrop">
    <div className="modal">
      <p>{message}</p>
      <div className="modal-actions">
        <button onClick={onConfirm}>{confirmLabel}</button>
        <button onClick={onCancel}>{cancelLabel}</button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
