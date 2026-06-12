import { useState } from "react";
import "./KeterampilanPage.css";
import { FiX } from "react-icons/fi";

function KeterampilanPage() {
  const [selectedSkill, setSelectedSkill] = useState(null);
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

  return (
    <section className="ekskul-page">
      <div className="ekskul-wrapper">
        <h1 className="ekskul-title-page">
          Program Keterampilan
        </h1>

        <p className="ekskul-subtitle">
          Pilihan program keterampilan yang tersedia bagi siswa.
        </p>

        {/* GRID CARD */}
        <div className="ekskul-container">
          {keterampilanList.map((item, index) => (
            <div
              className="ekskul-card"
              key={index}
              onClick={() => setSelectedSkill(item)}
            >
              <img src={item.foto} alt={item.nama} />

              <div className="card-overlay">
                <span>Lihat Detail</span>
              </div>

              <div className="ekskul-card-content">
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
              className="modal-ekskul"
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