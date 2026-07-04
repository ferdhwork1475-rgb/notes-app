import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Newspaper,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../../services/authService";

const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";

const NewsLibrary = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const response = await fetchNotes();
        const filteredResponse = response.filter((articles) => {
          if (category === "All Categories") return true;
          return articles.category === category;
        });
        setNews(Array.isArray(filteredResponse) ? filteredResponse : []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category]);

  // Filter articles for public consumption
  const filteredNews = news.filter(
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
                <option>All Categories</option>
                <option>Politics</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Sports</option>
                <option>Entertainment</option>
                <option>Health</option>
                <option>Education</option>
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
        ) : filteredNews.length === 0 ? (
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
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Browse All News
            </button>
          </div>
        ) : (
          /* Clean Dynamic Content Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                onClick={() => navigate(`/notes/${article.id}`)}
                className="group overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
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
                      <BookOpen size={34} className="text-slate-400" />
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

                  <p className="mt-3 text-sm text-slate-600 leading-6 line-clamp-3 flex-1">
                    {article.content}
                  </p>

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
    </main>
  );
};

export default NewsLibrary;
