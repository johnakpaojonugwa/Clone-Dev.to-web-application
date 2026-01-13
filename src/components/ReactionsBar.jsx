import {
  FaHeart,
  FaRegComment,
  FaRegBookmark,
} from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";

export default function ReactionsBar({ post, commentCount }) {
  const likesCount = post?.likes?.length || 0;
  const displayCommentCount = commentCount || 0;

  return (
    <div className="sticky top-50 flex flex-col items-center gap-6 text-gray-600">
      <Reaction 
        icon={<FaHeart size={24} color="red" className={post?.likes?.includes(post?.author?._id) ? "text-red-500" : ""} />} 
        count={likesCount} 
      />
      
      <Reaction icon={<FaRegComment size={24} />} count={displayCommentCount} />
      
      <Reaction icon={<FaRegBookmark size={24} />} count={5} />
      <Reaction icon={<AiOutlineRetweet size={24} />} count={5} />
      <Reaction icon={<FiMoreHorizontal size={24} />} count={""} />
    </div>
  );
}

function Reaction({ icon, count }) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-black">
      <div className="text-xl">{icon}</div>
      <span className="text-xs">{count}</span>
    </div>
  );
}