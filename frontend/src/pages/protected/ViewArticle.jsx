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
import {
  fetchArticle,
  deleteArticle,
  verifyUser,
} from "../../services/authService";

const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";

const ViewArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    id: "",
    title: "",
    content: "",
    tags: [],
    thumbnail: "",
    category: "",
    thumbnail: "",
    createdAt: "",
    readingTime: "",
  });
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await verifyUser();
        setAuthChecked(true);
      } catch (error) {
        setAuthChecked(false);
      }
    };

    checkAuth();
  });

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        const response = await fetchArticle(id);
        setArticle(response);
      } catch (error) {
        console.error("Error fetching article:", error);
        toast.error("Failed to load article content");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
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
        await deleteArticle(id);
        toast.success("Article deleted successfully");
        navigate("/admin");
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

  if (!article) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 min-h-screen p-4">
        <p className="text-sm font-semibold text-slate-700">
          Article could not be found
        </p>
        <button
          onClick={() => navigate("/admin")}
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
          {authChecked && (
            <>
              {" "}
              <button
                onClick={() => navigate(`/admin/articles/edit/${id}`)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold text-xs rounded-xl transition-all shadow-sm shadow-indigo-100"
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                title="Delete Article"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Reading Container Canvas Layout */}
      <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Cover Image */}
        {article.thumbnail && (
          <div className="relative w-full h-64 sm:h-80 lg:h-[28rem] rounded-3xl overflow-hidden shadow-lg">
            <img
              src={`${uploadPath}${article.thumbnail}`}
              alt={article.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>
        )}

        <header className="space-y-6 border-b border-slate-200 pb-8">
          {/* Category */}
          <div>
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-700">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-slate-900">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(article.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              {article.readingTime + " min read"}
            </div>
          </div>

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg lg:prose-xl prose-slate max-w-none mt-10">
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
                <img className="my-8 w-full rounded-2xl shadow-md" {...props} />
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
            {article.content ||
              "*No article content written yet. Use the editor to start writing your article.*"}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default ViewArticle;
