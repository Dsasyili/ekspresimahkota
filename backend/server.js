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

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/* STATIC FILE */
app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "public/uploads")
  )
);

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/ekskul", ekskulRoutes);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend Mahkota Ekskul Running");
});

/* START SERVER */
const PORT =
  process.env.PORT || 5000;

if (
  process.env.NODE_ENV !==
  "production"
) {

  app.listen(
    PORT,
    () => {

      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    }
  );
}

export default app;