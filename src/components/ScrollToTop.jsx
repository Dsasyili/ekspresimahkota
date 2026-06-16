import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import "./ScrollToTop.css";

function ScrollToTop() {
  const [visible, setVisible] =
    useState(false);

  const location =
    useLocation();

  /* AUTO SCROLL KE ATAS */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location.pathname]);

  /* TOMBOL BACK TO TOP */
  useEffect(() => {
    const toggleVisible = () => {
      if (
        window.scrollY > 300
      ) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener(
      "scroll",
      toggleVisible
    );

    return () =>
      window.removeEventListener(
        "scroll",
        toggleVisible
      );
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      className={`scroll-top ${
        visible
          ? "show"
          : ""
      }`}
      onClick={scrollTop}
    >
      <FaArrowUp />
    </button>
  );
}

export default ScrollToTop;