import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit3,
  Calendar,
  Tag,
  Clock,
  Share2,
  Trash2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { getNoteById } from "../../services/authService";

const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
        setLoading(true);
        const response = await getNoteById(id);
        setNote(response);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load article content");
      } finally {
        setLoading(false);
      }
    };

    fetchNoteData();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Article link copied to clipboard!");
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this news article?",
      )
    ) {
      try {
        // await deleteNote(id);
        toast.success("Article deleted successfully");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Could not complete delete action");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 min-h-screen">
        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-xs font-medium text-slate-400 mt-3 animate-pulse">
          Loading article content...
        </p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 min-h-screen p-4">
        <p className="text-sm font-semibold text-slate-700">
          Article could not be found
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 text-xs font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      {/* Sticky Top Interactive Action Navigation Bar */}
      <header className="sticky top-0 z-10 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 flex items-center justify-between shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 p-2 -ml-2 text-slate-500 hover:text-slate-800 font-medium text-sm rounded-xl hover:bg-slate-50 transition-all group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Back</span>
        </button>

        {/* Article Toolbar Management Options */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
            title="Share Link"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={() => navigate(`/dashboard/notes/edit-note/${id}`)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold text-xs rounded-xl transition-all shadow-sm shadow-indigo-100"
          >
            <Edit3 size={14} />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
            title="Delete Note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      {/* Main Reading Container Canvas Layout */}
      <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Cover Image Header Panel Frame */}
        {note.thumbnail && (
          <div className="w-full h-48 sm:h-64 md:h-96 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
            <img
              src={`${uploadPath}${note.thumbnail}`}
              alt={note.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Metadata Banner Stream Block */}
        <div className="space-y-4 border-b border-slate-100 pb-6 sm:pb-8">
          {/* Active Tag Line Arrays */}
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {note.tags.map((tag, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50/70 border border-indigo-100/50 px-2.5 py-0.5 rounded-md"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Primary News Document Title Header */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {note.title}
          </h1>

          {/* Timestamp Indicators */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-300" />
              {new Date(note.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200 hidden sm:inline-block" />
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-slate-300" />
              {note.readingTime || "2 min read"}
            </span>
          </div>
        </div>

        {/* Beautiful Customized Markdown Article Body Wrapper */}
        <div className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed tracking-normal space-y-4 pb-16">
          {/* Custom fallback layout wrapper if using markdown parser directly */}
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-2xl font-bold text-slate-900 mt-6 mb-3 tracking-tight"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl font-bold text-slate-800 mt-5 mb-2 tracking-tight"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="mb-4 whitespace-pre-line text-slate-600 leading-relaxed"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc pl-5 mb-4 space-y-1.5 text-slate-600"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal pl-5 mb-4 space-y-1.5 text-slate-600"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="text-slate-600" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-indigo-500 pl-4 italic text-slate-500 bg-slate-50/50 py-2 my-4 rounded-r-xl"
                  {...props}
                />
              ),
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    className="text-xs bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono"
                    {...props}
                  />
                ) : (
                  <code
                    className="block text-xs bg-slate-900 text-slate-100 p-4 rounded-xl font-mono overflow-x-auto border border-slate-800 my-4 shadow-inner"
                    {...props}
                  />
                ),
            }}
          >
            {note.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default ViewNote;
