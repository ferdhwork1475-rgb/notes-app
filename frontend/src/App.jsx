import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import IndexPage from "./pages/public/IndexPage";
import Signup from "./pages/public/Signup";
import Login from "./pages/public/Login";
import News from "./pages/public/News";
import AboutPage from "./pages/public/AboutPage";
import Dashboard from "./pages/protected/Dashboard";
import CreateArticle from "./pages/protected/CreateArticle";
import DashLayout from "./layouts/DashLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ContactPage from "./pages/public/ContactPage";
import ViewArticle from "./pages/protected/ViewArticle";
import EditArticle from "./pages/protected/EditArticle";
import AdminProfile from "./pages/protected/AdminProfile";
import ForgotPassword from "./pages/protected/ForgotPassword";
import VerifyOtp from "./pages/protected/VerifyOtp";
import ResetPassword from "./pages/protected/ResetPassword";
import AdminNotFound from "./pages/protected/AdminNotFound";
import NotFound from "./pages/public/NotFound";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<IndexPage />} />
              <Route path="/news" element={<News />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="articles/:slug" element={<ViewArticle />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<DashLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="articles/create" element={<CreateArticle />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="articles/edit/:slug" element={<EditArticle />} />
              <Route path="*" element={<AdminNotFound />} />
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
