import { ShieldAlert, ArrowLeft, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminNotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 md:p-14 text-center">

          {/* Icon */}
          <div className="mx-auto w-20 h-20 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <ShieldAlert size={38} />
          </div>

          {/* 404 */}
          <h1 className="mt-8 text-7xl md:text-8xl font-black tracking-tight text-slate-900">
            404
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-800">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="mt-4 text-slate-500 leading-7 max-w-lg mx-auto">
            The page you're trying to access doesn't exist, may have been
            removed, or the URL is incorrect.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

            <button
              onClick={() => navigate("/admin")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

          </div>

          {/* Footer */}
          <div className="mt-10 border-t border-slate-100 pt-6">
            <p className="text-sm text-slate-400">
              News Admin Panel • Content Management System
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}

export default AdminNotFound;