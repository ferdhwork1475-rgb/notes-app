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
  ArrowRight,
  Newspaper,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import {
  fetchArticle,
  deleteArticle,
  verifyUser,
} from "../../services/authService";

const ViewArticle = () => {
  const backendAPI = import.meta.env.VITE_BACKEND_API;
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    id: "",
    title: "",
    content: "",
    tags: [],
    category: "",
    thumbnail: "",
    createdAt: "",
    readingTime: "",
    slug: "",
  });
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([
    {
      id: "",
      title: "",
      content: "",
      tags: [],
      category: "",
      thumbnail: "",
      createdAt: "",
      readingTime: "",
      slug: "",
    },
  ]);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        await verifyUser();
        setAuthChecked(true);
      } catch (error) {
        setAuthChecked(false);
      }
    })();
  });

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        const response = await fetchArticle(slug);
        setArticle(response.articleData);
        setRelatedArticles(response.relatedArticlesData);
      } catch (error) {
        toast.error("Failed to load article content");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [slug]);

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
    navigator.clipboard.writeText(`${backendAPI}articles/${article.slug}`);
    toast.success("Article link copied to clipboard!");
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this news article?",
      )
    ) {
      try {
        await deleteArticle(article.slug);
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
          <div className="flex items-center gap-2">
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

            {authChecked && (
              <>
                <button
                  onClick={() => navigate(`/admin/articles/edit/${slug}`)}
                  className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="rounded-xl p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Reading Container Canvas Layout */}
      <main className="w-full px-4 sm:px-6 md:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* ================= Hero Image ================= */}
        {article.thumbnail && (
          <div className="relative overflow-hidden rounded-[28px] shadow-2xl">
            <img
              src={article.thumbnail || ""}
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

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <Calendar size={16} />

              {new Date(article.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <Clock size={16} />
              {article.readingTime} min read
            </div>
          </div>

          {article.tags?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-500 hover:text-indigo-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="max-w-3xl mx-auto mt-14">
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="mt-16 mb-8 text-4xl font-black leading-tight tracking-tight text-slate-900"
                  {...props}
                />
              ),

              h2: ({ ...props }) => (
                <h2
                  className="mt-14 mb-6 text-3xl font-bold leading-tight text-slate-900"
                  {...props}
                />
              ),

              h3: ({ ...props }) => (
                <h3
                  className="mt-12 mb-5 text-2xl font-bold leading-tight text-slate-800"
                  {...props}
                />
              ),

              p: ({ ...props }) => (
                <p
                  className="mb-8 text-lg leading-9 text-slate-700"
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
                  className="my-8 ml-8 space-y-3 list-disc text-lg text-slate-700"
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
                  className="my-12 rounded-2x border-l-4 border-indigo-600 bg-slate-50 px-8 py-7 text-xl italic leading-9 shadow-sm px-5 py-4 italic leading-8 text-slate-700 rounded-r-xl"
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
                  <pre className="my-10 overflow-x-auto rounded-3xl bg-slate-900 p-8 shadow-xl">
                    <code
                      className="rounded-md bg-slate-100 px-2 py-1 font-mono text-sm text-indigo-600"
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
                Related Articles
              </h2>

              <p className="mt-3 max-w-xl text-slate-500 leading-7">
                Continue exploring more stories in
                <span className="font-semibold text-slate-700">
                  {" "}
                  {article.category}
                </span>
                .
              </p>
            </div>

            <button
              onClick={() => navigate("/news")}
              className="self-start rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              Browse All News
            </button>
          </div>

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-8">
            {relatedArticles.map((related) => (
              <article
                key={related.id}
                onClick={() => navigate(`/articles/${related.slug}`)}
                className="group flex w-full max-w-[360px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={related.thumbnail?.url || ""}
                    alt={related.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
                    {related.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition">
                    {related.title}
                  </h3>

                  <div className="mt-3 text-sm leading-6 text-slate-500 line-clamp-3 flex-1">
                    <ReactMarkdown>{related.content}</ReactMarkdown>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={13} />

                          {new Date(related.createdAt).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock size={13} />
                          {related.readingTime} min read
                        </div>
                      </div>

                      <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                        Read Story
                        <ArrowRight
                          size={16}
                          className="transition group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ViewArticle;
