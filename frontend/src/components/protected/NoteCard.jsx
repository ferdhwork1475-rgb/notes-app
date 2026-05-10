const NoteCard = ({ title, tag, date }) => (
  <div className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
        {tag}
      </span>
      <span className="text-xs text-slate-400">{date}</span>
    </div>
    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">
      {title}
    </h4>
    <p className="text-sm text-slate-500 line-clamp-2">
      Brief preview of the content within this note to give the user context...
    </p>
  </div>
);
export default NoteCard;
