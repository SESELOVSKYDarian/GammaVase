import React, { useState, useEffect } from "react";
import "./IdeasTable.css";

const IdeasTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/ideas")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error al cargar ideas", err));
  }, []);

  return (
    <div className="idea-table">
      <h1>Tabla de Ideas</h1>
      {categories.map((cat) => (
        <div key={cat.id} className="category">
          <h3>{cat.name}</h3>
          <ul>
            {cat.cards.map((card) => (
              <li key={card.id}>
                {card.title}{" "}
                {card.type === "pdf" ? (
                  <a href={card.url} download>
                    Descargar PDF
                  </a>
                ) : (
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver video
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default IdeasTable;
