import { FiMoreHorizontal } from "react-icons/fi";

export default function Comment({ author, time, text }) {
return (
<div className="bg-white border border-gray-200 rounded-md p-4">
<div className="flex justify-between items-center text-sm">
<span className="font-medium">{author}</span>
<FiMoreHorizontal />
</div>
<p className="text-sm text-gray-600 mt-2">{text}</p>
<span className="text-xs text-gray-400">{time}</span>
</div>
);
}