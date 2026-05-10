const NavItem = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-400"}`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);
export default NavItem;
