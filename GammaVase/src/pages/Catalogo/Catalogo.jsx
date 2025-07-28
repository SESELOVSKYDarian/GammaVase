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
  const familia = prod.familia || "Sin familia";
  const tipo = prod.tipo || "Sin tipo";

  if (!acc[familia]) {
    acc[familia] = {
      tipo: tipo,
      productos: [],
    };
  }

  acc[familia].productos.push(prod);
  return acc;
}, {});


  return (
    <div className="catalogo-wrapper">
      {/* ENCABEZADO SUPERIOR */}
      <div className="catalogo-header">
        <h1 className="titulo-catalogo">Productos</h1>
        <img src="/logo.png" alt="Logo empresa" className="logo-catalogo" />
      </div>

      {/* CONTENIDO CON FILTROS Y PRODUCTOS */}
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
            <div className="titulo-principal">
   <h1>{Object.values(productosAgrupados)[0]?.tipo || "Productos"}</h1>
  </div>

      {Object.entries(productosAgrupados).map(([familia, datos]) => (
  <section key={familia}>
    <div className="titulo-familia">
      <h3>{familia}</h3>
      <h4>{datos.tipo}</h4>
    </div>
    <div className="productos-grid">
      {datos.productos.map((prod) => (
        <ProductoCard key={prod.id} producto={prod} />
      ))}
    </div>
  </section>
))}


          
        </main>
      </div>
    </div>
  );
};

export default Catalogo;
