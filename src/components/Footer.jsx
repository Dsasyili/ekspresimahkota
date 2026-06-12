import "./Footer.css";
import {FaInstagram,FaMapMarkerAlt,FaYoutube,FaTiktok} from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* KIRI - LOGO */}
        <div className="footer-left">
          <img
            src="/FooterLogo.png"
            alt="Logo Sekolah"
            className="footer-logo"
          />

          <p>
            Madrasah Aliyah Negeri yang Unggul, Islami, Populis,
            Berkarakter dan Berwawasan Lingkungan
          </p>
        </div>

        {/* TENGAH - KUNJUNGI KAMI */}
        <div className="footer-center">
          <h4>Kunjungi Kami</h4>

          <a
            href="https://maps.app.goo.gl/KYA6DXz6pKYBKaLW6"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-location"
          >
            <span className="icon-circle">
              <FaMapMarkerAlt />
            </span>

            <p>
              <strong>MAN 4 Tangerang</strong> <br />
              Pejamuran Jl. Raya Kronjo No.Km.3, Pasilian,
              Kec. Kronjo, Kabupaten Tangerang,
              Banten 15550
            </p>
          </a>
        </div>

        {/* KANAN - IKUTI KAMI */}
        <div className="footer-right">
          <h4>Ikuti Kami</h4>

          <div className="footer-social-grid">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/ekspresi.mahkota/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              <span className="icon-circle">
                <FaInstagram />
              </span>
              @ekspresi.mahkota
            </a>

            {/* Youtube */}
            <a
              href="https://www.youtube.com/@man4tangerangofficial232"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              <span className="icon-circle">
                <FaYoutube />
              </span>
              MAN 4 Tangerang
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/man4tangerang_official"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              <span className="icon-circle">
                <FaInstagram />
              </span>
              @man4tangerang_official
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@man.4.tangerang.o"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              <span className="icon-circle">
                <FaTiktok />
              </span>
              @man.4.tangerang.o
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          Copyright © {year} - MAN 4 Tangerang.
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;