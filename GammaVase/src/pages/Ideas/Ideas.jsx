import React from 'react';
import './Ideas.css';
import TijerasImage from "../../components/Empresa/TijerasImage"; // Ajustá el path si hace falta
 // Asegurate que el path sea correcto

const Ideas = () => {
  const categorias = [
    { titulo: 'Ropa y accesorios', imagen: '/ideas/ropayaccesorios.jpg' },
    { titulo: 'Decoración para el hogar', imagen: '/ideas/decoracionparaelhogar.jpg' },
    { titulo: 'Amigurumis', imagen: '/ideas/amigurimus.png' },
    { titulo: 'Decoraciones de temporada', imagen: '/ideas/decoracionfestivas.jpg' },
    { titulo: 'Accesorios prácticos', imagen: '/ideas/AccesoriosPracticos.jpg' },
    { titulo: 'Proyectos para bebés', imagen: '/ideas/proyectosparabebes.png' },
    { titulo: 'Próximamente', imagen: '/ideas/proximamente.jpg' },
    { titulo: 'Próximamente', imagen: '/ideas/proximamente.jpg' },
    { titulo: 'Próximamente', imagen: '/ideas/proximamente.jpg' },
  ];

  return (
    <div className="ideas-page">
      {/* Banner */}
      <div className="ideas-banner">
        <img src="/logo.png" alt="Logo Gamma" className="logo-gamma" />
        <h1>IDEAS</h1>
      </div>

      {/* ✅ Tijeras justo debajo del banner */}
      <TijerasImage />

      {/* Categoría título */}
      <h2 className="ideas-subtitle">Categorías</h2>

      {/* Grid de categorías */}
      <div className="ideas-grid">
        {categorias.map((cat, index) => (
          <div
            key={index}
            className="idea-card"
            style={{ backgroundImage: `url(${cat.imagen})` }}
          >
            <div className="idea-overlay">
              <p>{cat.titulo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
