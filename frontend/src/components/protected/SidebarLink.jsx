const SidebarLink = ({ to, icon, label, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 outline-none ${
          isActive
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10 font-semibold"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
        }`
      }
    >
      <div className="shrink-0">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarLink;