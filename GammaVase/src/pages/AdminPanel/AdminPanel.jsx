import { Link } from "react-router-dom"; //
import { motion } from "framer-motion";

import React from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      {/* Banner */}
      <div className="admin-banner">
        <h1>Administración</h1>
      </div>

      {/* Sección Usuarios */}
      <div className="admin-section">
        <h2>Usuarios <span className="actions">➕ ✏️ 🗑️</span></h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Contraseña</th>
              <th>Precios</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Cliente1</td>
              <td>12345</td>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Cliente2</td>
              <td>67890</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sección Precios */}
      <div className="admin-section">
        <h2>Precios <span className="actions">➕ ✏️ 🗑️</span></h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precios</th>
              <th>Número ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hilo P...</td>
              <td>$9.312</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Hilo A...</td>
              <td>$10.500</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sección Ideas */}
      <div className="admin-section">
        <h2>Ideas <span className="actions">➕ ✏️ 🗑️</span></h2>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gorros</td>
              <td>Idea1</td>
              <td>12345.pdf</td>
            </tr>
            <tr>
              <td>Gorros</td>
              <td>Idea2</td>
              <td>67890.pdf</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
