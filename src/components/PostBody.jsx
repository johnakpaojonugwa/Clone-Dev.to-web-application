import { Link } from "react-router-dom";

export default function PostBody({ id, title, subtitle, tags }) {
  const to = id ? `/posts/${id}` : "/";

  return (
    <div className="px-8">
      <h2 className="text-2xl font-bold leading-snug text-gray-900 hover:text-indigo-800 transition">
        <Link to={to} className="cursor-pointer">
          {title}
          {subtitle && (
            <span className="block text-gray-700 font-normal">{subtitle}</span>
          )}
        </Link>
      </h2>

      <div className="flex gap-3 text-sm text-gray-500 mt-1">
        {tags?.map((tag, i) => (
          <span key={`${tag ?? 'tag'}-${i}`}>#{tag}</span>
        ))}
      </div>
    </div>
  );
}
