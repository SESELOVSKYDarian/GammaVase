// src/pages/Empresa/Empresa.jsx
import React from "react";

import Footer from "../../components/Footer";

import Hero from "../../components/Empresa/Hero";
import TijerasImage from "../../components/Empresa/TijerasImage";
import About from "../../components/Empresa/About";
import Slider from "../../components/Empresa/Slider";
import Importaciones from "../../components/Empresa/Importaciones";
import Objetivo from "../../components/Empresa/Objetivo";

// import "./Empresa.css";

const Empresa = () => {
  return (
    <>
      <Hero />
      <TijerasImage />
      <About />
      <Slider />
      <Importaciones />
      <Objetivo />
      {/* <Footer /> */}
    </>
  );
};

export default Empresa;
