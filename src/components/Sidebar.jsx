export default function Sidebar({ counts }) {
  // Define items with their dynamic values
  const sidebarItems = [
    { label: "Posts", value: counts?.posts || 0 },
    { label: "Series", value: 0 },
    { label: "Followers", value: counts?.followers || 0 },
    { label: "Following tags", value: 0 },
    { label: "Following users", value: 0 },
    { label: "Following organizations", value: 0 },
    { label: "Following podcasts", value: 0 },
    { label: "Analytics", value: "" }, 
    { label: "Hidden tags", value: 0 },
  ];

  return (
    <aside className="w-64 hidden md:block">
      <ul className="space-y-1 text-md">
        {sidebarItems.map((item) => (
          <li
            key={item.label}
            className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer transition-colors ${
              item.label === "Posts"
                ? "bg-white text-black font-bold shadow-sm" 
                : "text-gray-600 hover:bg-indigo-50 hover:text-[#3b49df]"
            }`}
          >
            <span>{item.label}</span>
            {item.value !== "" && (
              <span className="text-gray-700 bg-gray-200 text-xs font-medium px-2 py-0.5 rounded-md">
                {item.value}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}