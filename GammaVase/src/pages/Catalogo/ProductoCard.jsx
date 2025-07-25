import React, { useState } from "react";
import "./ProductoCard.css";

const ProductoCard = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);

  const aumentar = () => setCantidad((prev) => prev + 1);
  const disminuir = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="card-producto">
      <div className="imagen-container">
        <img
          src={`/imgCata/${producto.img_articulo[0]}`}
          alt={producto.articulo}
          className="imagen-principal"
        />
      </div>
      <div className="detalle-producto">
        <p className="titulo-producto">{producto.articulo}</p>
        <p className="precio-producto">${producto.precio.toLocaleString("es-AR")}</p>
        <div className="acciones">
          <div className="contador">
            <button onClick={disminuir}>–</button>
            <span>{cantidad}</span>
            <button onClick={aumentar}>+</button>
          </div>
          <button className="btn-comprar">COMPRAR</button>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
