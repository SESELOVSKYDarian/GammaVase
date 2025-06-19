import React from 'react';

const Home = () => {
  return (
    <div className="home-encabezado">
        <header>
        <div className="home-button-container">
        <a href="/catalogo" className="home-button">Catalogo</a>
        <a href="/ideas" className="home-button">Ideas</a>
        <a href="/contacto" className="home-button">Contacto</a>
        <a href="/empresa" className="home-button">EMPRESA</a>
      </div>
        </header>
    </div>
  );
};

export default Home;
