import React, { useEffect, useState, useContext } from "react";
import styles from "./FeaturedSlider.module.css";
import { CarritoContext } from "../../pages/Carrito/CarritoContext";

const FeaturedSlider = () => {
  const [productos, setProductos] = useState([]);
  const [index, setIndex] = useState(0);
  const { agregarProducto } = useContext(CarritoContext);

  useEffect(() => {
    fetch("http://localhost:3000/api/productos/slider")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar slider", err));
  }, []);

  const siguiente = () => {
    if (productos.length)
      setIndex((prev) => (prev + 1) % productos.length);
  };

  const anterior = () => {
    if (productos.length)
      setIndex((prev) => (prev - 1 + productos.length) % productos.length);
  };

  const getClass = (i) => {
    if (!productos.length) return styles.inactive;
    if (i === index) return styles.active;
    if (i === (index + 1) % productos.length) return styles.next;
    if (i === (index - 1 + productos.length) % productos.length) return styles.prev;
    return styles.inactive;
  };

  const actual = productos[index];

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>{actual?.articulo}</h2>
          <p>{actual?.descripcion}</p>
          {actual && (
            <button
              className={styles.addButton}
              onClick={() => agregarProducto(actual)}
            >
              Agregar al carrito
            </button>
          )}
        </div>
        <div className={styles.sliderArea}>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={anterior}
          >
            ‹
          </button>
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={siguiente}
          >
            ›
          </button>
          {productos.map((p, i) => (
            <div key={p.id} className={`${styles.productImage} ${getClass(i)}`}>
              <img src={`http://localhost:3000${p.img_articulo[0]}`} alt={p.articulo} />
            </div>
          ))}
          <div className={styles.dots}>
            {productos.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
                onClick={() => setIndex(i)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSlider;
