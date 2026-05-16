import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import IndexPage from "./pages/public/IndexPage";
import Signup from "./pages/public/Signup";
import Login from "./pages/public/Login";
import Dashboard from "./pages/protected/Dashboard";
import CreateNote from "./pages/protected/CreateNote";
import DashLayout from "./layouts/DashLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/dashboard" element={<DashLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="create-note" element={<CreateNote />} />
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
