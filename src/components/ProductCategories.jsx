import { useNavigate } from "react-router-dom";

export default function ProductCategories() {

  const navigate = useNavigate();

  return (
    <section
      className="products-section"
      style={{
        backgroundImage: "url('/images/products-bg.webp')",
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
  );
}
