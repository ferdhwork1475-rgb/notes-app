import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <p className="text-xl font-bold tracking-tight text-[#00020f]">
            Stillness <span className="text-[#4F46E5]">Notes</span>
          </p>
        </div>

        {/* Navigation Links - Hidden on Mobile, Flex on Desktop */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <li className={activePage === "home" ? "text-[#4F46E5]" : ""}>
            <Link
              to="/"
              className="hover:text-[#4F46E5] transition-colors"
              onClick={() => setActivePage("home")}
            >
              Features
            </Link>
          </li>
          <li className={activePage === "pricing" ? "text-[#4F46E5]" : ""}>
            <Link
              to="/pricing"
              className="hover:text-[#4F46E5] transition-colors"
              onClick={() => setActivePage("pricing")}
            >
              Pricing
            </Link>
          </li>
          <li className={activePage === "about" ? "text-[#4F46E5]" : ""}>
            <Link
              to="/about"
              className="hover:text-[#4F46E5] transition-colors"
              onClick={() => setActivePage("about")}
            >
              About
            </Link>
          </li>
                    <li className={activePage === "notes" ? "text-[#4F46E5]" : ""}>
            <Link
              to="/note"
              className="hover:text-[#4F46E5] transition-colors"
              onClick={() => setActivePage("notes")}
            >
              Notes
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-[#4F46E5] transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#4F46E5] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#4338ca] transition-all shadow-sm hover:shadow-md"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
