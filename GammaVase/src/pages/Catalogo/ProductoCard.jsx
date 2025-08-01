import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, ShoppingCart, Eye } from "lucide-react";
import "./ProductoCard.css";

const ProductoCard = ({ producto, onAgregarAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const precio = usuario
    ? usuario.rol === "mayorista"
      ? producto.precio_mayorista
      : producto.precio_minorista
    : null;

  const aumentar = () => setCantidad((prev) => prev + 1);
  const disminuir = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const agregarAlCarrito = () => {
    if (onAgregarAlCarrito) {
      onAgregarAlCarrito(producto, cantidad);
    }
  };

  return (
    <div className="card-producto">
      <div className="imagen-container">
        <img
          src={`${producto.img_articulo[0]}`}
          alt={producto.articulo}
          className="imagen-principal"
        />
      </div>

      <div className="detalle-producto">
        <p className="titulo-producto">{producto.articulo}</p>

        {precio !== null ? (
          <p className="precio-producto">
            ${precio.toLocaleString("es-AR")}
          </p>
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
            <ShoppingCart size={20} strokeWidth={2.5} />
          </button>
          <Link to={`/productos/${producto.url}`} className="btn-vermas">
            <Eye size={20} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
