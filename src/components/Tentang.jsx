import "./Tentang.css";

function Tentang() {
  return (
    <section className="tentang">
      <div className="tentang-container">

        <h2 className="tentang-title">
          Tentang Platform Ini 💻
        </h2>

        <p className="tentang-subtitle">
          Platform ini dirancang untuk membantu siswa MAN 4 Tangerang 
          menemukan dan mengembangkan potensi terbaiknya melalui 
          berbagai kegiatan ekstrakurikuler.
        </p>

        <div className="tentang-features">

          <div className="feature-card">
            <div className="icon">🎯</div>
            <h3>Temukan Minat</h3>
            <p>
              Jelajahi berbagai pilihan ekstrakurikuler sesuai bakat dan passion kamu.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🚀</div>
            <h3>Kembangkan Potensi</h3>
            <p>
              Bangun kepercayaan diri dan keterampilan melalui kegiatan yang aktif dan inspiratif.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🤝</div>
            <h3>Berkolaborasi</h3>
            <p>
              Terhubung dengan teman-teman yang memiliki minat yang sama.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Tentang;