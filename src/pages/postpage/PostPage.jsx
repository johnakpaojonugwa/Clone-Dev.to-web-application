import { useState, useRef, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Upload,
  Select,
  Space,
  message,
  Typography,
  Divider,
} from "antd";
import { UploadOutlined, SendOutlined, SaveOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import "jodit/es5/jodit.min.css";
import { useApp } from "@/context/AppContext";

const { Title, Text } = Typography;

// Tag options
const tagOptions = [
  { value: "react", label: "react" },
  { value: "javascript", label: "javascript" },
  { value: "node", label: "node" },
  { value: "css", label: "css" },
  { value: "webdev", label: "webdev" },
  { value: "ai", label: "ai" },
  { value: "programming", label: "programming" },
];

// ... (imports remain the same)

export default function CreatePost() {
  const { baseURL, userToken } = useApp();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editorRef = useRef(null);
  const contentRef = useRef("");

  // Restore draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("dev:post:draft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTitle(draft.title || "");
        setTags(draft.tags || []);
        contentRef.current = draft.content || "";
        // Jodit needs the value directly via the 'value' prop for restoration
      } catch (e) {
        console.error("Draft restore failed", e);
      }
    }
  }, []);

  // Updated Save Draft logic
  const handleSaveDraft = () => {
    const currentContent = editorRef.current?.value || contentRef.current;
    
    try {
      const draft = {
        title,
        tags,
        content: currentContent,
      };
      localStorage.setItem("dev:post:draft", JSON.stringify(draft));
      message.success("Draft saved locally");
    } catch {
      message.error("Failed to save draft");
    }
  };

  const handlePublish = async () => {
    const finalContent = editorRef.current?.value || contentRef.current;

    if (!title.trim() || !finalContent.trim()) {
      message.error("Title and Content are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", finalContent);
      
      tags.forEach((tag) => formData.append("tags", tag));

      if (coverFile) {
        formData.append("backCover", coverFile);
      }

      const res = await fetch(`${baseURL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Publishing failed");

      message.success("Post published successfully!");

      // RESET
      setTitle("");
      setTags([]);
      setCoverFile(null);
      contentRef.current = "";
      if (editorRef.current) editorRef.current.value = "";
      localStorage.removeItem("dev:post:draft");

    } catch (err) {
      message.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card style={{ maxWidth: 900, margin: "20px auto" }} className="shadow-sm">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={3}>Create New Post</Title>
          <Text type="secondary">Share your knowledge with the community</Text>
        </div>

        <Input
          placeholder="New post title here..."
          size="large"
          variant="borderless"
          style={{ fontSize: "2rem", fontWeight: "bold", padding: 0 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Select
          mode="multiple"
          placeholder="Add up to 4 tags..."
          style={{ width: "100%" }}
          maxCount={4}
          options={tagOptions}
          value={tags}
          onChange={setTags}
        />

        <Upload
          maxCount={1}
          listType="picture"
          beforeUpload={(file) => {
            setCoverFile(file);
            return false; // Manually handle upload
          }}
          onRemove={() => setCoverFile(null)}
        >
          <Button icon={<UploadOutlined />}>Add a cover image</Button>
        </Upload>

        <JoditEditor
          ref={editorRef}
          value={contentRef.current} // This sets the content when the draft is restored
          config={{
            readonly: false,
            height: 400,
            placeholder: "Write your post content here...",
            buttons: ["bold", "italic", "link", "unlink", "underline", "source", "image", "video"]
          }}
          onBlur={(newContent) => (contentRef.current = newContent)} 
        />

        <Divider />

        <Space>
          <Button
            type="primary"
            size="large"
            loading={isSubmitting}
            onClick={handlePublish}
            icon={<SendOutlined />}
          >
            Publish
          </Button>
          <Button size="large" onClick={handleSaveDraft} icon={<SaveOutlined />}>
            Save Draft
          </Button>
        </Space>
      </Space>
    </Card>
  );
}
