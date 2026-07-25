import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Edit3,
  Calendar,
  Tag,
  Clock,
  Share2,
  Trash2,
  ArrowRight,
  Newspaper,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

const ViewLatestNews = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [article, setArticle] = useState({
    id: "",
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        const response = location?.state.articleData;
        setArticle(response);
      } catch (error) {
        toast.error("Failed to load article content. Check internet connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, []);

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", updateReadingProgress);
    updateReadingProgress();
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Article link copied to clipboard!");
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
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-slate-200/40">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 shadow-[0_0_12px_rgba(99,102,241,0.45)] transition-[width] duration-150"
          style={{
            width: `${readingProgress}%`,
          }}
        />
      </div>
      <header className="sticky top-0 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <ArrowLeft
                size={18}
                className="transition group-hover:-translate-x-1"
              />
              <span className="hidden sm:block">Back</span>
            </button>

            <div className="hidden h-6 w-px bg-slate-200 md:block" />

            <button
              onClick={() => navigate("/")}
              className="hidden items-center gap-2 md:flex"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Newspaper size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">DailyPress</p>

                <p className="text-xs text-slate-400">Latest Headlines</p>
              </div>
            </button>
          </div>

          {/* Right */}
          {/* <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/news")}
              className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600 md:block"
            >
              Latest News
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Share2 size={16} />
              <span className="hidden sm:block">Share</span>
            </button>
          </div> */}
        </div>
      </header>

      {/* Main Reading Container Canvas Layout */}
      <main className="w-full px-4 sm:px-6 md:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* ================= Hero Image ================= */}
        {article.image && (
          <div className="relative overflow-hidden rounded-[28px] shadow-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="h-72 md:h-[32rem] xl:h-[40rem] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute left-6 top-6">
              <span className="rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-sm font-semibold text-slate-900 shadow">
                {article.category}
              </span>
            </div>
          </div>
        )}

        <header className="max-w-3xl mx-auto mt-12 border-b border-slate-200 pb-10">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-tight text-slate-900">
            {article.title}
          </h1>
        </header>

        <div className="max-w-3xl mx-auto mt-14">
          {article.content ||
            "*No article content written yet. Use the editor to start writing your article.*"}
          <div className="mt-16 border-t border-slate-200 pt-10">
            <p className="text-center text-slate-500">Thanks for reading.</p>
          </div>
        </div>

        <section className="mt-24 bg-slate-50 rounded-[32px] py-14 px-6 sm:px-8 lg:px-10 w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div>
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-700">
                Continue Reading
              </span>

              <h2 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
                News Articles
              </h2>

              <p className="mt-3 max-w-xl text-slate-500 leading-7">
                Continue exploring more stories.
              </p>
            </div>

            <button
              onClick={() => navigate("/news")}
              className="self-start rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              Browse All News
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ViewLatestNews;
