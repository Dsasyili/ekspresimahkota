import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function useAdminProtection() {
  const navigate =
    useNavigate();

  /* AUTH CHECK */
  useEffect(() => {
    const token =
      sessionStorage.getItem(
        "token"
      );

    if (!token) {
      navigate("/login", {
        replace: true
      });
    }
  }, [navigate]);

  /* BLOCK BACK BUTTON */
  useEffect(() => {
    const token =
      sessionStorage.getItem(
        "token"
      );

    if (!token) return;

    // lock halaman
    window.history.pushState(
      null,
      "",
      window.location.href
    );

    const handleBack =
      () => {
        const stillLogin =
          sessionStorage.getItem(
            "token"
          );

        if (stillLogin) {
          window.history.go(1);

          Swal.fire({
            toast: true,
            position:
              "top-end",
            icon: "warning",
            title:
              "Silakan logout terlebih dahulu",
            showConfirmButton:
              false,
            showCloseButton:
              true
          });
        }
      };

    window.addEventListener(
      "popstate",
      handleBack
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handleBack
      );
    };
  }, []);
}

export default useAdminProtection;