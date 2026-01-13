import { useLocation, Navigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Spin } from "antd";

export default function useAuthGuard() {
  const { isAuthenticated, loadingUser, user } = useApp();
  const location = useLocation();

  const authRedirect = (to = "/login") => (
    <Navigate to={to} state={{ from: location }} replace />
  );

  const loadingView = (
    <div className="flex items-center justify-center h-screen">
      <Spin size={50} />
    </div>
  );

  return { isAuthenticated, loadingUser, user, location, authRedirect, loadingView };
}
