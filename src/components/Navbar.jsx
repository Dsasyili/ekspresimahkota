import { useState } from "react";
import { FaLock, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar-wrapper">
      <div className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Logo MAN 4 Tangerang" />
          <div className="logo-text">
            <h3>EKSPRESI MAHKOTA</h3>
            <p>
              MAN 4 TANGERANG - Unggul • Islami • Berkarakter •
              Berwawasan Lingkungan
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className={`menu ${open ? "active" : ""}`}>
          <NavLink
            to="/"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/tentang"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Tentang
          </NavLink>

          <NavLink
            to="/test"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Test
          </NavLink>

          <NavLink
            to="/ekskul"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Ekskul
          </NavLink>

          <NavLink
            to="/keterampilan"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Keterampilan
          </NavLink>

          <NavLink
            to="/kontak"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Kontak
          </NavLink>

          {/* LOGIN MOBILE */}
          <NavLink
            to="/login"
            className="mobile-login-btn"
            onClick={() => setOpen(false)}
          >
            <FaLock />
            Login
          </NavLink>
        </div>

        {/* LOGIN DESKTOP */}
        <NavLink to="/login" className="login-btn">
          <FaLock />
          Login
        </NavLink>

        {/* HAMBURGER */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;