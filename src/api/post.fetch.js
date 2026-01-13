export async function fetchPostById({ baseURL, token, id, signal } = {}) {
  if (!id) throw new Error("Post ID is required");

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${baseURL}/posts/${id}`, {
    headers,
    signal,
  });

  // Special-case unauthorized so callers can react (logout/redirect)
  if (res.status === 401) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch post. Status: ${res.status}`);
  }

  const data = await res.json().catch(() => null);

  // Unwrap common shapes: { post }, { data: { post } }, raw post, or array
  let post = null;
  if (!data) post = null;
  else if (data.post) post = data.post;
  else if (data.data && data.data.post) post = data.data.post;
  else if (data.data) post = data.data;
  else post = data;

  // If the API returned an array with a single item, return the item
  if (Array.isArray(post) && post.length === 1) post = post[0];

  return post;
}

export default fetchPostById;
