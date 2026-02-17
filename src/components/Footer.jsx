import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div>
          <h3>CREACiencia</h3>
          <p>Equipamiento científico para aprender, investigar y crear.</p>
        </div>

        <div>
          <h4>MENÚ</h4>
          <p>Contacto</p>
          <p>Nosotros</p>
          <p>Servicios</p>
          <p>Productos</p>
        </div>

        <div>
          <h4>CONTACTO</h4>
          <p>934120670</p>
          <p>correo@creaciencia.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Creaciencia
      </div>
    </footer>
  );
}

export default Footer;
