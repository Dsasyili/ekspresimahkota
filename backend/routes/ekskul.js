import express from "express";
import db from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const uploadPath = path.join(
  process.cwd(),
  "public/uploads"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true
  });
}

/* DELETE FILE HELPER */
const deleteFile = (file) => {
  if (!file) return;

  const filePath = path.join(
    uploadPath,
    file
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(
        "File tidak ada:",
        file
      );
    }
  });
};

/* MULTER */
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, uploadPath),

  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() +
        path.extname(file.originalname)
    )
});

const upload = multer({ storage });

/* TOTAL EKSKUL */
router.get("/count", async (req, res) => {
  try {
    const query =
      "SELECT COUNT(*) AS total FROM ekskul";

    const [result] = await db.query(
      query
    );

    res.json({
      total: result[0].total
    });
  } catch (err) {
    console.error(
      "Error count ekskul:",
      err
    );

    res.status(500).json({
      message:
        "Gagal mengambil data"
    });
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM ekskul");

    const baseUrl =
      process.env.BASE_URL ||
      `${req.headers["x-forwarded-proto"] || req.protocol}://${req.get("host")}`;

    res.json(
      result.map((item) => ({
        ...item,
        foto: item.foto
          ? `${baseUrl}/uploads/${item.foto}`
          : null,
      }))
    );

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Gagal mengambil data",
    });
  }
});

/* CREATE */
router.post(
  "/",
  upload.single("foto"),
  async (req, res) => {
    try {
      const {
        nama,
        deskripsi
      } = req.body;

      if (
        !nama ||
        !deskripsi ||
        !req.file
      ) {
        if (req.file) {
          deleteFile(
            req.file.filename
          );
        }

        return res.status(400).json({
          message:
            "Pastikan semua data sudah terisi!"
        });
      }

      await db.query(
        `INSERT INTO ekskul 
        (nama, deskripsi, foto) 
        VALUES (?, ?, ?)`,
        [
          nama,
          deskripsi,
          req.file.filename
        ]
      );

      res.json({
        message:
          "Data berhasil ditambahkan"
      });
    } catch (err) {
      console.error(err);

      res.status(500).json(err);
    }
  }
);

/* UPDATE */
router.put(
  "/:id",
  upload.single("foto"),
  async (req, res) => {
    try {
      const id =
        req.params.id;

      const {
        nama,
        deskripsi
      } = req.body;

      if (!id) {
        return res.status(400).json({
          message:
            "ID tidak valid"
        });
      }

      if (
        !nama ||
        !deskripsi
      ) {
        if (req.file) {
          deleteFile(
            req.file.filename
          );
        }

        return res.status(400).json({
          message:
            "Nama dan deskripsi wajib diisi!"
        });
      }

      const [result] =
        await db.query(
          "SELECT foto FROM ekskul WHERE id = ?",
          [id]
        );

      if (
        result.length === 0
      ) {
        return res.status(404).json({
          message:
            "Data tidak ditemukan"
        });
      }

      const oldFoto =
        result[0].foto;

      let newFoto =
        oldFoto;

      if (req.file) {
        newFoto =
          req.file.filename;

        if (oldFoto) {
          const oldPath =
            path.join(
              uploadPath,
              oldFoto
            );

          fs.unlink(
            oldPath,
            (err) => {
              if (err) {
                console.log(
                  "File lama gagal dihapus:",
                  err.message
                );
              }
            }
          );
        }
      }

      await db.query(
        `UPDATE ekskul 
        SET nama=?, deskripsi=?, foto=? 
        WHERE id=?`,
        [
          nama,
          deskripsi,
          newFoto,
          id
        ]
      );

      res.json({
        message:
          "Data berhasil diperbarui"
      });
    } catch (err) {
      console.error(err);

      res.status(500).json(err);
    }
  }
);

/* DELETE */
router.delete(
  "/:id",
  async (req, res) => {
    try {
      const [result] =
        await db.query(
          "SELECT foto FROM ekskul WHERE id=?",
          [req.params.id]
        );

      if (
        result.length === 0
      ) {
        return res.status(404).json({
          message:
            "Tidak ditemukan"
        });
      }

      const foto =
        result[0].foto;

      await db.query(
        "DELETE FROM ekskul WHERE id=?",
        [req.params.id]
      );

      deleteFile(foto);

      res.json({
        message:
          "Berhasil hapus data"
      });
    } catch (err) {
      console.error(err);

      res.status(500).json(err);
    }
  }
);

export default router;