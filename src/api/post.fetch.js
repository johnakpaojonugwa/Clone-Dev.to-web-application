export async function fetchPostById({ baseURL, token, id, signal } = {}) {
  if (!id) throw new Error("Post ID is required");

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${baseURL}/posts/${id}`, {
    headers,
    signal,
  });

  // Unauthorised (logout/redirect)
  if (res.status === 401) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch post. Status: ${res.status}`);
  }

  const data = await res.json().catch(() => null);

  let post = null;
  if (!data) post = null;
  else if (data.post) post = data.post;
  else if (data.data && data.data.post) post = data.data.post;
  else if (data.data) post = data.data;
  else post = data;

  if (Array.isArray(post) && post.length === 1) post = post[0];

  return post;
}

export default fetchPostById;
