import express from "express";
import db from "../db.js";

const router = express.Router();

/* Forward Chaining + Eliminasi */
router.post(
  "/rekomendasi",
  async (req, res) => {

    try {

      const { jenis_ekskul } =
        req.body;

      let jawabanUser = [];
      let tahapEliminasi =
        [];
      let skorMaksimal = 0;

      console.log(
        "BODY:",
        req.body
      );

      // EKSKUL WAJIB
      if (
        jenis_ekskul ===
        "JE01"
      ) {

        jawabanUser = [
          req.body.kp,
          req.body.ck,
          req.body.sf,
          req.body.mv,
          req.body.ct
        ];

        skorMaksimal = 5;
      }

      // EKSKUL PEMINATAN
      else if (
        jenis_ekskul ===
        "JE02"
      ) {

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
        jawabanUser.includes(
          ""
        ) ||
        jawabanUser.includes(
          undefined
        )
      ) {

        return res
          .status(400)
          .json({
            message:
              "Semua pertanyaan wajib diisi"
          });
      }

      // AMBIL PRIORITAS
      const [
        prioritasResult
      ] = await db.query(
        `
        SELECT kelompok_kategori
        FROM prioritas_eliminasi
        WHERE kode_jenis = ?
        ORDER BY tahap ASC
        `,
        [jenis_ekskul]
      );

      if (
        !prioritasResult.length
      ) {

        return res
          .status(404)
          .json({
            message:
              "Prioritas eliminasi tidak ditemukan"
          });
      }

      const prioritas =
        prioritasResult.map(
          (r) =>
            r.kelompok_kategori
        );

      const reversed =
        [...prioritas].reverse();

      tahapEliminasi = [[]];

      for (
        let i = 0;
        i <
        reversed.length;
        i++
      ) {

        tahapEliminasi.push(
          reversed.slice(
            0,
            i + 1
          )
        );
      }

      console.log(
        "Tahap Eliminasi:",
        tahapEliminasi
      );

      // CARI REKOMENDASI
      for (
        let index = 0;
        index <
        tahapEliminasi.length;
        index++
      ) {

        const kategoriDihapus =
          tahapEliminasi[
            index
          ];

        const kategoriDipakai =
          jawabanUser.filter(
            (kode) => {

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
            }
          );

        if (
          !kategoriDipakai.length
        ) {
          continue;
        }

        const placeholders =
          kategoriDipakai
            .map(
              () => "?"
            )
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

        const [results] =
          await db.query(
            query,
            [
              ...kategoriDipakai
            ]
          );

        console.log(
          "QUERY RESULT:",
          results
        );

        // HASIL DITEMUKAN
        if (
          results.length >
          0
        ) {

          const hasil =
            results[0];

          const skor =
            parseInt(
              hasil.total_match
            );

          const persenMatch =
            skor /
            kategoriDipakai.length;

          if (
            skor ===
              kategoriDipakai.length ||
            persenMatch >=
              0.5
          ) {

            const [
              rulesResult
            ] =
              await db.query(
                `
                SELECT kode_kategori
                FROM klasifikasi_kegiatan
                WHERE kode_kegiatan = ?
                `,
                [
                  hasil.kode_kegiatan
                ]
              );

            const rulesEkskul =
              rulesResult.map(
                (r) =>
                  r.kode_kategori
              );

            console.log(
              "HASIL DITEMUKAN:",
              hasil
            );

            return res.json({
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
        }
      }

      // DEFAULT WAJIB
      const kategoriDefault =
        jenis_ekskul ===
        "JE01"
          ? req.body.kp
          : req.body.bk;

      const [
        defaultResult
      ] = await db.query(
        `
        SELECT
          k.kode_kegiatan,
          k.nama_kegiatan

        FROM klasifikasi_kegiatan kk

        JOIN kegiatan k
        ON kk.kode_kegiatan =
        k.kode_kegiatan

        WHERE kk.kode_kategori = ?
        LIMIT 1
        `,
        [kategoriDefault]
      );

      if (
        defaultResult.length >
        0
      ) {

        const hasil =
          defaultResult[0];

        const [
          rulesResult
        ] =
          await db.query(
            `
            SELECT kode_kategori
            FROM klasifikasi_kegiatan
            WHERE kode_kegiatan = ?
            `,
            [
              hasil.kode_kegiatan
            ]
          );

        const rulesEkskul =
          rulesResult.map(
            (r) =>
              r.kode_kategori
          );

        return res.json({
          ...hasil,
          skor: 1,
          max_skor:
            skorMaksimal,
          tahap:
            "Default",
          jawaban:
            jawabanUser,
          matched_rules:
            rulesEkskul
        });
      }

      return res
        .status(404)
        .json({
          message:
            "Rekomendasi tidak ditemukan"
        });

    } catch (err) {

      console.error(
        "TEST ERROR:",
        err
      );

      return res
        .status(500)
        .json({
          message:
            "Server Error"
        });
    }
  }
);

export default router;