import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tier: "general", // general, wire, secure
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Plumbing ready for your backend Express route
    console.log("Submitting encrypted channel payload: ", formData);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#00020f] min-h-screen text-white font-sans selection:bg-red-500 selection:text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEFT COLUMN: Channel Metrics & Secure Information Protocols (5 Columns) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <div className="inline-block text-[10px] font-mono tracking-widest text-red-500 uppercase px-3 py-1 bg-red-500/5 border border-red-500/10 rounded-full">
              Inbound Communication Channels
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-black uppercase tracking-tight">
              Connect With Our Validation Desk.
            </h1>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-normal">
              Whether you are submitting a localized community wire dispatch or
              routing encrypted data points to our investigative unit, your data
              transfer remains protected behind our zero-telemetry architectural
              framework.
            </p>
          </div>

          <hr className="border-slate-900" />

          {/* Core Communication Vectors */}
          <div className="space-y-6">
            {/* Vector 1 */}
            <div className="flex gap-4 p-4 bg-[#0e0f23]/20 border border-slate-900 rounded-md">
              <div className="text-red-500 pt-1">
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
              <div>
                <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                  The Local Wire Push
                </h4>
                <p className="text-slate-400 text-[11px] leading-relaxed mt-1">
                  For regional correspondence looking to scale upstream. Select{" "}
                  <span className="text-slate-200">Local Wire Dispatch</span> in
                  the interface layout.
                </p>
              </div>
            </div>

            {/* Vector 2 */}
            <div className="flex gap-4 p-4 bg-[#0e0f23]/20 border border-slate-900 rounded-md">
              <div className="text-indigo-400 pt-1">
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
              <div>
                <h4 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                  Secure Cryptographic Drops
                </h4>
                <p className="text-slate-400 text-[11px] leading-relaxed mt-1">
                  Protected document submissions. Whistleblower raw metadata
                  files are cleared from our index files automatically
                  post-validation.
                </p>
              </div>
            </div>
          </div>

          {/* General Administrative Details */}
          <div className="pt-4 space-y-2 font-mono text-[11px] text-slate-500">
            <p>
              NETWORK OPERATIONS IDENTIFIER:{" "}
              <span className="text-slate-300">CN-DIGEST-MAIN</span>
            </p>
            <p>
              RESPONSE LATENCY TARGET:{" "}
              <span className="text-slate-300">&lt; 180 MINUTES</span>
            </p>
            <p>
              ENCRYPTION STANDARD:{" "}
              <span className="text-slate-300">AES-256 PARALLEL CHANNELS</span>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: The Interactive Ingestion Console Form (7 Columns) */}
        <div className="lg:col-span-7">
          <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-[#0e0f23]/40 p-2 backdrop-blur-md shadow-2xl">
            {/* Form Interface Frame Header */}
            <div className="border-b border-slate-900 pb-3 mb-6 flex items-center justify-between px-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              </div>
              <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                SECURE RECORD INGESTION CONSOLE
              </span>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-[#00020f] border border-slate-900 rounded-sm my-4 mx-2">
                <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-bold uppercase tracking-tight text-white">
                  Transmission Payload Buffered
                </h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                  Your dispatch packet has successfully hit our ingestion
                  gateway. The verification desk has queued this item for
                  structural review.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 font-mono text-[10px] text-red-500 border border-red-500/20 bg-red-500/5 px-4 py-2 uppercase tracking-wider rounded-sm hover:bg-red-500 hover:text-white transition-all"
                >
                  Open New Communication Channel
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-4 bg-[#00020f] border border-slate-900 rounded-sm space-y-6"
              >
                {/* Channel Classification Selector */}
                <div>
                  <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-2">
                    1. Channel Classification Route
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, tier: "general" })
                      }
                      className={`p-3 text-left border rounded-sm font-sans transition-all ${
                        formData.tier === "general"
                          ? "border-slate-400 bg-slate-900/50 text-white"
                          : "border-slate-900 bg-[#0e0f23]/10 text-slate-500 hover:border-slate-800"
                      }`}
                    >
                      <span className="block text-xs font-bold uppercase">
                        General Inquiry
                      </span>
                      <span className="block text-[9px] text-slate-500 mt-0.5">
                        Media relations & info
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, tier: "wire" })}
                      className={`p-3 text-left border rounded-sm font-sans transition-all ${
                        formData.tier === "wire"
                          ? "border-red-500 bg-red-950/20 text-white"
                          : "border-slate-900 bg-[#0e0f23]/10 text-slate-500 hover:border-slate-800"
                      }`}
                    >
                      <span className="block text-xs font-bold uppercase text-red-500">
                        Local Wire Push
                      </span>
                      <span className="block text-[9px] text-slate-500 mt-0.5">
                        Elevate hyper-local news
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, tier: "secure" })
                      }
                      className={`p-3 text-left border rounded-sm font-sans transition-all ${
                        formData.tier === "secure"
                          ? "border-indigo-500 bg-indigo-950/20 text-white"
                          : "border-slate-900 bg-[#0e0f23]/10 text-slate-500 hover:border-slate-800"
                      }`}
                    >
                      <span className="block text-xs font-bold uppercase text-indigo-400">
                        Secure Drop
                      </span>
                      <span className="block text-[9px] text-slate-500 mt-0.5">
                        Leaks & document custody
                      </span>
                    </button>
                  </div>
                </div>

                {/* Identity Matrix inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-2">
                      2. Reporter Name / Alias
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Anonymous Observer"
                      className="w-full bg-[#0e0f23]/30 border border-slate-900 focus:border-slate-700 rounded-sm px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-2">
                      3. Digital Callback Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@provider.com"
                      className="w-full bg-[#0e0f23]/30 border border-slate-900 focus:border-slate-700 rounded-sm px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-2">
                    4. Context Heading
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Brief architectural overview of your submission"
                    className="w-full bg-[#0e0f23]/30 border border-slate-900 focus:border-slate-700 rounded-sm px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-2">
                    5. Raw Informational Payload
                  </label>
                  <textarea
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Detail the event records, regional developments, or structural documentation cleanly here..."
                    className="w-full bg-[#0e0f23]/30 border border-slate-900 focus:border-slate-700 rounded-sm px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Action Block */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-white text-[#00020f] font-mono text-xs font-bold uppercase tracking-wider py-3 rounded-sm transition-all duration-300 hover:bg-red-600 hover:text-white"
                  >
                    Execute Payload Transmission
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
