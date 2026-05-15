import { useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import StatItem from "../components/protected/StatItem";
import Sidebar from "../components/protected/Sidebar";
import { verifyUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const DashLayout = () => {
  const [fullname, setFullname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const checkAuth = async () => {
    try {
      const response = await verifyUser();
      if (!response.user) {
        toast.error("Login agian");
        return;
      }
      setFullname(response.user.fullname);
      setProfileImage(response.user.profileImage);
      setIsLoggedIn(true);
    } catch (error) {
      navigate("/login");
    }
  };

  checkAuth();

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <section className="w-80 bg-white border-l border-slate-200 p-8 hidden xl:flex flex-col">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm overflow-hidden">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg">{fullname}</h3>
          <p className="text-slate-500 text-sm">Free Plan</p>
        </div>

        <div className="space-y-6">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400">
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
