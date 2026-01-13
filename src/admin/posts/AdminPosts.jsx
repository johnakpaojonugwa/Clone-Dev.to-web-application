import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Alert,
  Card,
  message,
  Modal,
  Skeleton,
  Table,
  Button,
  Avatar,
  Input,
  Empty,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function AdminPosts() {
  const { baseURL, userToken, isDarkMode } = useApp(); // Pulled isDarkMode

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/posts`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const result = await res.json();
      setPosts(result.data || result.posts || []);
    } catch (err) {
      message.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) fetchPosts();
  }, [userToken, baseURL]);

  const handleDelete = (post) => {
    Modal.confirm({
      title: "Delete Post",
      content: `Are you sure you want to delete "${post.title}"?`,
      okText: "Delete",
      okType: "danger",
      centered: true, // Matches your AdminUsers style
      onOk: async () => {
        try {
          setDeletingId(post._id);
          const res = await fetch(`${baseURL}/admin/posts/${post._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${userToken}` },
          });
          if (res.ok) {
            message.success("Post deleted successfully.");
            fetchPosts();
          } else {
            message.error("Failed to delete post.");
          }
        } catch (err) {
          message.error("Error deleting post");
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Cover",
      width: 80,
      render: (_, record) => (
        <Avatar 
          src={record.backCover} 
          shape="square" 
          size={42} 
          className="border dark:border-gray-700"
        >
          {record.title?.[0]}
        </Avatar>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <div className="font-medium text-gray-800 dark:text-gray-200">
          {text}
        </div>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags) => (
        <span className="text-gray-500 dark:text-gray-400">
          {Array.isArray(tags) ? tags.join(", ") : tags}
        </span>
      ),
    },
    {
      title: "Action",
      width: 80,
      fixed: "right",
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
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Manage Posts
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Search and delete community posts
        </p>
      </div>

      <Card 
        bordered={false} 
        className="shadow-sm rounded-xl bg-white dark:bg-gray-800 transition-colors duration-300"
      >
        <div className="mb-6">
          <Search
            placeholder="Search by title..."
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 300 }}
            className="dark:bg-transparent"
          />
        </div>

        {loading ? (
          <div className="py-10">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredPosts.map((post) => ({ ...post, key: post._id }))}
            pagination={{ pageSize: 8, showSizeChanger: false }}
            rowClassName="hover:bg-gray-50/5 dark:hover:bg-gray-700/40 transition-colors"
            locale={{ 
              emptyText: (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description={<span className="dark:text-gray-500">No posts found.</span>}
                />
              ) 
            }}
          />
        )}
      </Card>
    </div>
  );
}