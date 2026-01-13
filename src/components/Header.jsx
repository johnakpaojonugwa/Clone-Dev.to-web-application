import { FaDev } from "react-icons/fa";
import { FiBell, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { useEffect, useState, useRef } from "react";
import { Avatar, message, Spin } from "antd";

export default function Header() {
  const { user, setUser, baseURL, userToken, logout } = useApp();
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    if (!userToken || user) return;

    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch user data");

      setUser(data.user);
    } catch (error) {
      console.error(error);
      message.error("Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userToken]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (typeof logout === "function") logout();
    else {
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
    }
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 w-full">
      <div className="max-w-[1380px] mx-auto flex items-center gap-4 px-4 py-2">
        {/* Logo */}
        <Link to="/">
          <FaDev className="text-black text-[42px] cursor-pointer" />
        </Link>

        {/* Search */}
        <div className="flex-1 relative max-w-[420px]">
          <FiSearch
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-full h-10 pl-10 pr-32 rounded-md
              border border-gray-300 text-sm
              placeholder:text-gray-500
              focus:outline-none focus:ring-1
              focus:ring-indigo-500 focus:border-indigo-500
            "
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hidden md:block">
            Powered by Algolia
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <Link to="/create-post">
            <button
              className="
                border border-indigo-600 text-indigo-600
                px-4 h-9 rounded-md text-sm font-medium
                hover:bg-indigo-600 hover:text-white
                transition cursor-pointer
              "
            >
              Create Post
            </button>
          </Link>

          <FiBell
            size={22}
            className="text-gray-600 cursor-pointer hover:text-gray-800"
          />

          <div className="relative" ref={menuRef}>
            {loading ? (
              <div className="p-1">
                <Spin size="small" />
              </div>
            ) : (
              <button
                onClick={() => setMenuOpen((s) => !s)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                className="p-0 border-0 bg-transparent"
              >
                <Avatar
                  src={user?.avatar || "https://i.pravatar.cc/40"}
                  size="default"
                  className="cursor-pointer"
                />
              </button>
            )}

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-80 space-y-8 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="py-1">
                  <button className="block px-4 py-2 text-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 hover:underline text-left border-b border-gray-200 w-full mb-2">
                    <p className="text-md font-medium">
                      {user?.fullname || "fullname"}
                    </p>
                    <p className="text-md ">
                      @{user?.email || "email"}
                    </p>
                  </button>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 hover:underline"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/create-post"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 hover:underline"
                  >
                    Create Post
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 hover:underline"
                  >
                    Settings
                  </Link>

                  <div className="mt-2" />

                  <Link
                    to="/login"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-md text-red-600 hover:bg-indigo-50 hover:text-indigo-500 hover:underline border-t border-gray-200 my-2"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
