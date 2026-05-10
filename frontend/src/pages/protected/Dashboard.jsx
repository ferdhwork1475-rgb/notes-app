import React from 'react';
import { Plus, Search, Settings, FileText, Hash, BarChart2, User } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans">
      
      {/* 1. Global Sidebar */}
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className="text-white font-bold text-xl tracking-tight">Stillness</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<FileText size={18} />} label="All Notes" active />
          <NavItem icon={<Hash size={18} />} label="Tags" />
          <NavItem icon={<BarChart2 size={18} />} label="Analytics" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="mt-auto p-4 bg-slate-800/50 rounded-xl">
          <p className="text-xs text-slate-400 mb-2">Storage</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-2/3"></div>
          </div>
          <p className="text-[10px] mt-2">6.2 GB of 10 GB used</p>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header / Search */}
        <header className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search your knowledge base..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-md active:scale-95">
            <Plus size={18} /> New Note
          </button>
        </header>

        {/* Dashboard Grid */}
        <section className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Recent Notes</h2>
              <p className="text-slate-500 text-sm">Pick up where you left off.</p>
            </div>
            <select className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-sm outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NoteCard title="Project Architecture" tag="Engineering" date="2h ago" />
            <NoteCard title="Morning Reflections" tag="Personal" date="5h ago" />
            <NoteCard title="React Global State" tag="Learning" date="Yesterday" />
            <NoteCard title="API Integration Setup" tag="Work" date="2 days ago" />
          </div>
        </section>
      </main>

      {/* 3. Right Profile/Stats Panel */}
      <section className="w-80 bg-white border-l border-slate-200 p-8 hidden xl:flex flex-col">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
            <User size={40} className="text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg">Alex River</h3>
          <p className="text-slate-500 text-sm">Free Plan</p>
        </div>

        <div className="space-y-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400">Activity Stats</h4>
          <StatItem label="Total Notes" value="124" color="bg-indigo-500" />
          <StatItem label="Tags Created" value="18" color="bg-emerald-500" />
          <StatItem label="Shared Links" value="5" color="bg-amber-500" />
        </div>
      </section>
    </div>
  );
};

// Sub-components for cleaner code
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const NoteCard = ({ title, tag, date }) => (
  <div className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">{tag}</span>
      <span className="text-xs text-slate-400">{date}</span>
    </div>
    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">{title}</h4>
    <p className="text-sm text-slate-500 line-clamp-2">Brief preview of the content within this note to give the user context...</p>
  </div>
);

const StatItem = ({ label, value, color }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-sm text-slate-600">{label}</span>
    </div>
    <span className="font-bold text-slate-800">{value}</span>
  </div>
);

export default Dashboard;