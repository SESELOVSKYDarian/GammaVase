import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./FeaturedSlider.module.css";
import { CarritoContext } from "../../pages/Carrito/CarritoContext";

const MotionDiv = motion.div;
const MotionButton = motion.button;

const FeaturedSlider = () => {
  const [productos, setProductos] = useState([]);
  const [index, setIndex] = useState(0);
  const { agregarProducto } = useContext(CarritoContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/productos/slider")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar slider", err));
  }, []);

  const siguiente = () => {
    if (productos.length) setIndex((prev) => (prev + 1) % productos.length);
  };

  const anterior = () => {
    if (productos.length)
      setIndex((prev) => (prev - 1 + productos.length) % productos.length);
  };

  const getClass = (i) => {
    if (!productos.length) return styles.inactive;
    if (i === index) return styles.active;
    if (i === (index + 1) % productos.length) return styles.next;
    if (i === (index - 1 + productos.length) % productos.length)
      return styles.prev;
    return styles.inactive;
  };

  const actual = productos[index];

  const handleAgregar = (prod) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      agregarProducto(prod);
      toast.success(`${prod.articulo} agregado al carrito 🛒`);
    } else {
      toast.info("Iniciá sesión para agregar productos.");
      navigate("/login");
    }
  };

  return (
    <MotionDiv
      className={styles.sliderWrapper}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className={styles.content}>
        <img
          src="logo2.png"
          alt="Gammamodas"
          className={styles.decorativeImg}
        />
        <div className={styles.text}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {actual?.articulo}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {actual?.descripcion}
          </motion.p>
          {actual && (
            <MotionButton
              className={styles.addButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAgregar(actual)}
            >
              Agregar al carrito
            </MotionButton>
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
              <img
                src={`http://localhost:3000${p.img_articulo[0]}`}
                alt={p.articulo}
              />
            </div>
          ))}
          <div className={styles.dots}>
            {productos.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${
                  i === index ? styles.activeDot : ""
                }`}
                onClick={() => setIndex(i)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default FeaturedSlider;
