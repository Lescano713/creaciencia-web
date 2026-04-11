import React, { useState, useEffect } from "react";
import "./Subscribe.css";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setEmail("");
      alert("Catálogo enviado correctamente ✅");
    }, 1500);
  };

  return (
    <div className={`subscribe-container ${visible ? "show" : ""}`}>
      <div className="subscribe-content">
        <div className="subscribe-text">
          <h3>SUSCRÍBETE</h3>
          <p>Descarga nuestro catálogo virtual</p>
        </div>

        <form onSubmit={handleSubmit} className="subscribe-form">
          <input
            type="email"
            placeholder="Escribe tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            {loading ? "Enviando..." : "Suscríbete"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
