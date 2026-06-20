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
import { getNoteById, updateNote } from "../../services/authService";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const titleRef = useRef(null);

  // Form Field States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");

  // History Tracking States for Reversion / Dirty Checking
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [initialTags, setInitialTags] = useState("");
  const [initialPreview, setInitialPreview] = useState("");

  // System Lifecycle States
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);

  // New UI Interaction States
  const [isHelpOpen, setIsHelpOpen] = useState(false); // Markdown Guide Modal toggle
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Sliding Drawer Preview toggle

  // 1. Initial Fetch Data Hook
  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        setFetching(true);
        setErrorState(false);
        const response = await getNoteById(id);
        const note = response;

        setTitle(note.title || "");
        setInitialTitle(note.title || "");

        setContent(note.content || "");
        setInitialContent(note.content || "");

        setTags(note.tags || "");
        setInitialTags(note.tags || "");

        if (note.thumbnail) {
          setPreview(`${uploadPath}${note.thumbnail}`);
          setInitialPreview(`${uploadPath}${note.thumbnail}`);
        }
      } catch (error) {
        console.error("Error retrieving article records:", error);
        setErrorState(true);
        toast.error("Failed to load article records");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchNoteData();
  }, [id]);

  // 2. Focus Management with Smart Cursor Placement
  useEffect(() => {
    if (!fetching && !errorState && titleRef.current) {
      titleRef.current.focus();
      const currentText = titleRef.current.value;
      titleRef.current.value = "";
      titleRef.current.value = currentText;
    }
  }, [fetching, errorState]);

  // 3. Navigation Guard & Window Dismissal Blockers (Form Is Dirty Check)
  const isDirty =
    title !== initialTitle ||
    content !== initialContent ||
    tags !== initialTags ||
    thumbnail !== null;

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

  // Handle local file validations
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

  // Revert localized image state back to initial database state
  const handleResetImage = () => {
    setThumbnail(null);
    setPreview(initialPreview);
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

  // Form Submit Payload Builder
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true);

    try {
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags);
      if (thumbnail !== null) {
        formData.append("thumbnail", thumbnail);
      }
      await updateNote(id, formData);
      toast.success("News article updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error putting note update:", error.response);
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
          onClick={() => navigate("/dashboard")}
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

                {thumbnail && initialPreview && (
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
            maxLength={120}
            required
            className="w-full bg-transparent border-none text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 placeholder-slate-200 focus:outline-none focus:ring-0 tracking-tight p-0 pr-16"
          />
          <span className="absolute right-0 bottom-2 text-[10px] font-bold text-slate-300 group-focus-within:text-indigo-400 tracking-wider transition-colors">
            {title.length}/120
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
            <ReactMarkdown>
              {content ||
                "*No article content written yet. Use the main field input window to get started...*"}
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

export default EditNote;
