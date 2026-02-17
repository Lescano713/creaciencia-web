import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

import "./Home.css";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "productos"), (snapshot) => {
      setProductos(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <main>

      {/* HERO */}
      <HeroSlider />

      {/* SUSCRÍBETE */}
      <Subscribe />

      {/* ===================== */}
      {/* SECCIÓN CATEGORÍAS */}
      {/* ===================== */}
      <section
        className="products-section"
        style={{
          backgroundImage: "url('/images/products-bg.webp')",
        }}
      >
        <div className="products-overlay">

          <h2 className="section-title">PRODUCTOS</h2>

          <div className="categories-grid">

            <div
              className="cat-card"
              onClick={() => navigate("/industria")}
            >
              <div className="cat-overlay"></div>
              <h3>INDUSTRIA</h3>
            </div>

            <div
              className="cat-card"
              onClick={() => navigate("/investigacion")}
            >
              <div className="cat-overlay"></div>
              <h3>INVESTIGACIÓN</h3>
            </div>

            <div
              className="cat-card"
              onClick={() => navigate("/educacion")}
            >
              <div className="cat-overlay"></div>
              <h3>EDUCACIÓN</h3>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== */}
      {/* CATÁLOGO DINÁMICO */}
      {/* ===================== */}
      <section className="catalog">
        <h2 className="section-title dark">CATÁLOGO</h2>

        <div className="products-grid">
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </section>

      {/* ===================== */}
      {/* SERVICIOS */}
      {/* ===================== */}
      <section className="services-section">
        <h2 className="section-title dark">SERVICIOS</h2>

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

      <Footer />

    </main>
  );
};

export default Home;
