import { useState, useEffect } from "react";
import "./Kegiatan.css";

/* DATA PRESTASI*/
const prestasiData = [
  {
    title: "Pramuka",
    img: "/1_Pramuka.jpeg",
  },
  {
    title: "PMR",
    img: "/1_Pmr.jpeg",
  },
  {
    title: "Paskibra",
    img: "/1_Paskibra.jpeg",
  },
  {
    title: "Juara Olimpiade",
    img: "/1_Olimpiade.jpeg",
  },
  {
    title: "Olimpiade",
    img: "/2_Bimbingan_Olim.jpeg",
  },
  {
    title: "PIK-R",
    img: "/1_PIK_R.jpeg",
  },
  {
    title: "Karate",
    img: "/1_Karate.jpeg",
  }, 
  {
    title: "Pramuka", 
    img: "/2_Pramuka.jpeg",
  },
  {
    title: "PMR", 
    img: "/2_Pmr.jpeg",
  },
  {
    title: "Paskibra",
    img: "/2_Paskibra.jpeg",
  },
];

/* DATA AKTIVITAS EKSKUL */
const aktivitasData = [
  {
    title: "Badminton",
    img: "/1_Badminton.jpg",
  },
  {
    title: "Voli",
    img: "/1_Voli.jpg",
  },
  {
    title: "Futsal",
    img: "/1_Futsal.jpg",
  },
  {
    title: "PIK-R",
    img: "/2_PIK-R.jpeg",
  },
  {
    title: "KKR",
    img: "/1_KKR.jpg",
  },
  {
    title: "KKR",
    img: "/2_KKR.jpg",
  },
  { 
    title: "Karate",
    img: "/2_Karate.jpeg",
  },
  { 
    title: "Karate",
    img: "/3_Karate.jpg",
  },
];

/* SLIDER COMPONENT */
function SliderSection({
  title,
  subtitle,
  data,
  setSelectedImage,
}) {
  const [index, setIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const [itemsPerSlide, setItemsPerSlide] =
    useState(4);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(
        window.innerWidth <= 768
          ? 1
          : 4
      );
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const next = () => {
    setIndex(
      (prev) =>
        (prev + 1) %
        data.length
    );
  };

  const prev = () => {
    setIndex((prev) =>
      prev - 1 < 0
        ? data.length - 1
        : prev - 1
    );
  };

  const visibleItems =
    Array.from({
      length: itemsPerSlide,
    }).map(
      (_, i) =>
        data[
          (index + i) %
            data.length
        ]
    );

  /* AUTO SLIDE */
  useEffect(() => {
    if (isPaused) return;

    const interval =
      setInterval(() => {
        setIndex(
          (prev) =>
            (prev + 1) %
            data.length
        );
      }, 2000);

    return () =>
      clearInterval(
        interval
      );
  }, [isPaused, data.length]);

  return (
    <div className="kegiatan-section">

      <h2 className="kegiatan-title">
        {title}
      </h2>

      <p className="kegiatan-subtitle">
        {subtitle}
      </p>

      <div
        className="slider-box"
        onMouseEnter={() =>
          setIsPaused(true)
        }
        onMouseLeave={() =>
          setIsPaused(false)
        }
      >
        <button
          className="nav-btn left"
          onClick={prev}
        >
          ‹
        </button>

        <div className="slider-grid">
          {visibleItems.map(
            (item, i) => (
              <div
                className="slide-wrapper"
                key={i}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="clickable"
                  onClick={() =>
                    setSelectedImage(
                      item.img
                    )
                  }
                />

                <h3>
                  {item.title}
                </h3>
              </div>
            )
          )}
        </div>

        <button
          className="nav-btn right"
          onClick={next}
        >
          ›
        </button>
      </div>

    </div>
  );
}

/* MAIN COMPONENT */
export default function Kegiatan() {
  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);

  return (
    <section className="kegiatan">
      <div className="kegiatan-container">

        {/* PRESTASI */}
        <SliderSection
          title="Pencapaian Prestasi 🏆"
          subtitle="Beragam pencapaian siswa yang membanggakan di bidang akademik maupun non-akademik."
          data={prestasiData}
          setSelectedImage={
            setSelectedImage
          }
        />

        {/* DIVIDER */}
        <div className="kegiatan-divider"></div>

        {/* AKTIVITAS */}
        <SliderSection
          title="Aktivitas Ekstrakurikuler 🎯"
          subtitle="Dokumentasi berbagai kegiatan ekstrakurikuler sebagai wadah pengembangan minat dan bakat siswa."
          data={aktivitasData}
          setSelectedImage={
            setSelectedImage
          }
        />

      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="lightbox"
          onClick={() =>
            setSelectedImage(
              null
            )
          }
        >
          <div
            className="lightbox-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="close-btn"
              onClick={() =>
                setSelectedImage(
                  null
                )
              }
            >
              ✕
            </button>

            <img
              src={selectedImage}
              alt="preview"
            />
          </div>
        </div>
      )}
    </section>
  );
}