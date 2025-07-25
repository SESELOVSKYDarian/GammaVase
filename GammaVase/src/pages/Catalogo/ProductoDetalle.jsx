import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductoCard from "./ProductoCard";
import "./detalles.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => {
        const actual = data.find((p) => p.id === parseInt(id));
        setProducto(actual);
        const relacionados = data.filter((p) =>
          p.familia === actual.familia && p.id !== actual.id
        );
        setRelacionados(relacionados);
      });
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="producto-detalle">
      <div className="info-principal">
        <div className="img-grande">
          <img src={`/imgCata/${producto.img_articulo[0]}`} alt={producto.articulo} />
        </div>
        <div className="info-texto">
          <p className="ruta">Hilos / {producto.familia}</p>
          <h2>{producto.articulo}</h2>
          <p className="precio">${producto.precio}</p>
          <p><b>Color</b></p>
          <p>{producto.linea}</p>

          <div className="acciones">
            <button className="añadir">Añadir 🛒</button>
            <button className="comprar">COMPRAR</button>
          </div>
        </div>
      </div>

      <div className="miniaturas">
        {producto.img_articulo.map((img, i) => (
          <img key={i} src={`/imgCata/${img}`} alt={`variante ${i}`} />
        ))}
      </div>

      <h3>Productos Relacionados</h3>
      <div className="relacionados-grid">
        {relacionados.map((p) => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductoDetalle;
