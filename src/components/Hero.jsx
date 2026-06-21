import { useState, useEffect, useRef } from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const revealRefs = useRef([]);

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
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

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
            <div
              ref={addToRefs}
              className="hero-badge reveal reveal-up"
            >
              ✨ Ekstrakurikuler MAN 4 Tangerang
            </div>

            <h1
              ref={addToRefs}
              className="hero-title reveal reveal-up delay-1"
            >
              <span className="hero-main-text">Setiap Siswa Punya Potensi,</span>{" "}
              <span className="highlight">Saatnya Kamu Bersinar</span>
            </h1>

            <p
              ref={addToRefs}
              className="hero-desc reveal reveal-up delay-2"
            >
              Ekstrakurikuler MAN 4 Tangerang adalah ruang bagi setiap siswa untuk
              menemukan passion, mengembangkan bakat, dan membangun kepercayaan diri.
              Bersama, kita tumbuh menjadi pribadi yang lebih baik setiap harinya.
            </p>

            <div className="hero-stats">
              <div
                ref={addToRefs}
                className="stat-card reveal reveal-up delay-2"
              >
                <h3>3</h3>
                <span>Ekskul Wajib</span>
              </div>

              <div
                ref={addToRefs}
                className="stat-card reveal reveal-up delay-3"
              >
                <h3>14+</h3>
                <span>Ekstrakurikuler</span>
              </div>

              <div
                ref={addToRefs}
                className="stat-card reveal reveal-up delay-4"
              >
                <h3>100%</h3>
                <span>Berbasis Preferensi</span>
              </div>
            </div>

            <button
              ref={addToRefs}
              className="hero-btn reveal reveal-up delay-4"
              onClick={() => navigate("/test")}
            >
              Temukan Minatmu
            </button>
          </div>

          {/* KANAN - SLIDER */}
          <div
            ref={addToRefs}
            className="hero-slider reveal reveal-right delay-2"
          >
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