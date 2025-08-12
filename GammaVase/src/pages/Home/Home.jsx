import React from "react";
import { motion } from "framer-motion";
import FeaturedSlider from "../../components/Slider/FeaturedSlider";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <FeaturedSlider />
    </motion.div>
  );
}
