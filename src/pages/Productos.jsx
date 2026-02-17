import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import "./Productos.css";

const Productos = () => {

  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "productos"),
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setProductos(lista);
      }
    );

    return () => unsubscribe();

  }, []);

  // 🔥 Agrupar productos por categoría y subcategoría
  const agruparProductos = () => {

    const estructura = {};

    productos.forEach((producto) => {

      // Si estamos filtrando por categoría
      if (categoria && producto.categoria !== categoria) return;

      if (!estructura[producto.categoria]) {
        estructura[producto.categoria] = {};
      }

      if (!estructura[producto.categoria][producto.subcategoria]) {
        estructura[producto.categoria][producto.subcategoria] = [];
      }

      estructura[producto.categoria][producto.subcategoria].push(producto);
    });

    return estructura;
  };

  const estructura = agruparProductos();

  return (
    <>
      <Navbar />

      <main className="catalogo-page">

        <section className="catalogo-hero">
          <div className="catalogo-hero-overlay">
            <h1>
              {categoria
                ? categoria.toUpperCase()
                : "TODOS LOS PRODUCTOS"}
            </h1>
          </div>
        </section>

        <section className="catalogo-content">

          {Object.keys(estructura).length === 0 && (
            <p style={{ padding: "40px" }}>
              No hay productos disponibles.
            </p>
          )}

          {Object.keys(estructura).map((cat) => (
            <div key={cat} className="categoria-bloque">

              <h2 className="categoria-titulo">
                {cat.toUpperCase()}
              </h2>

              {Object.keys(estructura[cat]).map((sub) => (
                <div key={sub} className="subcategoria-bloque">

                  <h3 className="subcategoria-titulo">
                    {sub}
                  </h3>

                  <div className="catalogo-grid">
                    {estructura[cat][sub].map((producto) => (
                      <ProductCard
                        key={producto.id}
                        producto={producto}
                      />
                    ))}
                  </div>

                </div>
              ))}

            </div>
          ))}

        </section>

        <Subscribe />

      </main>

      <Footer />
    </>
  );
};

export default Productos;
