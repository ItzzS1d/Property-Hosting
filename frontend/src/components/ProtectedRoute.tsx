import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModelsContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { userInfo, loading } = useAuth();
  const { openLoginModal } = useModal();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo?.success) {
    openLoginModal();
    navigate("/");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
