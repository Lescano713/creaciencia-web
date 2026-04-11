import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ producto }) => {

  const url = producto.slug
    ? `/producto/${producto.slug}`
    : `/producto/${producto.id}`; // fallback

  return (
    <div className="product-card">

      <img src={producto.imagen} alt={producto.nombre} />

      <div className="product-overlay">
        <h4>{producto.nombre}</h4>
        <p>{producto.marca}</p>

        <Link to={url}>
          <button>Ver Producto</button>
        </Link>
      </div>

    </div>
  );
};

export default ProductCard;