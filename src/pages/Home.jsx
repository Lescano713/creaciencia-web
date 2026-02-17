import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import "./Home.css";
import Subscribe from "../components/Subscribe";
// import bgImage from "public/images/products-bg.webp";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "productos"), (snapshot) => {
      setProductos(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <main>

      {/* HERO SLIDER */}
      <HeroSlider />
      <Subscribe />

      {/* PRODUCTOS DESTACADOS CON FONDO */}
      <section className="products-section" 
      // style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="products-overlay">
          <h2>PRODUCTOS</h2>

          <div className="categories-grid">
            <div
              className="cat-card"
              onClick={() => navigate("/industria")}
            >
              INDUSTRIA
            </div>

            <div
              className="cat-card"
              onClick={() => navigate("/investigacion")}
            >
              INVESTIGACIÓN
            </div>

            <div
              className="cat-card"
              onClick={() => navigate("/educacion")}
            >
              EDUCACIÓN
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO DINÁMICO (TU ORIGINAL) */}
      <section className="catalog">
        <div className="products-grid">
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services-section">
        <h2>SERVICIOS</h2>

        <div className="services-grid">
          <div className="service-card">
            <h3>Garantías</h3>
          </div>

          <div className="service-card">
            <h3>Capacitación</h3>
          </div>

          <div className="service-card large">
            <h3>Instalación</h3>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
