import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Gamma</h1>
      <p>
        Explora nuestro catálogo de productos y encuentra la inspiración que
        necesitas.
      </p>
    </motion.div>
  );
}
