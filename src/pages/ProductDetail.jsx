import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import "../pages/ProductDetail.css";

export default function ProductoDetalle() {

  const { slug } = useParams();
  const [producto, setProducto] = useState(null);
  const [similares, setSimilares] = useState([]);

  useEffect(() => {

    const obtenerProducto = async () => {

      let productoActual = null;

      // 🔹 1. Buscar por slug
      const q = query(
        collection(db, "productos"),
        where("slug", "==", slug)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        productoActual = {
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data()
        };
      } else {
        // 🔥 2. Buscar por ID (fallback)
        try {
          const docRef = doc(db, "productos", slug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            productoActual = {
              id: docSnap.id,
              ...docSnap.data()
            };
          }
        } catch (error) {
          console.error("Error buscando por ID:", error);
        }
      }

      if (productoActual) {

        setProducto(productoActual);

        // 🔥 SEO dinámico
        document.title = `${productoActual.nombre} | Creaciencia Perú`;

        const meta = document.querySelector("meta[name='description']");
        if (meta) {
          meta.setAttribute(
            "content",
            `${productoActual.nombre} de ${productoActual.marca}. ${productoActual.descripcion}`
          );
        }

        // 🔥 Canonical SIEMPRE con slug (SEO correcto)
        let link = document.querySelector("link[rel='canonical']");
        if (!link) {
          link = document.createElement("link");
          link.setAttribute("rel", "canonical");
          document.head.appendChild(link);
        }

        link.setAttribute(
          "href",
          `https://www.creacienciaperu.com/producto/${productoActual.slug}`
        );

        // 🔥 Productos similares
        const similaresQuery = query(
          collection(db, "productos"),
          where("categoria", "==", productoActual.categoria)
        );

        const similaresSnap = await getDocs(similaresQuery);

        const listaSimilares = similaresSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(p => p.slug !== productoActual.slug);

        setSimilares(listaSimilares.slice(0, 4));

      } else {
        console.log("Producto no encontrado");
      }
    };

    obtenerProducto();

  }, [slug]);

  if (!producto) {
    return <p style={{ padding: "50px" }}>Producto no encontrado</p>;
  }

  return (
    <>
      {/* <Navbar /> */}

      <div className="producto-container">

        <div className="breadcrumb">
          <Link to="/productos">{producto.categoria}</Link> /
          <span> {producto.subcategoria}</span>
        </div>

        <h1 className="producto-title">
          {producto.nombre}
        </h1>

        <div className="producto-content">

          <div className="producto-imagen">
            <img
              src={producto.imagen}
              alt={`${producto.nombre} - ${producto.marca} | Creaciencia Perú`}
              loading="lazy"
            />
          </div>

          <div className="producto-info">

            <h3>Marca</h3>
            <p className="marca">{producto.marca}</p>

            <h3>Descripción</h3>
            <p className="descripcion">
              {producto.descripcion}
            </p>

            <div className="producto-botones">
              <a
                href={producto.fichaTecnica}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Descargar ficha técnica
              </a>

              <Link to="/contacto" className="btn-secondary">
                Contáctanos
              </Link>
            </div>

          </div>
        </div>

        {similares.length > 0 && (
          <div className="similares-section">
            <h2>Productos similares</h2>

            <div className="similares-grid">
              {similares.map((item) => (
                <Link
                  key={item.id}
                  to={`/producto/${item.slug || item.id}`}
                  className="similar-card"
                >
                  <img
                    src={item.imagen}
                    alt={`${item.nombre} - Creaciencia Perú`}
                    loading="lazy"
                  />
                  <p>{item.nombre}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      <Subscribe />
      <Footer />
    </>
  );
}