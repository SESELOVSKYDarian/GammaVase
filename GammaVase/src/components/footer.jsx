import React from 'react';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo */}
        <div className="footer-logo">
          <img src="/logo-gamma.png" alt="Gamma Modas" />
        </div>

        {/* Contacto */}
        <div className="footer-contact">
          <div className="footer-item">
            <img src="/whatsapp-icon.png" alt="WhatsApp" className="footer-icon" />
            <span>+54 (223) 633-4301</span>
          </div>
          <div className="footer-item">
            <img src="/mail-icon.png" alt="Email" className="footer-icon" />
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
