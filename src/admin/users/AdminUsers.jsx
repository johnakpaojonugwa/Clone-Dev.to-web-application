import { useEffect, useMemo, useState } from "react";
import {
  Table,
  Avatar,
  Skeleton,
  Alert,
  message,
  Tag,
  Card,
  Empty,
  Input,
  Select,
  Button,
  Modal,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useApp } from "@/context/AppContext";

const { Search } = Input;

export default function AdminUsers() {
  const { baseURL, userToken, isDarkMode } = useApp();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    if (!userToken || !baseURL) return;

    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch users");

      setUsers(data?.users || []);
    } catch (err) {
      message.error(err.message || "Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userToken, baseURL]);

  // Delete user handler
  const handleDelete = (user) => {
    Modal.confirm({
      title: "Delete user?",
      content: `This will permanently delete ${user.fullname}.`,
      okText: "Delete",
      okType: "danger",
      centered: true,
      onOk: async () => {
        try {
          setDeletingId(user._id);

          const res = await fetch(`${baseURL}/admin/users/${user._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data?.message || "Delete failed");

          message.success("User deleted");
          fetchUsers();
        } catch (err) {
          message.error(err.message || "Unable to delete user");
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  // Filtered users based on search and role filter
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        u.username?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" || u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  // Columns for Antd Table
  const columns = [
    {
      title: "",
      width: 70,
      render: (_, record) => (
        <Avatar 
          src={record.avatar} 
          size={42} 
          className="border dark:border-gray-700"
        >
          {!record.avatar && record.fullname?.[0]}
        </Avatar>
      ),
    },
    {
      title: "User",
      render: (_, record) => (
        <div>
          <div className="font-medium text-gray-800 dark:text-gray-200">{record.fullname}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">@{record.username}</div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (v) => <span className="text-gray-600 dark:text-gray-300">{v}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => (
        <Tag 
          color={role === "admin" ? "blue" : "default"}
          className="dark:bg-blue-900/40 dark:border-blue-800 dark:text-blue-300"
        >
          {role.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "User ID",
      dataIndex: "_id",
      render: (id) => (
        <span className="text-xs text-gray-400 dark:text-gray-500">{id?.slice(0, 10)}…</span>
      ),
    },
    {
      title: "Action",
      width: 100,
      render: (_, record) => (
        <Button
          danger
          type="text"
          icon={<DeleteOutlined />}
          loading={deletingId === record._id}
          onClick={() => handleDelete(record)}
          className="hover:bg-red-50 dark:hover:bg-red-900/20"
        />
      ),
    },
  ];

  return (
    <div className="p-6 transition-colors duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Manage Users</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Search, filter and manage users</p>
      </div>

      {alert && (
        <Alert
          className="mb-4"
          type={alert.type}
          message={alert.message}
          description={alert.description}
          showIcon
          closable
        />
      )}

      <Card 
        bordered={false} 
        className="rounded-xl shadow-sm bg-white dark:bg-gray-800 transition-colors duration-300"
      >
        <div className="flex flex-wrap gap-3 mb-6">
          <Search
            placeholder="Search name, username or email"
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />

          <Select value={roleFilter} onChange={setRoleFilter} className="w-40">
            <Select.Option value="all">All roles</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-56">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredUsers.map((u) => ({
              ...u,
              key: u._id,
            }))}
            pagination={{ pageSize: 8, showSizeChanger: false }}
            rowClassName="hover:bg-gray-50/5 dark:hover:bg-gray-700/40 transition-colors"
            locale={{
              emptyText: (
                <Empty
                  description={<span className="dark:text-gray-400">No users found</span>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
            }}
          />
        )}
      </Card>
    </div>
  );
}