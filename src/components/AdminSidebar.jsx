import { FaSignOutAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";

// Sidebar Component
export default function AdminSidebar({
  navLinks,
  collapsed,
  adminName,
  handleLogout,
  currentPath,
}) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col justify-between shadow-sm transition-all duration-300 
      /* Light Mode */
      bg-white border-r border-gray-200 
      /* Dark Mode */
      dark:bg-gray-800/80 dark:border-gray-800
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 px-4 py-5.5 border-b border-gray-200/50 dark:border-gray-700">
          <MdAdminPanelSettings size={26} className="text-blue-600 dark:text-blue-400" />
          {!collapsed && (
            <h1 className="font-bold text-lg truncate dark:text-gray-100">
              {adminName}
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-4 space-y-1 px-2">
          {navLinks.map((link) => {
            // Check if exact match for /admin or if subpath match for others
            const active = link.href === "/admin" 
              ? currentPath === "/admin" 
              : currentPath.startsWith(link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 truncate ${
                  active
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-800 dark:hover:text-gray-100"
                }`}
              >
                <span className={active ? "text-blue-600 dark:text-blue-400" : ""}>
                  {link.icon}
                </span>
                {!collapsed && link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center cursor-pointer justify-center gap-2 py-2.5 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg font-medium transition shadow-md"
        >
          <FaSignOutAlt size={16} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}