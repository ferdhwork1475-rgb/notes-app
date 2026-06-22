import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ setActivePage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0f19] border-t border-slate-800/80 max-w-full mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
      {/* Footer Navigation Links */}
      <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-semibold uppercase tracking-wider">
        <Link
          to="/"
          className="text-slate-400 hover:text-white transition-colors duration-200"
          onClick={() => setActivePage && setActivePage("home")}
        >
          Privacy policy
        </Link>
        <Link
          to="/"
          className="text-slate-400 hover:text-white transition-colors duration-200"
          onClick={() => setActivePage && setActivePage("home")}
        >
          Terms of service
        </Link>
        <Link
          to="/contact"
          className="text-slate-400 hover:text-white transition-colors duration-200"
          onClick={() => setActivePage && setActivePage("signup")}
        >
          Contact
        </Link>
      </div>

      {/* Brand & Copyright Info */}
      <div className="text-center md:text-right flex flex-col gap-1">
        <p className="text-slate-400 text-sm font-light">
          © {currentYear}{" "}
          <span className="text-white font-serif font-black tracking-tight uppercase">
            WatchMann <span className="text-red-500 font-sans font-medium text-xs bg-slate-900 border border-slate-800 px-1.5 py-0.5 ml-0.5 rounded-sm normal-case tracking-normal">News</span>
          </span>
        </p>
        <p className="text-slate-600 text-[11px] font-sans font-medium uppercase tracking-widest italic">
          The Eye of the Public
        </p>
      </div>
    </footer>
  );
};

export default Footer;