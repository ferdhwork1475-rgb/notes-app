import { Plus, Search, User } from "lucide-react";
import Sidebar from "../../components/protected/Sidebar";
import StatItem from "../../components/protected/StatItem";
import NoteCard from "../../components/protected/NoteCard";

const Dashboard = () => {
  return (
    <>
      {/* 2. Main Content Area */}
      <section className="flex-1 flex flex-col overflow-hidden">
        {/* Header / Search */}
        <header className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8">
          <div className="relative w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
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
              <h2 className="text-2xl font-bold text-slate-800">
                Recent Notes
              </h2>
              <p className="text-slate-500 text-sm">
                Pick up where you left off.
              </p>
            </div>
            <select className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-sm outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NoteCard
              title="Project Architecture"
              tag="Engineering"
              date="2h ago"
            />
            <NoteCard
              title="Morning Reflections"
              tag="Personal"
              date="5h ago"
            />
            <NoteCard
              title="React Global State"
              tag="Learning"
              date="Yesterday"
            />
            <NoteCard
              title="API Integration Setup"
              tag="Work"
              date="2 days ago"
            />
          </div>
        </section>
      </section>

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
          <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400">
            Activity Stats
          </h4>
          <StatItem label="Total Notes" value="124" color="bg-indigo-500" />
          <StatItem label="Tags Created" value="18" color="bg-emerald-500" />
          <StatItem label="Shared Links" value="5" color="bg-amber-500" />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
