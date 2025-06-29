import React from 'react';
import './RopaAccesorios.css'; // Asegurate de crear este CSS
import TijerasImage from "../../components/Empresa/TijerasImage";

const RopaAccesorios = () => {
  const subcategorias = [
    { titulo: 'Gorros', imagen: '/ideas/gorro.png' },
    { titulo: 'bufandas', imagen: '/ideas/bufandas.jpg' },
    { titulo: 'Guantes', imagen: '/ideas/guantes.jpg' },
    { titulo: 'Chalecos', imagen: '/ideas/chalecos.jpeg' },
    { titulo: 'Ponchos', imagen: '/ideas/ponchos.jpg' },
    { titulo: 'Calentadores', imagen: '/ideas/calentadores.jpeg' },
  ];

  return (
    <div className="ropa-page">
      {/* Banner */}
      <div className="ropa-banner">
        <img src="/logo.png" alt="Logo Gamma" className="logo-gamma" />
        <h1>Ropa y Accesorios</h1>
      </div>

      {/* Tijeras decorativas */}
      <TijerasImage />

      {/* Título de sección */}
      <h2 className="ropa-subtitle">Archivos</h2>

      {/* Grid de subcategorías */}
      <div className="ropa-grid">
        {subcategorias.map((item, index) => (
          <div
            key={index}
            className="ropa-card"
            style={{ backgroundImage: `url(${item.imagen})` }}
          >
            <div className="ropa-overlay">
              <p>{item.titulo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RopaAccesorios;
