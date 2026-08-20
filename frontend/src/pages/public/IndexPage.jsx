import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import {
  fetchArticle,
  fetchArticles,
} from "../../services/authService";
import axios from "axios";

const IndexPage = () => {
  const navigate = useNavigate();
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

  // const l[latestNews, setLastestNews] = useState([
  //   {
  //     id: "",
  //     title: "",
  //     content: "",
  //     description: "",
  //     image: "",
  //   },
  // ]);

  const categories = [
    {
      title: "Politics",
      description: "Government, elections and public affairs.",
      icon: Landmark,
      color: "bg-red-100 text-red-600",
      slug: "Politics",
    },
    {
      title: "Business",
      description: "Markets, startups and the economy.",
      icon: BriefcaseBusiness,
      color: "bg-blue-100 text-blue-600",
      slug: "Business",
    },
    {
      title: "Technology",
      description: "Innovation, AI and digital trends.",
      icon: Cpu,
      color: "bg-indigo-100 text-indigo-600",
      slug: "Technology",
    },
    {
      title: "Sports",
      description: "Football, basketball and more.",
      icon: Trophy,
      color: "bg-green-100 text-green-600",
      slug: "Sports",
    },
    {
      title: "Entertainment",
      description: "Movies, music and celebrity news.",
      icon: Clapperboard,
      color: "bg-purple-100 text-purple-600",
      slug: "Entertainment",
    },
    {
      title: "Health",
      description: "Medicine, wellness and public health.",
      icon: HeartPulse,
      color: "bg-pink-100 text-pink-600",
      slug: "Health",
    },
    {
      title: "World",
      description: "International news and global affairs.",
      icon: Globe2,
      color: "bg-cyan-100 text-cyan-600",
      slug: "World",
    },
  ];

  const trendingTopics = [
    { name: "Elections", icon: "🔥" },
    { name: "Economy", icon: "📈" },
    { name: "Artificial Intelligence", icon: "🤖" },
    { name: "Football", icon: "⚽" },
    { name: "Smartphones", icon: "📱" },
    { name: "Cryptocurrency", icon: "₿" },
    { name: "Nollywood", icon: "🎬" },
    { name: "World News", icon: "🌍" },
    { name: "Health", icon: "❤️" },
    { name: "Education", icon: "🎓" },
  ];

  useEffect(() => {
    (async () => {
      const page = 1;
      const category = "";
      try {
        setLoading(true);
        const response = await fetchArticles(page, category);
        setArticles(response.articles);
      } catch (error) {
        toast.error("Failed to news article. Check internet connection.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://gnews.io/api/v4/top-headlines?country=ng&lang=en&max=9&token=1344ebbaebabf5f81853548ecf082a20",
  //       );
  //       setLastestNews(response.data.articles);
  //     } catch (error) {
  //       toast.error("Failed to news article. Check internet connection.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 5);
  const editorPicks = articles.slice(5, 9);

  return (
    <div className="bg-[#00020f] min-h-screen text-white font-sans selection:bg-red-500 selection:text-white">
      {/* Immersive Hero Component Layer */}
      <Hero />

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
                Today's Top Stories
              </span>

              <h2 className="mt-5 text-4xl font-black text-slate-900">
                The Biggest Stories Right Now
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Handpicked by our editorial team to keep you informed on the
                stories shaping today's conversations.
              </p>
            </div>

            <Link
              to="/news"
              className="font-semibold text-red-600 transition hover:text-red-700"
            >
              View All News →
            </Link>
          </div>

          {/* Content */}

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Featured Story */}

            <article
              className="group overflow-hidden rounded-3xl bg-white shadow-lg lg:col-span-7 cursor-pointer"
              onClick={() => navigate(`/articles/${featuredArticle?.slug}`)}
            >
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={featuredArticle?.thumbnail?.url}
                  alt={featuredArticle?.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <span className="absolute left-6 top-6 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
                  {featuredArticle?.category}
                </span>
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-black leading-tight text-slate-900 group-hover:text-red-600 transition">
                  {featuredArticle?.title}
                </h3>

                <p className="mt-5 line-clamp-3 leading-8 text-slate-600">
                  {featuredArticle?.content
                    ?.replace(/[#>*`]/g, "")
                    .slice(0, 220)}
                  ...
                </p>

                <div className="mt-8 font-semibold text-red-600">
                  Read Full Story →
                </div>
              </div>
            </article>

            {/* Secondary Stories */}

            <div className="space-y-6 lg:col-span-5">
              {secondaryArticles.map((story) => (
                <article
                  key={story.slug}
                  onClick={() => navigate(`/articles/${story.slug}`)}
                  className="group flex gap-5 cursor-pointer rounded-2xl border border-slate-200 p-4 transition hover:border-red-300 hover:shadow-md"
                >
                  <img
                    src={story.thumbnail?.url}
                    alt={story.title}
                    className="h-28 w-32 rounded-xl object-cover"
                  />

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
                      {story.category}
                    </span>

                    <h4 className="mt-2 text-lg font-bold leading-7 text-slate-900 group-hover:text-red-600 transition">
                      {story.title}
                    </h4>

                    <p className="mt-2 text-sm text-slate-500">
                      {story.readingTime} min read
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
              Browse Categories
            </span>

            <h2 className="mt-6 text-4xl font-black text-slate-900">
              Explore Every Story
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Discover breaking news, expert analysis, and in-depth reporting
              across every major topic.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.slug}
                  to={`/news?category=${category.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-xl"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color}`}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    {category.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {category.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-indigo-600">
                      Explore
                    </span>

                    <ChevronRight
                      size={18}
                      className="text-indigo-600 transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}

          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-yellow-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
                Editor's Picks
              </span>

              <h2 className="mt-5 text-4xl font-black">
                Stories Worth Your Time
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
                Carefully selected by our editorial team for their relevance,
                depth, and impact.
              </p>
            </div>

            <Link
              to="/news"
              className="font-semibold text-yellow-300 hover:text-yellow-200 transition"
            >
              Explore More →
            </Link>
          </div>

          {/* Grid */}

          <div className="grid gap-8 md:grid-cols-2">
            {editorPicks.map((story) => (
              <article
                key={story.slug}
                onClick={() => navigate(`/articles/${story.slug}`)}
                className="group overflow-hidden rounded-3xl bg-slate-800 transition hover:bg-slate-700 cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`${story.thumbnail.url}?w=800&h=400&fit=crop`}
                    alt={story.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full bg-yellow-500 px-3 py-2 text-xs font-bold uppercase tracking-widest text-black">
                    Editor's Pick
                  </span>
                </div>

                <div className="p-7">
                  <span className="text-sm uppercase tracking-widest text-yellow-300">
                    {story.category}
                  </span>

                  <h3 className="mt-3 text-2xl font-black leading-tight group-hover:text-yellow-300 transition">
                    {story.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 leading-7 text-slate-300">
                    {story.content.replace(/[#>*`]/g, "").slice(0, 150)}...
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      {story.readingTime} min read
                    </span>

                    <span className="font-semibold text-yellow-300">
                      Read Story →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
              Trending
            </span>

            <h2 className="mt-6 text-4xl font-black text-slate-900">
              Topics Everyone Is Talking About
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Explore the subjects making headlines and driving conversations
              today.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {trendingTopics.map((topic) => (
              <Link
                key={topic.name}
                to={`/news?search=${encodeURIComponent(topic.name)}`}
                className="group flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-6 py-4 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:shadow-lg"
              >
                <span className="text-xl">{topic.icon}</span>

                <span className="font-semibold text-slate-800 group-hover:text-red-600">
                  {topic.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        {/* Background Glow */}

        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-red-600/20 blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex rounded-full bg-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-300">
            Newsletter
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
            Stay Ahead of the Headlines
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Get breaking news, trusted reporting, and the day's biggest stories
            delivered directly to your inbox.
          </p>

          {/* Form */}

          <form className="mx-auto mt-12 flex max-w-2xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-6 py-4 text-white placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
            />

            <button
              type="submit"
              className="rounded-xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-bold">⚡ Breaking Alerts</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Be the first to know when major stories break.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-bold">📰 Daily Briefing</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                A concise roundup of the day's most important news.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-bold">🎯 Editor's Picks</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Curated stories and exclusive insights from our newsroom.
              </p>
            </div>
          </div>

          {/* Benefits */}

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span>✓ Daily News Brief</span>

            <span>✓ Breaking News Alerts</span>

            <span>✓ Weekly Editorial Picks</span>

            <span>✓ Unsubscribe Anytime</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
