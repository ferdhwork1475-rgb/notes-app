import React from 'react'

const Sidebar = () => {
  return (
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
  )
}

export default Sidebar