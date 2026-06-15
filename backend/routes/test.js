import express from "express";
import db from "../db.js";

const router = express.Router();

/* FORWARD CHAINING + ELIMINASI */
router.post(
  "/rekomendasi",
  async (req, res) => {

  const { jenis_ekskul } = req.body;
  let jawabanUser = [];
  let tahapEliminasi = [];
  let skorMaksimal = 0;

  /* Cegah double repsonse */
  let responseSent = false;

  const sendResponse = (data) => {
    if (responseSent) return;
    responseSent = true;
    return res.json(data);
  };

  
  // ======================
  // EKSKUL WAJIB
  // ======================
  if (jenis_ekskul === "JE01") {

    console.log("BODY:", req.body);

    jawabanUser = [
      req.body.kp,
      req.body.ck,
      req.body.sf,
      req.body.mv,
      req.body.ct
    ];

    skorMaksimal = 5;
  }

  // ======================
  // EKSKUL PEMINATAN
  // ======================
  else if (jenis_ekskul === "JE02") {

    jawabanUser = [
      req.body.bk,
      req.body.pk,
      req.body.lkg,
      req.body.ba,
      req.body.fa,
      req.body.ti,
      req.body.tk
    ];

    skorMaksimal = 7;
  }

  /* VALIDASI */
  if (
    !jenis_ekskul ||
    jawabanUser.includes("") ||
    jawabanUser.includes(undefined)
  ) {

    return res.status(400).json({
      message: "Semua pertanyaan wajib diisi"
    });
  }

  /* AMBIL PRIORITAS ELIMINASI DARI DATABASE */
const getTahapEliminasi = (
  kodeJenis,
  callback
) => {

  const query = `
    SELECT kelompok_kategori
    FROM prioritas_eliminasi
    WHERE kode_jenis = ?
    ORDER BY tahap ASC
  `;

  db.query(
    query,
    [kodeJenis],
    (err, results) => {

      if (err) {
        return callback(err);
      }

      if (!results.length) {
        return callback(
          new Error(
            "Prioritas eliminasi tidak ditemukan"
          )
        );
      }

      // ambil kategori berdasarkan urutan tahap
      const prioritas =
        results.map(
          (r) => r.kelompok_kategori
        );

      // dibalik supaya prioritas rendah dihapus dulu
      const reversed =
        [...prioritas].reverse();

      // bentuk tahap eliminasi
      const tahap = [[]];

      for (
        let i = 0;
        i < reversed.length;
        i++
      ) {
        tahap.push(
          reversed.slice(0, i + 1)
        );
      }

      callback(null, tahap);
    }
  );
};

  /* GET RULE EKSKUL */
  const getRulesEkskul = (
    kodeKegiatan,
    callback
  ) => {

    const queryRule = `
      SELECT kode_kategori
      FROM klasifikasi_kegiatan
      WHERE kode_kegiatan = ?
    `;

    db.query(
      queryRule,
      [kodeKegiatan],
      (err, results) => {

        if (err) {
          return callback(err);
        }

        callback(
          null,
          results.map(
            (r) => r.kode_kategori
          )
        );
      }
    );
  };

  /* FUNCTION CARI REKOMENDASI */
  const cariRekomendasi = (
    index = 0
  ) => {

    const kategoriDihapus =
      tahapEliminasi[index];

    const kategoriDipakai =
      jawabanUser.filter((kode) => {

        const match =
          kode?.match(
            /^[A-Z]+/
          );

        const prefix =
          match?.[0];

        return (
          prefix &&
          !kategoriDihapus.includes(
            prefix
          )
        );
      });

    const placeholders =
      kategoriDipakai
        .map(() => "?")
        .join(",");

    const query = `
      SELECT
        k.kode_kegiatan,
        k.nama_kegiatan,
        COUNT(*) AS total_match

      FROM klasifikasi_kegiatan kk

      JOIN kegiatan k
      ON kk.kode_kegiatan =
      k.kode_kegiatan

      WHERE kk.kode_kategori
      IN (${placeholders})

      GROUP BY
        k.kode_kegiatan,
        k.nama_kegiatan

      ORDER BY
        total_match DESC

      LIMIT 1
    `;

    db.query(
      query,
      [...kategoriDipakai],
      (err, results) => {

        if (responseSent) return;

        if (err) {

          console.error(
            "TEST ERROR:",
            err
          );

          return res.status(500).json({
            message: "Server Error"
          });
        }

        /* HASIL DITEMUKAN */
        if (results.length > 0) {

          const hasil =
            results[0];

          const skor =
            parseInt(
              hasil.total_match
            );

          const persenMatch =
            skor /
            kategoriDipakai.length;

          /* FULL MATCH ATAU >=50% */
          if (
            skor ===
              kategoriDipakai.length ||
            persenMatch >= 0.5
          ) {

            return getRulesEkskul(
              hasil.kode_kegiatan,
              (
                errRule,
                rulesEkskul
              ) => {

                if (errRule) {

                  return res
                    .status(500)
                    .json({
                      message:
                        "Server Error"
                    });
                }

                return sendResponse({
                  ...hasil,
                  skor,
                  max_skor:
                    skorMaksimal,
                  tahap:
                    index + 1,
                  jawaban:
                    jawabanUser,
                  matched_rules:
                    rulesEkskul
                });
              }
            );
          }
        }

        /* DEFAULT WAJIB */
        if (
          jenis_ekskul ===
            "JE01" &&
          index >=
            tahapEliminasi.length -
              1
        ) {

          const queryKW3 = `
            SELECT
              k.kode_kegiatan,
              k.nama_kegiatan

            FROM klasifikasi_kegiatan kk

            JOIN kegiatan k
            ON kk.kode_kegiatan =
            k.kode_kegiatan

            WHERE kk.kode_kategori = ?

            LIMIT 1
          `;

          return db.query(
            queryKW3,
            [req.body.kp],
            (
              err2,
              result2
            ) => {

              if (
                err2
              ) {

                return res
                  .status(500)
                  .json({
                    message:
                      "Server Error"
                  });
              }

              if (
                result2.length >
                0
              ) {

                return getRulesEkskul(
                  result2[0]
                    .kode_kegiatan,
                  (
                    errRule,
                    rulesEkskul
                  ) => {

                    return sendResponse(
                      {
                        ...result2[0],
                        skor: 1,
                        max_skor:
                          skorMaksimal,
                        tahap:
                          "Default",
                        jawaban:
                          jawabanUser,
                        matched_rules:
                          rulesEkskul
                      }
                    );
                  }
                );
              }
            }
          );
        }

        /* DEFAULT PEMINATAN */
        if (
          jenis_ekskul ===
            "JE02" &&
          index >=
            tahapEliminasi.length -
              1
        ) {

          const queryBK = `
            SELECT
              k.kode_kegiatan,
              k.nama_kegiatan

            FROM klasifikasi_kegiatan kk

            JOIN kegiatan k
            ON kk.kode_kegiatan =
            k.kode_kegiatan

            WHERE kk.kode_kategori = ?

            LIMIT 1
          `;

          return db.query(
            queryBK,
            [req.body.bk],
            (
              err2,
              result2
            ) => {

              if (
                err2
              ) {

                return res
                  .status(500)
                  .json({
                    message:
                      "Server Error"
                  });
              }

              if (
                result2.length >
                0
              ) {

                return getRulesEkskul(
                  result2[0]
                    .kode_kegiatan,
                  (
                    errRule,
                    rulesEkskul
                  ) => {

                    return sendResponse(
                      {
                        ...result2[0],
                        skor: 1,
                        max_skor:
                          skorMaksimal,
                        tahap:
                          "Default",
                        jawaban:
                          jawabanUser,
                        matched_rules:
                          rulesEkskul
                      }
                    );
                  }
                );
              }
            }
          );
        }

        /* LANJUT ELIMINASI */
        if (
          index <
          tahapEliminasi.length -
            1
        ) {

          return cariRekomendasi(
            index + 1
          );
        }

        return res.status(404).json({
          message:
            "Rekomendasi tidak ditemukan"
        });
      }
    );
  };

  /* AMBIL PRIORITAS DARI DB */
getTahapEliminasi(
  jenis_ekskul,
  (err, tahapDB) => {

    if (err) {
      console.error(
        "TEST ERROR:",
        err
      );

      return res.status(500).json({
        message:
          "Prioritas eliminasi tidak ditemukan"
      });
    }

    tahapEliminasi = tahapDB;

    console.log(
      "Tahap Eliminasi:",
      tahapEliminasi
    );

    cariRekomendasi();
  }
);
});

export default router;