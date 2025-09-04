// src/components/ProductoCard.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, ShoppingCart, Eye } from "lucide-react";
import { CarritoContext } from "../Carrito/CarritoContext"; // ✅ corregí ruta si es necesario
import "./ProductoCard.css";
import { toast } from "react-toastify";


const ProductoCard = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const { agregarProducto } = useContext(CarritoContext); // ✅ accedés al contexto

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const porcentaje = usuario?.porcentaje_a_agregar || 0;
  const base = usuario
    ? usuario.rol === "mayorista"
      ? producto.precio_mayorista
      : producto.precio_minorista
    : null;
  const precio =
    base !== null ? base * (1 + parseFloat(porcentaje) / 100) : null;

  const aumentar = () => setCantidad((prev) => prev + 1);
  const disminuir = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

 const agregarAlCarrito = () => {
  if (usuario && agregarProducto) {
    agregarProducto(producto, cantidad);
    toast.success(`${producto.articulo} agregado al carrito 🛒`);
  } else {
    toast.info("Debes iniciar sesión para agregar productos.");
  }
};


  return (
    <div className="card-producto">
      <div className="imagen-container">
        <img
          src={producto.img_articulo[0]}
          alt={producto.articulo}
          className="imagen-principal"
        />
      </div>

      <div className="detalle-producto">
        <p className="titulo-producto">{producto.articulo}</p>

        {precio !== null ? (
          <p className="precio-producto">${precio.toLocaleString("es-AR")}</p>
        ) : (
          <p className="precio-producto">Iniciá sesión para ver precio</p>
        )}

        <div className="acciones">
          <div className="contador">
            <button onClick={disminuir}>–</button>
            <span>{cantidad}</span>
            <button onClick={aumentar}>+</button>
          </div>

          <button className="btn-carrito" onClick={agregarAlCarrito}>
            <ShoppingCart strokeWidth={2.5} />
          </button>
          <Link to={`/productos/${producto.url}`} className="btn-vermas">
            <Eye strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
