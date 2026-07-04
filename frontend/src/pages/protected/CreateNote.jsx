import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  X,
  Tag,
  HelpCircle,
  Eye,
  ImageIcon,
  Loader2,
  FolderTree,
  ChevronDown,
} from "lucide-react";
import { createNote } from "../../services/authService";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const categories = [
    "Politics",
    "Technology",
    "Health",
    "Sports",
    "Entertainment",
    "Business",
    "Science",
    "Education",
    "World",
    "Other",
  ];
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Navigation & Interactive UI Visibility Controls
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Controls sliding drawer open state

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Handle Tag Management
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = tagInput.trim().replace(/,/g, "");
      if (trimmedValue && !tags.includes(trimmedValue)) {
        setTags([...tags, trimmedValue]);
        setTagInput("");
      }
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/webp", "image/jpeg"];

    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image (PNG/JPG/WebP)");
      e.target.value = null;
      setThumbnail(null);
      setPreview("");
      return;
    }

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setThumbnail(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true);
    try {
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("tags", tags.join(", "));
      formData.append("thumbnail", thumbnail);

      const response = await createNote(formData);
      navigate("/dashboard");
      toast.success("News article created successfully");
    } catch (error) {
      console.log("Error creating note:", error.response);
      toast.error("Failed to create news article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 overflow-y-auto relative">
      {/* Header Layout Component */}
      <header className="sticky top-0 z-30 h-16 sm:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            New Article
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Floating Help Button Toggle */}
          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"
          >
            <HelpCircle size={16} />
            <span className="hidden sm:inline">Markdown Guide</span>
          </button>

          {/* Sliding Preview Drawer Toggle Button */}
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all"
            title="Open Document Preview"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Live Preview</span>
          </button>

          <div className="w-[1px] h-5 bg-slate-200 mx-1" />

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Form Wrapper */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-auto space-y-6"
      >
        {/* Cover Image Selector Workspace */}
        <div className="w-full">
          {!preview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-white p-6 sm:p-10 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group"
            >
              <div className="p-3 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-xl transition-all">
                <ImageIcon size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700">
                  Upload cover image
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PNG, JPG, or WebP up to 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm group">
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  Change Image
                </button>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            required={!thumbnail}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />
        </div>

        {/* Title Field Input Element */}
        <input
          type="text"
          placeholder="Untitled Document..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-transparent border-none text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 placeholder-slate-200 focus:outline-none focus:ring-0 tracking-tight p-0"
        />

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Category
          </label>

          <div className="relative">
            <FolderTree
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-700 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          <p className="text-xs text-slate-400">
            Choose the primary category for this news article.
          </p>
        </div>

        {/* Dynamic Interactive Tag Component Wrapper */}
        <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 w-full p-2 rounded-xl shadow-sm focus-within:border-indigo-400 transition-all">
          <div className="flex items-center gap-1.5 text-indigo-500 pl-1.5">
            <Tag size={14} />
          </div>
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-indigo-50 text-indigo-600 text-xs font-semibold pl-2.5 pr-1.5 py-1 rounded-lg border border-indigo-100"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="p-0.5 hover:bg-indigo-200/60 rounded-md text-indigo-500 hover:text-indigo-700 transition-all"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder={
              tags.length === 0
                ? "Categorize with tags (Press Enter or Comma)..."
                : "Add tag..."
            }
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[140px] bg-transparent border-none text-xs focus:outline-none focus:ring-0 text-slate-600 font-medium placeholder-slate-400 p-1"
          />
        </div>

        {/* Raw Textarea Area Container Block */}
        <div className="flex flex-col text-base leading-relaxed text-slate-600 pt-2 min-h-[300px]">
          <textarea
            placeholder="Briefly describe your news article (Markdown supported)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full min-h-[300px] flex-1 bg-transparent border-none text-base leading-relaxed text-slate-600 placeholder-slate-300 focus:outline-none focus:ring-0 resize-y p-0 overflow-y-auto"
          />
        </div>

        {/* Footer Action Bar Component Panel */}
        <div className="flex justify-end pt-4 border-t border-slate-200 bg-transparent sticky bottom-0 mt-auto pb-4 z-10">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md shadow-indigo-100 transition-all active:scale-[0.98] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            <span>{loading ? "Saving News..." : "Save News"}</span>
          </button>
        </div>
      </form>

      {/* --- RESPONSIVE SLIDING PREVIEW DRAWER LAYOUT --- */}
      {/* Transforms smoothly into a full screen overlay on mobile devices to optimize structural viewing layout boundaries */}
      <div
        className={`fixed inset-y-0 right-0 z-40 bg-white border-l border-slate-200 shadow-2xl 
          w-full sm:max-w-lg lg:max-w-2xl flex flex-col transform transition-transform duration-300 ease-in-out
          ${isPreviewOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header Toolbar */}
        <div className="h-16 sm:h-20 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-indigo-600" />
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Document Live Preview
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsPreviewOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Scrollable Content Canvas Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 prose prose-slate max-w-none">
          {title && (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {title}
            </h1>
          )}

          {/* Display Rendered Tags Array metadata elements if they exist */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50/70 px-2.5 py-1 rounded-md"
                >
                  <Tag size={10} />
                  {tag}
                </div>
              ))}
            </div>
          )}

          {preview && (
            <div className="w-full h-40 sm:h-52 rounded-xl overflow-hidden mb-6 shadow-sm">
              <img
                src={preview}
                alt="Cover Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <hr className="border-slate-100 my-4" />

          {/* Dynamic Component Compilation Output Element */}
          <div className="text-slate-700 text-sm sm:text-base leading-relaxed break-words">
            <ReactMarkdown>
              {content ||
                "*No article content written yet. Use the main field input window to get started...*"}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Dim Overlay Backdrop Sheet component layer */}
      {isPreviewOpen && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Markdown Guide Overlay Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden animate-scaleIn border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <HelpCircle size={18} className="text-indigo-600" />
                <h3 className="font-bold text-slate-800 text-base">
                  Markdown Guide
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Content Cheat-Sheet Scrollable Container */}
            <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-600">
              <p className="text-xs text-slate-400">
                Format your article content instantly using standard Markdown
                styling rules:
              </p>

              <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
                {/* Headers */}
                <div className="p-3 grid grid-cols-2 gap-4 bg-white">
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      To type
                    </span>
                    <code className="text-xs bg-slate-50 text-indigo-600 px-1.5 py-0.5 rounded border border-slate-100 font-mono">
                      # Heading 1
                    </code>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Result
                    </span>
                    <span className="font-bold text-slate-800 text-base">
                      Heading
                    </span>
                  </div>
                </div>

                {/* Bold/Italics */}
                <div className="p-3 grid grid-cols-2 gap-4 bg-white">
                  <div>
                    <code className="text-xs bg-slate-50 text-indigo-600 px-1.5 py-0.5 rounded border border-slate-100 font-mono">
                      **Bold Text**
                    </code>
                  </div>
                  <div>
                    <strong className="text-slate-800 font-bold">
                      Bold Text
                    </strong>
                  </div>
                </div>

                {/* Bold/Italics */}
                <div className="p-3 grid grid-cols-2 gap-4 bg-white">
                  <div>
                    <code className="text-xs bg-slate-50 text-indigo-600 px-1.5 py-0.5 rounded border border-slate-100 font-mono">
                      *Italics*
                    </code>
                  </div>
                  <div>
                    <i className="text-slate-800]">Italic Text</i>
                  </div>
                </div>

                {/* Unordered Lists */}
                <div className="p-3 grid grid-cols-2 gap-4 bg-white">
                  <div>
                    <code className="text-xs bg-slate-50 text-indigo-600 px-1.5 py-0.5 rounded border border-slate-100 font-mono">
                      - Bullet point
                    </code>
                  </div>
                  <div>
                    <ul className="list-disc pl-4 text-xs">
                      <li>Bullet point</li>
                    </ul>
                  </div>
                </div>

                {/* Ordered Lists */}
                <div className="p-3 grid grid-cols-2 gap-4 bg-white">
                  <div>
                    <code className="text-xs bg-slate-50 text-indigo-600 px-1.5 py-0.5 rounded border border-slate-100 font-mono">
                      1. Numbered item
                    </code>
                  </div>
                  <div>
                    <ol className="list-decimal pl-4 text-xs">
                      <li>Numbered item</li>
                    </ol>
                  </div>
                </div>

                {/* Blockquotes */}
                <div className="p-3 grid grid-cols-2 gap-4 bg-white">
                  <div>
                    <code className="text-xs bg-slate-50 text-indigo-600 px-1.5 py-0.5 rounded border border-slate-100 font-mono">
                      &gt; Quote block
                    </code>
                  </div>
                  <div>
                    <blockquote className="border-l-2 border-indigo-500 pl-2 text-xs italic text-slate-400">
                      Quote block
                    </blockquote>
                  </div>
                </div>

                {/* Code snippets */}
                <div className="p-3 grid grid-cols-2 gap-4 bg-white">
                  <div>
                    <code className="text-xs bg-slate-50 text-indigo-600 px-1.5 py-0.5 rounded border border-slate-100 font-mono">
                      `code phrase`
                    </code>
                  </div>
                  <div>
                    <code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">
                      code phrase
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Action Bar Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-xl transition-all shadow-sm"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNote;
