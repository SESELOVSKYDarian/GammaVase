import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import ProductoCard from "./ProductoCard";
import "./catalogo.css";

const MotionDiv = motion.div;

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [searchParams] = useSearchParams();

  const [busqueda, setBusqueda] = useState("");
  const [granFamilia, setGranFamilia] = useState("");
  const [tipoFamilia, setTipoFamilia] = useState("");
  const [codigoColor, setCodigoColor] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/familias")
      .then((res) => res.json())
      .then((data) => setFamilias(data));
  }, []);

  useEffect(() => {
    const inicial = searchParams.get("search") || "";
    setBusqueda(inicial);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (granFamilia) params.append("gran_familia", granFamilia);
    if (tipoFamilia) params.append("tipo_familia", tipoFamilia);
    if (codigoColor) params.append("codigo_color", codigoColor);
    if (busqueda) params.append("q", busqueda);

    fetch(`http://localhost:3000/api/productos?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, [granFamilia, tipoFamilia, codigoColor, busqueda]);

  const granFamilias = [...new Set(familias.map((f) => f.gran_familia))];
  const tiposFamilia = [
    ...new Set(
      familias
        .filter((f) => !granFamilia || f.gran_familia === granFamilia)
        .map((f) => f.tipo_familia)
    ),
  ];

  const productosAgrupados = productos.reduce((acc, prod) => {
    const gf = prod.gran_familia || "Sin familia";
    const tf = prod.tipo_familia || "Sin tipo";
    if (!acc[gf]) {
      acc[gf] = { tipo: tf, productos: [] };
    }
    acc[gf].productos.push(prod);
    return acc;
  }, {});

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="catalogo-wrapper">
        <div className="catalogo-header">
          <h1 className="titulo-catalogo">Productos</h1>
          <img src="/logo2.png" alt="Logo empresa" className="logo-catalogo" />
        </div>

        <div className="catalogo-container">
          <aside className="sidebar">
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <h2>Filtros</h2>
            <label>Gran familia</label>
            <select value={granFamilia} onChange={(e) => setGranFamilia(e.target.value)}>
              <option value="">Todas</option>
              {granFamilias.map((gf) => (
                <option key={gf} value={gf}>
                  {gf}
                </option>
              ))}
            </select>
            <label>Tipo familia</label>
            <select value={tipoFamilia} onChange={(e) => setTipoFamilia(e.target.value)}>
              <option value="">Todos</option>
              {tiposFamilia.map((tf) => (
                <option key={tf} value={tf}>
                  {tf}
                </option>
              ))}
            </select>
            <label>Código de color</label>
            <input
              type="text"
              placeholder="#FFFFFF"
              value={codigoColor}
              onChange={(e) => setCodigoColor(e.target.value)}
            />
          </aside>

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
                    <ProductoCard key={prod.id} producto={prod} />
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Catalogo;
