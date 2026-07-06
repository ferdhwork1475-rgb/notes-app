import { Newspaper, Home, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 shadow-sm">
          <Newspaper size={42} />
        </div>

        {/* Error Code */}
        <h1 className="mt-8 text-7xl md:text-8xl font-black tracking-tight text-slate-900">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
          This story couldn't be found
        </h2>

        {/* Description */}
        <p className="mt-5 text-base md:text-lg leading-8 text-slate-600 max-w-xl mx-auto">
          The article or page you're looking for may have been moved, deleted,
          or the link you followed is no longer available. Explore the latest
          headlines or return to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Home size={18} />
            Home
          </button>

          <button
            onClick={() => navigate("/news")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Search size={18} />
            Latest News
          </button>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-400">
            Stay informed with trusted news, breaking stories, and in-depth
            coverage.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
