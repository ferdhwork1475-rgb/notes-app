import { useState, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Sidebar from "../components/protected/Sidebar";
import { verifyUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const DashLayout = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === false) return navigate("/login");

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <Sidebar />
      <main>
        <Outlet context={{ user }} />
      </main>
    </div>
  );
};

export default DashLayout;
