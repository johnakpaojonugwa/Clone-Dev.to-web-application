import heroBg from "@/assets/hero-bg.webp";
import { FiMoreHorizontal } from "react-icons/fi";
import PostItem from "@/components/PostItem";
import PostSkeleton from "@/components/PostSkeleton";
import { useApp } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { message } from "antd";
import { fetchPosts } from "@/api/posts.api";
import { adaptPostToUI } from "@/adapters/post.adapter";

export default function PostCard() {
  const { baseURL, userToken, logout } = useApp();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const loadPosts = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await fetchPosts({
        baseURL,
        token: userToken,
        page: pageNumber,
      });

      const postsArray = res?.data ?? res?.posts ?? res ?? [];
      const uiPosts = (Array.isArray(postsArray) ? postsArray : [])
        .map(adaptPostToUI)
        .filter(Boolean);

      setPosts((prev) => (pageNumber === 1 ? uiPosts : [...prev, ...uiPosts]));

      // Determine pagination 
      const totalPages = res?.pages ?? res?.totalPages ?? null;
      if (totalPages != null) setHasMore(pageNumber < totalPages);
      else setHasMore(uiPosts.length > 0);
    } catch (err) {
      // Handle unauthorized centrally
      if (err && err.status === 401) {
        try {
          logout();
        } catch {}
        message.info("Session expired — please login.");
        return;
      }
      message.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Create post */}
      <div className="bg-white rounded-md overflow-hidden">
        <div className="py-2 px-3 border-b border-gray-200">
          <textarea
            placeholder="What's on your mind?"
            rows={1}
            className="w-full resize-none rounded-md border border-gray-200 bg-white
              p-3 text-md text-gray-700 placeholder-gray-600
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition-all focus:h-44"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between px-4">
        <div className="flex gap-6">
          <button className="p-2 font-bold text-gray-900 bg-white rounded-md">
            Discover
          </button>
          <button className="p-2 font-medium text-gray-500 hover:text-gray-900">
            Following
          </button>
        </div>

        <button className="p-2 rounded hover:bg-gray-100">
          <FiMoreHorizontal className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Feed */}
      <article className="bg-gray-100 rounded-md border border-gray-200 overflow-hidden">
        <img src={heroBg} alt="Post thumbnail" className="w-full object-cover" />

        {posts.map((post, index) => {
          const key = post?.id ?? post?._id ?? index;
          const postId = post?.id ?? post?._id ?? index;
          return (
            <PostItem
              key={key}
              post={post}
              id={postId}
              isLast={index === posts.length - 1}
            />
          );
        })}

        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}

        {hasMore && !loading && (
          <div className="p-4 text-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
            >
              Load more
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
