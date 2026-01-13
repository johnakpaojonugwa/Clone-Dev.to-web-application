import { FaHeart, FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";

export default function PostFooter({
  reactions,
  comments,
  readTime,
  onLikeClick,
  onCommentClick,
  isLiked, 
}) {
  return (
    <div className="flex items-center justify-between px-8 pt-4 pb-2 text-sm">
      <div className="flex items-center gap-3 text-gray-600">
        <button
          onClick={onLikeClick}
          className="inline-flex items-center gap-1.5 px-3 py-1 cursor-pointer rounded hover:bg-gray-100 transition"
        >
          
          {isLiked ? (
            <FaHeart size={18} className="text-red-500 transition-colors" />
          ) : (
            <FaRegHeart size={18} className="text-gray-400 transition-colors" />
          )}

          <span className={isLiked ? "text-red-500 font-bold" : "text-gray-600"}>
            {reactions}
          </span>
          <span className="hidden sm:inline">Reactions</span>
        </button>

        <button
          onClick={onCommentClick}
          className="inline-flex items-center gap-1.5 px-3 py-1 cursor-pointer rounded hover:bg-gray-100 transition"
        >
          <FaRegComment size={18} />
          <span>{comments}</span>
          <span className="hidden sm:inline">Comments</span>
        </button>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>{readTime}</span>
        <button className="hover:text-gray-700 transition">
          <FaRegBookmark size={18} />
        </button>
      </div>
    </div>
  );
}