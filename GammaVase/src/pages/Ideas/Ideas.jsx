import React, { useEffect, useState } from "react";
import "./Ideas.css";
import TijerasImage from "../../components/Empresa/TijerasImage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const MotionDiv = motion.div;

const Ideas = () => {
  const [categories, setCategories] = useState([]);

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
        <h2 className="ideas-subtitle">Categorías</h2>

        {/* Categorías e items */}
        <div className="ideas-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="idea-category">
              <h3>{cat.name}</h3>
              <ul>
                {cat.cards.map((card) => (
                  <li key={card.id}>
                    {card.title}{" "}
                    {card.type === "pdf" ? (
                      <a href={card.url} target="_blank" rel="noopener noreferrer">
                        Descargar PDF
                      </a>
                    ) : (
                      <a href={card.url} target="_blank" rel="noopener noreferrer">
                        Ver video
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link to="/tabla-ideas" className="ideas-table-link">
          Ver tabla de ideas
        </Link>
      </div>
    </MotionDiv>
  );
};

export default Ideas;
