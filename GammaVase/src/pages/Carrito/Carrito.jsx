// src/components/Carrito.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CarritoContext } from "../Carrito/CarritoContext";
import "../Carrito/Carrito.css";

const Carrito = () => {
  const { carrito, eliminarProducto, vaciarCarrito } = useContext(CarritoContext);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio_unitario * item.cantidad,
    0
  );

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">🛒 Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map((item) => (
              <li className="carrito-item" key={item.id}>
                <img
                  src={item.imagen}
                  alt={item.articulo}
                  className="carrito-img"
                />
                <div className="carrito-detalle">
                  <p className="carrito-articulo">{item.articulo}</p>
                  <p>
                    {item.cantidad} x ${item.precio_unitario.toLocaleString("es-AR")}
                  </p>
                  <p>
                    Subtotal: ${
                      (item.precio_unitario * item.cantidad).toLocaleString("es-AR")
                    }
                  </p>
                </div>
                <button
                  className="carrito-eliminar"
                  onClick={() => eliminarProducto(item.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="carrito-footer">
            <h3>Total: ${total.toLocaleString("es-AR")}</h3>
            <button className="carrito-vaciar" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
            <button className="carrito-comprar">Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
