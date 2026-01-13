import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaMagento, FaUser, FaUsers } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Spin } from "antd";
import { useApp } from "@/context/AppContext";
import AdminSidebar from "@/components/AdminSidebar";
import Navbar from "@/components/Navbar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
    const { logout, user, isDarkMode } = useApp();

  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentAdmin = user;

  const displayName =
    currentAdmin?.profile?.fullname || currentAdmin?.fullname || "Admin";

  const displayEmail =
    currentAdmin?.profile?.email || currentAdmin?.email || "admin@example.com";

  const navLinks = useMemo(
    () => [
      { href: "/admin", label: "Overview", icon: <FaHome size={24} /> },
      { href: "/admin/users", label: "Users", icon: <FaUsers size={24} /> },
      { href: "/admin/posts", label: "Posts", icon: <FaMagento size={24} /> },
      { href: "/admin/profile", label: "Profile", icon: <FaUser size={24} /> },
    ],
    []
  );

  const currentPage = useMemo(() => {
    if (pathname === "/admin" || pathname === "/admin/") return "Overview";
    const last = pathname.split("/").filter(Boolean).pop();
    return (
      navLinks.find((link) => link.href.endsWith(last))?.label || "Dashboard"
    );
  }, [pathname, navLinks]);

  // Loading state with dark mode support
  if (!currentAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Spin size="large" tip="Verifying Admin..." />
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout?.();
    } finally {
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    if (collapsed) setDropdownOpen(false);
  }, [collapsed]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <AdminSidebar
        navLinks={navLinks}
        collapsed={collapsed}
        adminName={displayName}
        currentPath={pathname}
        handleLogout={handleLogout}
        isDarkMode={isDarkMode} 
      />

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-0 md:ml-64"
        }`}
      >
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          adminName={displayName}
          adminEmail={displayEmail}
          handleLogout={handleLogout}
        />

        {/* Page content wrapper */}
        <section className="mt-20 p-6 md:p-8 min-h-[calc(100vh-80px)]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <FaHome size={14} className="text-indigo-600 dark:text-indigo-400" />
            <MdOutlineKeyboardArrowRight size={14} className="text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {currentPage}
            </h2>
          </div>

          <Suspense
            fallback={
              <div className="mt-20 flex justify-center">
                <Spin size="large" />
              </div>
            }
          >
            {/* The actual Outlet */}
            <div className="animate-in fade-in duration-500">
              <Outlet />
            </div>
          </Suspense>
        </section>
      </main>
    </div>
  );
}