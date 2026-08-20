import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = ({ setActivePage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0f19] border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* ================= BRAND ================= */}

          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <h2 className="text-3xl font-black text-white tracking-tight"> WatchMann</h2>

              <span className="rounded bg-red-600 px-2 py-1 text-xs font-semibold uppercase"> News </span>
            </Link>

            <p className="mt-6 leading-8 text-slate-400"> Delivering trusted journalism, breaking news, politics, business,
              technology, sports, entertainment, and stories that matter. </p>
          </div>

          {/* ================= LINKS ================= */}

          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>

            <div className="mt-6 flex flex-col gap-4">
              <Link to="/" className="text-slate-400 hover:text-white"> Home </Link>
              <Link to="/about" className="text-slate-400 hover:text-white"> About </Link>
              <Link to="/contact" className="text-slate-400 hover:text-white"> Contact </Link>
              <Link to="/privacy" className="text-slate-400 hover:text-white"> Privacy Policy </Link>
              <Link to="/terms" className="text-slate-400 hover:text-white"> Terms of Service </Link>
            </div>
          </div>

          {/* ================= CATEGORIES ================= */}

          <div>
            <h3 className="text-lg font-bold text-white">Categories</h3>
            <div className="mt-6 flex flex-col gap-4">
              <Link className="text-slate-400 hover:text-white" to="/news">Politics</Link>
              <Link className="text-slate-400 hover:text-white" to="/news">Business</Link>
              <Link className="text-slate-400 hover:text-white" to="/news"> Technology </Link>
              <Link className="text-slate-400 hover:text-white" to="/news"> Sports </Link>
              <Link className="text-slate-400 hover:text-white" to="/news"> Entertainment </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Newsroom</h3>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <Mail size={18} className="mt-1 text-red-500" />
                <span className="text-slate-400">editor@watchmannnews.com</span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="mt-1 text-red-500" />
                <span className="text-slate-400">+234 800 000 0000</span>
              </div>

              {/* <div className="flex gap-3">
                <MapPin size={18} className="mt-1 text-red-500" />
                <span className="text-slate-400">
                  Warri, Delta State, Nigeria
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="my-12 border-t border-slate-800" />

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-slate-500"> © {currentYear} WatchMann News. All Rights Reserved. </p>

            <p className="mt-2 text-sm italic text-slate-600"> The Eye of the Public </p>
          </div>

          <div className="flex gap-5 flex-wrap">
            <a href="#" className="rounded-full bg-slate-800 p-3 text-slate-400 transition hover:bg-red-600 hover:text-white"> Instagram </a>
            <a href="#" className="rounded-full bg-slate-800 p-3 text-slate-400 transition hover:bg-red-600 hover:text-white"> Facebook </a>
            <a href="#" className="rounded-full bg-slate-800 p-3 text-slate-400 transition hover:bg-red-600 hover:text-white"> Twitter </a>
            <a href="#" className="rounded-full bg-slate-800 p-3 text-slate-400 transition hover:bg-red-600 hover:text-white"> Youtube </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
