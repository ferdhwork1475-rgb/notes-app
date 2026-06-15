import { useState } from "react";
import { 
  FileText, 
  Hash, 
  Settings, 
  LogOut, 
  PlusCircle, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight,
  User 
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  // Mobile / Tablet Drawer State
  const [isOpen, setIsOpen] = useState(false);
  // Desktop Sidebar Persistent Collapse State (Wide vs Icon Only Mode)
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMobileDrawer = () => setIsOpen(!isOpen);
  const closeMobileDrawer = () => setIsOpen(false);
  const toggleDesktopCollapse = () => setIsCollapsed(!isCollapsed);

  // Mock logout handler
  const handleLogout = () => {
    console.log("Logging out user session...");
    closeMobileDrawer();
  };

  // Mock active authenticated user data block 
  // (Wire this contextually to your Auth state layer later)
  const mockUser = {
    name: "Alex Mercer",
    email: "alex@stillness.io",
    avatarUrl: null // set to a link string once profile uploads are working
  };

  // Centralized navigation items structure
  const navItems = [
    { to: "/dashboard", icon: <FileText size={18} />, label: "All Notes", end: true },
    { to: "/dashboard/create-note", icon: <PlusCircle size={18} />, label: "Create Note" },
    { to: "/dashboard/tags", icon: <Hash size={18} />, label: "Tags" },
    { to: "/dashboard/settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  return (
    <>
      {/* 1. MOBILE TOP ACTION BAR & NAVIGATION TRIGGER */}
      <div className="md:hidden w-full bg-[#0f172a] text-slate-300 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-900/30">
            <span className="text-white font-black text-sm tracking-wider">S</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Stillness</span>
        </div>
        
        <button
          onClick={toggleMobileDrawer}
          aria-label="Toggle navigation menu"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-500/50"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 2. TRANSLUCENT DIM OVERLAY (Mobile & Tablet Viewports Only) */}
      {isOpen && (
        <div
          onClick={closeMobileDrawer}
          className="md:hidden fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* 3. CORE CORE NAVIGATION WORKSPACE CONTAINER */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 md:z-auto
          bg-[#0f172a] text-slate-300 flex flex-col p-4 h-screen shrink-0 border-r border-slate-800/80
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-20" : "md:w-64"}
          md:sticky md:top-0
        `}
      >
        {/* Brand Logo Header Block */}
        <div className={`flex items-center justify-between mb-8 px-2 shrink-0 ${isCollapsed ? "md:justify-center" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-900/30 shrink-0">
              <span className="text-white font-black text-lg tracking-wider">S</span>
            </div>
            {(!isCollapsed || isOpen) && (
              <Link
                to="/"
                onClick={closeMobileDrawer}
                className="text-white font-bold text-xl tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap animate-fadeIn"
              >
                Stillness
              </Link>
            )}
          </div>

          {/* Mobile Drawer Close Icon Button */}
          <button
            onClick={closeMobileDrawer}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>

          {/* Desktop Chevron Expand/Collapse Toggle Handle Button */}
          {(!isCollapsed && !isOpen) && (
            <button
              onClick={toggleDesktopCollapse}
              className="hidden md:flex p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 rounded-lg transition-colors border border-transparent hover:border-slate-700/50"
              title="Collapse Sidebar"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Hidden Inline Restore Button for Collapsed Desktop State */}
        {(isCollapsed && !isOpen) && (
          <div className="hidden md:flex justify-center mb-6">
            <button
              onClick={toggleDesktopCollapse}
              className="p-2 bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-indigo-400 rounded-xl transition-all duration-200 border border-slate-700/30"
              title="Expand Sidebar"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Main Streams Sub-Navigation Links Tree */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1 custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeMobileDrawer}
              title={isCollapsed ? item.label : ""}
              className={({ isActive }) => `
                w-full flex items-center rounded-xl text-sm font-medium transition-all duration-200 outline-none select-none group
                ${isCollapsed ? "md:justify-center md:px-0 md:py-3" : "px-4 py-3"}
                ${isActive 
                  ? "bg-indigo-600/15 text-indigo-400 border-l-2 border-indigo-500 font-semibold" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-l-2 border-transparent"
                }
              `}
            >
              <span className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${isCollapsed ? "" : "mr-3.5"}`}>
                {item.icon}
              </span>
              {(!isCollapsed || isOpen) && (
                <span className="whitespace-nowrap animate-fadeIn">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Structural Identity & Interactive Actions Container */}
        <div className="mt-auto pt-4 border-t border-slate-800/60 shrink-0 space-y-2">
          
          {/* USER PROFILE CARD IDENTITY EXTENSION */}
          <div 
            className={`
              flex items-center rounded-xl transition-colors duration-200
              ${isCollapsed ? "justify-center p-0" : "bg-slate-900/40 p-2.5 border border-slate-800/40"}
            `}
          >
            {/* Conditional Avatar Thumbnail Framework */}
            {mockUser.avatarUrl ? (
              <img 
                src={mockUser.avatarUrl} 
                alt={mockUser.name} 
                className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-700/50"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-indigo-400 flex items-center justify-center border border-slate-700/40 shrink-0">
                <User size={16} />
              </div>
            )}

            {/* Profile Meta Info Strings (Hidden when panel is running icon-only collapsed variant) */}
            {(!isCollapsed || isOpen) && (
              <div className="ml-3 overflow-hidden text-left animate-fadeIn">
                <p className="text-xs font-semibold text-slate-200 truncate leading-none mb-1">
                  {mockUser.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate leading-none">
                  {mockUser.email}
                </p>
              </div>
            )}
          </div>

          {/* LOGOUT INTERACTIVE TRIGGER ACTION CONTAINER */}
          <button
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : ""}
            className={`
              w-full flex items-center rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border-l-2 border-transparent transition-all duration-200 outline-none
              ${isCollapsed ? "md:justify-center md:px-0 md:py-3" : "px-4 py-3"}
            `}
          >
            <LogOut size={18} className={`shrink-0 ${isCollapsed ? "" : "mr-3.5"}`} />
            {(!isCollapsed || isOpen) && (
              <span className="whitespace-nowrap animate-fadeIn">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;