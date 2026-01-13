import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// Fixed: ConfigProvider must be capitalized
import { ConfigProvider, theme, Spin } from "antd";
import { useApp } from "@/context/AppContext";
import ProtectedRoute from "@/router/ProtectedRoute";
import RoleRoute from "@/router/RoleRoute";
import ErrorBoundary from "@/components/ErrorBoundary";

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Home = lazy(() => import("@/pages/home/Home"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const PostPage = lazy(() => import("@/pages/postpage/PostPage"));
const SinglePost = lazy(() => import("@/pages/singlePost/SinglePost"));
const NotFound = lazy(() => import("@/pages/notfound/NotFound"));
const AdminLayout = lazy(() => import("@/admin/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("@/admin/AdminDashboard"));
const AdminPosts = lazy(() => import("@/admin/posts/AdminPosts"));
const AdminUsers = lazy(() => import("@/admin/users/AdminUsers"));
const AdminLogin = lazy(() => import("@/admin/auth/Login"));
const AdminProfile = lazy(() => import("@/admin/profile/AdminProfile"));
const AdminSettings = lazy(() => import("@/admin/settings/AdminSettings"));
const Unauthorized = lazy(() => import("@/pages/unauthorized/Unauthorized"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-950 transition-colors">
    <Spin size="large" className="text-indigo-600" />
  </div>
);

export default function App() {
  const { isDarkMode } = useApp();

  // Tailwind gray-800 hex is #1f2937
  // Tailwind gray-900 hex is #111827
  const customDarkBg = "#1f2937";
  const customDarkHeader = "#111827";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          // This sets the global container background for AntD components
          colorBgContainer: isDarkMode ? customDarkBg : "#ffffff",
          colorBgElevated: isDarkMode ? "#2d3748" : "#ffffff",
        },
        components: {
          Table: {
            // Setting the exact solid colors for the table
            headerBg: isDarkMode ? customDarkHeader : "#fafafa",
            colorBgContainer: isDarkMode ? customDarkBg : "#ffffff",
          },
          Card: {
            colorBgContainer: isDarkMode ? customDarkBg : "#ffffff",
          },
          Input: {
            colorBgContainer: isDarkMode ? customDarkHeader : "#ffffff",
          },
          Select: {
            colorBgContainer: isDarkMode ? customDarkHeader : "#ffffff",
          },
        },
      }}
    >
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-post" element={<PostPage />} />
              <Route path="/posts/:id" element={<SinglePost />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route
                path="/admin"
                element={<AdminLayout expectedRole="admin" />}
              >
                <Route index element={<AdminDashboard />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </ConfigProvider>
  );
}
