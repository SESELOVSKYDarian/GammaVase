// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Empresa from "./pages/Empresa/Empresa";

// Importa tu Navbar una sola vez
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar siempre visible */}
      <Navbar />

      {/* Renderiza la página según la ruta */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />

        {/* Si luego agregás más páginas: */}
        {/* <Route path="/catalogo" element={<Catalogo />} /> */}
        {/* <Route path="/ideas" element={<Ideas />} /> */}
        {/* <Route path="/contacto" element={<Contacto />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
