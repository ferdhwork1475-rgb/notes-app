import React from "react";
import { Search } from "lucide-react";

const NewsLibraryHeaderSection = ({ searchInput, setSearchInput }) => {
  return (
    /* Changed from header to section, removed sticky styles and background duplicate shadows */
    <section className="border-b border-slate-800/60 bg-slate-950/30 px-4 sm:px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* News Section Identification */}
        <div className="flex items-center space-x-3">
          <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest rounded-sm animate-pulse">
            LIVE
          </span>
          <h2 className="text-sm font-sans font-bold tracking-wider text-slate-300 uppercase">
            Archive <span className="text-red-500">&amp;</span> Library
            Resources
          </h2>
        </div>

        {/* Localized Library Article Search Filter */}
        <div className="relative w-full sm:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={15}
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search filtered library archives..."
            className="w-full bg-slate-900/40 border border-slate-800/80 text-xs text-slate-200 rounded-sm pl-10 pr-4 py-2 focus:outline-none focus:border-red-500 focus:bg-slate-900/90 transition-all font-medium"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsLibraryHeaderSection;
