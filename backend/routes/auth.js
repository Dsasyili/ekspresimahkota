import express from "express";
import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

/* =========================
   REGISTER ADMIN
========================= */
router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        username,
        email,
        password
      } = req.body;

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      await db.query(
        `
        INSERT INTO users
        (username, email, password)
        VALUES (?, ?, ?)
        `,
        [
          username,
          email,
          hashedPassword
        ]
      );

      res.json({
        message:
          "User registered successfully"
      });

    } catch (err) {

      console.error(
        "REGISTER ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Server Error"
      });
    }
  }
);

/* =========================
   LOGIN
========================= */
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      console.log(
        "LOGIN REQUEST:",
        email
      );

      const [result] =
        await db.query(
          `
          SELECT *
          FROM users
          WHERE email = ?
          `,
          [email]
        );

      if (
        result.length === 0
      ) {

        return res
          .status(404)
          .json({
            message:
              "User not found"
          });
      }

      const user =
        result[0];

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (
        !validPassword
      ) {

        return res
          .status(401)
          .json({
            message:
              "Wrong password"
          });
      }

      const token =
        jwt.sign(
          {
            id: user.id,
            role:
              user.role
          },
          process.env
            .JWT_SECRET,
          {
            expiresIn:
              "1h"
          }
        );

      res.json({
        token,
        user: {
          id: user.id,
          username:
            user.username,
          email:
            user.email
        }
      });

    } catch (err) {

      console.error(
        "LOGIN ERROR:",
        err
      );

      res.status(500).json({
        message:
          "Server Error"
      });
    }
  }
);

export default router;