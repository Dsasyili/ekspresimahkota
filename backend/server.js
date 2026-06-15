import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import "./db.js";
import authRoutes from "./routes/auth.js";
import ekskulRoutes from "./routes/ekskul.js";
import testRoutes from "./routes/test.js";

dotenv.config();

const app = express();

/* =========================
   CORS
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://ekspresimahkota.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); 
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC
========================= */

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public/uploads"))
);

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/ekskul", ekskulRoutes);
app.use("/api/test", testRoutes);

/* =========================
   TEST
========================= */

app.get("/", (req, res) => {
  res.send("🚀 Backend Mahkota Ekskul Running");
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});