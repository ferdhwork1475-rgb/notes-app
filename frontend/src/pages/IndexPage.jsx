import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const IndexPage = () => {
  return (
    <div>
      <Navbar />
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

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform md:translate-x-4">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#4F46E5]">
                  Think Clearly.
                </span>
              </div>
              <p className="text-[#00020f] text-lg leading-relaxed font-medium">
                Write down experiences and ideas, and share it publicly or keep it private.{" "}
                <span className="text-[#4F46E5]">All in one platform</span>.
              </p>
              <div className="mt-6 flex gap-2">
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100">
                  Simple •
                </span>
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100">
                  Clean •
                </span>
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100">
                  Yours
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;