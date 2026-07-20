import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { fetchArticles } from "../../services/authService";

const Hero = () => {
  const navigate = useNavigate();
  const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";

  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState({
    title: "",
    content: "",
    thumbnail: "",
    category: "",
    thumbnail: "",
    createdAt: "",
    readingTime: "",
    slug: "",
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const page = 1;
        const category = "";
        const response = await fetchArticles(page, category);
        setArticle(response.articles[0]);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Accent */}
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid gap-20 lg:grid-cols-12 lg:items-center">
          {/* ================= LEFT ================= */}

          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-400">
              {" "}
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />{" "}
              Breaking News{" "}
            </span>

            <div className="mb-4">
              <span className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
                {" "}
                Independent Journalism{" "}
              </span>
            </div>
            <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl">
              {" "}
              The Stories That,{" "}
              <span className="block text-indigo-400">
                {" "}
                Shape Our World.{" "}
              </span>{" "}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              {" "}
              Stay ahead with verified reporting on politics, business,
              technology, sports, entertainment, and the stories shaping Nigeria
              and the world.{" "}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/news"
                className="rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white transition hover:bg-indigo-700"
              >
                Explore Today's News
              </Link>

              <Link
                to="/about"
                className="rounded-xl border border-slate-700 px-7 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                About Our Newsroom
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
              <div>
                <h3 className="text-3xl font-black">500+</h3>

                <p className="mt-2 text-sm text-slate-400">Published Stories</p>
              </div>

              <div>
                <h3 className="text-3xl font-black">12</h3>

                <p className="mt-2 text-sm text-slate-400">News Categories</p>
              </div>

              <div>
                <h3 className="text-3xl font-black">24/7</h3>

                <p className="mt-2 text-sm text-slate-400">Breaking Coverage</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="lg:col-span-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                <div className="bg-white rounded-2xl border border-slate-100 h-96 p-4 space-y-4">
                  <div className="w-full h-44 bg-slate-100 rounded-xl" />
                  <div className="h-6 bg-slate-100 rounded-lg w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              </div>
            ) : (
              <article
                className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl"
                onClick={() => navigate(`articles/${article.slug}`)}
              >
                <div className="relative h-[280px] sm:h-[380px] overflow-hidden">
                  <img
                    src={`${uploadPath}${article.thumbnail}`}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <span className="absolute right-6 top-6 rounded-full bg-white px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-900">
                    Editor's Pick
                  </span>
                  <span className="absolute left-6 top-6 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>

                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
                    <span className="flex items-center gap-2">
                      <Calendar size={15} />
                      {new Date(article.createdAt).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                        },
                      )}{" "}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock size={15} />
                      {article.readingTime} min read
                    </span>
                  </div>

                  <h2 className="mt-5 text-3xl font-black leading-tight text-white transition group-hover:text-indigo-400">
                    {article.title}
                  </h2>

                  <div className="text-slate-500 mt-4 sm:text-sm line-clamp-4 leading-relaxed overflow-hidden prose prose-sm max-w-none">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                  </div>

                  <Link
                    to={`articles/${article.slug}`}
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-indigo-400 transition hover:gap-3"
                  >
                    Read Full Story
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <div className="flex flex-col items-center text-slate-500">
          <span className="text-xs uppercase tracking-[0.3em]">
            Latest Stories
          </span>

          <div className="mt-3 h-10 w-px bg-slate-700" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
