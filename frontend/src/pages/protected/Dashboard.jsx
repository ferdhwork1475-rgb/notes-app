import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchNotes } from "../../services/authService";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNotes();
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <section className="flex-1 flex flex-col h-full overflow-hidden">
      <header className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <div className="relative w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search your knowledge base..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <Link
          to="/dashboard/create-note"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-sm shadow-indigo-200 active:scale-95"
        >
          <Plus size={18} /> New Note
        </Link>
      </header>

      <section className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Recent Notes
            </h2>
            <p className="text-slate-500 text-sm">
              Pick up right where you left off.
            </p>
          </div>
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 shadow-sm outline-none cursor-pointer hover:bg-slate-50 transition-colors">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading news...</p>
          ) : news.length === 0 ? (
            <p className="text-center text-gray-500">
              No news articles available.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <div
                  key={article._id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{article.summary}</p>
                  <a
                    href={article.url}
                    className="text-blue-500 hover:underline"
                  >
                    Read more
                  </a>
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
