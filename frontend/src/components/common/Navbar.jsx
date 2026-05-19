import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

const Navbar = ({ setActivePage, activePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", path: "/", key: "home" },
    { name: "All News", path: "/newslibrary", key: "news" },
    { name: "Pricing", path: "/pricing", key: "pricing" },
    { name: "About", path: "/about", key: "about" },
  ];

  const handleNavClick = (key) => {
    setActivePage(key);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80">
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-8">
        
        {/* Editorial Logo Area */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group" 
          onClick={() => handleNavClick("home")}
        >
          <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-sm tracking-wider">S</span>
          </div>
          <p className="text-lg font-serif font-black tracking-tight text-white uppercase">
            Stillness <span className="text-red-500 font-sans font-medium text-xs bg-slate-900 border border-slate-800 px-1.5 py-0.5 ml-1 rounded-sm tracking-normal normal-case">Digest</span>
          </p>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
          {navigationItems.map((item) => (
            <li key={item.key}>
              <Link
                to={item.path}
                className={`transition-colors duration-200 relative py-1 hover:text-white ${
                  activePage === item.key 
                    ? "text-red-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-500" 
                    : "text-slate-400"
                }`}
                onClick={() => handleNavClick(item.key)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Button - Editorial Style CTA */}
        <div className="hidden md:flex items-center">
          <Link
            to="/signup"
            className="flex items-center gap-1 bg-slate-900 text-white border border-slate-800 hover:border-slate-700 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-slate-800/50 transition-all"
            onClick={() => handleNavClick("signup")}
          >
            <span>Subscribe</span>
            <ArrowUpRight size={14} className="text-slate-500" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b0f19] px-4 pt-2 pb-6 space-y-4 animate-fadeIn">
          <ul className="flex flex-col space-y-3 text-sm font-medium tracking-wide">
            {navigationItems.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.path}
                  className={`block py-2 px-3 rounded-sm transition-colors ${
                    activePage === item.key
                      ? "bg-slate-900 text-red-500 font-bold border-l-2 border-red-500"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                  }`}
                  onClick={() => handleNavClick(item.key)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="pt-4 border-t border-slate-900 px-3">
            <Link
              to="/signup"
              className="block w-full text-center bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors"
              onClick={() => handleNavClick("signup")}
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;