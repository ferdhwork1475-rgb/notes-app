import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/protected/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { verifyUser } from "../services/authService";

const DashLayout = () => {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyUser()
        setLoading(false);
        setUser(response);
      } catch (error) {
        toast.error(error.response?.data.message || "Admin authentication failed. Please log in.");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [])
  
    if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 min-h-screen">
        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-xs font-medium text-slate-400 mt-3 animate-pulse">
          Loading ...
        </p>
      </div>
    );
  }

    if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 min-h-screen p-4">
        <p className="text-sm font-semibold text-slate-700">
          Invalid access
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-xs font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-all"
        >
          Please log in to access the dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#f8fafc] text-slate-900 font-sans overflow-hidden">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8fafc]">
        <Outlet context={user} />
      </main>

    </div>
  );
};

export default DashLayout;
