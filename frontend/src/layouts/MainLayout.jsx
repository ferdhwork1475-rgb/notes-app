import { Outlet } from "react-router-dom"
import { useState } from "react"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer";

const MainLayout = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <div>
        <Navbar setActivePage={setActivePage} activePage={activePage} />
        <main>
            <Outlet context={[setActivePage]} />
        </main>
        <Footer />
    </div>
  )
}

export default MainLayout