import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import "./Productos.css";

const Productos = () => {

  // 🔹 Datos simulados (luego se conectará a Firebase)
  const productos = [
    {
      id: 1,
      nombre: "Pipeta Pequeña",
      marca: "BrandTech",
      imagen: "/images/product1.webp",
      categoria: "pipetas"
    },
    {
      id: 2,
      nombre: "Pipeta Grande",
      marca: "Eppendorf",
      imagen: "/images/product2.webp",
      categoria: "pipetas"
    },
    {
      id: 3,
      nombre: "Microscopio Básico",
      marca: "Olympus",
      imagen: "/images/product3.webp",
      categoria: "microscopios"
    }
  ];

  return (
    <>
      {/* <Navbar /> */}

      <main className="catalogo-page">

        {/* HERO CATEGORIA */}
        <section className="catalogo-hero">
          <div className="catalogo-hero-overlay">
            <h1>EDUCACIÓN</h1>
          </div>
        </section>

        {/* CONTENIDO */}
        <section className="catalogo-content">

          {/* SIDEBAR */}
          <aside className="catalogo-sidebar">
            <h3>Tipos de Productos</h3>
            <ul>
              <li>Pipetas</li>
              <li>Microscopios</li>
              <li>Material de Vidrio</li>
              <li>Equipos Analíticos</li>
            </ul>
          </aside>

          {/* GRID PRODUCTOS */}
          <div className="catalogo-grid">
            {productos.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>

        </section>

        <Subscribe />

      </main>

      <Footer />
    </>
  );
};

export default Productos;
