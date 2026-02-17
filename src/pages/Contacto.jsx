import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import "./Contacto.css";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    organizacion: "",
    correo: "",
    telefono: "",
    mensaje: "",
    terms: false,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.terms) {
      setStatus("Debe aceptar los términos y condiciones.");
      return;
    }

    console.log("Formulario enviado:", formData);

    setStatus("Mensaje enviado correctamente.");
    setFormData({
      nombres: "",
      apellidos: "",
      organizacion: "",
      correo: "",
      telefono: "",
      mensaje: "",
      terms: false,
    });
  };

  return (
    <>
      <Navbar />
      <Slider />

      <main className="contacto-page">

        {/* CONTACTO */}
        <section className="contacto-section">
          <div className="contacto-container">

            <h2>CONTACTO</h2>
            <p className="contacto-desc">
              Si requiere una cotización detallada o asesoramiento,
              ingrese sus datos y un especialista se pondrá en contacto
              con usted a la brevedad.
            </p>

            <form className="contacto-form" onSubmit={handleSubmit}>

              <div className="row">
                <input
                  type="text"
                  name="nombres"
                  placeholder="Nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="text"
                name="organizacion"
                placeholder="Organización"
                value={formData.organizacion}
                onChange={handleChange}
              />

              <div className="row">
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="mensaje"
                placeholder="Mensaje"
                rows="5"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>

              <div className="terms">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <span>Acepto los términos y condiciones</span>
              </div>

              <button type="submit">Enviar</button>

              {status && <p className="form-status">{status}</p>}
            </form>

          </div>
        </section>

        {/* SERVICIOS */}
        <section className="contacto-servicios">
          <h2>SERVICIOS</h2>

          <div className="servicios-grid">
            <div className="servicio-box">
              <div className="icon">🛡️</div>
              <h3>Garantía</h3>
            </div>

            <div className="servicio-box">
              <div className="icon">🎓</div>
              <h3>Capacitación</h3>
            </div>

            <div className="servicio-box">
              <div className="icon">⚙️</div>
              <h3>Instalación</h3>
            </div>
          </div>
        </section>

        <Subscribe />

      </main>

      <Footer />
    </>
  );
};

export default Contacto;
