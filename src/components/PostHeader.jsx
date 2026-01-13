export default function PostHeader({ author, avatar, date }) {
  return (
    <div className="flex items-center text-sm text-gray-600">
      <img
        src={avatar}
        alt={author}
        className="w-8 h-8 rounded-full mr-3"
      />
      <span className="font-medium text-gray-900">{author}</span>
      <span className="ml-2 text-gray-400">{date}</span>
    </div>
  );
}
