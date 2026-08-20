import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Newspaper,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { fetchArticles } from "../../services/authService";
import { toast } from "react-toastify"
import ReactMarkdown from "react-markdown";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([
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
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const limit = 9;
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetchArticles(page, category);
        setArticles(response.articles);
        setTotalPages(response.totalPages);
        setTotalArticles(response.totalArticles);
      } catch (error) {
        toast.error("Failed to laod articles");
      } finally {
        setLoading(false);
      }
    })();
  }, [page, category]);

  // Filter content reactively based on user input
  const filteredArticles = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50">
      {/* Search & Navigation Bar Header */}
      <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 shrink-0 gap-4 sticky top-0 z-10">
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your knowledge base..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 text-slate-700"
          />
        </div>
        <Link
          to="/admin/articles/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm shadow-indigo-100 shrink-0 active:scale-95"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Article</span>
        </Link>
      </header>

      {/* Main Content Area Canvas scroll block */}
      <section className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
              Recent Articles
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Pick up right where you left off.
            </p>
          </div>
          <select
            className="w-full sm:w-auto bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-600 shadow-sm outline-none cursor-pointer hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-indigo-500/10"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Politics">Politics</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>{" "}
          </select>
        </div>

        {/* Note Cards Presentation Layout Grid */}
        <div className="w-full">
          {loading ? (
            /* Premium Content Skeleton Loader States */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl border border-slate-100 h-96 p-4 space-y-4"
                >
                  <div className="w-full h-44 bg-slate-100 rounded-xl" />
                  <div className="h-6 bg-slate-100 rounded-lg w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            /* Empty State State Fallback Display */
            <div className="max-w-2xl mx-auto rounded-3xl border border-dashed border-slate-300 bg-gradient-to-b from-white to-slate-50 px-8 py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm">
                <Newspaper size={36} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                {searchQuery
                  ? "No matching articles"
                  : "No articles published yet"}
              </h2>

              <p className="mt-3 max-w-md mx-auto text-sm leading-6 text-slate-500">
                {searchQuery
                  ? "No articles match your current search or filters. Try different keywords or clear the filters."
                  : "Your newsroom is empty. Start publishing articles to build your news feed and keep readers informed."}
              </p>

              {!searchQuery && (
                <button
                  onClick={() => navigate("/admin/articles/create")}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Plus size={18} />
                  Create First Article
                </button>
              )}

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            /* Active Dynamic Grid Stream */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`/articles/${article.slug}`)}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 p-4 flex flex-col h-[420px] transition-all duration-300 cursor-pointer relative"
                >
                  {/* Card Banner Image Frame Block */}
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-50 relative shrink-0">
                    {article.thumbnail?.url ? (
                      <img
                        src={article.thumbnail?.url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          e.target.parentNode.classList.add(
                            "bg-gradient-to-br",
                            "from-indigo-50",
                            "to-slate-100",
                          );
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-50/60 to-slate-100/80 flex items-center justify-center text-indigo-400">
                        <Newspaper size={24} className="opacity-60" />
                      </div>
                    )}
                  </div>

                  {/* Title Header and Text Content Controls */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <h3 className="text-base font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors tracking-tight leading-snug">
                      {article.title}
                    </h3>
                  </div>
                  <div className="text-slate-500 text-xs sm:text-sm line-clamp-4 leading-relaxed overflow-hidden prose prose-sm max-w-none mb-4">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                  </div>

                  {/* Dynamic Card Meta Footer Block Bar */}
                  <div className="pt-3 border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 text-xs sm:text-sm line-clamp-4 leading-relaxed overflow-hidden prose prose-sm max-w-none mb-4">
                      {article.category}
                    </span>

                    <div className="flex items-center gap-3 text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(article.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.readingTime + " min read"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <p className="text-sm text-slate-500">
            Showing
            <span className="font-semibold text-slate-900">
              {" "}
              {(page - 1) * limit + 1} –{" "}
              {totalArticles < (page - 1) * limit + limit
                ? totalArticles
                : (page - 1) * limit + limit}{" "}
            </span>
            of
            <span className="font-semibold text-slate-900">
              {" "}
              {totalArticles}{" "}
            </span>
            articles
          </p>

          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 ..."
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            <div className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
              Page {page} of {totalPages}
            </div>
            <button
              className="flex items-center gap-2 ..."
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
