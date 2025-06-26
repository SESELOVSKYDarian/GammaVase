import React from 'react';
import './Ideas.css'; // Asumimos que vas a tener estilos acá

const Ideas = () => {
  const categorias = [
    'Ropa y accesorios',
    'Decoración para el hogar',
    'Amigurumis (muñequitos tejidos)',
    'Decoraciones de temporada',
    'Accesorios prácticos',
    'Proyectos para bebés',
    'Próximamente',
    'Próximamente',
    'Próximamente',
  ];

  return (
    <div className="ideas-page">
      {/* Banner */}
      <div className="ideas-banner">
        <img src="/logo.png" alt="Logo Gamma" className="logo-gamma" />

        <h1>IDEAS</h1>
      </div>

      {/* Categoría título */}
      <h2 className="ideas-subtitle">Categorías</h2>

      {/* Grid de categorías */}
      <div className="ideas-grid">
        {categorias.map((titulo, index) => (
          <div key={index} className="idea-card">
            {/* Acá va la imagen como fondo vía CSS o img tag */}
            <div className="idea-overlay">
              <p>{titulo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
