import React from "react";
import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import "./Servicios.css";

const Servicios = () => {
  return (
    <>
      <Navbar />

      <main className="servicios-page">

        {/* HERO */}
        <section className="servicios-hero">
          <div className="servicios-hero-overlay">
            <h1>SERVICIOS</h1>
            <p>
              Soluciones integrales para garantizar el funcionamiento,
              implementación y soporte de su laboratorio.
            </p>
          </div>
        </section>

        {/* SERVICIOS GRID */}
        <section className="servicios-section">
          <div className="servicios-container">

            <div className="servicio-card">
              <div className="servicio-icon">⚙️</div>
              <h3>Instalación</h3>
              <p>
                Realizamos la instalación profesional de equipos de laboratorio,
                asegurando un funcionamiento óptimo y cumplimiento de estándares técnicos.
              </p>
            </div>

            <div className="servicio-card">
              <div className="servicio-icon">🎓</div>
              <h3>Capacitación</h3>
              <p>
                Brindamos capacitación especializada para el correcto uso y
                mantenimiento de los equipos, dirigida a personal técnico y académico.
              </p>
            </div>

            <div className="servicio-card">
              <div className="servicio-icon">🛡️</div>
              <h3>Garantía</h3>
              <p>
                Ofrecemos garantía y soporte postventa, asegurando respaldo,
                confianza y acompañamiento continuo en cada proyecto.
              </p>
            </div>

          </div>
        </section>

        <Subscribe />

      </main>

      <Footer />
    </>
  );
};

export default Servicios;
