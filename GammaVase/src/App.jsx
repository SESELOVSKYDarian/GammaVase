// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
