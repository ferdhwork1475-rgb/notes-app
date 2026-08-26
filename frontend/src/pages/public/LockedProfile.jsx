import React from "react";
import { Lock, Sparkles, X } from "lucide-react";

const LockedProfile = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute right-5 top-5 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        {/* Top Gradient */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600" />

        <div className="px-8 py-10 text-center">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 shadow-sm">
            <Lock size={36} />
          </div>

          {/* Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <Sparkles size={14} />
            Coming Soon
          </div>

          {/* Title */}
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900">
            Profile Locked
          </h2>

          {/* Description */}
          <p className="mt-4 text-sm leading-7 text-slate-500">
            Your administrator profile section is currently unavailable while we
            build new account management features.
          </p>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            This page will soon allow you to update your profile information,
            change your password, manage preferences, and view account activity.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate(-1)}
            className="mt-8 w-full rounded-2xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LockedProfile;
