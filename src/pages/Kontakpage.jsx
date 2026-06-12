import "./Kontakpage.css";
import { FiInstagram } from "react-icons/fi";

function Kontakpage() {
  return (
    <section className="kontak-page">
      <div className="kontakpage-container">

        <div className="kontakpage-wrapper">

          <div className="kontakpage-text">
            <h2 className="kontakpage-title">
              Ikuti Kegiatan Kami 📸
            </h2>

            <p className="kontakpage-subtitle">
              Semua kegiatan ekstrakurikuler yang dilakukan dapat dilihat
              secara lengkap di akun Instagram kami.  
              Dapatkan update terbaru, dokumentasi kegiatan,
              dan informasi menarik lainnya hanya di sana!
            </p>

            <a
              href="https://www.instagram.com/ekspresi.mahkota/"
              target="_blank"
              rel="noopener noreferrer"
              className="kontakpage-btn"
            >
              <FiInstagram className="ig-icon" />
              ekspresi.mahkota
            </a>
          </div>

          {/* IMAGE */}
          <div className="kontakpage-image">
            <img
              src="/instagram-acc.png"
              alt="Instagram Ekskul"
            />
          </div>

        </div>

        {/* GOOGLE MAPS */}
        <div className="maps-section">
          <h2 className="maps-title">Lokasi Kami 📍</h2>
          <p className="maps-subtitle">
            Temukan lokasi kami dengan mudah melalui Google Maps.
          </p>

          <div className="kontakpage-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.3378286492266!2d106.42065627572981!3d-6.085105359701179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e41f9441a1e4621%3A0x3d589a7c008cffd!2sMAN%204%20TANGERANG%20KABUPATEN%20TANGERANG!5e0!3m2!1sid!2sid!4v1776575018662!5m2!1sid!2sid"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>

            <a
              href="https://maps.app.goo.gl/KYA6DXz6pKYBKaLW6" 
              target="_blank"
              rel="noopener noreferrer"
              className="map-overlay-btn"
            >
              Buka di Google Maps
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Kontakpage;