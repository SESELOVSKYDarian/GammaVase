import React, { useEffect, useState } from "react";
import ProductoCard from "./ProductoCard";
import "./catalogo.css";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const productosAgrupados = productos.reduce((acc, prod) => {
    if (!acc[prod.familia]) acc[prod.familia] = [];
    acc[prod.familia].push(prod);
    return acc;
  }, {});

  return (
    <div className="catalogo-container">
      {/* Filtros laterales */}
      <aside className="sidebar">
        <h2>Filtros</h2>
        <label>Tipo</label>
        <select><option>Todos</option></select>
        <label>Medición</label>
        <select><option>Todos</option></select>
        <label>Cantidad</label>
        <input type="number" placeholder="Ingrese cantidad" />
      </aside>

      {/* Contenido principal */}
      <main className="contenido">
        <h1>Hilos de Coser</h1>
        {Object.entries(productosAgrupados).map(([familia, lista]) => (
          <section key={familia}>
            <h2>{familia}</h2>
            <div className="productos-grid">
              {lista.map((prod) => (
                <ProductoCard key={prod.id} producto={prod} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Catalogo;
