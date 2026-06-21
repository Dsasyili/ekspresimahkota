import "./Kontak.css";
import { FaInstagram } from "react-icons/fa";
import { useEffect } from "react";

function Kontak() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="kontak-section">
      <div className="kontak-container">
        
        {/* KIRI */}
        <div className="kontak-text reveal">
          <h2>Ikuti Kegiatan Kami 📸</h2> 
          <p>
            Semua kegiatan ekstrakurikuler yang dilakukan dapat dilihat
            secara lengkap di akun Instagram kami.  
            Dapatkan update terbaru, dokumentasi kegiatan,
            dan informasi menarik lainnya hanya di sana!
          </p>

          <a
            href="https://www.instagram.com/ekspresi.mahkota/"
            target="_blank"
            rel="noopener noreferrer"
            className="kontak-btn"
          >
            <FaInstagram className="ig-icon" />
            Kunjungi Instagram
          </a>
        </div>

        {/* KANAN */}
        <div className="kontak-image reveal">
          <img
            src="/instagram-acc.png"
            alt="Instagram Ekskul"
          />
        </div>

      </div>
    </section>
  );
}

export default Kontak;