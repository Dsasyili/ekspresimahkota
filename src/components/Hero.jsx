import { useState, useEffect } from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate(); 

  const slides = [
    "/Slide1.jpg",
    "/Slide2.jpg",
    "/Slide3.jpeg",
    "/Slide4.jpg",
    "/Slide5.jpg",
    "/Slide6.jpg",
    "/Slide7.jpg",
    "/Slide8.jpg",
    "/Slide9.jpg",
    "/Slide10.jpg",
    "/Slide11.jpg",
  ]

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-container">

          {/* KIRI */}
          <div className="hero-content">
            <div className="hero-badge">✨ Ekstrakurikuler MAN 4 Tangerang</div>
            <h1>
              Setiap Siswa Punya Potensi,{" "}
              <span className="highlight">Saatnya Kamu Bersinar</span>
            </h1>

            <p>
              Ekstrakurikuler MAN 4 Tangerang adalah ruang bagi setiap siswa untuk
              menemukan passion, mengembangkan bakat, dan membangun kepercayaan diri.
              Bersama, kita tumbuh menjadi pribadi yang lebih baik setiap harinya.
            </p>

            <button
              className="hero-btn"
              onClick={() => navigate("/test")}
            >
              Temukan Minatmu
            </button>
          </div>

          {/* KANAN - SLIDER */}
          <div className="hero-slider">

            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide}
                alt="Slide"
                className={index === current ? "slide active" : "slide"}
              />
            ))}

            <button className="arrow left" onClick={prevSlide}>❮</button>
            <button className="arrow right" onClick={nextSlide}>❯</button>

            <div className="indicators">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={index === current ? "dot active-dot" : "dot"}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;