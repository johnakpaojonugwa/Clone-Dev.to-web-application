import React, { useEffect, useState } from "react";
import { Card, Avatar, Descriptions, Typography, Space, Tag, message, Divider } from "antd";
import { UserOutlined, MailOutlined, SafetyOutlined, IdcardOutlined } from "@ant-design/icons";
import { useApp } from "@/context/AppContext";

const { Title, Text } = Typography;

export default function AdminProfile() {
  const { user, baseURL, userToken, isDarkMode } = useApp();
  const [loading, setLoading] = useState(false);

  // Note: users state was fetched but not used in original return; kept logic but cleaned up
  const fetchUsers = async () => {
    if (!userToken || !baseURL) return;
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/admin/users`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch users");
    } catch (err) {
      message.error(err.message || "Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userToken, baseURL]);

  return (
    <div className="max-w-4xl mx-auto p-6 transition-colors duration-300">
      {/* Page Title */}
      <div className="mb-6">
        <Title level={2} className="dark:text-white m-0">My Profile</Title>
        <Text className="text-gray-500 dark:text-gray-400">Manage your personal information and account settings</Text>
      </div>

      <Card
        bordered={false}
        className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all duration-300"
        bodyStyle={{ padding: 0 }}
      >
        {/* Decorative Header Background */}
        <div className="h-32 bg-linear-to-r from-indigo-600 to-purple-600" />

        <div className="px-8 pb-8">
          {/* Avatar Section - Pulling up over the gradient */}
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Avatar
                size={120}
                src={user?.avatar || null}
                icon={<UserOutlined />}
                className="border-4 border-white dark:border-gray-800"
              >
                {user?.fullname?.charAt(0).toUpperCase()}
              </Avatar>
            </div>
            <Tag 
              color={user?.role === "admin" ? "blue" : "default"} 
              className="mb-4 px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider dark:bg-blue-900/40 dark:border-blue-800"
            >
              {user?.role}
            </Tag>
          </div>

          {/* User Identity */}
          <div className="mb-8">
            <Title level={3} className="dark:text-white m-0">{user?.fullname}</Title>
            <Text className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <IdcardOutlined /> @{user?.username || "administrator"}
            </Text>
          </div>

          <Divider className="dark:border-gray-700" />

          {/* Profile Details */}
          <Descriptions
            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            className="mt-6"
            labelStyle={{ 
              color: "#8c8c8c", 
              fontWeight: 400,
              fontSize: "14px"
            }}
            contentStyle={{ 
              color: isDarkMode ? "#e5e7eb" : "#1f2937", 
              fontWeight: 500,
              fontSize: "14px"
            }}
          >
            <Descriptions.Item 
              label={<Space className="dark:text-gray-400"><UserOutlined /> Full Name</Space>}
            >
              {user?.fullname}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<Space className="dark:text-gray-400"><MailOutlined /> Email Address</Space>}
            >
              {user?.email}
            </Descriptions.Item>

            <Descriptions.Item 
              label={<Space className="dark:text-gray-400"><SafetyOutlined /> Account Status</Space>}
            >
              <span className="text-green-500">● Active</span>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </div>
  );
}