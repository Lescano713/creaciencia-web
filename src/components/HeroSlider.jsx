import { useState, useEffect } from "react";
import "./HeroSlider.css";

const slides = [
  {
    image: "/images/slider1.webp",
    title: "Equipamiento de vanguardia",
    subtitle: "Para mentes que transforman el mundo."
  },
  {
    image: "/images/slider2.webp",
    title: "Tecnología para industria",
    subtitle: "Soluciones modernas y eficientes."
  },
  {
    image: "/images/slider3.webp",
    title: "Innovación educativa",
    subtitle: "Impulsando el conocimiento."
  }
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-slider">

      {slides.map((slide, index) => (
        <div
          key={index}
          className={index === current ? "slide active" : "slide"}
        >

          <div className="hero-overlay">
            <div className="hero-content">

              {/* TEXTO */}
              <div className="hero-text">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <button className="btn-red">Conoce más</button>
              </div>

              {/* IMAGEN */}
              <div className="hero-image">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>

            </div>
          </div>

        </div>
      ))}

      {/* Flechas */}
      <button className="arrow left" onClick={prevSlide}>
        ❮
      </button>

      <button className="arrow right" onClick={nextSlide}>
        ❯
      </button>

    </section>
  );
}

export default HeroSlider;
