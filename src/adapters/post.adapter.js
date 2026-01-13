export function adaptPostToUI(post) {
  // Safe guard for null or undefined post
  if (!post) return { id: null, author: {}, tags: [], reactions: 0 };

  // Handle the case where the post might be wrapped (data.post)
  const p = post.post || post.data || post;

  return {
    id: p._id || p.id,
    title: p.title || "Untitled",
    content: p.content || "", 
    tags: Array.isArray(p.tags) ? p.tags : [],
    reactions: p.likes?.length || 0,
    dislikes: p.dislikes?.length || 0,
    readTime: `${p.readTime || 1} min read`,
    // Safe date conversion
    date: p.createdAt 
      ? new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "Recently",
    // Author handling
    authorName: p.author?.fullname || p.author?.name || p.author?.username || "Anonymous",
    avatar: p.author?.avatar || null,
    backCover: p.backCover || null,
  };
}