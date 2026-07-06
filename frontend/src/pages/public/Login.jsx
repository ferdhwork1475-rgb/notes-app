import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { loginUser } from "../../services/authService";

const Login = ({ setActive }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Real-time client-side validator helper
  const validateForm = () => {
    let valid = true;
    let localErrors = { email: "", password: "" };

    // Standard RFC email syntax pattern validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      localErrors.email = "Email address is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      localErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password baseline rules checking
    if (!password) {
      localErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      localErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(localErrors);
    return valid;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Clear the individual email error as soon as the admin resumes typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Clear the individual password error as soon as the admin resumes typing
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent proceeding to database call if client checks fail
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await loginUser(email, password);
      navigate("/admin");
    } catch (error) {
      console.error("Login attempt failed in component:", error.response || error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 transition-all">
        
        {/* Header/Branding */}
        <div className="text-center">
          <h3 className="text-3xl font-extrabold text-[#00020f] tracking-tight mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-gray-500">
            Sign in to access your administrative dashboard.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          
          {/* Email Input Group */}
          <div className="group">
            <label
              htmlFor="email"
              className={`block text-sm font-semibold mb-1.5 transition-colors ${
                errors.email ? "text-red-500" : "text-gray-700 group-focus-within:text-[#4F46E5]"
              }`}
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className={`absolute left-4 transition-colors ${
                errors.email ? "text-red-400" : "text-gray-400 group-focus-within:text-[#4F46E5]"
              }`}>
                <Mail className="w-5 h-5" strokeWidth={2} />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="admin@newsportal.com"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:bg-white focus:ring-4 disabled:opacity-60 transition-all text-gray-900 placeholder-gray-400 font-medium ${
                  errors.email 
                    ? "border border-red-300 focus:border-red-500 focus:ring-red-500/10" 
                    : "border border-gray-200 focus:border-[#4F46E5] focus:ring-[#4F46E5]/10"
                }`}
                required
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-500 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Input Group */}
          <div className="group">
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="password"
                className={`block text-sm font-semibold transition-colors ${
                  errors.password ? "text-red-500" : "text-gray-700 group-focus-within:text-[#4F46E5]"
                }`}
              >
                Password
              </label>
              <Link 
                to="/forgot-password" 
                className="text-xs font-semibold text-gray-400 hover:text-[#4F46E5] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            
            <div className="relative flex items-center">
              <span className={`absolute left-4 transition-colors ${
                errors.password ? "text-red-400" : "text-gray-400 group-focus-within:text-[#4F46E5]"
              }`}>
                <Lock className="w-5 h-5" strokeWidth={2} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                className={`w-full pl-12 pr-12 py-3 bg-gray-50 rounded-xl outline-none focus:bg-white focus:ring-4 disabled:opacity-60 transition-all text-gray-900 placeholder-gray-400 font-medium ${
                  errors.password 
                    ? "border border-red-300 focus:border-red-500 focus:ring-red-500/10" 
                    : "border border-gray-200 focus:border-[#4F46E5] focus:ring-[#4F46E5]/10"
                }`}
                required
              />
              <button
                type="button"
                tabIndex="-1"
                disabled={isLoading}
                className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-500 animate-fadeIn">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 select-none text-sm mt-2
              ${isLoading ? "bg-[#4338ca] opacity-90 cursor-not-allowed" : "bg-[#4F46E5] hover:bg-[#4338ca] hover:shadow-indigo-200 active:scale-[0.98]"}`}
          >
            {isLoading ? (
              <>
                <span>Signing In</span>
                <ClipLoader color="#fff" size={14} />
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Link */}
        <div className="pt-4 text-center border-t border-gray-100">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#4F46E5] hover:gap-3 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Create an admin account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;