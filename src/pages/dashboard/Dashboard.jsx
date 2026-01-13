import { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import Footer from "@/components/Footer";
import DevAppsSidebar from "@/components/DevAppsSidebar";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Skeleton } from "antd";

export default function Dashboard() {
  const { baseURL, userToken } = useApp();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Wrap the fetcher in useCallback
  const fetchEverything = useCallback(async () => {
    if (!userToken) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${baseURL}/posts/me`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const result = await res.json();
      const posts = result.posts || result.data || [];

      const postsWithCounts = await Promise.all(
        posts.map(async (post) => {
          try {
            const cRes = await fetch(`${baseURL}/comments/${post._id}`);
            const cData = await cRes.json();
            return {
              ...post,
              commentCount: Array.isArray(cData.data) ? cData.data.length : 0,
            };
          } catch (err) {
            return { ...post, commentCount: 0 };
          }
        })
      );

      setMyPosts(postsWithCounts);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [baseURL, userToken]);

  // 2. Initial load
  useEffect(() => {
    fetchEverything();
  }, [fetchEverything]);

  // Calculations for StatsCards (These update whenever myPosts changes)
  const totalReactions = myPosts.reduce(
    (acc, post) => acc + (post.likes?.length || 0),
    0
  );
  const totalComments = myPosts.reduce(
    (acc, post) => acc + (post.commentCount || 0),
    0
  );

  return (
    <>
      <Header />
      <DevAppsSidebar />
      <main className="bg-[#f9f9f9] max-w-[1380px] mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard value={totalReactions} label="Total post reactions" />
          <StatsCard value={totalComments} label="Total post comments" />
          <StatsCard value="< 500" label="Total post views" />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar counts={{ posts: myPosts.length, followers: 0 }} />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-900">
                Posts ({myPosts.length})
              </h2>
              <Link
                to="/create-post"
                className="text-sm bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
              >
                Create Post
              </Link>
            </div>

            <section className="bg-white border border-gray-200 rounded">
              {loading ? (
                <div className="p-6">
                  <Skeleton active />
                </div>
              ) : myPosts.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {myPosts.map((post) => (
                    /* NOTE: If you use a custom PostRow component here, 
                       pass fetchEverything as a prop to trigger updates!
                    */
                    <div
                      key={post._id}
                      className="p-4 hover:bg-gray-50 flex justify-between items-center"
                    >
                      <div>
                        <Link
                          to={`/posts/${post._id}`}
                          className="text-[#3b49df] font-bold hover:underline"
                        >
                          {post.title}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(post.createdAt).toLocaleDateString()} •{" "}
                          {post.likes?.length || 0} reactions •{" "}
                          {post.commentCount || 0} comments
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="min-h-65 flex flex-col items-center justify-center text-center px-6 py-10">
                  <p className="text-md text-gray-500 mb-4">
                    You haven't written anything yet.
                  </p>
                  <Link
                    to="/create-post"
                    className="bg-[#3b49df] text-white px-4 py-2 rounded"
                  >
                    Write your first post now
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
