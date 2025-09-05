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
  const [colorOptions, setColorOptions] = useState([]);
  const [sinResultados, setSinResultados] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/familias")
      .then((res) => res.json())
      .then((data) => setFamilias(data));
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
    fetch("http://localhost:3000/api/productos/color-codes")
      .then((res) => res.json())
      .then((data) => setColorOptions(data));
  }, []);

  useEffect(() => {
    const inicial = searchParams.get("search") || "";
    setBusqueda(inicial);
    if (inicial) {
      fetch(`http://localhost:3000/api/productos?q=${encodeURIComponent(inicial)}`)
        .then((res) => res.json())
        .then((data) => {
          setProductos(data);
          setSinResultados(data.length === 0);
        });
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (granFamilia) params.append("gran_familia", granFamilia);
    if (tipoFamilia) params.append("tipo_familia", tipoFamilia);
    fetch(`http://localhost:3000/api/productos/color-codes?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setColorOptions(data));
  }, [granFamilia, tipoFamilia]);

  const fetchProductos = () => {
    const params = new URLSearchParams();
    if (granFamilia) params.append("gran_familia", granFamilia);
    if (tipoFamilia) params.append("tipo_familia", tipoFamilia);
    if (codigoColor) params.append("codigo_color", codigoColor);
    if (busqueda) params.append("q", busqueda);
    fetch(`http://localhost:3000/api/productos?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setSinResultados(
          data.length === 0 &&
            (busqueda || granFamilia || tipoFamilia || codigoColor)
        );
      });
  };

  const handleBuscar = () => {
    if (!busqueda && !granFamilia && !tipoFamilia && !codigoColor) {
      setShowModal(true);
      return;
    }
    fetchProductos();
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setGranFamilia("");
    setTipoFamilia("");
    setCodigoColor("");
    setSinResultados(false);
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  };

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
    if (!acc[gf]) acc[gf] = {};
    if (!acc[gf][tf]) acc[gf][tf] = [];
    acc[gf][tf].push(prod);
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
            <h2>Filtros</h2>
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <label>Gran familia</label>
            <select
              value={granFamilia}
              onChange={(e) => {
                setGranFamilia(e.target.value);
                setTipoFamilia("");
              }}
            >
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
              list="colores"
              type="text"
              placeholder="FFFFFF"
              value={codigoColor}
              onChange={(e) => setCodigoColor(e.target.value)}
            />
            <datalist id="colores">
              {colorOptions.map((c) => (
                <option key={c} value={c.replace('#','')} />
              ))}
            </datalist>
            <div className="filter-buttons">
              <button type="button" className="filter-btn" onClick={handleBuscar}>
                Buscar
              </button>
              <button type="button" className="filter-btn" onClick={limpiarFiltros}>
                Limpiar filtros
              </button>
            </div>
          </aside>

          <main className="contenido">
            {sinResultados ? (
              <p className="no-result">
                No se encontró un producto con ese nombre. Sugerencia: busca por los
                filtros.
              </p>
            ) : (
              Object.entries(productosAgrupados).map(([familia, tipos]) => (
                <section key={familia}>
                  <div className="titulo-principal">
                    <h3>{familia}</h3>
                  </div>
                  {Object.entries(tipos).map(([tipo, prods]) => (
                    <React.Fragment key={tipo}>
                      <div className="titulo-familia">
                        {(() => {
                          const info = familias.find(
                            (f) =>
                              f.gran_familia === familia &&
                              f.tipo_familia === tipo
                          );
                          return info && info.usar_imagen && info.img_subtitulo ? (
                            <img
                              src={`http://localhost:3000${info.img_subtitulo}`}
                              alt={tipo}
                              className="imagen-familia"
                            />
                          ) : (
                            <h4>{tipo}</h4>
                          );
                        })()}
                      </div>
                      <div className="productos-grid">
                        {prods.map((prod) => (
                          <ProductoCard key={prod.id} producto={prod} />
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
                </section>
              ))
            )}
          </main>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>No se seleccionó ningún filtro</p>
            <div className="modal-actions">
              <button className="filter-btn" onClick={() => setShowModal(false)}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </MotionDiv>
  );
};

export default Catalogo;
