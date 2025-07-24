// src/components/AnimatedRoutes.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../pages/Home/Home";
import Empresa from "../pages/Empresa/Empresa";
// import Catalogo from "../pages/Catalogo/Catalogo";
import Ideas from "../pages/Ideas/Ideas";
import RopaAccesorios from "../../src/pages/Ideas/RopaAccesorios";
import Login from "../pages/Login/Login";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import Contacto from "../pages/Contacto/Contacto";

// dentro de tus <Routes>

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/ropa-accesorios" element={<RopaAccesorios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />

        {/* <Route path="/catalogo" element={<Catalogo />} /> */}

        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </AnimatePresence>
  );
}
