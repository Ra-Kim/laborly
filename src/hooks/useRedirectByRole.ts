import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useRedirectByRole = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role"); // "CLIENT" or "WORKER"
    const path = location.pathname.toLowerCase();

    if (role === "CLIENT" && path.startsWith("/worker")) {
      navigate("/client/dashboard", { replace: true });
    }

    if (role === "WORKER" && path.startsWith("/client")) {
      navigate("/worker/dashboard", { replace: true });
    }
  }, [location.pathname, navigate]);
};

export default useRedirectByRole;