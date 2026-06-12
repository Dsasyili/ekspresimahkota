import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./AdminEkskul.css";
import useAdminProtection from "../hooks/useAdminProtection";
import { FiHome,FiBook,FiFileText,FiLogOut,FiUser,FiEdit2,FiTrash2,FiChevronLeft,FiChevronRight} from "react-icons/fi";

function AdminEkskul() {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    foto: null
  });

  useAdminProtection();

  // FETCH DATA
  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/ekskul");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      if (previewFoto && previewFoto.startsWith("blob:")) {
        URL.revokeObjectURL(previewFoto);
      }
    };
  }, [previewFoto]);

  // HANDLE INPUT
  const handleChange = (e) => {
    if (e.target.name === "foto") {
      const file = e.target.files[0];

      setForm({ ...form, foto: file });

      if (file) {
        setPreviewFoto(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("deskripsi", form.deskripsi);

    if (form.foto) {
      formData.append("foto", form.foto);
    }

    console.log("EDIT ID:", editId);

    let res;

    if (isEdit) {
        if (!editId) {
            Swal.fire("Error", "ID tidak ditemukan", "error");
            return;
        }

        res = await axios.put(
            `http://localhost:5000/api/ekskul/${editId}`,
            formData,
            {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }
        );
    } else {
      res = await axios.post(
        "http://localhost:5000/api/ekskul",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    Swal.fire("Berhasil!", res.data.message, "success");

    setForm({ nama: "", deskripsi: "", foto: null });
    setPreviewFoto(null);
    setShowModal(false);
    setIsEdit(false);
    setEditId(null);

    fetchData();
  } catch (err) {
    console.log(err.response?.data || err.message);

    Swal.fire(
      "Error",
      err.response?.data?.message || "Gagal menyimpan data",
      "error"
    );
  }
};

  // DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Apakah yakin akan menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#949191",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/ekskul/${id}`);
        fetchData();

        Swal.fire("Berhasil!", "Data berhasil dihapus", "success");
      }
    });
  };

  // EDIT
    const handleEdit = (item) => {
        console.log("EDIT ITEM:", item);

        setForm({
            nama: item.nama || "",
            deskripsi: item.deskripsi || "",
            foto: null
        });

        setPreviewFoto(item.foto || null);

        setEditId(item.id);
        setIsEdit(true);
        setShowModal(true);
    };

  // LOGOUT
  const handleLogout = () => {
    Swal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#949191",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem(
          "token"
        );

        window.location.replace(
          "/login"
        );

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Berhasil logout 👋",
            text: "Silakan login kembali, untuk mengakses.",
            showConfirmButton: false,
            showCloseButton: true
        });
      }
    });
  };

  const start = (page - 1) * perPage;
  const paginated = data.slice(start, start + perPage);
  const totalPage = Math.ceil(data.length / perPage);

  return (
    <div className="admin-wrapper">

      {/* SIDEBAR */}
      <div
        className={`admin-sidebar ${
          openSidebar ? "active" : ""
        }`}
      >

        {/* HEADER SIDEBAR */}
        <div className="sidebar-header">

          <div className="sidebar-logo">
            <img
              src="/LogoDash.png"
              alt="Footer Logo"
            />
          </div>

          {/* CLOSE BUTTON */}
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
            onClick={() => {
              navigate("/admin");
              setOpenSidebar(false);
            }}
          >
            <FiHome /> Dashboard
          </li>

          <li
            className="active"
            onClick={() =>
              setOpenSidebar(false)
            }
          >
            <FiFileText />
            Data Ekskul
          </li>

          <li
            className="logout"
            onClick={() => {
              handleLogout();
              setOpenSidebar(false);
            }}
          >
            <FiLogOut />
            Logout
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

        {/* PAGE HEADER */}
        <div className="page-header">

          <div className="page-title-wrapper">
            <h2 className="page-title">Data Ekstrakurikuler</h2>
          </div>

          <div className="page-action">
            <button
              className="add-btn"
              onClick={() => {
                setShowModal(true);
                setIsEdit(false);
                setForm({ nama: "", deskripsi: "", foto: null });
              }}
            >
              + Tambah Data
            </button>
          </div>

        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          {data.length === 0 ? (
            <div className="empty-container">
              <img src="/nulldata.png" alt="No Data" className="empty-img" />
              <p className="empty-text">Data ekstrakurikuler belum tersedia. Harap tambahkan data terlebih dahulu.</p>
            </div>
          ) : (
            <>
              <table className="ekskul-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Foto</th>
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th className="aksi-header">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {paginated.map((item, i) => (
                    <tr key={item.id}>
                      <td data-label="No">{start + i + 1}</td>

                      <td data-label="Foto">
                        <img src={item.foto} className="table-img" />
                      </td>

                      <td data-label="Nama">
                        {item.nama}
                      </td>

                      <td data-label="Deskripsi">
                        {item.deskripsi}
                      </td>

                      <td data-label="Aksi">
                        <div className="action-cell">
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(item)}
                          >
                            <FiEdit2 /> Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FiTrash2 /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <FiChevronLeft />
                </button>

                <span className="page-info">
                  {page} / {totalPage}
                </span>

                <button
                  className="page-btn"
                  disabled={page === totalPage}
                  onClick={() => setPage(page + 1)}
                >
                  <FiChevronRight />
                </button>
              </div>
            </>
          )}
        </div>

        {/* MODAL */}
        {showModal && (
        <div className="modal-overlay">
            <div className="modal">

            <div className="modal-header">
              <h3>{isEdit ? "Edit Ekskul" : "Tambah Ekskul"}</h3>

              <button
                type="button"
                className="close-modal"
                onClick={() => {
                  setShowModal(false);
                  setForm({ nama: "", deskripsi: "", foto: null });
                  setPreviewFoto(null);
                  setIsEdit(false);
                  setEditId(null);
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {isEdit ? (
                // EDIT MODE (2 LAYOUT)
                <div className="edit-layout">

                  {/* LEFT */}
                  <div className="edit-left">
                    <label>Nama Ekskul</label>
                    <input
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Contoh: Futsal"
                    />

                    <label>Deskripsi</label>
                    <textarea
                      name="deskripsi"
                      value={form.deskripsi}
                      onChange={handleChange}
                      placeholder="Masukkan deskripsi ekskul"
                    />

                    <label>Foto</label>
                    <input
                      type="file"
                      name="foto"
                      onChange={handleChange}
                    />
                  </div>

                  {/* RIGHT */}
                  <div className="edit-right">
                    <h4>Gambar Saat Ini</h4>

                    <div className="preview-container">
                      {previewFoto ? (
                        <img src={previewFoto} alt="preview" />
                      ) : (
                        <span>Belum ada gambar</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // ADD MODE (NORMAL)
                <>
                  <label>Nama Ekskul</label>
                  <input
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Contoh: Futsal"
                  />

                  <label>Deskripsi</label>
                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    placeholder="Masukkan deskripsi ekskul"
                  />

                  <label>Foto</label>

                  {previewFoto && (
                    <div className="img-preview">
                      <img src={previewFoto} alt="preview" />
                    </div>
                  )}

                  <input
                    type="file"
                    name="foto"
                    onChange={handleChange}
                  />
                </>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setForm({ nama: "", deskripsi: "", foto: null });
                    setPreviewFoto(null);
                    setIsEdit(false);
                    setEditId(null);
                  }}
                >
                  Batal
                </button>

                <button type="submit">
                  {isEdit ? "Update" : "Simpan"}
                </button>
              </div>
            </form>

            </div>
        </div>
        )}

        {openSidebar && (
          <div 
            className="overlay"
            onClick={() => setOpenSidebar(false)}
          ></div>
        )}
      </div>
    </div>
  );
}

export default AdminEkskul;