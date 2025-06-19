import React from "react";
import "../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="#">INICIO</a>
        </li>
        <li>
          <a href="#">EMPRESA</a>
        </li>
        <li>
          <a href="#">CATÁLOGO</a>
        </li>
        <li>
          <a href="#">IDEAS</a>
        </li>
        <li>
          <a href="#">CONTACTO</a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-cart"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-user-circle"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};
