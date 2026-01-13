import React, { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import axios from "axios";
import { message, Spin, ConfigProvider, theme } from "antd";
import { FaUsers, FaFileAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const { userToken, baseURL, isDarkMode } = useApp();

  const [overview, setOverview] = useState({
    totalUsers: 0,
    totalPosts: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userToken || !baseURL) return;

    const fetchOverview = async () => {
      try {
        setLoading(true);
        const [userRes, postRes] = await Promise.all([
          axios.get(`${baseURL}/admin/users`, {
            headers: { Authorization: `Bearer ${userToken}` },
          }),
          axios.get(`${baseURL}/admin/posts`, {
            headers: { Authorization: `Bearer ${userToken}` },
          }),
        ]);

        setOverview({
          totalUsers: userRes.data?.total || 0,
          totalPosts: postRes.data?.total || 0,
        });
      } catch (error) {
        console.error(error);
        message.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [userToken, baseURL]);

  const cards = [
    {
      title: "Total Users",
      value: overview.totalUsers,
      icon: <FaUsers size={32} />, 
      cardBg: "bg-indigo-600",
      iconBoxBg: "bg-white/10",
      textColor: "text-white"
    },
    {
      title: "Total Posts",
      value: overview.totalPosts,
      icon: <FaFileAlt size={32} />,
      cardBg: "bg-emerald-600",
      iconBoxBg: "bg-white/10",
      textColor: "text-white"
    },
  ];

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <div className="p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
            Platform Statistics
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {cards.map((card) => (
              <DashboardCard
                key={card.title}
                {...card}
              />
            ))}
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}

function DashboardCard({ title, value, icon, cardBg, iconBoxBg, textColor }) {
  return (
    /* Removed translate, scale, and decorative patterns to make it static */
    <div className={`${cardBg} ${textColor} rounded-2xl p-8 flex items-center justify-between shadow-md border border-white/5`}>
      
      {/* Content Section */}
      <div>
        <h3 className="text-xs font-bold opacity-70 uppercase tracking-widest mb-2">
          {title}
        </h3>
        <p className="text-4xl font-extrabold tracking-tight">
          {value.toLocaleString()}
        </p>
      </div>

      {/* Icon Section - Solid Glass Box */}
      <div className={`${iconBoxBg} p-5 rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
}