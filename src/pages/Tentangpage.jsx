import "./TentangPage.css";
import { useNavigate } from "react-router-dom";

function TentangPage() {
  const navigate = useNavigate();

  return (
    <section className="tentang-page">
      <div className="tentangpage-container">

        <div className="tentangpage-wrapper">

          {/* KIRI */}
          <div className="tentangpage-text">

            <div className="tentang-badge">
              ✨ Platform Rekomendasi Ekstrakurikuler
            </div>

            <h1 className="tentangpage-title">
              Temukan Ekstrakurikuler yang Sesuai Dengan Minat dan Potensi Dirimu
            </h1>

            <p className="tentangpage-subtitle">
              Platform ini dirancang untuk membantu siswa MAN 4 Tangerang menemukan
              kegiatan ekstrakurikuler yang sesuai dengan minat, karakter, dan
              potensi diri. Sistem akan memberikan rekomendasi berdasarkan
              preferensi yang kamu pilih sehingga hasil yang diperoleh lebih relevan.
            </p>

            <div className="tentang-stats">
              <div className="stat-card">
                <h3>3</h3>
                <span>Ekskul Wajib</span>
              </div>

              <div className="stat-card">
                <h3>14+</h3>
                <span>Ekstrakurikuler</span>
              </div>

              <div className="stat-card">
                <h3>100%</h3>
                <span>Berbasis Preferensi</span>
              </div>
              
            </div>

            <button
              className="test-btn"
              onClick={() => navigate("/test")}
            >
              🚀 Mulai Test Sekarang
            </button>

          </div>

          {/* KANAN */}
          <div className="tentangpage-image">
            <img
              src="/tentang-img1.jpg"
              alt="Tentang Platform"
            />
          </div>

        </div>

        {/* FITUR */}
        <div className="tentangpage-features">

          <div className="featurepage-card">
            <div className="iconpage">🎯</div>

            <h3>Temukan Minat</h3>

            <p>
              Kenali minat dan bakatmu melalui rekomendasi yang disesuaikan
              dengan karakter dan preferensi pribadi.
            </p>
          </div>

          <div className="featurepage-card">
            <div className="iconpage">🚀</div>

            <h3>Kembangkan Potensi</h3>

            <p>
              Dapatkan pengalaman baru yang membantu meningkatkan kemampuan,
              keterampilan, dan kepercayaan diri.
            </p>
          </div>

          <div className="featurepage-card">
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