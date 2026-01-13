export async function fetchPosts({ baseURL, token, page = 1, limit = 10 }) {
  const res = await fetch(
    `${baseURL}/posts?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default fetchPosts;
