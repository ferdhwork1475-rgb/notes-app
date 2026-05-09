import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import Navbar from "../components/Navbar";
import stillness_sign from "../assets/stillness_sign.png";

const Signup = () => {
  // State variables for form fields and UI states
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [suggestedUsernames, setSuggestedUsernames] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateUsernames = async () => {
    if (fullname === "") {
      toast.error(
        "Please enter your full name to generate username suggestions.",
      );
      return;
    }

    try {
      // Fetch usernames from the server
      setIsLoading(true);
      const apiUrl = `${import.meta.env.VITE_BACKEND_API_URL}suggest-usernames`;
      const response = await axios.post(apiUrl, { fullname });
      const suggestions = response.data;
      setSuggestedUsernames(suggestions);
      setIsLoading(false);
      toast.success("Generated successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error("Cannot generate usernames. Check your internet connection");
    }
  };

  const showPassword = () => {
    const passwordInput = document.getElementById("password");
    passwordInput.type === "password"
      ? (passwordInput.type = "text")
      : (passwordInput.type = "password");
  };

  useEffect(() => {
    // Clear suggestions if fullname changes
    setSuggestedUsernames([]);
  }, [fullname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}register`, formData)
      toast.success("Registration successful");
    } catch (error) {
      setIsSubmitting(false);

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
      <section className="min-h-screen flex flex-col md:flex-row bg-white">
        {/* Left Side: Signup Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-[#00020f] mb-2">
              Create your space
            </h3>
            <p className="text-gray-500">
              Begin your journey into digital stillness.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="group">
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors"
              >
                Full Name
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] transition-all"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* NEW: Username Field with Generator */}
            <div className="group">
              <label
                htmlFor="username"
                className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors"
              >
                Username
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1 flex items-center">
                  <span className="absolute left-4 text-gray-400 group-focus-within:text-[#4F46E5] transition-colors text-sm font-bold">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="thinker_01"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] transition-all"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-[#4F46E5] hover:text-white transition-all font-medium text-sm flex items-center gap-2"
                  onClick={loading ? null : generateUsernames}
                >
                  {loading ? (
                    <ClipLoader color="#4F46E5" size={14} />
                  ) : (
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  )}
                  {loading ? "Generating" : "Generate"}
                </button>
              </div>
              {/* Username Suggestions Div */}
              {suggestedUsernames.map((username) => (
                <div
                  className="mt-2 flex flex-wrap gap-2 min-h-6 w-full"
                  key={username}
                  onClick={(e) => setUsername(username)}
                >
                  <span className="text-[10px] bg-indigo-50 text-[#4F46E5] px-2 py-1 rounded-md cursor-pointer hover:bg-indigo-100 border border-indigo-100 transition-colors">
                    {username}
                  </span>
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors"
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
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors"
              >
                Password
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
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 text-gray-400 hover:text-[#4F46E5]"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    onClick={showPassword}
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

            <div className="group">
              <label
                htmlFor="profileImg"
                className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors"
              >
                Profile Image (Optional)
              </label>
              <div className="relative flex items-center">
                <input
                  type="file"
                  name="profileImg"
                  id="profileImg"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#4F46E5] hover:file:bg-indigo-100 cursor-pointer"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`${isSubmitting ? "bg-[#4338ca]" : "bg-[#4F46E5]"} w-full bg-[#4F46E5] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-100 mt-4`}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              {isSubmitting ? (
                <ClipLoader color="#fff" size={18} />
              ) : (
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
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#4F46E5] transition-all"
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
              Back to login
            </Link>
          </div>
        </div>

        {/* Right Side Image Showcase */}
        <div className="hidden md:flex w-1/2 bg-[#334155] items-center justify-center p-12">
          <div className="max-w-md text-center">
            <img
              src={stillness_sign}
              alt="Stillness Sign"
              className="w-full h-auto rounded-3xl shadow-2xl mb-8 transform -rotate-1 hover:rotate-0 transition-transform duration-700"
            />
            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">
              Design for thinkers
            </h4>
            <p className="text-slate-300 leading-relaxed">
              A cognitive environment free from visual noise.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup;
