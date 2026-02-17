import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Detalle del Producto</h2>
      <p>ID del producto: {id}</p>
      <p>Aquí irá la información completa del producto.</p>
    </div>
  );
};

export default ProductDetail;
