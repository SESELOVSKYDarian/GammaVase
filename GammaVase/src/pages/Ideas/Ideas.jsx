import React, { useEffect, useState } from "react";
import "./Ideas.css";
import TijerasImage from "../../components/Empresa/TijerasImage";
import { motion } from "framer-motion";
const MotionDiv = motion.div;

const Ideas = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/ideas")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error al cargar ideas", err));
  }, []);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="ideas-page">
        {/* Banner */}
        <div className="ideas-banner">
          <img src="/logo.png" alt="Logo Gamma" className="logo-gamma" />
          <h1>IDEAS</h1>
        </div>

        {/* Tijeras */}
        <TijerasImage />

        {/* Título Categorías */}
        <h2 className="ideas-subtitle">
          {selectedCategory ? selectedCategory.name : "Categorías"}
        </h2>

        {/* Grilla de categorías o subcategorías */}
        <div className="ideas-grid">
          {selectedCategory
            ? selectedCategory.cards.map((card) => (
                <a
                  key={card.id}
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="idea-card"
                  style={{ backgroundImage: `url(${card.imageUrl})` }}
                >
                  <div className="idea-overlay">{card.title}</div>
                </a>
              ))
            : categories.map((cat) => (
                <div
                  key={cat.id}
                  className="idea-card"
                  style={{ backgroundImage: `url(${cat.imageUrl})` }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <div className="idea-overlay">{cat.name}</div>
                </div>
              ))}
        </div>

        {selectedCategory && (
          <div className="ideas-back" onClick={() => setSelectedCategory(null)}>
            ← Volver a categorías
          </div>
        )}
      </div>
    </MotionDiv>
  );
};

export default Ideas;
