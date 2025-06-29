import React from 'react';
import './Ideas.css';
import TijerasImage from "../../components/Empresa/TijerasImage";
import { Link } from 'react-router-dom'; // 🧠 Importá Link para navegación interna

const Ideas = () => {
  const categorias = [
    { titulo: 'Ropa y accesorios', imagen: '/ideas/ropayaccesorios.jpg', link: '/ropa-accesorios' },
    { titulo: 'Decoración para el hogar', imagen: '/ideas/decoracionparaelhogar.jpg' },
    { titulo: 'Amigurumis', imagen: '/ideas/amigurimus.png' },
    { titulo: 'Decoraciones de temporada', imagen: '/ideas/decoracionfestivas.jpg' },
    { titulo: 'Accesorios prácticos', imagen: '/ideas/AccesoriosPracticos.jpg', link: '/accesorios-practicos' },
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

      {/* Tijeras */}
      <TijerasImage />

      {/* Título Categorías */}
      <h2 className="ideas-subtitle">Categorías</h2>

      {/* Grid de categorías */}
      <div className="ideas-grid">
        {categorias.map((cat, index) => {
          const cardContent = (
            <div
              className="idea-card"
              style={{ backgroundImage: `url(${cat.imagen})` }}
            >
              <div className="idea-overlay">
                <p>{cat.titulo}</p>
              </div>
            </div>
          );

          return cat.link ? (
            <Link to={cat.link} key={index}>
              {cardContent}
            </Link>
          ) : (
            <div key={index}>{cardContent}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Ideas;
