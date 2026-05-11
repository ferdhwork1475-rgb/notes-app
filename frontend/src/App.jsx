import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import IndexPage from "./pages/public/IndexPage";
import Signup from "./pages/public/Signup";
import Login from "./pages/public/Login";
import Dashboard from "./pages/protected/Dashboard";
import DashLayout from "./layouts/DashLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "../context/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/dashboard" element={<DashLayout />}>
              <Route index element={<Dashboard />} />{" "}
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
    </>
  );
};

export default App;
