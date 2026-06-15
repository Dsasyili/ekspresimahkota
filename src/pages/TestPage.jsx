import { useState, useEffect } from "react";
import "./TestPage.css";
import Swal from "sweetalert2";
import { FiArrowLeft } from "react-icons/fi";

function TestPage() {
  const [step, setStep] =
    useState(1);

  const [nama, setNama] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [
    selectedAnswer,
    setSelectedAnswer
  ] = useState("");

  const [bestMatch, setBestMatch] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [jawaban, setJawaban] =
    useState({
      jenis_ekskul: "",

      // WAJIB BARU
      kp: "",
      ck: "",
      sf: "",
      mv: "",
      ct: "",

      // PEMINATAN
      bk: "",
      pk: "",
      lkg: "",
      ba: "",
      fa: "",
      ti: "",
      tk: ""
    });

  /* RESET RADIO SETIAP PINDAH STEP */
  useEffect(() => {
    setSelectedAnswer("");
  }, [step]);

  /* PERTANYAAN EKSKUL WAJIB */
  const wajibQuestions = [
    {
      field: "kp",
      question:
        "Kalau berada di lingkungan baru, biasanya kamu seperti apa?",

      description:
        "Pilih yang paling menggambarkan dirimu.",

      options: [
        {
          id: "kp1",
          value: "KP01",
          label:
            "Mudah beradaptasi dan suka mencoba hal baru"
        },
        {
          id: "kp2",
          value: "KP02",
          label:
            "Peka terhadap lingkungan sekitar"
        },
        {
          id: "kp3",
          value: "KP03",
          label:
            "Nyaman dengan keteraturan dan arahan yang jelas"
        },
        {
          id: "kp4",
          value: "KP04",
          label:
            "Cenderung mengamati dulu sebelum ikut terlibat"
        }
      ]
    },

    {
      field: "ck",
      question:
        "Saat mengerjakan sesuatu bersama orang lain, kamu lebih nyaman bagaimana?",

      description:
        "Pilih cara kerja yang paling cocok buat kamu.",

      options: [
        {
          id: "ck1",
          value: "CK01",
          label:
            "Nyaman bekerja bersama dan berdiskusi"
        },
        {
          id: "ck2",
          value: "CK02",
          label:
            "Senang berkontribusi sesuai kemampuan"
        },
        {
          id: "ck3",
          value: "CK03",
          label:
            "Lebih nyaman jika ada arahan yang jelas"
        },
        {
          id: "ck4",
          value: "CK04",
          label:
            "Fleksibel menyesuaikan situasi"
        }
      ]
    },

    {
      field: "sf",
      question:
        "Kegiatan seperti apa yang paling bikin kamu nyaman?",

      description:
        "Pilih situasi yang paling kamu suka.",

      options: [
        {
          id: "sf1",
          value: "SF01",
          label:
            "Menyukai aktivitas yang aktif dan dinamis"
        },
        {
          id: "sf2",
          value: "SF02",
          label:
            "Nyaman di lingkungan yang suportif"
        },
        {
          id: "sf3",
          value: "SF03",
          label:
            "Lebih suka situasi yang teratur"
        },
        {
          id: "sf4",
          value: "SF04",
          label:
            "Menyukai keseimbangan antara santai dan terarah"
        }
      ]
    },

    {
      field: "mv",
      question:
        "Apa yang biasanya membuat kamu tertarik ikut sebuah kegiatan?",

      description:
        "Pilih alasan yang paling dekat dengan dirimu.",

      options: [
        {
          id: "mv1",
          value: "MV01",
          label:
            "Mencari pengalaman dan tantangan baru"
        },
        {
          id: "mv2",
          value: "MV02",
          label:
            "Ingin memberi dampak positif"
        },
        {
          id: "mv3",
          value: "MV03",
          label:
            "Ingin mengembangkan kedisiplinan diri"
        },
        {
          id: "mv4",
          value: "MV04",
          label:
            "Ingin memiliki lingkungan pertemanan yang baik"
        }
      ]
    },

    {
      field: "ct",
      question:
        "Kalau menghadapi situasi yang tidak berjalan sesuai rencana, biasanya kamu bagaimana?",

      description:
        "Pilih yang paling sering kamu lakukan.",

      options: [
        {
          id: "ct1",
          value: "CT01",
          label:
            "Langsung mencoba mencari solusi"
        },
        {
          id: "ct2",
          value: "CT02",
          label:
            "Mencoba memahami situasi terlebih dahulu"
        },
        {
          id: "ct3",
          value: "CT03",
          label:
            "Mengikuti langkah yang sudah jelas"
        },
        {
          id: "ct4",
          value: "CT04",
          label:
            "Menyesuaikan diri dan mencoba cara lain"
        }
      ]
    }
  ];

  /* PERTANYAAN PEMINATAN */
  const peminatanQuestions = [
    {
      field: "bk",
      question:
        "Kalau ikut suatu kegiatan, hal seperti apa yang paling kamu suka lakukan?",

      options: [
        {
          id: "bk1",
          value: "BK01",
          title: "Akademik",
          label:
            "Belajar hal baru, mengasah kemampuan, atau mencoba tantangan berpikir"
        },
        {
          id: "bk2",
          value: "BK02",
          title: "Olahraga",
          label:
            "Aktif bergerak dan mencoba tantangan fisik"
        },
        {
          id: "bk3",
          value: "BK03",
          title: "Seni & Budaya",
          label:
            "Menyalurkan kreativitas lewat seni atau budaya"
        },
        {
          id: "bk4",
          value: "BK04",
          title: "Organisasi",
          label:
            "Ikut kegiatan organisasi dan berinteraksi dengan banyak orang"
        },
        {
          id: "bk5",
          value: "BK05",
          title: "Keagamaan",
          label:
            "Ikut kegiatan keagamaan untuk belajar, berkembang, atau tampil di acara rohani"
        }
      ]
    },

    {
      field: "pk",
      question:
        "Kamu lebih suka kegiatan yang berkelompok atau individu?",
      description:
        "Pilih cara belajar atau beraktivitas favoritmu.",

      options: [
        {
          id: "pk1",
          value: "PK01",
          title: "Berkelompok",
          label:
            "Bareng teman, lebih seru kalau ramai"
        },
        {
          id: "pk2",
          value: "PK02",
          title: "Individu",
          label:
            "Lebih suka sendiri dan fokus"
        },
        {
          id: "pk3",
          value: "PK03",
          title: "Berkelompok & Individu",
          label:
            "Nyaman melakukan keduanya, sendiri maupun berkelompok"
        }
      ]
    },

    {
      field: "lkg",
      question:
        "Kalau ikut kegiatan, tempat seperti apa yang paling kamu suka?",
      description:
        "Pilih suasana yang paling nyaman buatmu.",

      options: [
        {
          id: "lkg1",
          value: "LKG01",
          title: "Indoor",
          label:
            "Kegiatan di dalam ruangan"
        },
        {
          id: "lkg2",
          value: "LKG02",
          title: "Outdoor",
          label:
            "Kegiatan di luar ruangan"
        },
        {
          id: "lkg3",
          value: "LKG03",
          title: "Indoor & Outdoor",
          label:
            "Nyaman dua-duanya, di dalam maupun luar ruangan"
        }
      ]
    },

    {
      field: "ba",
      question:
        "Kamu paling suka bentuk kegiatan yang seperti apa?",
      description:
        "Pilih aktivitas yang paling bikin semangat.",

      options: [
        {
          id: "ba1",
          value: "BA01",
          title: "Praktik/lapangan",
          label:
            "Banyak kegiatan lapangan dan praktik langsung"
        },
        {
          id: "ba2",
          value: "BA02",
          title: "Diskusi/pembelajaran",
          label:
            "Belajar bersama lewat diskusi dan ngobrol bareng"
        },
        {
          id: "ba3",
          value: "BA03",
          title: "Penampilan/event",
          label:
            "Tampil atau ikut kegiatan di acara sekolah"
        },
        {
          id: "ba4",
          value: "BA04",
          title: "Kompetisi/lomba",
          label:
            "Mengikuti lomba atau kompetisi"
        },
        {
          id: "ba5",
          value: "BA05",
          title: "Kombinasi beberapa aktivitas",
          label:
            "Gabungan antara teori, praktik, dan kegiatan lain"
        }
      ]
    },

    {
      field: "fa",
      question:
        "Saat ikut ekskul, kamu lebih suka fokus kegiatan seperti apa?",
      description:
        "Pilih metode yang paling nyaman buatmu.",

      options: [
        {
          id: "fa1",
          value: "FA01",
          title: "Teori",
          label:
            "Lebih suka memahami teori"
        },
        {
          id: "fa2",
          value: "FA02",
          title: "Praktik",
          label:
            "Cenderung suka yang langsung praktik"
        },
        {
          id: "fa3",
          value: "FA03",
          title: "Teori & Praktik",
          label:
            "Melakukan keduanya, teori dan praktik"
        }
      ]
    },

    {
      field: "ti",
      question:
        "Kamu lebih suka kegiatan yang santai atau cukup serius?",
      description:
        "Pilih intensitas yang paling nyaman.",

      options: [
        {
          id: "ti1",
          value: "TI01",
          label:
            "Santai"
        },
        {
          id: "ti2",
          value: "TI02",
          label:
            "Sedang, tetap aktif"
        },
        {
          id: "ti3",
          value: "TI03",
          label:
            "Serius dan kompetitif"
        }
      ]
    },

    {
      field: "tk",
      question:
        "Kalau ikut ekskul, target apa yang paling pengen kamu dapetin?",
      description:
        "Pilih tujuan utama kamu.",

      options: [
        {
          id: "tk1",
          value: "TK01",
          title: "Prestasi/Kompetisi",
          label:
            "Prestasi dan pengalaman ikut kompetisi"
        },
        {
          id: "tk2",
          value: "TK02",
          title: "Pengembangan Skill",
          label:
            "Nambah skill dan kemampuan baru"
        },
        {
          id: "tk3",
          value: "TK03",
          title: "Kepemimpinan & Organisasi",
          label:
            "Belajar jadi pemimpin dan aktif organisasi"
        },
        {
          id: "tk4",
          value: "TK04",
          title: "Hobi & Minat",
          label:
            "Sekadar menyalurkan minat dan hobi"
        }
      ]
    }
  ];

  const allQuestions = [
    ...wajibQuestions,
    ...peminatanQuestions
  ];

  const getOptionLabel = (value) => {

    for (const question of allQuestions) {

      const option =
        question.options.find(
          (opt) =>
            opt.value === value
        );

      if (option) {
        return {
          label:
            option.label,
          title:
            option.title || "",
        };
      }
    }

    return null;
  };

    /* DYNAMIC QUESTION */
    const questions =
      jawaban.jenis_ekskul === "JE01"
        ? wajibQuestions
        : peminatanQuestions;

    const currentQuestion =
      questions[step - 3];

    const totalQuestion =
      questions.length;

    const progress =
      step >= 3
        ? ((step - 2) /
            totalQuestion) *
          100
        : 0;

/* HANDLE SUBMIT */
const handleSubmit = (e) => {
  e.preventDefault();

  if (!nama || !gender) {

    Swal.fire({
      icon: "warning",
      title: "Peringatan",
      text:
        "Silakan lengkapi data terlebih dahulu."
    });

    return;
  }

  setStep(2);
};

/* HANDLE JENIS EKSKUL */
const handleJenisEkskul =
  (jenis) => {

    setJawaban(
      (prev) => ({
        ...prev,
        jenis_ekskul:
          jenis
      })
    );

    setStep(3);
};

/* HANDLE NEXT */
const handleNext =
  async () => {

    if (
      !selectedAnswer
    ) {

      Swal.fire({
        icon:
          "warning",
        title:
          "Pilih Jawaban",
        text:
          "Silakan pilih jawaban terlebih dahulu."
      });

      return;
    }

    // Cari option berdasarkan ID
    const selectedOption =
      currentQuestion.options.find(
        (option) =>
          option.id ===
          selectedAnswer
      );

    // Simpan VALUE (KP01, KP02, dst)
    const updatedJawaban =
      {
        ...jawaban,
        [
          currentQuestion
            .field
        ]:
          selectedOption
            ?.value
      };

    setJawaban(
      updatedJawaban
    );

    // Reset pilihan untuk soal berikutnya
    setSelectedAnswer(
      ""
    );

    const isLastQuestion =
      step ===
      totalQuestion +
        2;

    if (
      isLastQuestion
    ) {

      try {

        setLoading(
          true
        );

        console.log(
          "DATA DIKIRIM:",
          updatedJawaban
        );

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/test/rekomendasi`,
            {
              method:
                "POST",
              headers:
                {
                  "Content-Type":
                    "application/json"
                },
              body:
                JSON.stringify(
                  updatedJawaban
                )
            }
          );

        try {

          setLoading(true);

          // pindah dulu ke halaman result
          setStep(
            totalQuestion + 3
          );

          const response =
            await fetch(
              `${import.meta.env.VITE_API_URL}/api/test/rekomendasi`,
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json"
                },
                body: JSON.stringify(
                  updatedJawaban
                )
              }
            );

          const data =
            await response.json();

          console.log(
            "HASIL API:",
            data
          );

          if (!response.ok) {

            Swal.fire({
              icon: "error",
              title: "Oops",
              text:
                data.message ||
                "Gagal mendapatkan rekomendasi"
            });

            return;
          }

          setBestMatch(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }

      } catch (
        error
      ) {

        console.log(
          error
        );

      } finally {

        setLoading(
          false
        );
      }

    } else {

      setStep(
        (prev) =>
          prev + 1
      );
    }
  };

/* KATEGORI HASIL */
let kategoriHasil =
  "";

if (
  bestMatch?.skor >=
  6
) {

  kategoriHasil =
    "Sangat Cocok";
}
else if (
  bestMatch?.skor >=
  4
) {

  kategoriHasil =
    "Cocok";
}
else if (
  bestMatch?.skor >=
  2
) {

  kategoriHasil =
    "Cukup Cocok";
}
else {

  kategoriHasil =
    "Rekomendasi Dasar";
}

/* LABEL KODE PILIHAN */
const kodeLabel = {
  // WAJIB (5 Kategori)
  // KEPRIBADIAN
  KP01: "Mudah beradaptasi dan suka mencoba hal baru",
  KP02: "Peka terhadap lingkungan sekitar",
  KP03: "Nyaman dengan keteraturan dan arahan jelas",
  KP04: "Cenderung mengamati sebelum terlibat",

  // CARA KERJA
  CK01: "Nyaman bekerja bersama dan berdiskusi",
  CK02: "Senang berkontribusi sesuai kemampuan",
  CK03: "Lebih nyaman jika ada arahan yang jelas",
  CK04: "Fleksibel menyesuaikan situasi",

  // SITUASI FAVORIT
  SF01: "Menyukai aktivitas yang aktif dan dinamis",
  SF02: "Nyaman di lingkungan yang suportif",
  SF03: "Lebih suka situasi yang teratur",
  SF04: "Menyukai keseimbangan antara santai dan terarah",

  // MOTIVASI
  MV01: "Mencari pengalaman dan tantangan baru",
  MV02: "Ingin memberi dampak positif",
  MV03: "Ingin mengembangkan kedisiplinan diri",
  MV04: "Ingin memiliki lingkungan pertemanan yang baik",

  // TANTANGAN
  CT01: "Cenderung langsung mencari solusi",
  CT02: "Memahami situasi terlebih dahulu",
  CT03: "Mengikuti langkah yang sudah terarah",
  CT04: "Beradaptasi dan mencoba cara lain",

  // PEMINATAN (7 Kategori)
  BK01: "Akademik",
  BK02: "Olahraga",
  BK03: "Seni dan Budaya",
  BK04: "Organisasi",
  BK05: "Keagamaan",

  PK01: "Berkelompok",
  PK03: "Keduanya",

  LKG01: "Indoor",
  LKG02: "Outdoor",
  LKG03: "Keduanya",

  BA01: "Praktik/Lapangan",
  BA02: "Diskusi/Pembelajaran",
  BA03: "Penampilan/Event",
  BA04: "Kompetisi/Lomba",
  BA05: "Kombinasi Aktivitas",

  FA02: "Praktik",
  FA03: "Keduanya",

  TI01: "Santai",
  TI02: "Sedang",
  TI03: "Intensif / Kompetitif",

  TK01: "Prestasi & Kompetisi",
  TK02: "Pengembangan Skill",
  TK03: "Kepemimpinan & Organisasi",
  TK04: "Minat & Hobi"
};

const handleBack = () => {

  // dari step 2 balik ke step 1
  if (step === 2) {
    setStep(1);
    return;
  }

  // dari pertanyaan pertama balik ke step 2
  if (step === 3) {
    setStep(2);
    setSelectedAnswer("");
    return;
  }

  // pertanyaan selanjutnya
  if (step > 3) {
    setStep((prev) => prev - 1);

    // optional reset jawaban
    setSelectedAnswer("");
  }
};

return (
  <div className="test-page">
    <div className="test-wrapper">
      {/* LEFT SECTION */}
      {step !== 2 &&
        step !== totalQuestion + 3 && (
        <div className="left-section">

          {step === 1 && (
            <img
              src="/image1.png"
              alt="Form"
            />
          )}

          {step >= 3 &&
            step <= totalQuestion + 2 && (
              <img
                className="left-image-question"
                src="/image3.png"
                alt="Question"
              />
          )}
        </div>
      )}

      {/* RIGHT SECTION */}
      <div className="right-section">
        {/* PROGRESS */}
        {step >= 3 &&
          step <=
            totalQuestion + 2 && (

          <div className="progress-container">
            <div className="progress-info">
              <span>
                Progress
              </span>

              <span>
                Pertanyaan
                {" "}
                {step - 2}
                /
                {totalQuestion}
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width:
                    `${progress}%`
                }}
              ></div>
            </div>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="form-container">
            <h1>Kenalan Dulu, Yuk!</h1>

            <p>Isi data dirimu sebelum memulai test rekomendasi ekskul 🚀</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="nama">
                  Nama
                </label>

                <input
                  id="nama"
                  name="nama"
                  type="text"
                  placeholder="Masukkan nama kamu"
                  value={nama}
                  onChange={(e) =>
                    setNama(e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                <label htmlFor="gender">
                  Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                >
                  <option value="">
                    Pilih Gender
                  </option>

                  <option value="L">
                    Laki-laki
                  </option>

                  <option value="P">
                    Perempuan
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="btn"
              >
                Lanjutkan
              </button>
            </form>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="welcome-container">

            <button
              className="back-btn"
              onClick={handleBack}
            >
              <FiArrowLeft />
              Kembali
            </button>

            <h1>
              Halo,
              {" "}
              <span>
                {nama}
              </span>
              👋
            </h1>

            <p className="welcome-text">
              Yuk pilih jenis ekskul dulu untuk mulai menemukan ekskul yang paling cocok 🚀
            </p>

            <h3>Pilih Jenis Ekstrakurikuler</h3>

            <div className="jenis-ekskul-group">
              <label className="jenis-ekskul-card">
                <input
                  type="radio"
                  value="JE01"
                  checked={
                    selectedAnswer === "JE01"
                  }
                  onChange={(e) =>
                    setSelectedAnswer(
                      e.target.value
                    )
                  }
                />
                <div className="jenis-ekskul-content">

                  <img
                    src="/wajib.jpg"
                    alt="Ekskul Wajib"
                  />

                  <h4>Ekskul Wajib</h4>
                </div>
              </label>

              <label className="jenis-ekskul-card">
                <input
                  type="radio"
                  value="JE02"
                  checked={
                    selectedAnswer === "JE02"
                  }
                  onChange={(e) =>
                    setSelectedAnswer(
                      e.target.value
                    )
                  }
                />

                <div className="jenis-ekskul-content">
                  <img
                    src="/peminatan.jpg"
                    alt="Ekskul Peminatan"
                  />

                  <h4>Ekskul Peminatan</h4>
                </div>
              </label>
            </div>

            <button
              className="btn btn-step2"
              onClick={() => {

                if (
                  !selectedAnswer
                ) {

                  Swal.fire({
                    icon:
                      "warning",
                    title:
                      "Pilih Jenis Ekskul",
                    text:
                      "Silakan pilih jenis ekstrakurikuler terlebih dahulu."
                  });

                  return;
                }

                handleJenisEkskul(
                  selectedAnswer
                );
              }}
            >
              Mulai Test
            </button>
          </div>
        )}

        {/* DYNAMIC QUESTION */}
          {step >= 3 &&
          step <= totalQuestion + 2 &&
          currentQuestion && (

            <div className="question-container">
              <button
                className="back-btn"
                onClick={handleBack}
              >
                <FiArrowLeft />
                Kembali
              </button>

              <h1>
                {
                  currentQuestion.question
                }
              </h1>

              <p>Pilih salah satu, yang paling menggambarkan diri kamu</p>

              <div className="radio-group">
                {currentQuestion.options.map(
                  (option) => (

                    <label
                        key={option.id}
                        className="radio-card"
                      >

                      <input
                        type="radio"
                        value={option.id}
                        checked={
                          selectedAnswer === option.id
                        }
                        onChange={() =>
                          setSelectedAnswer(option.id)
                        }
                      />

                    <span className="option-text">

                      {option.title && (
                        <strong className="option-title">
                          ({option.title})
                        </strong>
                      )}

                      {" "}
                      {option.label}

                    </span>

                    </label>
                  )
                )}
              </div>

              <button
                className="btn"
                onClick={
                  handleNext
                }
              >

                {step ===
                totalQuestion + 2
                  ? "Lihat Hasil"
                  : "Selanjutnya"}

              </button>

            </div>
          )}

          {/* RESULT PAGE */}
          {step === totalQuestion + 3 && (
            <div className="question-container">

              {console.log(bestMatch)}

              {loading ? (
                <div className="loading-box">
                  <div className="loading-content">

                    <div className="loading-spinner"></div>

                    <h2>
                      Sedang mencari ekskul terbaik untuk kamu 🚀
                    </h2>

                    <p>
                      Kami sedang mencocokkan jawabanmu
                      dengan ekskul yang paling sesuai
                    </p>

                  </div>
                </div>
              ) : bestMatch ? (
                <div className="hasil-layout">

                  {/* KIRI */}
                  <div className="hasil-left">

                    <h3>
                      Ekskul yang Cocok Untuk Kamu 🚀
                    </h3>

                    <p>
                      {nama}, berdasarkan jawaban
                      yang telah kamu isi,
                      ekskul yang paling cocok adalah:
                    </p>

                    <div className="hasil-card">

                      <h1>
                        {bestMatch.nama_kegiatan}
                      </h1>

                      <div className="hasil-detail">

                        <p>
                          <strong>
                            Kecocokan:
                          </strong>{" "}
                          {bestMatch.skor}
                          /
                          {bestMatch.max_skor}
                        </p>

                        <p>
                          <strong>
                            Kategori:
                          </strong>{" "}
                          {kategoriHasil}
                        </p>

                        <p>
                          <strong>
                            Tahap Eliminasi:
                          </strong>{" "}
                          {bestMatch.tahap}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* KANAN */}
                  <div className="hasil-right">
                    <h3>Kenapa Ekskul Ini Cocok Untuk Kamu?</h3>

                    <p className="hasil-desc">Berikut kecocokan jawaban kamu dengan ekskul yang direkomendasikan:</p>

                    <div className="jawaban-list">

                      {Object.entries(jawaban)

                        .filter(
                          ([key, value]) =>
                            key !==
                              "jenis_ekskul" &&
                            value
                        )

                        .map(([key, value]) => {

                          const isMatch =
                            bestMatch?.matched_rules?.includes(
                              value
                            );

                          const optionData =
                            getOptionLabel(value);

                          return (
                            <div
                              key={key}
                              className={`jawaban-item ${
                                isMatch
                                  ? "match"
                                  : "not-match"
                              }`}
                            >

                              <span className="icon-status">
                                {isMatch
                                  ? "✅"
                                  : "❌"}
                              </span>

                              <div>

                                {optionData?.title && (
                                  <strong>
                                    {optionData.title}
                                  </strong>
                                )}

                                <p>
                                  {optionData?.label}
                                </p>

                                <small>
                                  {isMatch
                                    ? "Cocok dengan karakter ekskul ini"
                                    : "Kurang sesuai dengan karakter ekskul ini"}
                                </small>

                              </div>

                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hasil-box">

                  <h2>Tidak ditemukan rekomendasi 😢</h2>

                  <p>Coba ulangi test dan pilih jawaban lain.</p>
                </div>

              )}

              {!loading && (
                <button
                  className="btn btn-repeat"
                  onClick={() => {
                    setStep(1);
                    setNama("");
                    setGender("");
                    setSelectedAnswer("");
                    setBestMatch(null);

                    setJawaban({
                      jenis_ekskul: "",
                      kp: "",
                      ck: "",
                      sf: "",
                      mv: "",
                      ct: "",
                      bk: "",
                      pk: "",
                      lkg: "",
                      ba: "",
                      fa: "",
                      ti: "",
                      tk: ""
                    });
                  }}
                >
                  Ulangi Test
                </button>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }
export default TestPage;