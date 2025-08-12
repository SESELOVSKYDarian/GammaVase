import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeaturedSlider from "../../components/Slider/FeaturedSlider";

export default function Home() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const buscar = (e) => {
    e.preventDefault();
    navigate(`/catalogo?search=${encodeURIComponent(term)}`);
  };

  return (
    <motion.div
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
    </motion.div>
  );
}
