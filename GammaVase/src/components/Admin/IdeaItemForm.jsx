import React, { useState } from "react";
import "./UsuarioForm.css";

const IdeaItemForm = ({ categories, defaultCategoryId = "", onClose, onSave, initialData }) => {
  const [form, setForm] = useState({
    categoryId: initialData?.category_id || defaultCategoryId,
    title: initialData?.title || "",
    type: initialData?.type || "video",
    url: initialData?.url || "",
    imageUrl: initialData?.imageUrl || "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.categoryId || !form.title) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    if (form.type === "video" && !form.url) {
      alert("La URL del video es obligatoria.");
      return;
    }
    if (form.type === "pdf" && !file && !form.url) {
      alert("Debe subir un archivo PDF.");
      return;
    }
    const formData = new FormData();
    formData.append("categoryId", form.categoryId);
    formData.append("title", form.title);
    formData.append("type", form.type);
    formData.append("url", form.type === "video" ? form.url : form.url || "");
    formData.append("imageUrl", form.imageUrl);
    if (form.type === "pdf" && file) {
      formData.append("file", file);
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initialData ? "Editar Idea" : "Agregar Idea"}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="categoryId">Categoría</label>
          <select
            id="categoryId"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
          >
            <option value="">Categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
          />
          <label htmlFor="type">Tipo</label>
          <select name="type" id="type" value={form.type} onChange={handleChange}>
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
          </select>
          {form.type === "video" && (
            <>
              <label htmlFor="url">URL del video</label>
              <input
                id="url"
                name="url"
                placeholder="URL"
                value={form.url}
                onChange={handleChange}
              />
            </>
          )}
          {form.type === "pdf" && (
            <>
              <label htmlFor="file">Archivo PDF</label>
              <input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}
          <label htmlFor="imageUrl">URL de imagen</label>
          <input
            id="imageUrl"
            name="imageUrl"
            placeholder="URL de imagen"
            value={form.imageUrl}
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdeaItemForm;
