import React from 'react';
import './DecoracionHogar.css';
import TijerasImage from "../../components/Empresa/TijerasImage";

const DecoracionHogar = () => {
  const subcategorias = [
    { titulo: 'Cojines', imagen: '/ideas/cojines.jpg', pdf: '/pdfs/cojines.pdf' },
    { titulo: 'Mantas', imagen: '/ideas/mantas.jpg', video: 'https://youtu.be/mantas' },
    { titulo: 'Cestos', imagen: '/ideas/cestos.jpg', pdf: '/pdfs/cestos.pdf' },
    { titulo: 'Tapetes', imagen: '/ideas/tapetes.jpg', video: 'https://youtu.be/tapetes' },
    { titulo: 'Portavelas', imagen: '/ideas/portavelas.jpg', pdf: '/pdfs/portavelas.pdf' },
    { titulo: 'Macramé', imagen: '/ideas/macrame.jpg', video: 'https://youtu.be/macrame' },
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
    <div className="decoracion-page">
      <div className="decoracion-banner">
        <img src="/logo.png" alt="Logo Gamma" className="logo-gamma" />
        <h1>Decoración para el Hogar</h1>
      </div>

      <TijerasImage />

      <h2 className="decoracion-subtitle">Archivos</h2>

      <div className="decoracion-grid">
        {subcategorias.map((item, index) => (
          <div
            key={index}
            className="decoracion-card"
            style={{ backgroundImage: `url(${item.imagen})` }}
            onClick={() => handleCardClick(item)}
          >
            <div className="decoracion-overlay">
              <p>{item.titulo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecoracionHogar;

