// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from './components/footer';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
 <Footer />
    </BrowserRouter>
  );
}

export default App;
