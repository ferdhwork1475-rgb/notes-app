import { Link } from "react-router-dom";

const AboutPage = () => {
  // Public production CDN images tailored to independent regional reporting themes
  const newsroomHeroUrl = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80";
  const communityReportUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80";

  return (
    <div className="bg-[#00020f] min-h-screen text-white font-sans selection:bg-red-500 selection:text-white">
      
      {/* HEADER SECTION: Core Mission Statement */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 text-center relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="inline-block text-[10px] font-mono tracking-widest text-red-500 uppercase mb-4 px-3 py-1 bg-red-500/5 border border-red-500/10 rounded-full">
          Our Manifesto
        </div>
        
        {/* The Core Mission */}
        <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-white uppercase max-w-4xl mx-auto leading-tight">
          "Let the local news go up <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-indigo-500">
            and be heard by everyone
          </span>"
        </h1>
        
        <p className="text-slate-400 max-w-2xl mx-auto mt-6 text-sm md:text-base leading-relaxed font-normal">
          We believe that the most critical stories don't always happen in capital cities or financial centers. They happen on the ground, in local neighborhoods, and inside small communities whose voices deserve global resonance.
        </p>
      </section>

      {/* HERO IMAGE BANNER */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-4">
        <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-[#0e0f23]/40 p-2 backdrop-blur-md shadow-2xl">
          <div className="rounded-sm overflow-hidden bg-[#00020f] border border-slate-900 h-[300px] md:h-[450px]">
            <img
              src={newsroomHeroUrl}
              alt="Independent journalistic coverage setup"
              className="w-full h-full object-cover opacity-60 mix-blend-lighten filter grayscale contrast-125"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Why Local News Matters (Split Matrix) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-slate-900">
        <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
          
          {/* Left Block: Narrative text */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold">
              // STRUCTURAL IMBALANCE
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-tight">
              Amplifying Voices Outside the Algorithm
            </h2>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-normal">
              Modern media conglomerates prioritize top-tier national spectacles engineered to drive clicks and ad placement. As a result, critical regional stories—local policy actions, grassroots economic developments, and community triumphs—get lost in the noise.
            </p>
            
            <blockquote className="border-l-2 border-red-600 pl-4 italic text-slate-300 text-xs font-mono">
              "When a local story is suppressed, a piece of global accountability goes missing."
            </blockquote>
            
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-normal">
              Our framework flips the script. By combining raw community correspondence with a streamlined decentralized platform, we strip away corporate algorithmic bias to push raw local truths up to the surface where everyone can access them.
            </p>
          </div>

          {/* Right Block: Graphic Card UI */}
          <div className="w-full lg:w-5/12 group relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-xl opacity-70 rounded-md"></div>
            <div className="relative border border-slate-800 p-2 bg-[#0e0f23]/60 rounded-md shadow-2xl">
              <img
                src={communityReportUrl}
                alt="Global digital node grid representing local networks"
                className="w-full h-auto rounded-sm object-cover filter saturate-50 brightness-90 group-hover:saturate-100 transition-all duration-500"
              />
              <div className="p-4 bg-[#00020f] border border-slate-900 rounded-sm mt-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">NETWORK COVERAGE</p>
                <p className="text-white font-serif text-sm font-bold mt-1">Decentralized Data Ingestion Layout</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: The Pillars of Our Distribution Engine */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-[#00020f]">
        <div className="text-center mb-20">
          <div className="inline-block text-[10px] font-mono tracking-widest text-purple-400 uppercase mb-3">
            How We Operate
          </div>
          <h2 className="text-3xl font-serif font-black text-white uppercase">
            The Pillars of Elevation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Pillar 1: Grassroots Sourcing */}
          <div className="flex flex-col items-start p-6 bg-[#0e0f23]/20 border border-slate-900 rounded-md group hover:border-slate-800 transition-all duration-300">
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-sm flex items-center justify-center mb-6 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">Hyper-Local Dispatch</h3>
            <p className="text-slate-400 leading-relaxed text-xs font-normal">
              We coordinate verified lines directly with community actors, citizen journalists, and local observers to build report wires right from the source code of the city.
            </p>
          </div>

          {/* Pillar 2: Upstream Propagation */}
          <div className="flex flex-col items-start p-6 bg-[#0e0f23]/20 border border-slate-900 rounded-md group hover:border-slate-800 transition-all duration-300">
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-sm flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">The Upstream Push</h3>
            <p className="text-slate-400 leading-relaxed text-xs font-normal">
              Our distribution models are engineered to push validated regional dispatches cleanly onto global feeds, defying mainstream filter bubbles that mask non-metropolitan realities.
            </p>
          </div>

          {/* Pillar 3: Absolute Open Access */}
          <div className="flex flex-col items-start p-6 bg-[#0e0f23]/20 border border-slate-900 rounded-md group hover:border-slate-800 transition-all duration-300">
            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-sm flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">Unfettered Sovereignty</h3>
            <p className="text-slate-400 leading-relaxed text-xs font-normal">
              No premium paywalls, no pop-up telemetry arrays, and zero corporate gatekeepers. Information belongs to everyone, unfiltered and uncompromised.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM ACTION CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center border-t border-slate-900">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-white uppercase">
          Have an untold regional story?
        </h3>
        <p className="text-slate-500 text-xs max-w-md mx-auto mt-2 mb-6">
          Connect directly with our validation desk. Let us coordinate, protect, and publish your community's truth.
        </p>
        <Link 
          to="/contact" 
          className="inline-block bg-white text-[#00020f] font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-all duration-300 hover:bg-red-600 hover:text-white"
        >
          Contact us now
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;