import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LOGO Y DESCRIPCIÓN */}
        <div className="footer-col footer-brand">
          <img 
            src="/images/logo.webp" 
            alt="Creaciencia Logo" 
            className="footer-logo"
          />
          <p>
            Equipamiento de vanguardia para mentes que transforman el mundo.
          </p>
        </div>

        {/* ENLACES */}
        <div className="footer-col">
          <h4>Enlaces</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* PRODUCTOS */}
        <div className="footer-col">
          <h4>Áreas</h4>
          <ul>
            <li><Link to="/productos/industria">Industria</Link></li>
            <li><Link to="/productos/investigacion">Investigación</Link></li>
            <li><Link to="/productos/educacion">Educación</Link></li>
          </ul>
        </div>

        {/* CONTACTO */}
        <div className="footer-col">
          <h4>Contacto</h4>
          <p>Email: info@creaciencia.com</p>
          <p>Tel: +51 999 999 999</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Creaciencia. Todos los derechos reservados.
      </div>

    </footer>
  );
};

export default Footer;
