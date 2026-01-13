export default function InnerComment({ author, avatar, date, text }) {
  // --- Date Formatter ---
  // This converts the Mongoose createdAt string into a readable format like "Jan 2, 2026"
  const formattedDate = date 
    ? new Date(date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="mt-3"> 
      <div className="flex items-start gap-3 text-sm">
        {/* Avatar */}
        <img
          src={avatar || "https://i.pravatar.cc/40"} 
          alt={author}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-gray-100"
        />
        
        {/* Comment Bubble */}
        <div className="bg-gray-100 p-3 rounded-2xl flex-1">
          <div className="flex flex-col">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-bold text-gray-900">{author}</span>
              {/* Use the formatted date here */}
              <span className="text-gray-400 text-[9px]">
                {formattedDate}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}