import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { verifyOtpCode, sendOtpRequest } from "../../services/authService";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the admin's email passed from the forgot-password navigation state
  const email = location.state?.email || "admin@yourdomain.com";

  // --- State Configuration ---
  const [otp, setOtp] = useState(new Array(6).fill("")); // Creates a 6-digit split input array
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds fallback cooldown for code resending
  const [canResend, setCanResend] = useState(false);

  // References to hook into each individual input field element natively
  const inputRefs = useRef([]);

  // --- Countdown Clock Hook ---
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // --- Split-Input Array Input Handling ---
  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return; // Allow numbers only

    const newOtp = [...otp];
    // Keep only the last character typed (handles replacements)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance focus to the next input cell if value is assigned
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Shifting focus back manually on backspace interactions
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    // Validate if pasted text is numbers and matches standard length parameters
    if (/^\d{6}$/.test(pastedData)) {
      const pastedArray = pastedData.split("");
      setOtp(pastedArray);
      // Focus on final slot to confirm submission path readiness
      inputRefs.current[5].focus();
    } else {
      toast.error("Please paste a valid 6-digit code.");
    }
  };

  // --- Resend Trigger Action ---
  const handleResendCode = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    try {
      // API invocation placeholder logic
      await sendOtpRequest(email);
      
      toast.success("A fresh verification code was sent!");
      setTimer(60); // Reset fallback clock metrics
      setCanResend(false);
      setOtp(new Array(6).fill("")); // Clean fields
      inputRefs.current[0].focus();
    } catch (err) {
      toast.error(err.response.data?.message || "Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Verification Validation Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtpString = otp.join("");

    if (fullOtpString.length < 6) {
      toast.warning("Please complete the 6-digit OTP configuration.");
      return;
    }

    setIsLoading(true);
    try {
      // API submission placeholder logic
      await verifyOtpCode(email, fullOtpString);
      
      toast.success("Identity verified successfully!");
      
      // Direct your admin straight into your Reset New Password UI
      navigate("/reset-password", { state: { email, token: fullOtpString } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* Flexible wrapper layout configuration explicitly dealing with viewport scaling restrictions */
    <div className="min-h-screen bg-[#00020f] flex items-center justify-center p-4 sm:p-6 md:p-8">
      
      {/* Central Content Module Wrapper Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100 transition-all">
        
        {/* Header Text elements */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Verify Identity
          </h2>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            We sent a secure code to <span className="font-semibold text-slate-700">{email}</span>.
          </p>
        </div>

        {/* Input verification execution layout form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Split Multi-Box Flex Container Array Layout */}
          <div className="flex justify-between items-center gap-2 sm:gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={isLoading}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold bg-slate-50 text-slate-900 border border-slate-200 rounded-xl transition-all focus:border-[#4F46E5] focus:bg-white focus:ring-1 focus:ring-[#4F46E5] outline-none disabled:opacity-60"
              />
            ))}
          </div>

          {/* Core Processing Button Trigger Action Component */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 text-white text-sm
              ${isLoading ? "bg-[#4338ca] cursor-not-allowed" : "bg-[#4F46E5] hover:bg-[#4338ca] active:scale-[0.99]"}
            `}
          >
            {isLoading ? (
              <>
                <span>Verifying</span>
                <ClipLoader size={16} color="#ffffff" />
              </>
            ) : (
              <span>Confirm Verification Code</span>
            )}
          </button>
        </form>

        {/* Lower Resend Timing Counter & Alternate Navigation Actions Footer */}
        <div className="mt-8 space-y-4 text-center">
          <p className="text-sm text-slate-500">
            Didn't receive the code?{" "}
            {canResend ? (
              <button
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-sm font-bold text-[#4F46E5] hover:text-[#4338ca] transition-colors outline-none focus:underline"
              >
                Resend Code
              </button>
            ) : (
              <span className="text-sm font-semibold text-slate-400">
                Resend in {timer}s
              </span>
            )}
          </p>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Change email address
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerifyOtp;