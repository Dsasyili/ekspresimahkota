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
      const response = await fetch(
        `${API}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);

        window.location.replace("/admin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: data.message || "Email atau password salah",
          confirmButtonColor: "#d33"
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Terjadi kesalahan pada server",
        confirmButtonColor: "#d33"
      });
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
            <label className="input-label">
              Email <span className="required">*</span>
            </label>

            <input
              type="text"
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
            <label className="input-label">
              Password <span className="required">*</span>
            </label>

            <div className="password-group">
              <input
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