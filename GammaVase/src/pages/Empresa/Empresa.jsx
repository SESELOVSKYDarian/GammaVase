import React from "react";
import { motion } from "framer-motion";

import Hero from "../../components/Empresa/Hero";
import TijerasImage from "../../components/Empresa/TijerasImage";
import About from "../../components/Empresa/About";
import Slider from "../../components/Empresa/Slider";
import Importaciones from "../../components/Empresa/Importaciones";
import Objetivo from "../../components/Empresa/Objetivo";

const Empresa = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <TijerasImage />
      <About />
      <Slider />
      <Importaciones />
      <Objetivo />
    </motion.div>
  );
};

export default Empresa;
