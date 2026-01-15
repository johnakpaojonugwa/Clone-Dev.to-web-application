import { useEffect, useState, useCallback } from "react";
import { useApp } from "@/context/AppContext";
import {
  Card,
  message,
  Modal,
  Skeleton,
  Table,
  Button,
  Avatar,
  Input,
  Empty,
  Tag,
  Space
} from "antd";
import { DeleteOutlined, MessageOutlined, HeartOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function AdminPosts() {
  const { baseURL, userToken } = useApp();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch Posts with engagement 
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/posts`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const result = await res.json();
      const rawPosts = result.data || result.posts || [];

      const postsWithCounts = await Promise.all(
        rawPosts.map(async (post) => {
          try {
            const commentRes = await fetch(`${baseURL}/comments/${post._id}`, {
              headers: { Authorization: `Bearer ${userToken}` },
            });
            const commentData = await commentRes.json();
            return { 
              ...post, 
              commentCount: commentData.data?.length || 0,
              likeCount: post.likes?.length || 0 
            };
          } catch {
            return { ...post, commentCount: 0, likeCount: post.likes?.length || 0 };
          }
        })
      );

      setPosts(postsWithCounts);
    } catch (err) {
      message.error("Failed to load posts and metrics");
    } finally {
      setLoading(false);
    }
  }, [baseURL, userToken]);

  useEffect(() => {
    if (userToken) fetchPosts();
  }, [fetchPosts, userToken]);

  // Delete Post
  const handleDelete = (post) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: `Are you sure you want to delete "${post.title}"? This will also remove all associated comments.`,
      okText: "Delete",
      okType: "danger",
      centered: true,
      onOk: async () => {
        try {
          setDeletingId(post._id);
          const res = await fetch(`${baseURL}/admin/posts/${post._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${userToken}` },
          });
          
          if (res.ok) {
            message.success("Post removed successfully.");
            fetchPosts(); 
          } else {
            message.error("Failed to delete post.");
          }
        } catch (err) {
          message.error("Error connecting to server.");
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  // Filtering posts based on search
  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Table Columns
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
        <div className="font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
          {text}
        </div>
      ),
    },
    {
      title: "Engagement",
      width: 150,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <HeartOutlined className="mr-1" /> {record.likeCount} Reactions
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <MessageOutlined className="mr-1" /> {record.commentCount} Comments
          </span>
        </Space>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags) => (
        <div className="flex flex-wrap gap-1">
          {Array.isArray(tags) ? (
            tags.map(tag => (
              <Tag key={tag} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                {tag}
              </Tag>
            ))
          ) : (
            <Tag>{tags}</Tag>
          )}
        </div>
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
    <div className="p-6 min-h-screen">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Manage Posts
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Review community engagement and moderate content
          </p>
        </div>
        <Search
          placeholder="Filter by title..."
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
          className="dark:bg-transparent"
        />
      </div>

      <Card 
        bordered={false} 
        className="shadow-sm rounded-xl bg-white dark:bg-gray-800 transition-colors duration-300"
      >
        {loading && posts.length === 0 ? (
          <div className="py-10">
            <Skeleton active paragraph={{ rows: 8 }} />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredPosts.map((post) => ({ ...post, key: post._id }))}
            pagination={{ pageSize: 8, showSizeChanger: false }}
            scroll={{ x: 800 }}
            rowClassName="hover:bg-gray-50/5 dark:hover:bg-gray-700/40 transition-colors"
            locale={{ 
              emptyText: (
                <Empty 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  description={<span className="dark:text-gray-500">No posts matched your search.</span>}
                />
              ) 
            }}
          />
        )}
      </Card>
    </div>
  );
}