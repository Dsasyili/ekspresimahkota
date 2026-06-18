import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Tentang.css";

export default function Tentang() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section className="tentang">
      <div className="tentang-container">

        <h2 className="tentang-title">
          Tentang Platform Ini 💻
        </h2>

        <p className="tentang-subtitle">
          Platform ini dirancang untuk membantu siswa MAN 4 Tangerang menemukan
          kegiatan ekstrakurikuler yang sesuai dengan minat, karakter, dan potensi diri.
        </p>

       <div className="accordion-progress">
          <div className={`accordion-dot ${expanded === "panel1"? "accordion-dot-active": ""}`}/>
          <div className={`accordion-dot ${expanded === "panel2"? "accordion-dot-active": ""}`}/>
          <div className={`accordion-dot ${expanded === "panel3"? "accordion-dot-active": ""}`}/>
        </div>

        <div className="accordion-wrapper">

          {/* 1 */}
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" className="accordion-title">
                <span className="emoji">🎯</span>
                <strong> Temukan Minat</strong>
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={{ textAlign: "left" }}>
                Jelajahi berbagai pilihan ekstrakurikuler yang tersedia dan
                temukan kegiatan yang benar-benar sesuai dengan minat, bakat,
                serta kepribadian kamu. Dengan memahami preferensi diri sejak
                awal, kamu bisa lebih mudah menentukan kegiatan yang tidak hanya
                menyenangkan, tetapi juga dapat mengembangkan potensi secara
                maksimal.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* 2 */}
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" className="accordion-title">
                <span className="emoji">🚀</span>
                <strong> Kembangkan Potensi</strong>
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={{ textAlign: "left" }}>
                Kamu dapat mengasah kemampuan, membangun kepercayaan diri,
                serta mengembangkan keterampilan baru yang bermanfaat di dunia
                akademik maupun non-akademik. Setiap aktivitas dirancang untuk
                memberikan pengalaman belajar yang aktif, inspiratif, dan
                mendukung pertumbuhan karakter.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* 3 */}
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span" className="accordion-title">
                <span className="emoji">🤝</span>
                <strong> Berkolaborasi</strong>
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={{ textAlign: "left" }}>
                Bergabung dalam kegiatan ekstrakurikuler memungkinkan kamu untuk
                bertemu dengan teman-teman baru yang memiliki minat yang sama,
                belajar bekerja sama dalam tim, serta membangun relasi yang
                positif dan bermanfaat di lingkungan sekolah.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </div>

      </div>
    </section>
  );
}