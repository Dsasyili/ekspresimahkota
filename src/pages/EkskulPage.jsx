import "./EkskulPage.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";

function EkskulPage() {
  const [ekskulList, setEkskulList] = useState([]);
  const [selectedEkskul, setSelectedEkskul] = useState(null);

  const revealRefs = useRef([]);

  useEffect(() => {
    fetchEkskul();
  }, []);

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
  }, [ekskulList]);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const fetchEkskul = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/ekskul`
      );
      setEkskulList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data ekskul:", error);
    }
  };

  return (
    <section className="ekskul-page">
      <div className="ekskul-wrapper">
        <h1
          ref={addToRefs}
          className="ekskul-title-page reveal reveal-up"
        >
          Ekstrakurikuler
        </h1>

        <p
          ref={addToRefs}
          className="ekskul-subtitle reveal reveal-up delay-1"
        >
          Pilihan aktivitas ekstrakurikuler yang tersedia bagi siswa.
        </p>

        {ekskulList.length === 0 ? (
          <div
            ref={addToRefs}
            className="empty-container reveal reveal-up delay-2"
          >
            <img src="/nulldata.png" alt="No Data" className="empty-img" />
            <p className="empty-text">
              Kegiatan Ekstrakurikuler belum tersedia.
            </p>
          </div>
        ) : (
          <div className="ekskul-container">
            {ekskulList.map((item, index) => (
              <div
                ref={addToRefs}
                className="ekskul-card reveal reveal-up"
                style={{ transitionDelay: `${index * 0.08}s` }}
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