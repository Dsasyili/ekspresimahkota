import { Routes, Route, useLocation } from "react-router-dom";

/* Bagian Components */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TentangSection from "./components/Tentang";
import Kegiatan from "./components/Kegiatan";
import Kontak from "./components/Kontak";
import ScrollToTop from "./components/ScrollToTop";

/* Bagian Pages */
import TentangPage from "./pages/Tentangpage";
import TestPage from "./pages/TestPage";
import EkskulPage from "./pages/EkskulPage";
import KeterampilanPage from "./pages/KeterampilanPage";
import KontakPage from "./pages/Kontakpage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEkskul from "./pages/AdminEkskul";

function Home() {
  return (
    <>
      <Hero />
      <TentangSection />
      <Kegiatan />
      <Kontak />
    </>
  );
}

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tentang" element={<TentangPage />} />
        <Route path="/ekskul" element={<EkskulPage />} />
        <Route path="/keterampilan" element={<KeterampilanPage />}/>
        <Route path="/kontak" element={<KontakPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/ekskul" element={<AdminEkskul />} />
      </Routes>

      {!hideNavbar && <Footer />}
    </>
  );
}

export default App;