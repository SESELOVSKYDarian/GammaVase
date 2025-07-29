import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductoCard from "./ProductoCard";
import "./catalogo.css";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [familias, setFamilias] = useState([]);
  const agregarAlCarrito = (producto, cantidad) => {
    console.log("Agregar al carrito:", producto, cantidad);
    // aquí puedes guardar en context o localStorage
  };

  useEffect(() => {
    // Traer productos
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));

    // Traer familias
    fetch("http://localhost:3000/api/familias")
      .then((res) => res.json())
      .then((data) => setFamilias(data));
  }, []);

  // Luego, para agrupar y mostrar, podés hacer algo así:

  const productosAgrupados = productos.reduce((acc, prod) => {
    // Buscar la familia que coincide con prod.familia_id
    const familiaObj = familias.find((f) => f.id === prod.familia_id);

    const familiaNombre = familiaObj ? familiaObj.familia : "Sin familia";
    const tipo = familiaObj ? familiaObj.tipo : "Sin tipo";

    if (!acc[familiaNombre]) {
      acc[familiaNombre] = {
        tipo: tipo,
        productos: [],
      };
    }

    acc[familiaNombre].productos.push(prod);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="catalogo-wrapper">
        {/* ENCABEZADO SUPERIOR */}
        <div className="catalogo-header">
          <h1 className="titulo-catalogo">Productos</h1>
          <img src="/logo2.png" alt="Logo empresa" className="logo-catalogo" />
        </div>

        {/* CONTENIDO CON FILTROS Y PRODUCTOS */}
        <div className="catalogo-container">
          {/* Filtros laterales */}
          <aside className="sidebar">
            <h2>Filtros</h2>
            <label>Tipo</label>
            <select>
              <option>Todos</option>
            </select>
            <label>Medición</label>
            <select>
              <option>Todos</option>
            </select>
            <label>Cantidad</label>
            <input type="number" placeholder="Ingrese cantidad" />
          </aside>

          {/* Contenido principal */}
          <main className="contenido">
            {Object.entries(productosAgrupados).map(([familia, datos]) => (
              <section key={familia}>
                <div className="titulo-principal">
                  <h3>{familia}</h3>
                </div>
                <div className="titulo-familia">
                  <h4>{datos.tipo}</h4>
                </div>
                <div className="productos-grid">
                  {datos.productos.map((prod) => (
                    <ProductoCard
                      key={prod.id}
                      producto={prod}
                      onAgregarAlCarrito={agregarAlCarrito}
                    />
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default Catalogo;
