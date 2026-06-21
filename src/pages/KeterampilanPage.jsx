import { useEffect, useRef, useState } from "react";
import "./KeterampilanPage.css";
import { FiX } from "react-icons/fi";

function KeterampilanPage() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const revealRefs = useRef([]);

  const keterampilanList = [
    {
      nama: "Multimedia",
      foto: "/Multimedia.jpg",
      deskripsi:
        "Program keterampilan multimedia yang mempelajari desain grafis, editing video, fotografi, animasi, serta produksi konten digital kreatif.",
    },
    {
      nama: "Robotik",
      foto: "/Robotik.jpg",
      deskripsi:
        "Program keterampilan robotik yang berfokus pada perakitan robot, pemrograman dasar, sensor, elektronika, dan pengembangan teknologi otomatisasi.",
    },
    {
      nama: "Otomotif",
      foto: "/Otomotif.jpg",
      deskripsi:
        "Program keterampilan otomotif yang mempelajari dasar perawatan kendaraan, sistem mesin, kelistrikan otomotif, dan praktik servis kendaraan.",
    },
    {
      nama: "Elektronika",
      foto: "/Elektronika.jpg",
      deskripsi:
        "Program keterampilan elektronika yang mengajarkan perakitan komponen elektronik, soldering, rangkaian listrik, dan troubleshooting perangkat.",
    },
    {
      nama: "Tata Busana",
      foto: "/TataBusana.jpg",
      deskripsi:
        "Program keterampilan tata busana yang mempelajari desain pakaian, menjahit, pola busana, hingga pengembangan kreativitas fashion.",
    },
  ];

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
    <section className="keterampilan-page">
      <div className="keterampilan-wrapper">
        <h1
          ref={addToRefs}
          className="keterampilan-title-page reveal reveal-up"
        >
          Program Keterampilan
        </h1>

        <p
          ref={addToRefs}
          className="keterampilan-subtitle reveal reveal-up delay-1"
        >
          Pilihan program keterampilan yang tersedia bagi siswa.
        </p>

        {/* GRID CARD */}
        <div className="keterampilan-container">
          {keterampilanList.map((item, index) => (
            <div
              ref={addToRefs}
              className="keterampilan-card reveal reveal-up"
              style={{ transitionDelay: `${index * 0.08}s` }}
              key={index}
              onClick={() => setSelectedSkill(item)}
            >
              <img src={item.foto} alt={item.nama} />

              <div className="card-overlay">
                <span>Lihat Detail</span>
              </div>

              <div className="keterampilan-card-content">
                <h3>{item.nama}</h3>
                <p>{item.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL POPUP */}
        {selectedSkill && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedSkill(null)}
          >
            <div
              className="modal-keterampilan"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedSkill(null)}
              >
                <FiX />
              </button>

              <img
                src={selectedSkill.foto}
                alt={selectedSkill.nama}
                className="modal-img"
              />

              <h2>{selectedSkill.nama}</h2>
              <p>{selectedSkill.deskripsi}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default KeterampilanPage;