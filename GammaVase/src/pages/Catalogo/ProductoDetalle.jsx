import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductoCard from "./ProductoCard";
import { CarritoContext } from "../Carrito/CarritoContext"; // corregí la ruta si es necesario
import { toast } from "react-toastify";
import "./detalles.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const { agregarProducto } = useContext(CarritoContext);

  useEffect(() => {
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => {
        const actual = data.find((p) => p.id === parseInt(id));
        setProducto(actual);

        const relacionados = data
          .filter(
            (p) => p.gran_familia === actual.gran_familia && p.id !== actual.id
          )
          .slice(0, 5);
        setRelacionados(relacionados);
      });
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const precio =
    usuario?.rol === "mayorista"
      ? producto.precio_mayorista
      : producto.precio_minorista;

  return (
    <div className="producto-detalle">
      <div className="info-principal">
        <div className="img-grande">
          <img
            src={`/imgCata/${producto.img_articulo[0]}`}
            alt={producto.articulo}
          />
        </div>

        <div className="info-texto">
          <p className="ruta">Hilos / {producto.gran_familia}</p>
          <h2>{producto.articulo}</h2>

          <p className="precio">${precio}</p>

          <p><b>Color</b></p>
          <p>{producto.linea}</p>

          <div className="acciones">
            
          <button
  className="comprar"
  onClick={() => {
    if (usuario) {
      agregarProducto(producto, 1);
      toast.success(`${producto.articulo} agregado al carrito 🛒`);
    } else {
      toast.info("Iniciá sesión para agregar productos.");
    }
  }}
>
  Añadir 🛒
</button>


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
