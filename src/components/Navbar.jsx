import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dropdown, Avatar } from "antd"; 
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { RiSunLine, RiMoonLine } from "react-icons/ri"; 
import { useApp } from "@/context/AppContext";

export default function Navbar({
  collapsed,
  setCollapsed,
  adminName,
  adminEmail,
  handleLogout,
}) {
  const { isDarkMode, toggleTheme } = useApp();
  
  const items = [
    {
      key: "1",
      label: <Link to="/admin/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <Link to="/admin/settings">Settings</Link>,
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Logout",
      danger: true,
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-2 border-b shadow-sm transition-all duration-300 
      bg-white border-gray-200 
      dark:bg-gray-800/80 dark:border-gray-800 dark:backdrop-blur-md 
      ${collapsed ? "pl-20" : "pl-64"}`}
    >
      {/* Left side: Hamburger */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 rounded-md transition text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <FaBars size={18} />
      </button>

      {/* Right side: Actions */}
      <div className="flex items-center gap-4">
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-2 rounded-full transition-all duration-300 
            text-gray-600 hover:bg-gray-100 
            dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {isDarkMode ? (
            <RiSunLine size={20} className="text-yellow-400" />
          ) : (
            <RiMoonLine size={20} className="text-indigo-600" />
          )}
        </button>

        {/* Ant Design Dropdown */}
        <Dropdown 
          menu={{ items }} 
          trigger={["click"]} 
          placement="bottomRight"
        >
          <div className="flex items-center gap-3 rounded-md p-1 transition text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
            <Avatar 
              style={{ backgroundColor: "#3b82f6", verticalAlign: 'middle' }} 
              size="large"
            >
              {(adminName || "A").charAt(0).toUpperCase()}
            </Avatar>
            
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-sm font-semibold m-0 dark:text-gray-100">
                {adminName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 m-0">
                {adminEmail}
              </p>
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}