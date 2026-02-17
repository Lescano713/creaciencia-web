import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ producto }) => {
  return (
    <div className="product-card">

      <img src={producto.imagen} alt={producto.nombre} />

      <div className="product-overlay">
        <h4>{producto.nombre}</h4>
        <p>{producto.marca}</p>

        {/* 🔥 CAMBIO AQUÍ */}
        <Link to={`/producto/${producto.slug}`}>
          <button>Ver Producto</button>
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;
