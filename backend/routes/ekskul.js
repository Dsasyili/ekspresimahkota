import express from "express";
import db from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const uploadPath = path.join(process.cwd(), "public/uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// DELETE FILE HELPER
const deleteFile = (file) => {
  if (!file) return;
  const filePath = path.join(uploadPath, file);

  fs.unlink(filePath, (err) => {
    if (err) console.log("File tidak ada:", file);
  });
};

// MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* TOTAL EKSKUL */
router.get("/count", (req, res) => {
  const query = "SELECT COUNT(*) AS total FROM ekskul";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error count ekskul:", err);
      return res.status(500).json({ message: "Gagal mengambil data" });
    }

    res.json({ total: result[0].total });
  });
});

/* GET ALL */
router.get("/", (req, res) => {
  db.query("SELECT * FROM ekskul", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(
      result.map((item) => ({
        ...item,
        foto: item.foto
          ? `http://localhost:5000/uploads/${item.foto}`
          : null,
      }))
    );
  });
});

/* CREATE */
router.post("/", upload.single("foto"), (req, res) => {
  const { nama, deskripsi } = req.body;

  if (!nama || !deskripsi || !req.file) {
    if (req.file) {
      deleteFile(req.file.filename);
    }

    return res.status(400).json({
      message: "Pastikan semua data sudah terisi!",
    });
  }

  db.query(
    "INSERT INTO ekskul (nama, deskripsi, foto) VALUES (?, ?, ?)",
    [nama, deskripsi, req.file.filename],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Data berhasil ditambahkan" });
    }
  );
});

/* UPDATE */
router.put("/:id", upload.single("foto"), (req, res) => {
  const id = req.params.id;
  const { nama, deskripsi } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID tidak valid" });
  }

  if (!nama || !deskripsi) {
    if (req.file) {
      deleteFile(req.file.filename);
    }

    return res.status(400).json({
      message: "Nama dan deskripsi wajib diisi!",
    });
  }

  db.query("SELECT foto FROM ekskul WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const oldFoto = result[0].foto;
    let newFoto = oldFoto;

    if (req.file) {
      newFoto = req.file.filename;

      if (oldFoto) {
        const oldPath = path.join(uploadPath, oldFoto);
        fs.unlink(oldPath, (err) => {
          if (err) console.log("File lama gagal dihapus:", err.message);
        });
      }
    }

    db.query(
      "UPDATE ekskul SET nama=?, deskripsi=?, foto=? WHERE id=?",
      [nama, deskripsi, newFoto, id],
      (err2) => {
        if (err2) return res.status(500).json(err2);

        res.json({ message: "Data berhasil diperbarui" });
      }
    );
  });
});

/* DELETE */
router.delete("/:id", (req, res) => {
  db.query("SELECT foto FROM ekskul WHERE id=?", [req.params.id], (err, r) => {
    if (err) return res.status(500).json(err);
    if (r.length === 0)
      return res.status(404).json({ message: "Tidak ditemukan" });

    const foto = r[0].foto;

    db.query("DELETE FROM ekskul WHERE id=?", [req.params.id], (err2) => {
      if (err2) return res.status(500).json(err2);

      deleteFile(foto);

      res.json({ message: "Berhasil hapus data" });
    });
  });
});

export default router;