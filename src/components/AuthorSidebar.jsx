import { useEffect, useState } from "react";
import { Avatar, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { FiMoreHorizontal } from "react-icons/fi";
import mailLogo from "@/assets/mailgun-logo.webp";
import mailImage from "@/assets/mailgun-image.jpeg";

export default function AuthorSidebar({ author, currentPostId }) {
  const { baseURL } = useApp();
  const [authorPosts, setAuthorPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // 1. Fetch more posts by this specific author
  useEffect(() => {
    if (!author?._id) return;

    const fetchMoreFromAuthor = async () => {
      setLoadingPosts(true);
      try {
        const res = await fetch(`${baseURL}/posts?author=${author._id}&limit=4`);
        const result = await res.json();
        if (result.success) {
          // Filtering the current post so they don't see the same one in the sidebar
          const filtered = (result.data || result.posts).filter(
            (p) => p._id !== currentPostId
          );
          setAuthorPosts(filtered.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch author posts", err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchMoreFromAuthor();
  }, [author?._id, currentPostId, baseURL]);

  // FALLBACKS
  const avatar = author?.avatar || "https://i.pravatar.cc/100";
  const fullname = author?.fullname || author?.name || "Bit Forge";
  const bio = author?.bio || "No bio available.";
  const location = author?.location || "Online";
  const pronouns = author?.pronouns || "Not specified";
  const work = author?.work || "Professional Developer";
  const joined = author?.createdAt
    ? new Date(author.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Joined recently";

  return (
    <div className="space-y-3">
      {/* PROFILE CARD */}
      <aside className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <div className="flex items-end gap-3">
          <Avatar src={avatar} className="w-20 h-20 rounded-full shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl text-gray-900 leading-tight">
              {fullname}
            </h3>
          </div>
        </div>
        <button className="text-md w-full text-white font-medium px-3 py-1.5 border bg-indigo-600 border-indigo-600 rounded-md hover:bg-indigo-700 cursor-pointer transition">
          Follow
        </button>
        <p className="text-md text-gray-600 leading-relaxed">{bio}</p>
        <div className="space-y-2 text-md">
          <Meta label="Location" value={location} />
          <Meta label="Pronouns" value={pronouns} />
          <Meta label="Work" value={work} />
          <Meta label="Joined" value={joined} />
        </div>
      </aside>

      {/* DYNAMIC "MORE FROM" SECTION */}
      <aside className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 space-y-4">
          <h3 className="border-b border-gray-200 text-xl font-bold pb-2">
            More from <span className="text-indigo-500">{fullname}</span>
          </h3>

          {loadingPosts ? (
            <Skeleton active paragraph={{ rows: 4 }} title={false} />
          ) : authorPosts.length > 0 ? (
            authorPosts.map((p) => (
              <Link
                to={`/posts/${p._id}`}
                key={p._id}
                className="block group space-y-1 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <p className="text-md text-gray-700 group-hover:text-indigo-600 transition">
                  {p.title}
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.tags?.map((tag, idx) => (
                    <span key={idx} className="text-gray-400 text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-sm italic">No other posts found.</p>
          )}
        </div>
      </aside>

      {/* PROMOTED SECTION (Mailgun) */}
      <aside className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={mailLogo} alt="logo" className="w-8 h-8 object-contain" />
            <h3 className="font-bold">
              Mailgun <span className="bg-gray-200 px-1.5 py-0.5 rounded text-[10px] ml-1">PROMOTED</span>
            </h3>
          </div>
          <FiMoreHorizontal className="text-gray-400" />
        </div>
        <img src={mailImage} alt="Ad" className="w-full rounded-md" />
        <p className="text-indigo-600 text-lg font-bold pt-2 underline cursor-pointer leading-tight">
          Pro tips from email all stars.
        </p>
        <p className="text-sm text-gray-600">
          Maximize inbox placement with the latest email best practices.
        </p>
        <button className="w-full mt-2 border border-indigo-600 text-indigo-600 py-2 rounded-md hover:bg-indigo-600 hover:text-white transition cursor-pointer font-semibold">
          Enroll Now
        </button>
      </aside>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-gray-800 font-bold uppercase text-[11px] tracking-wider">{label}</p>
      <p className="text-gray-700 text-sm">{value}</p>
    </div>
  );
}