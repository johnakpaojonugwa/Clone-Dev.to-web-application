import PostHeader from "@/components/PostHeader";
import PostBody from "@/components/PostBody";
import PostFooter from "@/components/PostFooter";
import InnerComment from "@/components/InnerComment";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { useState, useEffect, useCallback } from "react";

export default function PostItem({ post, isLast, id }) {
  const navigate = useNavigate();
  const { baseURL, userToken, user } = useApp(); 

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user has liked this post on mount
  useEffect(() => {
    const count = post.likes?.length || 0;
    setLikes(count);

    if (post.likes && user?.id) {
      setIsLiked(post.likes.includes(user.id));
    }
  }, [post.likes, user?.id]);

  const fetchComments = useCallback(async () => {
    if (!id || !baseURL) return;
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/comments/${id}`);
      const result = await response.json();
      if (result.success) setComments(result.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  }, [id, baseURL]);

  // SINGLE TOGGLE HANDLER
  const handleToggleLike = async (e) => {
    if (e) e.stopPropagation();

    const action = isLiked ? "dislike" : "like";

    try {
      const response = await fetch(`${baseURL}/posts/${id}/${action}`, {
        method: "POST", 
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setLikes(result.likes);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error(`Failed to ${action} the post:`, error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleClick = (e) => {
    const interactive = e.target.closest("button,a,svg,input,textarea,label");
    if (interactive) return;
    if (id) navigate(`/posts/${id}`);
  };

  const handleToggleComments = (e) => {
    if (e) e.stopPropagation();
    setShowComments((prev) => !prev);
  };

  return (
    <div
      onClick={handleClick}
      role={id ? "link" : undefined}
      className={`p-6 bg-white rounded-md border border-gray-200
        ${!isLast ? "mb-3" : ""}
        hover:shadow-sm transition cursor-pointer`}
    >
      <PostHeader author={post.author} avatar={post.avatar} date={post.date} />

      <PostBody
        id={id}
        title={post.title}
        subtitle={post.subtitle}
        tags={post.tags}
      />

      <PostFooter
        reactions={likes} 
        isLiked={isLiked} 
        comments={post.commentsCount || comments.length}
        readTime={post.readTime}
        onLikeClick={handleToggleLike} 
        onCommentClick={handleToggleComments}
      />

      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          {loading ? (
            <div className="text-sm text-gray-500 animate-pulse">
              Loading comments...
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment, index) => (
              <InnerComment
                key={comment._id || index}
                author={comment.user?.username || "Anonymous"}
                avatar={comment.user?.avatar}
                date={comment.createdAt}
                text={comment.text}
              />
            ))
          ) : (
            <div className="text-sm text-gray-400 italic">No comments yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
