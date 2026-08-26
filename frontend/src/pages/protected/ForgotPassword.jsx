import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { sendOtpRequest } from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  // --- State Management ---
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Client-Side Validation ---
  const validateEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailStr) {
      return "Email address is required.";
    }
    if (!emailRegex.test(emailStr)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear errors in real-time as the admin types
    if (error) {
      setError(validateEmail(value));
    }
  };

  // --- Form Submission ---

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final defensive check before hitting the API
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsLoading(true);
    try {
      // API call to trigger the OTP route (Placeholder service logic)
      await sendOtpRequest(email);
      toast.success("OTP verification code sent to your email!");
      
      // Redirect to the OTP verification view, passing email state along if needed
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send verification code... Check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* Layout Wrapper: Uses min-h-screen instead of fixed h-screen 
      to allow flexible scrolling on smaller mobile viewports.
    */
    <div className="min-h-screen bg-[#00020f] flex items-center justify-center p-4 sm:p-6 md:p-8">
      
      {/* Centered Form Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100 transition-all">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Forgot Password?
          </h2>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Enter your admin email address and we'll send you a secure OTP code to reset your account.
          </p>
        </div>

        {/* Form Element */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          
          {/* Email Input Field Group */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 tracking-wider uppercase">
              Admin Email Address
            </label>
            <div className="relative">
              {/* Inline Input Prefix Icon */}
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                </svg>
              </div>
              
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                placeholder="admin@newsdomain.com"
                className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-900 border transition-all placeholder:text-slate-400 outline-none
                  ${error 
                    ? "border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                    : "border-slate-200 focus:border-[#4F46E5] focus:bg-white focus:ring-1 focus:ring-[#4F46E5]"
                  } 
                  disabled:opacity-60 disabled:cursor-not-allowed`}
              />
            </div>
            
            {/* Real-time Inline Validation Alert */}
            {error && (
              <p className="text-xs font-medium text-red-500 flex items-center gap-1 mt-1 animate-fadeIn">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          {/* Action Button: Handles conditional styling configurations during loading states */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 text-white text-sm
              ${isLoading ? "bg-[#4338ca] cursor-not-allowed" : "bg-[#4F46E5] hover:bg-[#4338ca] active:scale-[0.99]"}
            `}
          >
            {isLoading ? (
              <>
                <span>Sending Code</span>
                <ClipLoader size={16} color="#ffffff" />
              </>
            ) : (
              <>
                <span>Request OTP Code</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer Navigation Back to Sign-In Route */}
        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5] hover:text-[#4338ca] transition-colors group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;