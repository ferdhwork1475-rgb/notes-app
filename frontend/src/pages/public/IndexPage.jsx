import { Link } from "react-router-dom";
import Hero from "../../components/common/Hero";
import { notepad, notetab, elena, laptopNote, markus } from "../../assets/index"

const IndexPage = () => {
  return (
    <div>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          {/* Primary Preview (60%) */}
          <div className="w-full md:w-[60%] group">
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
              {/* Decorative Browser Dots */}
              <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <img
                src={notepad}
                alt="Main Notepad Interface"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Secondary Features (35%) */}
          <div className="w-full md:w-[35%] flex flex-col gap-6 mt-8 md:mt-0">
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform md:-translate-y-4">
              <img
                src={notetab}
                alt="Note Tab Detail View"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Card 1: Focus on the Writing Process */}
            <div className="bg-[#00020f] p-8 rounded-2xl border border-[#0e0f23] shadow-xl hover:shadow-2xl transition-all duration-300 transform md:-translate-y-4 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#4F46E5]/10 rounded-lg">
                  {/* Simple Pen Icon for Writing */}
                  <svg
                    className="w-6 h-6 text-[#4F46E5]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-semibold tracking-tight">
                  Write in Flow
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                A calm, distraction-free space designed to help you capture your
                thoughts exactly as they come, without worrying about the tools.
              </p>
              {/* Animated accent line */}
              <div className="h-1 w-12 bg-[#4F46E5] rounded-full transition-all duration-500 group-hover:w-full"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-white">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00020f] mb-4">
            Everything you need, nothing you don't.
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We've stripped away the clutter to give you a focused writing
            environment that adapts to your workflow.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1: Instant Sync */}
          <div className="flex flex-col items-start group">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#00020f] mb-3">
              Instant Sync
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Your thoughts move with you. Zero-latency synchronization across
              mobile, desktop, and web platforms.
            </p>
          </div>

          {/* Feature 2: Privacy */}
          <div className="flex flex-col items-start group">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300">
              <svg
                className="w-6 h-6"
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
            <h3 className="text-xl font-bold text-[#00020f] mb-3">
              Privacy by Design
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              End-to-end encryption ensures your private notes stay private. We
              can't read them, and no one else can either.
            </p>
          </div>

          {/* Feature 3: Global Search */}
          <div className="flex flex-col items-start group">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300">
              <svg
                className="w-6 h-6"
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
            <h3 className="text-xl font-bold text-[#00020f] mb-3">
              Global Search
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Lightning-fast search results across all your notebooks, tags, and
              archived snippets in milliseconds.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#334155] py-20 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
        {/* Left Side: Content & Testimonials */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Trusted by thinkers around the globe.
          </h3>

          <div className="space-y-6">
            {/* Testimonial 1 */}
            <div className="bg-slate-700/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-500/30 hover:border-indigo-400 transition-colors duration-300">
              <p className="text-slate-200 text-lg italic mb-6 leading-relaxed">
                "Stillness Notes is the first app that actually lets me think
                without being interrupted by a thousand tiny features I don't
                need."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={elena}
                  alt="Elena Rossi"
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400"
                />
                <div>
                  <p className="text-white font-semibold">Elena Rossi</p>
                  <p className="text-slate-400 text-sm">Product Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-700/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-500/30 hover:border-indigo-400 transition-colors duration-300">
              <p className="text-slate-200 text-lg italic mb-6 leading-relaxed">
                "The markdown support is the best I've seen. It feels native and
                invisible, exactly how a writing tool should feel."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={markus}
                  alt="Marcus Thorne"
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400"
                />
                <div>
                  <p className="text-white font-semibold">Marcus Thorne</p>
                  <p className="text-slate-400 text-sm">Tech Journalist</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Large Image */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full"></div>
          <img
            src={laptopNote}
            alt="a laptop for writing noted"
            className="relative w-full h-auto rounded-2xl shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </section>
      <section className="bg-[#334155] text-white">
        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 text-center border-b border-slate-500/30">
          <h3 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to find your focus?
          </h3>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join 50,000+ thinkers who have simplified their digital life with
            Stillness Notes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/signup"
              className="text-white hover:text-indigo-300 font-medium transition-colors border-b border-transparent hover:border-indigo-300 pb-1"
            >
              Get Started for Free
            </Link>
            <Link
              to="/pricing"
              className="bg-white text-[#334155] px-8 py-3.5 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg hover:scale-105"
              onClick={() => setActivePage("pricing")}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
