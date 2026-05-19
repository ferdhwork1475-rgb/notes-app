import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  // A premium online graphic representing global independent digital reporting structure
  const newsMissionImage =
    "https://www.thecable.ng/wp-content/uploads/2026/02/President-Tinubu.jpeg";

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#00020f] text-white overflow-hidden px-4 sm:px-8 py-20 lg:py-32">
      {/* Ambient Background Glow System */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
        {/* Left Column: Media / Journalistic Copy */}
        <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#0e0f23] border border-slate-800 px-3 py-1 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
              Independent Digital Journalism
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black tracking-tight leading-[1.1] text-white uppercase">
            Uncovering <br />
            stories that shape <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-indigo-400 font-sans">
              our world.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed font-normal">
            Access deeply researched reporting, technical analyses, and global
            commentary. No algorithms, no sensory clutter—just premium
            journalism curated for critical readers.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/newslibrary"
              className="inline-block w-full sm:w-auto text-center bg-red-600 text-white text-xs uppercase tracking-widest font-black px-8 py-4 rounded-sm hover:bg-red-500 transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.25)] hover:shadow-[0_0_35px_rgba(220,38,38,0.4)] transform hover:-translate-y-0.5"
            >
              Read Latest Stories
            </Link>

            <Link
              to="/about"
              className="inline-block w-full sm:w-auto text-center bg-transparent border border-slate-800 hover:border-slate-700 text-slate-300 text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-sm hover:bg-slate-900/40 transition-all"
            >
              Our Mission
            </Link>
          </div>
        </div>

        {/* Right Column: Dynamic Media Asset Showcase */}
        <div className="lg:col-span-6 relative flex items-center justify-center w-full">
          <div className="relative w-full max-w-lg aspect-[4/3] bg-[#0e0f23]/40 border border-slate-800/80 rounded-sm p-4 backdrop-blur-md shadow-2xl group transition-all duration-500 hover:border-slate-700/60">
            {/* Editorial Label Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-4">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                PRESS MATRIX // DIGEST
              </span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>

            {/* Layout Display Wrap */}
            <div className="relative w-full h-full rounded-sm overflow-hidden bg-[#00020f]/60 flex items-center justify-center border border-slate-900">
              <img
                src={newsMissionImage}
                alt="Global news desk network interface concept"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 mix-blend-lighten"
              />

              {/* Overlay Content Panel Label to emphasize editorial intent */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#05070f]/90 border border-slate-800/80 p-3 rounded-sm backdrop-blur-md transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-0.5">
                  Verified Reportage
                </p>
                <p className="text-xs text-slate-300 font-serif font-medium">
                  Tracking decentralized narratives, data integrity, and modern
                  infrastructure feeds.
                </p>
              </div>
            </div>

            {/* Accent Corner Brackets for a sleek layout look */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-slate-700 pointer-events-none" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-slate-700 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-slate-700 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-slate-700 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
