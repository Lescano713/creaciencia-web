import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  if (!producto) return null;

  return (
    <div className="product-card">
      <img src={producto.imagenUrl} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.categoria}</p>
      <Link to={`/producto/${producto.id}`} className="btn-detalles">
        Detalles
      </Link>
    </div>
  );
};

export default ProductCard;
