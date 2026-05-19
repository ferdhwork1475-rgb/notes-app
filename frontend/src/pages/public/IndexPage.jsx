import { Link } from "react-router-dom";
import Hero from "../../components/common/Hero";

const IndexPage = () => {
  // Public production CDN URLs that work perfectly anywhere without permission errors
  const mediaInterfaceUrl =
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80";
  const analyticsPanelUrl =
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80";

  const ceoPortraitUrl =
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80";
  const boardOwnerUrl =
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80";
  const boardPublisherUrl =
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80";
  const boardEditorUrl =
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80";

  return (
    <div className="bg-[#00020f] min-h-screen text-white font-sans selection:bg-red-500 selection:text-white">
      {/* Immersive Hero Component Layer */}
      <Hero />

      {/* SECTION 1: Featured Editorial Showcase Matrix */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-20 border-b border-slate-900">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          {/* Primary News Interface Preview Block (60%) */}
          <div className="w-full lg:w-[60%] group">
            <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-[#0e0f23]/40 p-2 backdrop-blur-md shadow-2xl transition-all duration-500 group-hover:border-slate-700/60">
              {/* Institutional Editorial Dot System */}
              <div className="border-b border-slate-900 pb-3 mb-3 flex items-center justify-between px-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                  LIVE FEED LATEST
                </span>
              </div>
              <div className="rounded-sm overflow-hidden bg-[#00020f] border border-slate-900">
                <img
                  src={mediaInterfaceUrl}
                  alt="Primary Global News Interface Workspace"
                  className="w-full h-auto object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300 mix-blend-lighten"
                />
              </div>
            </div>
          </div>

          {/* Core Journalistic Pillar Panel (35%) */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            <div className="rounded-lg overflow-hidden border border-slate-800/80 p-2 bg-[#0e0f23]/20 shadow-xl group transition-all">
              <img
                src={analyticsPanelUrl}
                alt="Breaking notification summary metrics panel"
                className="w-full h-auto object-cover rounded-sm border border-slate-900 filter saturate-50 group-hover:saturate-100 transition-all"
              />
            </div>

            {/* Editorial Insight Identity Card */}
            <div className="bg-[#0e0f23]/40 p-8 rounded-lg border border-slate-800 shadow-xl group hover:border-slate-700/60 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/10 rounded-sm border border-red-500/20">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-serif font-bold tracking-tight">
                  Uncompromised Truth
                </h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 font-normal">
                A clean layout engineered entirely for reading clarity. Consume
                complex, investigative reports and analytical breaking trends
                without modern pop-up sensory noise.
              </p>
              <div className="h-[2px] w-8 bg-red-600 rounded-full transition-all duration-500 group-hover:w-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Core Platform Infrastructure Features */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-slate-900 bg-[#00020f]">
        <div className="text-center mb-20">
          <div className="inline-block text-[10px] font-mono tracking-widest text-red-500 uppercase mb-3 px-3 py-1 bg-red-500/5 border border-red-500/10 rounded-full">
            Media Features
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-white mb-4 uppercase">
            Built for Critical Readers.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed font-normal">
            We’ve eliminated targeted algorithmic feeds to focus completely on
            structural data integrity and premium independent layout
            distribution systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1: Real-Time Dispatch Wire */}
          <div className="flex flex-col items-start group p-6 bg-[#0e0f23]/20 border border-transparent hover:border-slate-800/60 rounded-md transition-all">
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-sm flex items-center justify-center mb-6 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              Real-Time News Wire
            </h3>
            <p className="text-slate-400 leading-relaxed text-xs font-normal">
              Zero-latency reporting infrastructure. Experience lightning-fast
              visual dispatches running directly across our decentralized edge
              framework.
            </p>
          </div>

          {/* Feature 2: Metadata Integrity */}
          <div className="flex flex-col items-start group p-6 bg-[#0e0f23]/20 border border-transparent hover:border-slate-800/60 rounded-md transition-all">
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-sm flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              Metadata Integrity
            </h3>
            <p className="text-slate-400 leading-relaxed text-xs font-normal">
              Advanced protocol parameters ensure complete reader anonymity.
              Your browsing history, data feeds, and article metrics are never
              archived or parsed.
            </p>
          </div>

          {/* Feature 3: Deep Intelligence Search */}
          <div className="flex flex-col items-start group p-6 bg-[#0e0f23]/20 border border-transparent hover:border-slate-800/60 rounded-md transition-all">
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-sm flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              Deep Intelligence Search
            </h3>
            <p className="text-slate-400 leading-relaxed text-xs font-normal">
              Query millions of indexed reports, geopolitical whitepapers, and
              dynamic cross-references instantly inside our microsecond catalog
              matrix.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: CEO Editorial Viewpoint & Words of Advice */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-slate-900 bg-[#0e0f23]/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column: Asymmetric Executive Image Frame */}
          <div className="w-full lg:w-2/5 relative flex justify-center">
            <div className="absolute -inset-2 bg-gradient-to-tr from-red-600/20 to-indigo-600/20 blur-2xl opacity-60 rounded-sm"></div>
            <div className="relative border border-slate-800 p-2 bg-[#00020f] rounded-sm group shadow-2xl max-w-sm">
              <img
                src={ceoPortraitUrl}
                alt="Executive Chief Director Editorial Portrait"
                className="w-full h-auto object-cover rounded-sm filter brightness-95 contrast-105 transition-all duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-4 left-4 bg-[#00020f]/95 border border-slate-800 px-4 py-2 rounded-sm backdrop-blur-sm">
                <p className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                  EXECUTIVE OFFICE
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Directional Words of Advice Statement */}
          <div className="w-full lg:w-3/5 space-y-6">
            <div className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-bold">
              // FOUNDER NOTE & PRINCIPLES
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-black text-white uppercase tracking-tight leading-tight">
              "In the clutter of noise, <br />
              clarity is our highest duty."
            </h3>
            <blockquote className="border-l-2 border-red-600 pl-6 space-y-4">
              <p className="text-slate-300 text-sm md:text-base leading-relaxed italic font-medium">
                "Modern distribution metrics are broken; they optimize for
                temporary rage rather than permanent truth. Our architectural
                mission has always been clean and direct: build a system that
                presents accurate documentation and verified reportage exactly
                as it unfolds."
              </p>
              <p className="text-slate-400 text-xs leading-relaxed font-normal">
                "To critical readers worldwide navigating this era: look past
                the sensationalist algorithms. True leverage belongs to those
                who slow down, read deeply, synthesize raw event records, and
                maintain absolute informational sovereignty."
              </p>
            </blockquote>
            <div className="pt-2">
              <p className="text-white font-serif font-bold text-base tracking-wide">
                Chief Executive Director
              </p>
              <p className="text-slate-500 font-mono text-[11px] uppercase tracking-wider mt-0.5">
                The Chronicle Digest Network
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Newsroom Core Contributors & Stakeholders Network */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-[#00020f]">
        <div className="text-center mb-16">
          <div className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold mb-2">
            THE PRESS BOARD
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase">
            Connected Network Operators
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-xs leading-relaxed mt-2">
            The journalists, operations administrators, and senior managers
            behind our global publication interface layers.
          </p>
        </div>

        {/* 3-Column Stakeholders Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Member 1: Platform Owner / Director */}
          <div className="bg-[#0e0f23]/20 border border-slate-900 rounded-md p-6 flex flex-col items-center text-center group hover:border-slate-800 transition-all">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-red-500/30 p-1 mb-6 group-hover:border-red-500 transition-colors duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                <img
                  src={boardOwnerUrl}
                  alt="Platform Principal Owner"
                  className="w-full h-full object-cover filter brightness-95"
                />
              </div>
            </div>
            <h4 className="text-white font-serif font-bold text-lg">
              Operational Principal
            </h4>
            <p className="text-red-500 font-mono text-[10px] tracking-wider uppercase mb-3">
              Owner & Network Executive
            </p>
            <p className="text-slate-400 text-xs leading-relaxed font-normal px-2">
              Manages structural investment operations, deployment parameters,
              and the platform's independent asset configuration strategy.
            </p>
          </div>

          {/* Member 2: Chief Publisher */}
          <div className="bg-[#0e0f23]/20 border border-slate-900 rounded-md p-6 flex flex-col items-center text-center group hover:border-slate-800 transition-all">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-indigo-500/30 p-1 mb-6 group-hover:border-indigo-500 transition-colors duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                <img
                  src={boardPublisherUrl}
                  alt="Chief Publisher"
                  className="w-full h-full object-cover filter brightness-95"
                />
              </div>
            </div>
            <h4 className="text-white font-serif font-bold text-lg">
              Marcus Thorne
            </h4>
            <p className="text-indigo-400 font-mono text-[10px] tracking-wider uppercase mb-3">
              Chief Media Publisher
            </p>
            <p className="text-slate-400 text-xs leading-relaxed font-normal px-2">
              Oversees technical syndicate licensing, catalog circulation
              pipelines, and verification framework channels across the newsroom
              grid.
            </p>
          </div>

          {/* Member 3: Senior Technical Journalist / Content Architect */}
          <div className="bg-[#0e0f23]/20 border border-slate-900 rounded-md p-6 flex flex-col items-center text-center group hover:border-slate-800 transition-all">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-purple-500/30 p-1 mb-6 group-hover:border-purple-500 transition-colors duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                <img
                  src={boardEditorUrl}
                  alt="Lead Investigative Editor"
                  className="w-full h-full object-cover filter brightness-95"
                />
              </div>
            </div>
            <h4 className="text-white font-serif font-bold text-lg">
              Elena Rostova
            </h4>
            <p className="text-purple-400 font-mono text-[10px] tracking-wider uppercase mb-3">
              Lead Managing Editor
            </p>
            <p className="text-slate-400 text-xs leading-relaxed font-normal px-2">
              Directs core verification loops, investigative narrative
              alignments, and raw cross-border media feed coordination
              parameters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
