import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useApp } from "@/context/AppContext";
import { message } from "antd";

export default function CreatePostEditor() {
  const { baseURL } = useApp();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [backCover, setBackCover] = useState(null);
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitPost = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (backCover) formData.append("backCover", backCover);
    if (tags && tags.length) formData.append("tags", JSON.stringify(tags));

    try {
      const res = await axios.post(`${baseURL}/posts`, formData);
      if (res.status >= 200 && res.status < 300) {
        message.success("Post published");
        setTitle("");
        setContent("");
        setBackCover(null);
        setTags([]);
      } else {
        message.error("Failed to publish post");
      }
    } catch (err) {
      message.error(err?.response?.data?.message || "Network error: could not publish post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Title */}
      <input
        type="text"
        placeholder="New post title here..."
        className="w-full text-4xl font-bold outline-none mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Tags */}
      <input
        type="text"
        placeholder="Add up to 4 tags"
        className="mb-4 w-full border p-2"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTags([...tags, e.target.value]);
            e.target.value = "";
          }
        }}
      />

      {/* Cover Image */}
      <input
        type="file"
        onChange={(e) => setBackCover(e.target.files[0])}
        className="mb-4"
      />

      {/* Markdown Editor */}
      <MDEditor value={content} onChange={setContent} height={500} />

      <button
        onClick={submitPost}
        disabled={isSubmitting}
        className={`mt-6 px-6 py-2 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-black text-white'}`}
      >
        {isSubmitting ? 'Publishing...' : 'Publish'}
      </button>
    </div>
  );
}
