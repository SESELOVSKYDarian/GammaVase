// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/footer";
import { CarritoProvider } from "../src/pages/Carrito/CarritoContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
 <BrowserRouter>
      <CarritoProvider>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <ToastContainer position="bottom-right" autoClose={2500} />
      </CarritoProvider>
    </BrowserRouter>  );
}

export default App;
