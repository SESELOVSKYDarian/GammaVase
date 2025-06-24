import React, { useState, useEffect } from "react";
import "../../styles/Empresa/Slider.css";

const images = [
  "/assets/slider/slider1.jpg",
  "/assets/slider/slider2.jpg",
  "/assets/slider/slider3.jpg",
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <img src={images[current]} alt={`Slide ${current}`} />
      <div className="slider-buttons">
        {images.map((_, index) => (
          <button
            key={index}
            className={current === index ? "active" : ""}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
