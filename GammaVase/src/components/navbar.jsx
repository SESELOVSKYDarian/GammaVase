import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">INICIO</Link>
        </li>
        <li>
          <Link to="/empresa">EMPRESA</Link>
        </li>
        <li>
          <Link to="/catalogo">CATÁLOGO</Link>
        </li>
        <li>
          <Link to="/ideas">IDEAS</Link>
        </li>
        <li>
          <Link to="/contacto">CONTACTO</Link>
        </li>
        <li>
          <Link to="/carrito">
            <i className="bx bx-cart"></i>
          </Link>
        </li>
        <li>
          <Link to="/perfil">
            <i className="bx bx-user-circle"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
