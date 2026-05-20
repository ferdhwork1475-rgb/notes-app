import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Bookmark,
  Share2,
} from "lucide-react";
import NewsLibraryHeaderSection from "../../components/common/NewsLibraryHeaderSection";
import { fetchNews } from "../../services/authService"

const NewsLibrary = () => {
  const [selectedTag, setSelectedTag] = useState("All Stories");


  // Premium hardcoded news editorial data with modern placeholder images
  const articles = [
    {
      id: "1",
      title:
        "The Decentralized Brain: How MERN Architecture Solves Modern Knowledge Overload",
      context:
        "In an era dominated by transient stream architecture, engineers are shifting back to persistent structured hubs. By combining asynchronous React states with validation middleware layers, developers are charting a sustainable framework for deep work canvases that resist peripheral sensory friction.",
      tag: "Engineering",
      createdAt: "May 18, 2026",
      author: "Alex Thorne",
      readTime: "5 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      isFeatured: true, // Featured article layout flag
    },
    {
      id: "2",
      title:
        "The Psychology of Identity: Engineering Unique Usernames in the Automated Age",
      context:
        "Why names like NeuralNomad and QuantumScribe are changing how we interface with software. Explore the underlying database uniqueness rules and validation mechanics behind seamless profile onboarding.",
      tag: "AI Technology",
      createdAt: "May 16, 2026",
      author: "Elena Rostova",
      readTime: "3 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      isFeatured: false,
    },
    {
      id: "3",
      title:
        "Form vs Function: Designing Fallback Silhouette Systems for Modern User Schemas",
      context:
        "Baking static file paths directly into your database schema is a common architecture trap. Senior UI designers are moving toward front-end conditional rendering systems that cleanly map user graphics dynamically.",
      tag: "UI/UX Design",
      createdAt: "May 12, 2026",
      author: "Marcus Vance",
      readTime: "4 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
      isFeatured: false,
    },
    {
      id: "4",
      title:
        "Architectural Guardrails: How Middleware Mitigates Structural Coding Risks",
      context:
        "An in-depth look into using schema validation rules to bulletproof incoming application data pathways. Learn why treating APIs like data servers keeps systems clean without unnecessary performance penalties.",
      tag: "Engineering",
      createdAt: "May 09, 2026",
      author: "Sarah Jenkins",
      readTime: "6 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      isFeatured: false,
    },
    {
      id: "5",
      title: "The Death of Derived State Sync Pitfalls",
      context:
        "Redundant parameters trigger unexpected micro-render updates and platform rendering bugs. This analysis demonstrates how to craft functional boolean truth checkpoints derived straight from response payloads.",
      tag: "Computing",
      createdAt: "May 04, 2026",
      author: "Nikolai Tesla",
      readTime: "8 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      isFeatured: false,
    },
  ];

  const tags = [
    "All Stories",
    "Engineering",
    "AI Technology",
    "UI/UX Design",
    "Computing",
  ];

  const filteredArticles =
    selectedTag === "All Stories"
      ? articles
      : articles.filter((article) => article.tag === selectedTag);

  // Split featured layout content from standard secondary grid array
  const featuredArticle =
    filteredArticles.find((a) => a.isFeatured) || filteredArticles[0];
  const secondaryArticles = filteredArticles.filter(
    (a) => a.id !== featuredArticle?.id,
  );

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-['Inter'] antialiased">
      {/* Editorial Header Logo Bar */}
      <NewsLibraryHeaderSection />
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Dynamic Category Nav Filtration Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 border-b border-slate-800/60 scrollbar-hide">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-sm text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap ${
                selectedTag === tag
                  ? "bg-red-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Dynamic Layout Context Section */}
        {filteredArticles.length > 0 ? (
          <div className="space-y-12">
            {/* 1. FEATURED ARTICLE LAYOUT HERO (Only showing if matching selection) */}
            {selectedTag === "All Stories" && featuredArticle && (
              <section className="group grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-slate-800 pb-12">
                <div className="lg:col-span-7 overflow-hidden rounded-md border border-slate-800 bg-slate-900">
                  <img
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    className="w-full h-75 sm:h-105 object-cover group-hover:scale-[1.01] transition-transform duration-500 opacity-90"
                  />
                </div>
                <div className="lg:col-span-5 flex flex-col justify-between py-2">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                      {featuredArticle.tag}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight hover:text-red-400 transition-colors">
                      <a href="#read-more">{featuredArticle.title}</a>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-5">
                      {featuredArticle.context}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          {featuredArticle.author}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {featuredArticle.createdAt} ·{" "}
                          {featuredArticle.readTime}
                        </p>
                      </div>
                    </div>
                    <a
                      href="#read-more"
                      className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider flex items-center space-x-1"
                    >
                      <span>Read Full Story</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* 2. SECONDARY STANDARD MAGAZINE GRID LAYOUT */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedTag === "All Stories"
                ? secondaryArticles
                : filteredArticles
              ).map((article) => (
                <article
                  key={article.id}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-md overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group"
                >
                  <div>
                    {/* Article Thumbnail Container */}
                    <div className="h-48 overflow-hidden bg-slate-900 relative">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                      <span className="absolute top-3 left-3 bg-slate-950/90 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border border-slate-800">
                        {article.tag}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        <a href="#read-more">{article.title}</a>
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                        {article.context}
                      </p>
                    </div>
                  </div>

                  {/* Editorial Post Footer Section */}
                  <div className="p-5 pt-0">
                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                          <User size={11} />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-slate-200">
                            {article.author}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {article.createdAt}
                          </p>
                        </div>
                      </div>
                      <a
                        href="#read-more"
                        className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider"
                      >
                        Read →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>
        ) : (
          /* Empty Search State Frame */
          <div className="py-24 text-center border border-dashed border-slate-800 rounded-md">
            <p className="text-slate-500 text-sm">
              No articles documented under this editorial section yet.
            </p>
          </div>
        )}

        {/* 3. STATIC NEWS PAGINATION ELEMENT */}
        <footer className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-medium">
            Showing Page <span className="text-slate-300">1</span> of{" "}
            <span className="text-slate-300">4</span> out of 24 entries
          </span>

          <div className="flex items-center space-x-1">
            <button className="p-2 bg-slate-900 border border-slate-800 text-slate-500 rounded-md cursor-not-allowed transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="px-3.5 py-1.5 bg-red-600 text-white text-xs font-bold rounded-md transition-colors">
              1
            </button>
            <button className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold rounded-md transition-colors">
              2
            </button>
            <button className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold rounded-md transition-colors">
              3
            </button>
            <span className="px-2 text-slate-600 text-xs">...</span>
            <button className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold rounded-md transition-colors">
              12
            </button>
            <button className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-md transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default NewsLibrary;
