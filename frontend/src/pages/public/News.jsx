import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Newspaper,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchArticles } from "../../services/authService";
import ReactMarkdown from "react-markdown";

const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";

const NewsLibrary = () => {
  const searchText = useSearchParams();
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
      slug: ""
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const limit = 9;

  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const response = await fetchArticles(page, category);
        const filteredResponse = response.articles.filter((articles) => {
          if (category === "All Categories") return true;
          return articles.category === category;
        });
        setArticles(response.articles);
        setTotalPages(response.totalPages);
        setTotalArticles(response.totalArticles);
      } catch (error) {
        toast.error("Failed to load news. Check internet connection.");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category, page]);

  // Filter articles for public consumption
  const filteredArticles = articles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800">
      {/* Decorative Brand Header Hub */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white pt-14 pb-10 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_55%)] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm mb-5">
              <Newspaper size={30} />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Stay Informed.
              <span className="block text-indigo-600">
                Read Today's Headlines.
              </span>
            </h1>

            <p className="mt-5 text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Discover breaking news, politics, technology, business, sports,
              entertainment, and stories that matter all in one place.
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm shadow-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Filters */}
            <div className="mt-5 flex flex-wrap gap-3">
              {/* Category */}
              <select
                className="flex-1 min-w-[160px] h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500"
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
                <option value="Education">Education</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Workspace */}
      <section className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {loading ? (
          /* Premium Skinned Component Skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-slate-100 h-[400px] p-4 space-y-4 shadow-sm"
              >
                <div className="w-full h-48 bg-slate-100 rounded-xl" />
                <div className="h-6 bg-slate-100 rounded-lg w-5/6" />
                <div className="space-y-2 pt-1">
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          /* Empty Search Fallback Template */
          <div className="max-w-lg mx-auto rounded-3xl border border-slate-200 bg-white px-8 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Newspaper size={30} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              No news articles found
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 max-w-sm mx-auto">
              We couldn't find any articles matching your search or selected
              filters. Try using different keywords or browse another category.
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setCategory("All Categories");
                window.location.reload();
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Browse All News
            </button>
          </div>
        ) : (
          /* Clean Dynamic Content Grid */
          <div className="grid justify-center gap-8 [grid-template-columns:repeat(auto-fit,minmax(340px,380px))]">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => navigate(`/articles/${article.slug}`)}
                className="w-full max-w-[380px] rounded-2xl overflow-hidden bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden">
                  {article.thumbnail ? (
                    <img
                      src={`${uploadPath}${article.thumbnail}`}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <Newspaper size={34} className="text-slate-400" />
                    </div>
                  )}

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Category */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-800 shadow">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-xl font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h2>

                  <div className="text-slate-500 text-xs sm:text-sm line-clamp-4 leading-relaxed overflow-hidden prose prose-sm max-w-none mb-4">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {article.createdAt
                            ? new Date(article.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "Today"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readingTime + " min read"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      Read
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="mt-12 flex flex-col items-center gap-6">
        <p className="text-sm text-slate-500">
          Showing
          <span className="font-semibold text-slate-900">
            {(page - 1) * 9 + 1} –{" "}
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
    </main>
  );
};

export default NewsLibrary;
