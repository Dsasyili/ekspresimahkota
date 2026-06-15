import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {FiEye,FiEyeOff,FiArrowLeft} from "react-icons/fi";
const API = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    showPassword,
    setShowPassword
  ] = useState(false);

  const navigate =
    useNavigate();

  useEffect(() => {
    sessionStorage.removeItem(
      "token"
    );

    // hapus history
    window.history.replaceState(
      null,
      "",
      "/login"
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
      "https://ekspresimahkota-production-f6bc.up.railway.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    )

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Login berhasil");
      console.log(data.user);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
          {/* BACK BUTTON */}
          <button
            className="login-back-btn"
            onClick={() => navigate("/")}
            type="button"
          >
            <FiArrowLeft />
            Kembali
          </button>

        <div className="login-header">
          <img
            src="/logo.png"
            alt="Logo"
            className="login-logo-small"
          />

          <div className="login-title">
            <h2>
              Admin Login
            </h2>

            <p className="login-subtext">
              Silakan masuk ke akun Anda
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <div className="login-input-group">
            <label
              htmlFor="email"
              className="input-label"
            >
              Email <span className="required">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="contoh@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="login-input-group">
            <label
              htmlFor="password"
              className="input-label"
            >
              Password <span className="required">*</span>
            </label>

            <div className="password-group">
              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Masukkan password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <span
                className="toggle-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </span>
            </div>
          </div>

          <button type="submit">
            Login
          </button>
        </form>
      </div>

      <div className="login-footer">
        Copyright © {new Date().getFullYear()} - MAN 4 Tangerang.
        <br />
        All Rights Reserved
      </div>
    </div>
  );
}

export default Login;