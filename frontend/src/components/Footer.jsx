import React from "react";

const Footer = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-8 text-sm text-slate-400">
        <p className="hover:text-white cursor-pointer transition-colors">
          Privacy policy
        </p>
        <p className="hover:text-white cursor-pointer transition-colors">
          Terms of service
        </p>
        <p className="hover:text-white cursor-pointer transition-colors">
          Contact
        </p>
      </div>

      <p className="text-slate-400 text-sm font-light">
        © 2024 <span className="text-white font-medium">Stillness Notes</span>.
        Designed for thinkers.
      </p>
    </section>
  );
};

export default Footer;
