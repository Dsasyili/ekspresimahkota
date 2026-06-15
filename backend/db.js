import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

console.log("HOST:", process.env.DB_HOST);
console.log("PORT:", process.env.DB_PORT);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // tambahin ini
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:");
    console.error(err);
  } else {
    console.log("✅ Connected to MySQL database");
    connection.release();
  }
});

export default db;