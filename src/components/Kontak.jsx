import "./Kontak.css";
import { FaInstagram } from "react-icons/fa";

function Kontak() {
  return (
    <section className="kontak-section">
      <div className="kontak-container">
        
        {/* KIRI */}
        <div className="kontak-text">
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
        <div className="kontak-image">
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
