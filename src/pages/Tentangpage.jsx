import "./Tentangpage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function TentangPage() {
  const navigate = useNavigate();
  const revealRefs = useRef([]);

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

  return (
    <section className="tentang-page">
      <div className="tentangpage-container">

        <div className="tentangpage-wrapper">

          {/* KIRI */}
          <div className="tentangpage-text">
            <div
              ref={addToRefs}
              className="tentang-badge reveal reveal-up"
            >
              ✨ Platform Rekomendasi Ekstrakurikuler
            </div>

            <h1
              ref={addToRefs}
              className="tentangpage-title reveal reveal-up delay-1"
            >
              Temukan Ekstrakurikuler yang Sesuai Dengan Minat dan Potensi Dirimu
            </h1>

            <p
              ref={addToRefs}
              className="tentangpage-subtitle reveal reveal-up delay-2"
            >
              Platform ini dirancang untuk membantu siswa MAN 4 Tangerang menemukan
              kegiatan ekstrakurikuler yang sesuai dengan minat, karakter, dan
              potensi diri. Sistem akan memberikan rekomendasi berdasarkan
              preferensi yang kamu pilih sehingga hasil yang diperoleh lebih relevan.
            </p>

            <div className="tentang-stats">
              <div
                ref={addToRefs}
                className="stat-card reveal reveal-up delay-1"
              >
                <h3>3</h3>
                <span>Ekskul Wajib</span>
              </div>

              <div
                ref={addToRefs}
                className="stat-card reveal reveal-up delay-2"
              >
                <h3>14+</h3>
                <span>Ekstrakurikuler</span>
              </div>

              <div
                ref={addToRefs}
                className="stat-card reveal reveal-up delay-3"
              >
                <h3>100%</h3>
                <span>Berbasis Preferensi</span>
              </div>
            </div>

            <button
              ref={addToRefs}
              className="test-btn reveal reveal-up delay-3"
              onClick={() => navigate("/test")}
            >
              🚀 Mulai Test Sekarang
            </button>
          </div>

          {/* KANAN */}
          <div
            ref={addToRefs}
            className="tentangpage-image reveal reveal-right delay-2"
          >
            <img
              src="/tentang-img1.jpg"
              alt="Tentang Platform"
            />
          </div>

        </div>

        {/* FITUR */}
        <div className="tentangpage-features">
          <div
            ref={addToRefs}
            className="featurepage-card reveal reveal-up"
          >
            <div className="iconpage">🎯</div>
            <h3>Temukan Minat</h3>
            <p>
              Kenali minat dan bakatmu melalui rekomendasi yang disesuaikan
              dengan karakter dan preferensi pribadi.
            </p>
          </div>

          <div
            ref={addToRefs}
            className="featurepage-card reveal reveal-up delay-1"
          >
            <div className="iconpage">🚀</div>
            <h3>Kembangkan Potensi</h3>
            <p>
              Dapatkan pengalaman baru yang membantu meningkatkan kemampuan,
              keterampilan, dan kepercayaan diri.
            </p>
          </div>

          <div
            ref={addToRefs}
            className="featurepage-card reveal reveal-up delay-2"
          >
            <div className="iconpage">🤝</div>
            <h3>Berkolaborasi</h3>
            <p>
              Bergabung dengan komunitas yang memiliki minat serupa dan bangun
              relasi yang positif di lingkungan sekolah.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TentangPage;