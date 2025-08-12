import React, { useEffect, useState, useContext } from "react";
import { CarritoContext } from "../../Carrito/CarritoContext"; // corregí si tu ruta es distinta
import { toast } from "react-toastify";
import { motion } from "framer-motion";
const MotionDiv = motion.div;
import { useParams } from "react-router-dom";
import ProductoCard from "../ProductoCard";
import "./Producto.css";

const Producto = () => {
  const { slug } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [relacionados, setRelacionados] = useState([]);
const { agregarProducto } = useContext(CarritoContext);
const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    fetch(`http://localhost:3000/api/productos/slug/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => {
        setProducto(data);
        setImagenActiva(data.img_articulo[0]);
        setCargando(false);

        // Obtener productos relacionados de la misma familia
        fetch(`http://localhost:3000/api/productos/familia/${data.familia_id}`)
          .then((res) => res.json())
          .then((rel) => {
            const filtrados = rel.filter((p) => p.url !== slug); // <-- acá
            setRelacionados(filtrados);
          });
      })
      .catch((err) => {
        console.error(err);
        setCargando(false);
      });
  }, [slug]);

  if (cargando) return <p>Cargando producto...</p>;
  if (!producto) return <h2>Producto no encontrado</h2>;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="producto-container">
        <div className="producto-grid">
          <p className="breadcrumb">
            {producto.gran_familia} / {producto.tipo_familia}
          </p>

          <div className="producto">
            <div className="producto-imagen">
              <img src={imagenActiva} alt={producto.articulo} />
            </div>

            <div className="producto-info">
              <h1>{producto.articulo}</h1>
              {(() => {
                const porcentaje = usuario?.porcentaje_a_agregar || 0;
                const base = usuario
                  ? usuario.rol === "mayorista"
                    ? producto.precio_mayorista
                    : producto.precio_minorista
                  : null;
                const precio =
                  base !== null ? base * (1 + parseFloat(porcentaje) / 100) : null;
                return precio !== null ? (
                  <p className="precio">${precio.toLocaleString("es-AR")}</p>
                ) : (
                  <p className="precio">Iniciá sesión para ver precio</p>
                );
              })()}
              {producto.codigo_color && (
                <p className="codigo-color">
                  <span
                    className="color-box"
                    style={{ backgroundColor: producto.codigo_color }}
                  ></span>
                  {producto.codigo_color}
                </p>
              )}
              <p>{producto.descripcion}</p>

              <div className="acciones">
                <div className="contador">
                  <button
                    onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  >
                    –
                  </button>
                  <span>{cantidad}</span>
                  <button onClick={() => setCantidad((c) => c + 1)}>+</button>
                </div>
                      <button
                  className="btn-comprar"
                  onClick={() => {
  if (usuario) {
    agregarProducto(producto, cantidad);
    toast.success(`${producto.articulo} agregado al carrito 🛒`);
  } else {
    toast.info("Iniciá sesión para agregar productos.");
  }

                  }}
                >
                  Añadir 🛒
                </button>
                
                <button className="btn-comprar">COMPRAR</button>
              </div>
            </div>
          </div>

          {producto.img_articulo?.length > 1 && (
            <div className="miniaturas">
              {producto.img_articulo.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Miniatura ${i + 1}`}
                  className={`miniatura-img ${
                    imagenActiva === img ? "activa" : ""
                  }`}
                  onClick={() => setImagenActiva(img)}
                />
              ))}
            </div>
          )}

          <h2 className="relacionados-titulo">Productos Relacionados</h2>
        </div>

        <div className="relacionados-grid">
          {relacionados.length > 0 ? (
            relacionados.map((prod) => (
              <ProductoCard key={prod._id} producto={prod} />
            ))
          ) : (
            <p>No hay productos relacionados.</p>
          )}
        </div>
      </div>
    </MotionDiv>
  );
};

export default Producto;
