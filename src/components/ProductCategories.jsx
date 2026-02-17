import React, { useEffect, useState } from "react";
import "./ProductCategories.css";

const categories = [
  {
    title: "INDUSTRIA",
    image: "/images/industria.webp",
  },
  {
    title: "INVESTIGACIÓN",
    image: "/images/investigacion.webp",
  },
  {
    title: "EDUCACIÓN",
    image: "/images/educacion.webp",
  },
];

const ProductCategories = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <div className={`categories-container ${visible ? "show" : ""}`}>
      {categories.map((item, index) => (
        <div
          key={index}
          className="category-card"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="overlay"></div>
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
