import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo"></div>

        <ul className="navbar-list desktop">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              INICIO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/empresa"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              EMPRESA
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalogo"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              CATÁLOGO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ideas"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              IDEAS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacto"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              CONTACTO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/carrito"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="bx bx-cart"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="bx bx-user-circle"></i>
            </NavLink>
          </li>
        </ul>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? "bx bx-x" : "bx bx-menu"}></i>
        </div>

        {/* Menú lateral móvil */}
        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <ul className="navbar-list mobile">
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                INICIO
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/empresa"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                EMPRESA
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/catalogo"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                CATÁLOGO
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ideas"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                IDEAS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacto"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                CONTACTO
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/carrito"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <i className="bx bx-cart"></i>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <i className="bx bx-user-circle"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
