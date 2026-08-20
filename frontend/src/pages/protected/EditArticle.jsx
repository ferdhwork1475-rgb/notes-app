import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  X,
  Tag,
  ImageIcon,
  FileImage,
  Loader2,
  FileX,
  RotateCcw,
  HelpCircle,
  Eye,
  BookOpen,
} from "lucide-react";
import { fetchArticle, updateArticle } from "../../services/authService";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import GuideItem from "../../components/protected/GuideItem";

const EditArticle = () => {
  // Get the id from the network req
  const { slug } = useParams();

  // for navigation
  const navigate = useNavigate();

  // using useRef here for uploading the imagine so as not to trigger a re render. Normally, in react... we use React's useState and it triggers a re render
  const fileInputRef = useRef(null);
  const titleRef = useRef(null);

  // Content recieved from the backendAPI
  const [article, setArticle] = useState({
    title: "",
    content: "",
    tags: [""],
    thumbnail: "",
    slug: "",
  });

  // Form Field States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([""]);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");

  // System Lifecycle States
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);

  // New UI Interaction States
  const [isHelpOpen, setIsHelpOpen] = useState(false); // Markdown Guide Modal toggle
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Sliding Drawer Preview toggle

  // Fecth article from API
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setFetching(true);
        setErrorState(false);
        const response = await fetchArticle(slug);
        setArticle(response.articleData);
        setTitle(response.articleData.title);
        setContent(response.articleData.content);
        setTags(response.articleData.tags);
        setPreview(response.articleData.thumbnail || "");
      } catch (error) {
        setErrorState(true);
        toast.error("Failed to load article records");
      } finally {
        setFetching(false);
      }
    };

    if (slug) fetchArticleData();
  }, [slug]);

  // 2. Focus Management with Smart Cursor Placement
  useEffect(() => {
    if (!fetching && !errorState && titleRef.current) {
      titleRef.current.focus();
      const currentText = titleRef.current.value;
      titleRef.current.value = "";
      titleRef.current.value = currentText;
    }
  }, [fetching, errorState]);

  // Determine whether the form has changed.
  const dirtyFields = {
    title: article.title === title ? false : true,
    content: article.content === content ? false : true,
    tags: article.tags === tags ? false : true,
    thumbnail: article.thumbnail === preview ? false : true,
  };

  const isDirty =
    dirtyFields.title !== false ||
    dirtyFields.content !== false ||
    dirtyFields.tags !== false ||
    dirtyFields.thumbnail != false
      ? true
      : false;

  // Handle local file validations - triggered by the fileInputRef
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/webp", "image/jpeg"];

    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image (PNG/JPG/WebP)");
      e.target.value = null;
      return;
    }

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setThumbnail(file);
    }
  };

  // Restore image back to original state.
  const handleResetImage = () => {
    setThumbnail(null);
    setPreview((prev) => article.thumbnail.url || "");
    // get the current position of the ref which makes it possible to access the value
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("Restored original cover image");
  };

  // Safe Close Handler checking form state
  const handleClose = () => {
    if (isDirty) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?",
        )
      ) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "Discard updates?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Form Submit Payload Builder
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true);

    try {
      formData.append("title", title);
      formData.append("content", content);
      if (tags.length == article.tags.length) {
        tags.map((tag) => formData.append("tags", tag.trim()));
      } else {
        tags.split(",").map((tag) => formData.append("tags", tag.trim()));
      }
      thumbnail && formData.append("thumbnail", thumbnail);
      if (!isDirty) {
        toast.info("No changes detected to update");
        return;
      }
      await updateArticle(article.slug, formData);
      toast.success("News article updated successfully");
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to update news article");
    } finally {
      setLoading(false);
    }
  };

  // State View: Fetching Records Skeleton
  if (fetching) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 h-full">
        <Loader2 className="animate-spin text-indigo-600 mb-2" size={32} />
        <p className="text-sm font-medium text-slate-500">
          Retrieving article fields...
        </p>
      </div>
    );
  }

  // State View: Content Boundary/Missing Node Error View
  if (errorState) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 h-full p-4 text-center">
        <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl mb-3">
          <FileX size={32} />
        </div>
        <h3 className="font-bold text-slate-800 text-lg">Article Not Found</h3>
        <p className="text-sm text-slate-500 max-w-sm mt-1 mb-5">
          This document may have been deleted, moved, or your account lacks
          current viewing permissions.
        </p>
        <button
          onClick={() => navigate("/admin")}
          className="text-xs font-semibold bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 overflow-y-auto relative">
      {/* Sticky Top Action Header */}
      <header className="sticky top-0 z-30 h-16 sm:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Editing Article
          </span>
          {isDirty && (
            <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md animate-pulse">
              Unsaved Changes
            </span>
          )}
        </div>

        {/* Dynamic Utility Toolbar Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all"
            title="Markdown Help"
          >
            <BookOpen size={20} />
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all"
            title="Live Preview"
          >
            <Eye size={20} />
          </button>

          <div className="w-[1px] h-5 bg-slate-200 mx-1" />

          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Form Content Wrapper */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-auto space-y-6"
      >
        {/* Cover Image Upload UI */}
        <div className="w-full">
          {!preview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-white p-6 sm:p-10 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all dynamic-shadow group"
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
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex flex-col sm:flex-row items-center justify-center gap-2.5 p-4 transition-all duration-200">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow"
                >
                  <FileImage size={14} />
                  Change Image
                </button>

                {thumbnail && preview && (
                  <button
                    type="button"
                    onClick={handleResetImage}
                    className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow"
                  >
                    <RotateCcw size={14} />
                    Undo Change
                  </button>
                )}
              </div>
            </div>
          )}
          {/* Using a hidden file image, because it is only the input that can trigger the system file explorer */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />
        </div>

        {/* Title Input */}
        <div className="relative w-full group">
          <input
            type="text"
            ref={titleRef}
            placeholder="Untitled Document..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={150}
            required
            className="w-full bg-transparent border-none text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 placeholder-slate-200 focus:outline-none focus:ring-0 tracking-tight p-0 pr-16"
          />
          <span className="absolute right-0 bottom-2 text-[10px] font-bold text-slate-300 group-focus-within:text-indigo-400 tracking-wider transition-colors">
            {title.length}/150
          </span>
        </div>

        {/* Metadata Tags */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 w-fit px-3.5 py-1.5 rounded-xl shadow-sm focus-within:border-indigo-400 transition-all">
          <Tag className="text-indigo-500" size={14} />
          <input
            type="text"
            placeholder="Categorize with a tag..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-transparent border-none text-xs focus:outline-none focus:ring-0 text-slate-600 font-medium placeholder-slate-400 p-0"
          />
        </div>

        {/* Text Editor Input Container */}
        <div className="flex flex-col text-base leading-relaxed text-slate-600 pt-2 min-h-[300px]">
          <textarea
            placeholder="Briefly describe your news article (Markdown supported)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full min-h-[300px] flex-1 bg-transparent border-none text-base leading-relaxed text-slate-600 placeholder-slate-300 focus:outline-none focus:ring-0 resize-y p-0 overflow-y-auto"
          />
        </div>

        {/* Sticky Action Footer Component Bar */}
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
            <span>{loading ? "Updating News..." : "Update News"}</span>
          </button>
        </div>
      </form>

      {/* --- RESPONSIVE SLIDING PREVIEW DRAWER DESIGN --- */}
      {/* This layout structure acts as a sliding overlay dashboard sheet on mobile devices (w-full), 
        but scales into a clean split-screen view on large displays (lg:max-w-xl). 
      */}
      <div
        className={`fixed inset-y-0 right-0 z-40 bg-white border-l border-slate-200 shadow-2xl 
          w-full sm:max-w-lg lg:max-w-2xl flex flex-col transform transition-transform duration-300 ease-in-out
          ${isPreviewOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="h-16 sm:h-20 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-indigo-600" />
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Live Document Preview
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

        {/* Drawer Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 prose prose-slate max-w-none">
          {title && (
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {title}
            </h1>
          )}
          {tags && (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 px-2.5 py-1 rounded-md mb-4">
              <Tag size={12} />
              {tags}
            </div>
          )}
          {preview && (
            <div className="w-full h-40 sm:h-52 rounded-xl overflow-hidden mb-6">
              <img
                src={preview}
                alt="Cover Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <hr className="border-slate-100 my-4" />

          {/* Output Parser Rendering Interface Container */}
          <div className="text-slate-700 markdown-preview-body text-sm sm:text-base leading-relaxed break-words">
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => (
                  <h1
                    className="mt-10 mb-5 text-4xl font-black leading-tight tracking-tight text-slate-900"
                    {...props}
                  />
                ),

                h2: ({ ...props }) => (
                  <h2
                    className="mt-10 mb-4 text-3xl font-bold leading-tight text-slate-900"
                    {...props}
                  />
                ),

                h3: ({ ...props }) => (
                  <h3
                    className="mt-8 mb-3 text-2xl font-semibold leading-tight text-slate-800"
                    {...props}
                  />
                ),

                p: ({ ...props }) => (
                  <p
                    className="mb-6 text-base leading-8 text-slate-700"
                    {...props}
                  />
                ),

                strong: ({ ...props }) => (
                  <strong className="font-bold text-slate-900" {...props} />
                ),

                em: ({ ...props }) => (
                  <em className="italic text-slate-700" {...props} />
                ),

                ul: ({ ...props }) => (
                  <ul
                    className="mb-6 ml-6 list-disc space-y-2 text-slate-700"
                    {...props}
                  />
                ),

                ol: ({ ...props }) => (
                  <ol
                    className="mb-6 ml-6 list-decimal space-y-2 text-slate-700"
                    {...props}
                  />
                ),

                li: ({ ...props }) => <li className="leading-7" {...props} />,

                blockquote: ({ ...props }) => (
                  <blockquote
                    className="my-8 border-l-4 border-indigo-600 bg-indigo-50 px-5 py-4 italic leading-8 text-slate-700 rounded-r-xl"
                    {...props}
                  />
                ),

                a: ({ ...props }) => (
                  <a
                    className="font-medium text-indigo-600 underline underline-offset-2 transition hover:text-indigo-800"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),

                hr: ({ ...props }) => (
                  <hr className="my-10 border-slate-200" {...props} />
                ),

                img: ({ ...props }) => (
                  <img
                    className="my-8 w-full rounded-2xl shadow-md"
                    {...props}
                  />
                ),

                code({ inline, children, ...props }) {
                  if (inline) {
                    return (
                      <code
                        className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-pink-600"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <pre className="my-6 overflow-x-auto rounded-xl bg-slate-900 p-5">
                      <code
                        className="font-mono text-sm text-slate-100"
                        {...props}
                      >
                        {children}
                      </code>
                    </pre>
                  );
                },
              }}
            >
              {content ||
                "*No article content written yet. Use the editor to start writing your article.*"}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Background Dim Backdrop Layer overlaying viewport container when preview context opens */}
      {isPreviewOpen && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* --- MARKDOWN GUIDE MODAL DIALOG COMPONENT --- */}
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
            <div className="p-5 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-base font-semibold text-slate-800">
                  Markdown Quick Guide
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Use these formatting shortcuts to create clean and
                  professional news articles.
                </p>
              </div>

              <div className="space-y-6">
                {/* Structure */}
                <section>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Article Structure
                  </h4>

                  <div className="rounded-xl border border-slate-200 divide-y">
                    <GuideItem
                      syntax="# Main Heading"
                      preview={
                        <h1 className="text-lg font-bold">Main Heading</h1>
                      }
                    />

                    <GuideItem
                      syntax="## Section Heading"
                      preview={
                        <h2 className="text-base font-bold">Section Heading</h2>
                      }
                    />

                    <GuideItem
                      syntax="### Subheading"
                      preview={<h3 className="font-semibold">Subheading</h3>}
                    />
                  </div>
                </section>

                {/* Text Formatting */}
                <section>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Text Formatting
                  </h4>

                  <div className="rounded-xl border border-slate-200 divide-y">
                    <GuideItem
                      syntax="**Breaking News**"
                      preview={<strong>Breaking News</strong>}
                    />

                    <GuideItem
                      syntax="*Emphasized text*"
                      preview={<em>Emphasized text</em>}
                    />

                    <GuideItem
                      syntax="`2026 Budget`"
                      preview={
                        <code className="bg-slate-100 px-2 py-1 rounded">
                          2026 Budget
                        </code>
                      }
                    />
                  </div>
                </section>

                {/* Content */}
                <section>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Quotes & Lists
                  </h4>

                  <div className="rounded-xl border border-slate-200 divide-y">
                    <GuideItem
                      syntax="> 'He died peacefully,' the witness said."
                      preview={
                        <blockquote className="border-l-4 border-indigo-500 pl-3 italic text-slate-600">
                          "He died peacefully," the witness said.
                        </blockquote>
                      }
                    />

                    <GuideItem
                      syntax="- First point"
                      preview={
                        <ul className="list-disc pl-5">
                          <li>First point</li>
                        </ul>
                      }
                    />

                    <GuideItem
                      syntax="1. First item"
                      preview={
                        <ol className="list-decimal pl-5">
                          <li>First item</li>
                        </ol>
                      }
                    />

                    <GuideItem
                      syntax="[Visit Website](https://example.com)"
                      preview={
                        <a className="text-indigo-600 underline">
                          Visit Website
                        </a>
                      }
                    />

                    <GuideItem
                      syntax="---"
                      preview={<hr className="border-slate-300" />}
                    />
                  </div>
                </section>
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

export default EditArticle;
