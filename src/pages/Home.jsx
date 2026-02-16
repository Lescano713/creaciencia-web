import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "productos"), (snapshot) => {
      setProductos(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsub();
  }, []);

  return (
    <main>
      {/* Hero Section del Wireframe */}
      <section className="hero-blue">
        <div className="hero-content">
          <h1>Equipamiento de vanguardia para mentes que transforman el mundo.</h1>
          <button className="btn-red">Conoce más</button>
        </div>
      </section>

      {/* Categorías Principales */}
      <section className="categories">
        <h2>Nuestros Productos</h2>
        <div className="categories-grid">
          <div className="cat-card">INDUSTRIA</div>
          <div className="cat-card">INVESTIGACIÓN</div>
          <div className="cat-card">EDUCACIÓN</div>
        </div>
      </section>

      {/* Catálogo Dinámico */}
      <section className="catalog">
        <div className="products-grid">
          {productos.map(p => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;