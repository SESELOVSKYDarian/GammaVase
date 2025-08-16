import React, { useState } from "react";
import "./IdeasTable.css";

const SubCardForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !url.trim()) return;
    onAdd({ title: title.trim(), type, url: url.trim() });
    setTitle("");
    setUrl("");
  };

  return (
    <div className="subcard-form">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="pdf">PDF</option>
        <option value="video">Video</option>
      </select>
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleAdd}>Agregar tarjeta</button>
    </div>
  );
};

const IdeasTable = () => {
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");

  const addCategory = () => {
    if (!catName.trim()) return;
    setCategories([...categories, { name: catName.trim(), cards: [] }]);
    setCatName("");
  };

  const addCardToCategory = (index, card) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === index ? { ...cat, cards: [...cat.cards, card] } : cat
      )
    );
  };

  return (
    <div className="idea-table">
      <h1>Tabla de Ideas</h1>

      <div className="add-category">
        <input
          type="text"
          placeholder="Nueva categoría"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
        />
        <button onClick={addCategory}>Agregar categoría</button>
      </div>

      {categories.map((cat, idx) => (
        <div key={idx} className="category">
          <h3>{cat.name}</h3>
          <SubCardForm onAdd={(card) => addCardToCategory(idx, card)} />
          <ul>
            {cat.cards.map((card, j) => (
              <li key={j}>
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
