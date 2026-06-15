import "./Tentangpage.css";
import { useNavigate } from "react-router-dom";

function TentangPage() {
  const navigate = useNavigate();

  return (
    <section className="tentang-page">
      <div className="tentangpage-container">

        <div className="tentangpage-wrapper">

          {/* KIRI - GAMBAR */}
          <div className="tentangpage-image">
            <img src="/tentang-img1.jpg" alt="Tentang Kami" />
          </div>

          {/* KANAN - TEXT */}
          <div className="tentangpage-text">

            <h2 className="tentangpage-title">
              Tentang Platform Ini
            </h2>

            <p className="tentangpage-subtitle">
              Platform ini dirancang untuk membantu siswa MAN 4 Tangerang 
              menemukan dan mengembangkan potensi terbaiknya melalui 
              berbagai kegiatan ekstrakurikuler.
            </p>

            {/* BUTTON */}
            <button
              className="test-btn"
              onClick={() => navigate("/test")}
            >
              Mulai Test
            </button>

            <div className="tentangpage-features">

              <div className="featurepage-card">
                <div className="iconpage">🎯</div>
                <h3>Temukan Minat</h3>
                <p>
                  Jelajahi berbagai pilihan ekstrakurikuler sesuai bakat dan passion kamu.
                </p>
              </div>

              <div className="featurepage-card">
                <div className="iconpage">🚀</div>
                <h3>Kembangkan Potensi</h3>
                <p>
                  Bangun kepercayaan diri dan keterampilan melalui kegiatan yang aktif dan inspiratif.
                </p>
              </div>

              <div className="featurepage-card">
                <div className="iconpage">🤝</div>
                <h3>Berkolaborasi</h3>
                <p>
                  Terhubung dengan teman-teman yang memiliki minat yang sama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TentangPage;