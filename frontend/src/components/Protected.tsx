import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
  children: React.ReactNode;
  role?: "guest" | "owner" | "admin";
}

const Protected = ({ children, role }: ProtectedProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role && user.role !== role) {
      navigate("/");
    }
  }, [navigate, role]);

  return <>{children}</>;
};

export default Protected;