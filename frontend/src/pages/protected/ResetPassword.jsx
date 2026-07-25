import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { finalizeResetPasswordApiCall } from "../../services/authService";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Route state data transfer metrics passing parameters onward
  const email = location.state?.email || "";
  const token = location.state?.token || "";

  // --- State Configuration ---
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- Live Visual Security Criteria Checklist ---
  const [criteria, setCriteria] = useState({
    minLength: false,
    hasNumber: false,
    hasSymbol: false,
    matches: false,
  });

  useEffect(() => {
    setCriteria({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSymbol: /[^A-Za-z0-9]/.test(password),
      matches: password.length > 0 && password === confirmPassword,
    });
  }, [password, confirmPassword]);

  // --- Form Validation Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify all core status checkboxes pass security clearance checks
    if (!criteria.minLength || !criteria.hasNumber || !criteria.hasSymbol) {
      toast.error("Please satisfy all security password complexity policies.");
      return;
    }

    if (!criteria.matches) {
      toast.error("Confirmation input mismatch detected.");
      return;
    }

    setIsLoading(true);
    try {
      // API invocation placeholder logic targeting credentials endpoint
      await finalizeResetPasswordApiCall(email, token, password);

      toast.success("Password updated successfully! Redirecting...");

      // Delay navigation slightly so the admin reads the toast message cleanly
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to finalize new password updates.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* Layout Container Wrapper: Using min-h-screen for absolute vertical flexibility */
    <div className="min-h-screen bg-[#00020f] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Central Content Module Card Wrapper */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100 transition-all">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Create a secure, complex password to finish restoring access to your
            admin dashboard.
          </p>
        </div>

        {/* Input Interactive Execution Layout Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* New Password Input Box Configuration */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-slate-700 tracking-wider uppercase"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#4F46E5] focus:bg-white focus:ring-1 focus:ring-[#4F46E5]"
              />
              {/* Visibility eye toggle click mechanism */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
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
                      d="M13.875 18.825A10.05 10.05 0 0112  19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input Box Configuration */}
          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold text-slate-700 tracking-wider uppercase"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#4F46E5] focus:bg-white focus:ring-1 focus:ring-[#4F46E5]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? (
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
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Real-time Validation Visual Checklist Feed */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
              Password Requirements
            </p>

            <div className="flex items-center gap-2 text-xs font-medium">
              <span
                className={`transition-colors ${criteria.minLength ? "text-green-500" : "text-slate-400"}`}
              >
                {criteria.minLength ? "✓" : "○"} At least 8 characters length
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium">
              <span
                className={`transition-colors ${criteria.hasNumber ? "text-green-500" : "text-slate-400"}`}
              >
                {criteria.hasNumber ? "✓" : "○"} At least one numeric digit
                (0-9)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium">
              <span
                className={`transition-colors ${criteria.hasSymbol ? "text-green-500" : "text-slate-400"}`}
              >
                {criteria.hasSymbol ? "✓" : "○"} At least one special symbol
                character
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium pt-1.5 border-t border-slate-200/60">
              <span
                className={`transition-colors ${criteria.matches ? "text-green-500" : "text-slate-400"}`}
              >
                {criteria.matches ? "✓" : "○"} Input fields match completely
              </span>
            </div>
          </div>

          {/* Action Submission Module Trigger Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 text-white text-sm mt-2
              ${isLoading ? "bg-[#4338ca] cursor-not-allowed" : "bg-[#4F46E5] hover:bg-[#4338ca] active:scale-[0.99]"}
            `}
          >
            {isLoading ? (
              <>
                <span>Updating Password</span>
                <ClipLoader size={16} color="#ffffff" />
              </>
            ) : (
              <span>Finalize Account Reset</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
