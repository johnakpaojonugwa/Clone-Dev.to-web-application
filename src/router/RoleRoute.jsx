import { Navigate, Outlet } from "react-router-dom";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function RoleRoute({ allowedRoles = [] }) {
  const { isAuthenticated, loadingUser, user, location, loadingView } = useAuthGuard();

  if (!isAuthenticated) {
    const loginPath = location.pathname.startsWith("/admin") ? "/admin/login" : "/login";
    return <Navigate to={loginPath} replace />;
  }

  if (loadingUser || !user || !user.role) {
    return loadingView;
  }

  const userRole = String(user?.role || "").toLowerCase();
  const allowed = allowedRoles.map((r) => String(r).toLowerCase());

  if (!allowed.includes(userRole)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
