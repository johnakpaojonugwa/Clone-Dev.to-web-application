import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import Select from "react-select";

const tagOptions = [
  { value: "react", label: "react" },
  { value: "node", label: "node" },
  { value: "javascript", label: "javascript" },
  { value: "webdev", label: "webdev" },
  { value: "programming", label: "programming" },
  { value: "ai", label: "ai" },
  { value: "css", label: "css" },
];

function CreatePost() {
  const [title, setTitle] = useState("");
  const [backCover, setBackCover] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const { baseURL } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      backCover,
      tags: tags.map(t => t.value),
      content,
    };
    // send `postData` to backend API with basic feedback
    setIsSubmitting(true);
    try {
      const res = await fetch(`${baseURL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        message.error(err.message || "Failed to publish post");
      } else {
        message.success("Post published");
        // Optionally clear form
        setTitle("");
        setBackCover("");
        setTags([]);
        setContent("");
      }
    } catch {
      message.error("Network error: could not publish post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Cover Image */}
        <input
          type="text"
          placeholder="Cover image URL"
          value={backCover}
          onChange={(e) => setBackCover(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {backCover && (
          <img src={backCover} alt="backCover" className="w-full h-60 object-cover rounded" />
        )}

        {/* Tags */}
        <Select
          isMulti
          options={tagOptions}
          value={tags}
          onChange={setTags}
          placeholder="Add tags..."
          className="text-left"
        />

        {/* Markdown Editor */}
        <div className="border border-gray-300 rounded">
          <MDEditor
            value={content}
            onChange={setContent}
            height={400}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded font-medium ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
