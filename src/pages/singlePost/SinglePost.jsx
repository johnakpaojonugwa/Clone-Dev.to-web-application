import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostContent from "@/components/PostContent";
import AuthorSidebar from "@/components/AuthorSidebar";
import ReactionsBar from "@/components/ReactionsBar";
import DevAppsSidebar from "@/components/DevAppsSidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { fetchPostById } from "@/api/post.fetch.js";
import { Skeleton } from "antd";

export default function SingleFeed() {
  const { id } = useParams();
  const { baseURL, userToken, logout } = useApp();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Initiate both fetches in parallel
        const postPromise = fetchPostById({
          baseURL,
          token: userToken,
          id,
          signal: controller.signal,
        });

        const commentsPromise = fetch(`${baseURL}/comments/${id}`, {
          signal: controller.signal,
        }).then((res) => {
          if (!res.ok) throw new Error("Comments failed to load");
          return res.json();
        });

        // 2. Wait for both to resolve
        const [postData, commentData] = await Promise.all([
          postPromise,
          commentsPromise,
        ]);

        // 3. Update State
        setPost(postData);
        if (commentData.success) {
          setComments(commentData.data);
        }
      } catch (err) {
        // Don't update state if the fetch was aborted
        if (err.name === "AbortError") return;

        setError(err.message || "Failed to load post.");

        // Handle unauthorized
        if (err.status === 401) {
          try {
            logout();
          } catch (e) {}
          navigate("/login");
        }
      } finally {
        // Only set loading false if we didn't abort
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [id, baseURL, userToken, logout, navigate]);

  // --- 1. DEFINE ACTIVE POST HERE (Top Level) ---
  const postsArray =
    post?.posts || post?.data || (Array.isArray(post) ? post : null);
  const activePost = postsArray ? postsArray.find((p) => p._id === id) : post;

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header />
      <DevAppsSidebar />
      <div className="max-w-[1380px] mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-1 hidden lg:block">
            <ReactionsBar
              post={activePost}
              commentCount={comments.length} // Pass the real length here
            />
          </aside>
          <main className="col-span-12 lg:col-span-8">
            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <Skeleton active avatar paragraph={{ rows: 10 }} />
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="p-10 bg-white rounded-lg text-red-600 text-center border border-red-100">
                {error}
              </div>
            )}

            {/* Success State */}
            {!loading && !error && activePost && (
              <PostContent post={activePost} />
            )}

            {!loading && !error && !activePost && (
              <div className="p-10 bg-white rounded-lg text-center text-gray-500">
                Post not found.
              </div>
            )}
          </main>
          {/* Right sidebar */}
          <aside className="col-span-3 hidden lg:block">
            {loading ? (
              // This shows while the API is fetching
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <Skeleton
                  active
                  avatar={{ size: "large", shape: "circle" }}
                  paragraph={{ rows: 4 }}
                />
              </div>
            ) : activePost?.author ? (
              // This shows once the data is ready
              <AuthorSidebar author={activePost.author} currentPostId={id} />
            ) : (
              // Optional: what to show if there is no author found
              <div className="bg-white rounded-lg p-6 border border-gray-200 text-gray-400">
                Author information unavailable
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
