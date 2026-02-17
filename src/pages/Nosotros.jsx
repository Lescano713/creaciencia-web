import React from "react";
import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import "./Nosotros.css";

const Nosotros = () => {
  return (
    <>
      <Navbar />

      <main className="nosotros-page">

        {/* HERO */}
        <section className="nosotros-hero">
          <div className="nosotros-hero-content">
            <h1>NOSOTROS</h1>
            <p>
              Especialistas en la venta de productos de laboratorio para educación,
              investigación e industria, brindando soluciones tecnológicas
              confiables y de alta calidad.
            </p>
          </div>
        </section>

        {/* CONTENIDO */}
        <section className="nosotros-section">
          <div className="nosotros-container">

            <div className="nosotros-text">
              <h2>Comprometidos con la ciencia y la innovación</h2>
              <p>
                Contamos con varios años de experiencia en la comercialización
                de equipos e insumos de laboratorio para instituciones educativas,
                centros de investigación y el sector industrial.
              </p>

              <p>
                Hemos abastecido a diversas universidades y organizaciones,
                garantizando productos certificados, tecnología moderna y
                acompañamiento profesional en cada proyecto.
              </p>

              <p>
                Nuestro compromiso es impulsar el desarrollo científico y
                tecnológico mediante soluciones confiables y eficientes.
              </p>
            </div>

            <div className="nosotros-image">
              <img src="/images/lab.webp" alt="Laboratorio" />
            </div>

          </div>
        </section>

        <Subscribe />

      </main>

      <Footer />
    </>
  );
};

export default Nosotros;
