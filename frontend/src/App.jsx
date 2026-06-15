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
import NoteEditor from "./pages/protected/NoteEditor";
import DashLayout from "./layouts/DashLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ContactPage from "./pages/public/ContactPage";
import ViewNote from "./pages/protected/ViewNote";

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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="notes/:id" element={<ViewNote />} />
            </Route>
            <Route path="/dashboard" element={<DashLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="create-note" element={<CreateNote />} />
              <Route path="notes" element={<NoteEditor />} />
              <Route path="notes/:id" element={<ViewNote />} />
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
