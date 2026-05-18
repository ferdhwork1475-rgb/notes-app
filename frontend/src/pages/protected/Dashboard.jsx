import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import NoteCard from "../../components/protected/NoteCard";
import { fetchNotes } from "../../services/authService";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      const response = await fetchNotes();
      try {
        if (response) {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // fetchAllNotes();
  }, []);
  return (
    <section className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header Action Navbar */}
      <header className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
        <div className="relative w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search your knowledge base..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <Link
          to="/dashboard/create-note"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-sm shadow-indigo-200 active:scale-95"
        >
          <Plus size={18} /> New Note
        </Link>
      </header>

      {/* Internal Grid Explorer Container */}
      <section className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Recent Notes
            </h2>
            <p className="text-slate-500 text-sm">
              Pick up right where you left off.
            </p>
          </div>
          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 shadow-sm outline-none cursor-pointer hover:bg-slate-50 transition-colors">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map((note) => {
              <NoteCard
                title="Project Architecture"
                tag="Engineering"
                date="2h ago"
                key={note.id

                }
              />;
            })
          ) : (
            <p>Start writing now</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
