import ReactMarkdown from "react-markdown";

export function PostsPreview({ content }) {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
