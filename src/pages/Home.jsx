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
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDebounced, setBusquedaDebounced] = useState("");
  const navigate = useNavigate();

  // 🔥 SEO HOME
  useEffect(() => {
    document.title = "Creaciencia Perú | Equipamiento de laboratorio en Perú";

    const meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute(
        "content",
        "Creaciencia Perú ofrece equipamiento científico, material de laboratorio y soluciones para educación, industria e investigación en Perú."
      );
    }
  }, []);

  // 🔥 Obtener productos
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

  // 🔥 Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusquedaDebounced(busqueda);
    }, 300);

    return () => clearTimeout(timer);
  }, [busqueda]);

  // 🔥 Normalizar texto
  const normalizar = (texto) => {
    return texto
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // 🔥 Filtro por nombre
  const productosFiltrados =
    busquedaDebounced.trim() === ""
      ? productos
      : productos.filter((p) => {
          const nombreNormalizado = normalizar(p.nombre || "");
          const busquedaNormalizada = normalizar(busquedaDebounced);
          return nombreNormalizado.startsWith(busquedaNormalizada);
        });

  return (
    <main>

      {/* HERO */}
      <HeroSlider />

      {/* H1 SEO INVISIBLE VISUALMENTE */}
      <h1 style={{ display: "none" }}>
        Creaciencia Perú - Equipamiento de laboratorio
      </h1>

      <Subscribe />

      {/* ===================== */}
      {/* SECCIÓN CATEGORÍAS */}
      {/* ===================== */}
      <section
        className="products-section"
        style={{
          backgroundImage: "url('/images/nav-bg.png')",
        }}
      >
        <div className="products-overlay">

          <h2 className="section-title">PRODUCTOS</h2>

          <div className="categories-grid">

            <div
              className="cat-card"
              onClick={() => navigate("/productos/industria")}
            >
              <div className="cat-overlay"></div>
              <h3>INDUSTRIA</h3>
            </div>

            <div
              className="cat-card"
              onClick={() => navigate("/productos/investigacion")}
            >
              <div className="cat-overlay"></div>
              <h3>INVESTIGACIÓN</h3>
            </div>

            <div
              className="cat-card"
              onClick={() => navigate("/productos/educacion")}
            >
              <div className="cat-overlay"></div>
              <h3>EDUCACIÓN</h3>
            </div>

          </div>

        </div>
      </section>

      {/* ===================== */}
      {/* BUSCADOR + CATÁLOGO */}
      {/* ===================== */}
      <section className="catalog">

        <h2 className="section-title dark">VER PRODUCTOS</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar producto por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>

        {busquedaDebounced.length > 0 &&
          productosFiltrados.length === 0 && (
            <p className="no-results">
              No se encontraron productos.
            </p>
          )}

        <div className="products-grid">
          {productosFiltrados.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>

      </section>

      <Footer />

    </main>
  );
};

export default Home;