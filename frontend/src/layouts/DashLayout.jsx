import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import Sidebar from "../components/protected/Sidebar";
import StatItem from "../components/protected/StatItem";
import { AuthContext } from "../context/AuthContext";

const DashLayout = () => {
  const [user, setState] = useState("")
  return (
    <div className="flex h-screen w-screen bg-[#f8fafc] text-slate-900 font-sans overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8fafc]">
        <Outlet />
      </main>

    </div>
  );
};

export default DashLayout;
