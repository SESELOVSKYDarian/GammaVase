// src/context/CarritoContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const porcentaje = usuario?.porcentaje_a_agregar || 0;
        const base =
          usuario?.rol === "mayorista"
            ? producto.precio_mayorista
            : producto.precio_minorista;
        const precio = base * (1 + parseFloat(porcentaje) / 100);

        return [
          ...prev,
          {
            id: producto.id,
            articulo: producto.articulo,
            cantidad,
            precio_unitario: precio,
            subtotal: precio * cantidad,
            imagen: producto.img_articulo[0],
          },
        ];
      }
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        totalItems,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
