import { useState, useEffect } from "react";
import { fetchNotes } from "../../services/authService";

const NewsLibrary = () => {
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
    <main>
      <h1 className="text-4xl font-bold mb-8 mt-12 text-center">
        News Library
      </h1>

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
                key={article.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.summary}</p>
                <a href={article.url} className="text-blue-500 hover:underline">
                  Read more
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default NewsLibrary;
