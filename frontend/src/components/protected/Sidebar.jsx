import { FileText, Hash, Settings, LogOut, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink"

const Sidebar = () => {
  // Mock logout handler - hook this up to your AuthContext later!
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col p-6 h-full shrink-0 border-r border-slate-800">
      {/* Brand Logo Header */}
      <div className="flex items-center gap-3 mb-10 px-2 shrink-0">
        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-900/30">
          <span className="text-white font-black text-lg tracking-wider">S</span>
        </div>
        <Link to="/dashboard" className="text-white font-bold text-xl tracking-tight hover:opacity-90 transition-opacity">
          Stillness
        </Link>
      </div>

      {/* Main Navigation Streams */}
      <nav className="flex-1 space-y-1">
        <SidebarLink to="/dashboard" icon={<FileText size={18} />} label="All Notes" end />
        <SidebarLink to="/dashboard/create-note" icon={<PlusCircle size={18} />} label="Create Note" />
        <SidebarLink to="/dashboard/tags" icon={<Hash size={18} />} label="Tags" />
        <SidebarLink to="/dashboard/settings" icon={<Settings size={18} />} label="Settings" />
      </nav>

      {/* Footer Interactive Actions Section */}
      <div className="mt-auto pt-4 border-t border-slate-800/60 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 outline-none"
        >
          <LogOut size={18} className="shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;