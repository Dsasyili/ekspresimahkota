import "./Kontakpage.css";
import { FiInstagram } from "react-icons/fi";
import { useEffect, useRef } from "react";

function Kontakpage() {
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
    <section className="kontak-page">
      <div className="kontakpage-container">

        <div className="kontakpage-wrapper">

          <div className="kontakpage-text">
            <h2
              ref={addToRefs}
              className="kontakpage-title reveal reveal-up"
            >
              Ikuti Kegiatan Kami 📸
            </h2>

            <p
              ref={addToRefs}
              className="kontakpage-subtitle reveal reveal-up delay-1"
            >
              Semua kegiatan ekstrakurikuler yang dilakukan dapat dilihat
              secara lengkap di akun Instagram kami.
              Dapatkan update terbaru, dokumentasi kegiatan,
              dan informasi menarik lainnya hanya di sana!
            </p>

            <a
              ref={addToRefs}
              href="https://www.instagram.com/ekspresi.mahkota/"
              target="_blank"
              rel="noopener noreferrer"
              className="kontakpage-btn reveal reveal-up delay-2"
            >
              <FiInstagram className="ig-icon" />
              ekspresi.mahkota
            </a>
          </div>

          {/* IMAGE */}
          <div
            ref={addToRefs}
            className="kontakpage-image reveal reveal-right delay-1"
          >
            <img
              src="/instagram-acc.png"
              alt="Instagram Ekskul"
            />
          </div>

        </div>

        {/* GOOGLE MAPS */}
        <div className="maps-section">
          <h2
            ref={addToRefs}
            className="maps-title reveal reveal-up"
          >
            Lokasi Kami 📍
          </h2>

          <p
            ref={addToRefs}
            className="maps-subtitle reveal reveal-up delay-1"
          >
            Temukan lokasi kami dengan mudah melalui Google Maps.
          </p>

          <div
            ref={addToRefs}
            className="kontakpage-map reveal reveal-up delay-2"
          >
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