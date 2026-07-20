import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Landmark,
  BriefcaseBusiness,
  Cpu,
  Trophy,
  Clapperboard,
  HeartPulse,
  Globe2,
  ChevronRight,
} from "lucide-react";
import Hero from "../../components/common/Hero";
import { fetchArticles } from "../../services/authService";

const IndexPage = () => {
  const navigate = useNavigate();
  const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";

  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([
    {
      title: "",
      content: "",
      thumbnail: "",
      category: "",
      thumbnail: "",
      createdAt: "",
      readingTime: "",
      slug: "",
    },
  ]);

  useEffect(() => {
    const loadNews = async () => {
      const page = 1;
      const category = "";
      try {
        setLoading(true);
        const response = await fetchArticles(page, category);
        setArticles(response.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);


  return (
    <div className="bg-[#00020f] min-h-screen text-white font-sans selection:bg-red-500 selection:text-white">
      {/* Immersive Hero Component Layer */}
      <Hero />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Explore
              </span>

              <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                Browse News Categories
              </h2>

              <p className="mt-3 max-w-2xl text-slate-500 leading-7">
                Discover breaking stories and in-depth reporting across every
                major topic.
              </p>
            </div>

            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
            >
              View All Categories
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Bottom Banner */}

          <div className="mt-14 rounded-3xl bg-slate-900 px-8 py-8 text-white">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-indigo-300">
                  <Globe2 size={18} />
                  Live Coverage
                </span>

                <h3 className="mt-3 text-2xl font-black">
                  Stay updated with breaking news as it happens.
                </h3>

                <p className="mt-2 max-w-2xl text-slate-300">
                  Follow live updates from politics, business, technology,
                  sports, and more all in one place.
                </p>
              </div>

              <Link
                to="/news"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700"
              >
                Explore Latest News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
