import { useState } from "react";
import { Send, Landmark, ShieldCheck, Copy, Check } from "lucide-react";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success("Copied to clipboard");
      
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message.trim()) {
      toast.warning("Please fill in all fields");
      return;
    }

    console.log("Form Data Submitted: ", formData);
    setSubmitted(true);
    toast.success("Message sent successfully");
  };

  const handleReset = () => {
    setFormData({ email: "", message: "" });
    setSubmitted(false);
  };

  return (
    <div className="bg-[#00020f] min-h-screen text-white font-sans selection:bg-red-500 selection:text-white pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-red-500 uppercase px-3 py-1 bg-red-500/5 border border-red-500/10 rounded-full">
            <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
            Contact
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-black uppercase tracking-tight">
            Connect & Support
          </h1>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-md mx-auto">
            Send us a message or choose to support our work using the details below.
          </p>
        </div>

        {/* Section A: Contact Form */}
        <div className="rounded-lg border border-slate-800 bg-[#0e0f23]/40 p-1 backdrop-blur-md shadow-2xl">
          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-[#00020f] border border-slate-900 rounded-sm">
              <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-white">
                Message Sent
              </h3>
              <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
                Thank you. Your message has been received and our team will review it shortly.
              </p>
              <button
                onClick={handleReset}
                className="mt-2 font-mono text-[10px] text-red-500 border border-red-500/20 bg-red-500/5 px-4 py-2 uppercase tracking-wider rounded-sm hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-5 bg-[#00020f] border border-slate-900 rounded-sm space-y-5"
            >
              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-2">
                  Your Email Address
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

              {/* Message Input */}
              <div>
                <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-2">
                  Your Message
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Type your message, inquiry, or corrections here..."
                  className="w-full bg-[#0e0f23]/30 border border-slate-900 focus:border-slate-700 rounded-sm px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-white text-[#00020f] font-mono text-xs font-bold uppercase tracking-wider py-3 rounded-sm transition-all duration-300 hover:bg-red-600 hover:text-white"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Message
              </button>
            </form>
          )}
        </div>

        {/* Section B: Donations */}
        <div className="rounded-lg border border-slate-900 bg-[#0e0f23]/10 p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-900 pb-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-md">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-200">
                Support the Project
              </h3>
              <p className="text-[10px] text-slate-500 font-sans">
                Click any card to quickly copy the details to your clipboard.
              </p>
            </div>
          </div>

          {/* Copyable Payment Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px] text-slate-400">
            {/* Bank Card */}
            <div 
              onClick={() => handleCopy("9081-2244-1055", "fiat")}
              className="group p-3 bg-[#00020f]/60 border border-slate-900 rounded-sm space-y-1 cursor-pointer hover:border-slate-700 transition-all duration-300 relative"
            >
              <div className="absolute top-2 right-2 opacity-40 group-hover:opacity-100 transition-opacity">
                {copiedField === "fiat" ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500" />
                )}
              </div>
              <span className="text-[9px] text-slate-600 uppercase block">Bank Transfer</span>
              <p className="text-slate-300 font-bold group-hover:text-white transition-colors">Apex Sovereign Trust</p>
              <p className="text-slate-500 text-[10px]">Acct: 9081-2244-1055</p>
              <p className="text-slate-500 text-[10px]">Routing: 021000021</p>
            </div>

            {/* Crypto Card */}
            <div 
              onClick={() => handleCopy("0x71C21000021319a", "crypto")}
              className="group p-3 bg-[#00020f]/60 border border-slate-900 rounded-sm space-y-1 cursor-pointer hover:border-indigo-900/60 transition-all duration-300 relative"
            >
              <div className="absolute top-2 right-2 opacity-40 group-hover:opacity-100 transition-opacity">
                {copiedField === "crypto" ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3 text-indigo-400/60" />
                )}
              </div>
              <span className="text-[9px] text-indigo-400/80 uppercase block">Crypto Wallet</span>
              <p className="text-slate-300 font-bold group-hover:text-white transition-colors">ERC-20 Address</p>
              <p className="text-indigo-400/60 text-[9px] truncate selection:bg-indigo-500">
                0x71C...319a
              </p>
              <p className="text-slate-600 text-[9px] mt-0.5 italic">(No memo required)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;