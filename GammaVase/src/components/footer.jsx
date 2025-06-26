import React from 'react';
import './Footer.css';
// asumimos que ya está el CSS preparado

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-logo">
          <img src="/logo.png" alt="Gamma Modas" />
        </div>

        {/* Contacto */}
        <div className="footer-contact">
          <div className="footer-item">
            <img src="/wasap.svg" alt="WhatsApp" className="footer-icon" />
            <span>+54 (223) 633-4301</span>
          </div>
          <div className="footer-item">
            <img src="/gmail.png" alt="Email" className="footer-icon" />
            <span>ventas@gammodas.com.ar</span>
          </div>
        </div>
      </div>

      <div className="footer-copy">
        <p>Copyright © 2025 <span className="footer-copy-name">Vase</span></p>
      </div>
    </footer>
  );
};

export default Footer;
