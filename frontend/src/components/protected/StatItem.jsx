const StatItem = ({ label, value, color }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-sm text-slate-600">{label}</span>
    </div>
    <span className="font-bold text-slate-800">{value}</span>
  </div>
);
export default StatItem;
