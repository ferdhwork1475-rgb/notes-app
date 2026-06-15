import { useState, useEffect } from "react";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchNotes } from "../../services/authService";

const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";

const NewsLibrary = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const newsData = await fetchNotes();
        // Check for safe mapping arrays
        setNews(Array.isArray(newsData) ? newsData : []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Filter articles for public consumption
  const filteredNews = news.filter((article) =>
    article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800">
      
      {/* Decorative Brand Header Hub */}
      <section className="bg-white border-b border-slate-200/80 pt-14 pb-12 px-4 text-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/20 to-transparent pointer-events-none" />
        
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-1 shadow-sm">
            <Newspaper size={24} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Public Knowledge Library
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            Explore shared insights, curated release details, and deep architectural notes updated by our team.
          </p>
        </div>

        {/* Dynamic Inner Search Controls */}
        <div className="max-w-md mx-auto mt-8 px-2">
          <div className="relative shadow-sm rounded-xl">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search published articles..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder-slate-400 text-slate-700"
            />
          </div>
        </div>
      </section>

      {/* Main Grid Workspace */}
      <section className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {loading ? (
          /* Premium Skinned Component Skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-slate-100 h-[400px] p-4 space-y-4 shadow-sm">
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
          <div className="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl max-w-md mx-auto px-6 text-center shadow-sm">
            <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl mb-4">
              <BookOpen size={28} />
            </div>
            <h3 className="font-bold text-slate-800 text-base">No entries available</h3>
            <p className="text-slate-400 text-sm mt-1">
              We couldn't find matching library elements. Try resetting your custom lookup filters.
            </p>
          </div>
        ) : (
          /* Clean Dynamic Content Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNews.map((article) => (
              <article
                key={article._id || article.id}
                onClick={() => navigate(`/notes/${article._id || article.id}`)}
                className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300/80 p-4 flex flex-col h-[430px] transition-all duration-300 cursor-pointer relative"
              >
                {/* Image Aspect Core Header Block */}
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-50 relative shrink-0">
                  {article.thumbnail ? (
                    <img
                      src={`${uploadPath}${article.thumbnail}`}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentNode.classList.add("bg-gradient-to-br", "from-indigo-50/50", "to-slate-100");
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-50/40 to-slate-100 flex items-center justify-center text-indigo-400/70">
                      <BookOpen size={26} />
                    </div>
                  )}
                </div>

                {/* Article Text Details Frame */}
                <div className="flex-1 flex flex-col min-h-0 px-1">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors tracking-tight leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm line-clamp-4 leading-relaxed overflow-hidden mb-4">
                    {article.content || "Click details below to read the comprehensive text documentation..."}
                  </p>
                </div>

                {/* Bottom Metadata Border Element Row */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-auto shrink-0 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                  <div className="flex items-center gap-3.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-300" />
                      {article.createdAt ? new Date(article.createdAt).toLocaleDateString(undefined, {month: "short", day: "numeric"}) : "Published"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-slate-300" />
                      {article.readingTime || "3 min"}
                    </span>
                  </div>

                  {/* Clean Non-Admin Call To Action Links */}
                  <span className="flex items-center gap-1 text-indigo-600 group-hover:translate-x-0.5 transition-transform duration-300 text-xs normal-case font-bold">
                    <span>Read</span>
                    <ArrowRight size={13} />
                  </span>
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