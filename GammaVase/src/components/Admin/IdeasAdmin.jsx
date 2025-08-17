import React, { useState, useEffect } from "react";

const IdeasAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");
  const [newCard, setNewCard] = useState({ title: "", type: "pdf", url: "", categoryId: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/ideas")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error al cargar ideas", err));
  }, []);

  const addCategory = async () => {
    if (!catName.trim()) return;
    try {
      const res = await fetch("http://localhost:3000/api/ideas/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: catName.trim() }),
      });
      const data = await res.json();
      setCategories([...categories, { ...data, cards: [] }]);
      setCatName("");
    } catch (err) {
      console.error("Error al agregar categoría", err);
    }
  };

  const addCard = async () => {
    const { title, type, url, categoryId } = newCard;
    if (!title.trim() || !url.trim() || !categoryId) return;
    try {
      const res = await fetch("http://localhost:3000/api/ideas/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId,
          title: title.trim(),
          type,
          url: url.trim(),
        }),
      });
      const data = await res.json();
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === Number(categoryId)
            ? { ...cat, cards: [...cat.cards, data] }
            : cat
        )
      );
      setNewCard({ title: "", type: "pdf", url: "", categoryId: "" });
    } catch (err) {
      console.error("Error al agregar tarjeta", err);
    }
  };

  return (
    <div className="admin-section">
      <h2>Ideas</h2>
      <div className="idea-category-form">
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
        />
        <button onClick={addCategory}>Agregar categoría</button>
      </div>

      <div className="idea-subcard-form">
        <select
          value={newCard.categoryId}
          onChange={(e) =>
            setNewCard({ ...newCard, categoryId: e.target.value })
          }
        >
          <option value="">Selecciona categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Título"
          value={newCard.title}
          onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
        />
        <select
          value={newCard.type}
          onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
        >
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
        </select>
        <input
          type="text"
          placeholder="URL"
          value={newCard.url}
          onChange={(e) => setNewCard({ ...newCard, url: e.target.value })}
        />
        <button onClick={addCard}>Agregar tarjeta</button>
      </div>

      {categories.map((cat) => (
        <div key={cat.id}>
          <h3>{cat.name}</h3>
          <ul>
            {cat.cards.map((card) => (
              <li key={card.id}>
                {card.title}{" "}
                {card.type === "pdf" ? (
                  <a href={card.url} target="_blank" rel="noopener noreferrer">
                    PDF
                  </a>
                ) : (
                  <a href={card.url} target="_blank" rel="noopener noreferrer">
                    Video
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

export default IdeasAdmin;
