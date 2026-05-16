import { useContext, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import Sidebar from "../components/protected/Sidebar";
import StatItem from "../components/protected/StatItem";
import { AuthContext } from "../context/AuthContext";

const DashLayout = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn == false) return navigate("/login");
  }, []);

  return (
    <div className="flex h-screen w-screen bg-[#f8fafc] text-slate-900 font-sans overflow-hidden">
      {/* 1. Left Navigation Sidebar */}
      <Sidebar />

      {/* 2. Center Content Work Area (The Canvas) */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8fafc]">
        <Outlet />
      </main>

      {/* 3. Right User Utility Information Side Panel */}
      <section className="w-80 bg-white border-l border-slate-200 p-8 hidden xl:flex flex-col justify-between h-full">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm overflow-hidden">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={40} className="text-indigo-600" />
            )}
          </div>
          <h3 className="font-bold text-lg text-slate-800">
            {user?.fullname || "User Profile"}
          </h3>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full mt-1">
            Free Plan
          </span>
        </div>

        <div className="space-y-4 my-auto flex-1 flex flex-col justify-center">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-2">
            Activity Stats
          </h4>
          <StatItem label="Total Notes" value="124" color="bg-indigo-500" />
          <StatItem label="Tags Created" value="18" color="bg-emerald-500" />
        </div>
      </section>
    </div>
  );
};

export default DashLayout;
