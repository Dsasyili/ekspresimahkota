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
   CORS CONFIG (SAFE VERSION)
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://ekspresimahkota-pi.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow REST tools / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   STATIC FILE
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
   ROOT TEST
========================= */

app.get("/", (req, res) => {
  res.send("🚀 Backend Mahkota Ekskul Running");
});

/* =========================
   HEALTH CHECK (optional tapi bagus)
========================= */

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =========================
   404 HANDLER (SAFE)
========================= */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});