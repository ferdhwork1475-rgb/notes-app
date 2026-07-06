const GuideItem = ({ syntax, preview }) => {
  return (
    <div className="grid grid-cols-2 gap-5 p-4">
      <div>
        <p className="text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-semibold">
          Markdown
        </p>

        <code className="block rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-indigo-600 font-mono break-all">
          {syntax}
        </code>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-semibold">
          Preview
        </p>

        <div className="text-sm text-slate-700">{preview}</div>
      </div>
    </div>
  );
};

export default GuideItem;
