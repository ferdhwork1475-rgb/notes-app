import { Outlet } from "react-router-dom"
import Sidebar from "../components/protected/Sidebar"

const DashLayout = () => {
  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans">
        <Sidebar />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default DashLayout