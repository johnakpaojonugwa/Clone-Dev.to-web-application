import { useState, useEffect } from "react";
import { Avatar, message, Skeleton } from "antd";
import ReactMarkdown from "react-markdown";
import { useApp } from "@/context/AppContext";

export default function PostContent({ post }) {
  const { user, baseURL, userToken } = useApp();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [fetchingComments, setFetchingComments] = useState(false);

  // 1. DATA NORMALIZATION 
  const p = post?.post || post?.data || post || {};

  const data = {
    id: p._id || p.id,
    title: p.title || "Untitled",
    content: p.content || "",
    cover: p.backCover || null,
    tags: Array.isArray(p.tags) ? p.tags : [],
    authorName: p.author?.fullname || p.author?.username || "Anonymous",
    avatar: p.author?.avatar || null,
    date: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "",
  };

  // 2. FETCH COMMENTS
  useEffect(() => {
    if (!data.id) return;

    const fetchComments = async () => {
      setFetchingComments(true);
      try {
        const res = await fetch(`${baseURL}/comments/${data.id}`);
        const result = await res.json();
        if (result.success) setComments(result.data);
      } catch (err) {
        console.error("Comment fetch error:", err);
      } finally {
        setFetchingComments(false);
      }
    };
    fetchComments();
  }, [data.id, baseURL]);

  // 3. POST COMMENT
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await fetch(`${baseURL}/comments/${data.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ text: commentText }),
      });
      const result = await res.json();

      if (result.success) {
        setCommentText("");
        message.success("Comment added!");

        const newComment = {
          ...result.data,
          user: {
            _id: user?._id || user?.id,
            username: user?.username || user?.fullname,
          },
        };
        setComments([newComment, ...comments]);
      }
    } catch (err) {
      message.error("Could not post comment");
    }
  };

  // RENDER GUARD
if (!data.id && !post) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
        <div className="flex items-center gap-3">
          <Skeleton.Avatar active size={42} shape="circle" />
          <Skeleton active paragraph={{ rows: 1 }} title={false} />
        </div>
        <Skeleton active paragraph={{ rows: 4 }} title={{ width: '80%' }} />
        <Skeleton.Button active block style={{ height: 300 }} />
      </div>
    );
  }
  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* POST CONTENT */}
      {data.cover && (
        <img
          src={data.cover}
          alt=""
          className="w-full h-auto object-cover max-h-[450px]"
        />
      )}

      <div className="py-8 px-6 md:px-16 space-y-6">
        <div className="flex items-center gap-3">
          <Avatar src={data.avatar} size={42} className="bg-blue-500">
            {data.authorName[0]}
          </Avatar>
          <div>
            <p className="font-bold text-gray-900 leading-none">
              {data.authorName}
            </p>
            <p className="text-xs text-gray-500 mt-1">{data.date}</p>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
          {data.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, i) => (
            <span
              key={i}
              className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 pt-4 border-t">
          {/<\/[a-z][\s\S]*>/i.test(data.content) ? (
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          ) : (
            <ReactMarkdown>{data.content}</ReactMarkdown>
          )}
        </div>
      </div>

      {/* COMMENT SECTION */}
      <div className="mt-10 pt-10 border-t border-gray-100 px-6 md:px-16 pb-10 bg-gray-50/50">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          Discussion{" "}
          <span className="text-sm font-normal text-gray-500">
            ({comments.length})
          </span>
        </h3>

        {/* Input Area */}
        {user ? (
          <div className="flex gap-3 mb-8">
            <Avatar className="bg-blue-600 flex-shrink-0">
              {user.username?.[0] || user.fullname?.[0]}
            </Avatar>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-24 resize-none bg-white text-sm"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-white border border-dashed rounded-lg text-center mb-8">
            <p className="text-gray-500 text-sm">
              Log in to join the conversation.
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {fetchingComments ? (
            <>
              <Skeleton active avatar paragraph={{ rows: 2 }} />
              <Skeleton active avatar paragraph={{ rows: 2 }} />
            </>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="flex gap-3 group">
                <Avatar className="bg-gray-400 flex-shrink-0 text-xs">
                  {comment.user?.username?.[0]?.toUpperCase()}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-xs">
                      @{comment.user?.username || "anonymous"}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm bg-white p-3 rounded-br-lg rounded-bl-lg rounded-tr-lg border border-gray-100">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm italic py-4">
              No comments yet.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
