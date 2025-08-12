import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeaturedSlider from "../../components/Slider/FeaturedSlider";
import styles from "./Home.module.css";

const MotionDiv = motion.div;

export default function Home() {
  const [term, setTerm] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (term.trim().length === 0) {
      setSugerencias([]);
      return;
    }
    fetch(`http://localhost:3000/api/productos?q=${encodeURIComponent(term)}&limit=5`)
      .then((res) => res.json())
      .then((data) => setSugerencias(data));
  }, [term]);

  const buscar = (e) => {
    e.preventDefault();
    navigate(`/catalogo?search=${encodeURIComponent(term)}`);
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <FeaturedSlider />
      <form onSubmit={buscar} style={{ textAlign: "center", marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <AnimatePresence>
        {sugerencias.length > 0 && (
          <motion.ul
            className={styles.sugerencias}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {sugerencias.map((s) => (
              <li key={s.id} onMouseDown={() => navigate(`/productos/${s.url}`)}>
                {s.articulo}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}
