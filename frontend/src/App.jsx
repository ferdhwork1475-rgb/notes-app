import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import IndexPage from "./pages/public/IndexPage";
import Signup from "./pages/public/Signup";
import Login from "./pages/public/Login";
import NewsLibrary from "./pages/public/NewsLibrary";
import AboutPage from "./pages/public/AboutPage";
import Dashboard from "./pages/protected/Dashboard";
import CreateNote from "./pages/protected/CreateNote";
import DashLayout from "./layouts/DashLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ContactPage from "./pages/public/ContactPage";
import ViewNote from "./pages/protected/ViewNote";
import EditNote from "./pages/protected/EditNote";
import AdminProfile from "./pages/protected/AdminProfile";
import ForgotPassword from "./pages/protected/ForgotPassword";
import VerifyOtp from "./pages/protected/VerifyOtp";
import ResetPassword from "./pages/protected/ResetPassword";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<IndexPage />} />
              <Route path="/newslibrary" element={<NewsLibrary />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="notes/:id" element={<ViewNote />} />
            </Route>
            <Route path="/dashboard" element={<DashLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="create-note" element={<CreateNote />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="notes/edit-note/:id" element={<EditNote />} />
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
      </AuthProvider>
    </>
  );
};

export default App;
