import React from 'react';
import './RopaAccesorios.css'; // Asegurate de crear este CSS
import TijerasImage from "../../components/Empresa/TijerasImage";

const RopaAccesorios = () => {
  const subcategorias = [
    { titulo: 'Gorros', imagen: '/ideas/gorro.png', pdf: '/pdfs/gorros.pdf' },
    { titulo: 'bufandas', imagen: '/ideas/bufandas.jpg', video: 'https://youtu.be/bufandas' },
    { titulo: 'Guantes', imagen: '/ideas/guantes.jpg', pdf: '/pdfs/guantes.pdf' },
    { titulo: 'Chalecos', imagen: '/ideas/chalecos.jpeg', video: 'https://youtu.be/chalecos' },
    { titulo: 'Ponchos', imagen: '/ideas/ponchos.jpg', pdf: '/pdfs/ponchos.pdf' },
    { titulo: 'Calentadores', imagen: '/ideas/calentadores.jpeg', video: 'https://youtu.be/calentadores' },
  ];

  const handleCardClick = (item) => {
    if (item.pdf) {
      const link = document.createElement('a');
      link.href = item.pdf;
      link.download = '';
      link.click();
    } else if (item.video) {
      window.open(item.video, '_blank');
    }
  };

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
            onClick={() => handleCardClick(item)}
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
