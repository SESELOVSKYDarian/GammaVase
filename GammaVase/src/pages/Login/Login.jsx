import React, { useState } from "react";
import { motion } from "framer-motion";
import "./../../styles/Login/Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <img src="/logo.png" alt="Logo Gamma Modas" className="login-logo" />

      <div className="login-box">
        <h2 className="login-title">Inicio de Sesión</h2>

        <input type="number" placeholder="ID" className="login-input" />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="login-input"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="toggle-password"
            aria-label="Mostrar/Ocultar contraseña"
          >
            {showPassword ? (
              // Ojo abierto
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M12 5c-7.633 0-12 7-12 7s4.367 7 12 7 12-7 12-7-4.367-7-12-7zm0 12c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
              </svg>
            ) : (
              // Ojo cerrado
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M12 5c-7.633 0-12 7-12 7 1.242 2.003 3.019 3.72 5.108 4.823l-2.94 2.94 1.414 1.414 18.384-18.384-1.414-1.414-3.189 3.189c-1.06-.339-2.19-.568-3.363-.568zm0 12c-2.761 0-5-2.239-5-5 0-.707.146-1.38.408-2.003l7.595 7.595c-.623.262-1.296.408-2.003.408zm10.888-5c-.644-.96-1.414-1.847-2.288-2.643l-2.288 2.288c.117.448.188.916.188 1.355 0 2.761-2.239 5-5 5-.439 0-.907-.071-1.355-.188l-2.288 2.288c.796.874 1.683 1.644 2.643 2.288 3.012-1.001 5.654-2.963 7.387-5.655z" />
              </svg>
            )}
          </button>
        </div>

        <button className="login-button">Iniciar Sesión</button>
      </div>
    </motion.div>
  );
}
