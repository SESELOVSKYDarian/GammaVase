import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CarritoContext } from "../pages/Carrito/CarritoContext";
import "../styles/navbar.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useContext(CarritoContext);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("usuario"))
  );
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("adminAuthed");
    setUser(null);
    setShowUserMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src="/logo2.png" alt="Logo" className="mobile-logo" />

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
          <li className="cart-icon">
            <NavLink
              to="/carrito"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <i className="bx bx-cart"></i>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </NavLink>
          </li>
          <li className="user-menu-wrapper">
            {user ? (
              <div
                className="user-icon"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <i className="bx bx-user-circle"></i>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <button onClick={handleLogout}>Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <i className="bx bx-user-circle"></i>
              </NavLink>
            )}
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
            <li className="cart-icon">
              <NavLink
                to="/carrito"
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <i className="bx bx-cart"></i>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </NavLink>
            </li>
            {user ? (
              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  <i className="bx bx-user-circle"></i>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
