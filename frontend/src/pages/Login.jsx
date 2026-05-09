import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}login`,
        {
          email,
          password,
        },
      );
      toast.success("Login successful");
    } catch (error) {
      toast.error("An error occurred");
      console.log(error.response);
      if (error.response && error.response.data) {
        const backendError = error.response.data.error;
        if (Array.isArray(backendError)) {
          backendError.map((err) => toast.error(err));
        }
      } else {
        toast.error("Network error or server is down");
      }
    }
  };
  return (
    <>
      <Navbar />
      <section className="min-h-screen flex flex-col md:flex-row bg-white justify-center">
        {/* Left Side: Signup Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12">
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-[#00020f] mb-2">
              Welcome Back
            </h3>
            <p className="text-gray-500">Return to your space of clarity.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {" "}
            {/* Email Input Group */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 group-focus-within:text-[#4F46E5] transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all"
                  required
                />
              </div>
            </div>
            {/* Password Input Group */}
            <div className="group">
              <label
                htmlFor="password"
                className="flex justify-between text-sm font-medium text-gray-700 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors"
              >
                Password
                <Link to="/forgot-password" className="text-gray">
                  Forgot Password?
                </Link>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 group-focus-within:text-[#4F46E5] transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 transition-all"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#4F46E5] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-200"
            >
              Sign In
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>

          <div className="mt-8 space-y-4 text-center">
            <p className="text-xs text-gray-400 px-6">New to Stillness? </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5] hover:gap-3 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Create an account
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
