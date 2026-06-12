import "./EkskulPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

function EkskulPage() {
  const [ekskulList, setEkskulList] = useState([]);

  // MODAL STATE
  const [selectedEkskul, setSelectedEkskul] = useState(null);

  useEffect(() => {
    fetchEkskul();
  }, []);

  const fetchEkskul = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ekskul");
      setEkskulList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data ekskul:", error);
    }
  };

  return (
    <section className="ekskul-page">
      <div className="ekskul-wrapper">

        <h1 className="ekskul-title-page">
          Ekstrakurikuler
        </h1>

        <p className="ekskul-subtitle">
          Pilihan aktivitas ekstrakurikuler yang tersedia bagi siswa.
        </p>

      {ekskulList.length === 0 ? (
      <div className="empty-container">
        <img src="/nulldata.png" alt="No Data" className="empty-img" />
        <p className="empty-text">
          Kegiatan Ekstrakurikuler belum tersedia.
        </p>
      </div>
) : (
  <>
      {/* GRID */}
          <div className="ekskul-container">
            {ekskulList.map((item, index) => (
              <div
                className="ekskul-card"
                key={index}
                onClick={() => setSelectedEkskul(item)}
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
        </>
      )}

      {/* MODAL POPUP */}
        {selectedEkskul && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedEkskul(null)}
          >
            <div
              className="modal-ekskul"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedEkskul(null)}
              >
                <FiX />
              </button>

              <img
                src={selectedEkskul.foto}
                alt={selectedEkskul.nama}
                className="modal-img"
              />

              <h2>{selectedEkskul.nama}</h2>
              <p>{selectedEkskul.deskripsi}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default EkskulPage;