import { useState, useEffect } from "react";
import { Plus, Search, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { fetchNotes } from "../../services/authService";
import ReactMarkdown from "react-markdown";

const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const newsData = await fetchNotes();
        setNews(Array.isArray(newsData) ? newsData : []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Filter content reactively based on user input
  const filteredNews = news.filter((article) =>
    article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary?.toLowerCase().includes(searchQuery.toLowerCase())
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
          to="/dashboard/create-note"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm shadow-indigo-100 shrink-0 active:scale-95"
        >
          <Plus size={18} /> 
          <span className="hidden sm:inline">New Note</span>
        </Link>
      </header>

      {/* Main Content Area Canvas scroll block */}
      <section className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
              Recent Notes
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Pick up right where you left off.
            </p>
          </div>
          <select className="w-full sm:w-auto bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-600 shadow-sm outline-none cursor-pointer hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-indigo-500/10">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        {/* Note Cards Presentation Layout Grid */}
        <div className="w-full">
          {loading ? (
            /* Premium Content Skeleton Loader States */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl border border-slate-100 h-96 p-4 space-y-4">
                  <div className="w-full h-44 bg-slate-100 rounded-xl" />
                  <div className="h-6 bg-slate-100 rounded-lg w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            /* Empty State State Fallback Display */
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl max-w-xl mx-auto px-4 text-center">
              <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="font-bold text-slate-700 text-base">No news article found</h3>
              <p className="text-slate-400 text-sm mt-1 max-w-xs">
                {searchQuery ? "Try clarifying your search terms or filter keywords." : "Create your very first news article card item to begin tracking records."}
              </p>
            </div>
          ) : (
            /* Active Dynamic Grid Stream */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article) => (
                <div
                  key={article._id}
                  onClick={() => navigate(`/notes/${article._id}`)}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 p-4 flex flex-col h-[420px] transition-all duration-300 cursor-pointer relative"
                >
                  {/* Card Banner Image Frame Block */}
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-50 relative shrink-0">
                    {article.thumbnail ? (
                      <img
                        src={`${uploadPath}${article.thumbnail}`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.parentNode.classList.add("bg-gradient-to-br", "from-indigo-50", "to-slate-100");
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-50/60 to-slate-100/80 flex items-center justify-center text-indigo-400">
                        <BookOpen size={24} className="opacity-60" />
                      </div>
                    )}
                  </div>

                  {/* Title Header and Text Content Controls */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <h3 className="text-base font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors tracking-tight leading-snug">
                      {article.title}
                    </h3>
                    
                    {/* Rendered Markdown Snippet Section Context */}
                    <div className="text-slate-500 text-xs sm:text-sm line-clamp-4 leading-relaxed overflow-hidden prose prose-sm max-w-none mb-4">
                      <ReactMarkdown>
                        {article.summary || article.content || "No summary notes provided..."}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Dynamic Card Meta Footer Block Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto shrink-0 text-[11px] font-semibold text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-slate-300" />
                        {article.createdAt ? new Date(article.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) : "Recent"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-slate-300" />
                        {article.readingTime || "2 min"}
                      </span>
                    </div>
                    
                    {/* Action link transition pointer indicator */}
                    <span className="flex items-center gap-1 text-indigo-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 font-bold text-xs">
                      <span>Read</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default Dashboard;