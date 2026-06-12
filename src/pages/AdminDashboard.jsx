import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAdminProtection from "../hooks/useAdminProtection";
import { FiUser, FiHome, FiBook, FiUsers, FiFileText, FiLogOut, FiBookOpen, FiUserPlus} from "react-icons/fi";

function AdminDashboard() {
  const navigate = useNavigate();
  const [totalEkskul, setTotalEkskul] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);
  useAdminProtection();

  /* TOTAL EKSKUL */
  useEffect(() => {
    const fetchTotalEkskul = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ekskul/count");
        setTotalEkskul(res.data.total);
      } catch (error) {
        console.error("Gagal ambil total ekskul:", error);
      }
    };

    fetchTotalEkskul();
  }, []);

  /* LOGOUT */
const handleLogout =
  () => {
    Swal.fire({
      title:
        "Konfirmasi Logout",
      text:
        "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:
        "#d33",
      cancelButtonColor:
        "#949191",
      confirmButtonText:
        "Logout",
      cancelButtonText:
        "Batal",
      reverseButtons: true
    }).then(
      (result) => {
        if (
          result.isConfirmed
        ) {
          sessionStorage.removeItem(
            "token"
          );

          // ganti halaman tanpa history
          window.location.replace(
            "/login"
          );
        }
      }
    );
  };
  
  return (
    <div className="admin-wrapper">

      {/* SIDEBAR */}
      <div className={`admin-sidebar ${openSidebar ? "active" : ""}`}>

        {/* HEADER SIDEBAR */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img
              src="/LogoDash.png"
              alt="Footer Logo"
            />
          </div>

          <button
            className="close-sidebar"
            onClick={() =>
              setOpenSidebar(false)
            }
          >
            ✕
          </button>
        </div>

        <ul>
          <li
            className="active"
            onClick={() => {
              navigate("/admin");
              setOpenSidebar(false);
            }}
          >
            <FiHome /> Dashboard
          </li>

          <li
            onClick={() => {
              navigate("/admin/ekskul");
              setOpenSidebar(false);
            }}
          >
            <FiFileText /> Data Ekskul
          </li>

          <li
            className="logout"
            onClick={() => {
              handleLogout();
              setOpenSidebar(false);
            }}
          >
            <FiLogOut /> Logout
          </li>
        </ul>

        {/* COPYRIGHT */}
        <div className="sidebar-footer">
          Copyright © {new Date().getFullYear()}
          <br />
          MAN 4 Tangerang. All Rights Reserved
        </div>
      </div>

      {/* MAIN */}
      <div className="admin-main">

        {/* TOPBAR */}
        <div className="admin-topbar">
          <div className="topbar-left">
            
            {/* HAMBURGER */}
            {!openSidebar && (
              <button
                className="hamburger"
                onClick={() => setOpenSidebar(true)}
              >
                ☰
              </button>
            )}

            <h1>Admin Dashboard</h1>
          </div>

          <div className="topbar-right">
            <FiUser className="user-icon" />
            <span>Admin</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="admin-content">

          <div className="welcome-text">
            <h2>Selamat Datang,</h2>
            <p>
              Silakan kelola data ekskul dan informasi lainnya dengan mudah melalui panel ini.
            </p>
          </div>

          {/* CARDS */}
          <div className="admin-cards">

            <div className="admin-card card-blue">
              <div className="card-text">
                <h3>Jumlah Ekskul</h3>
                <p>{totalEkskul}</p>
              </div>
              <FiBookOpen className="card-icon" />
            </div>

            <div className="admin-card card-purple">
              <div className="card-text">
                <h3>Program Keterampilan</h3>
                <p>5</p>
              </div>
              <FiUsers className="card-icon" />
            </div>

            <div className="admin-card card-orange">
              <div className="card-text">
                <h3>Jumlah Siswa</h3>
                <p>747</p>
              </div>
              <FiUserPlus className="card-icon" />
            </div>

          </div>
        </div>

      </div>

      {openSidebar && (
        <div 
          className="overlay"
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}
    </div>
  );
}

export default AdminDashboard;