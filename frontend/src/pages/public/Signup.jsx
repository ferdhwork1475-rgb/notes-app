import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { User, Mail, Lock, Eye, EyeOff, Upload, ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { signupUser } from "../../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  
  // Form and UI States
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState(""); // New state for administrative key
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/webp", "image/jpeg"];

    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image (PNG/JPG/WebP)");
      e.target.value = null;
      setProfileImage(null);
      setImagePreview(null);
      return;
    }
    
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("adminKey", adminKey);
    if (profileImage) formData.append("profileImage", profileImage);
    
    setIsSubmitting(true);

    try {
      await signupUser(formData);
      toast.success("Admin account verified and created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Failed registration attempt in component");
      toast.error(error?.response?.data?.message || "Registration rejected");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-12 md:py-16">
      <div className="w-full max-w-md flex flex-col justify-center">
        
        {/* Header Block */}
        <div className="mb-8 text-center md:text-left">
          <h3 className="text-3xl font-extrabold text-[#00020f] tracking-tight mb-2">
            Admin Workspace
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            Register a secure administrator account to access the news dashboard portal.
          </p>
        </div>

        {/* Signup Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Full Name Input */}
          <div className="group">
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#4F46E5] transition-colors">
                <User size={18} strokeWidth={2.5} />
              </span>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Editor Name"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all text-sm text-gray-900"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email Address Input */}
          <div className="group">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#4F46E5] transition-colors">
                <Mail size={18} strokeWidth={2.5} />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="admin@newsportal.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all text-sm text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group">
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#4F46E5] transition-colors">
                <Lock size={18} strokeWidth={2.5} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all text-sm text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-[#4F46E5] transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Secure System Registration Key Input */}
          <div className="group">
            <label htmlFor="adminKey" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors">
              System Authorization Token
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 group-focus-within:text-[#4F46E5] transition-colors">
                <KeyRound size={18} strokeWidth={2.5} />
              </span>
              <input
                type="password"
                name="adminKey"
                id="adminKey"
                placeholder="Enter workspace secret token"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all text-sm text-gray-900 font-mono tracking-widest"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Profile Image Upload */}
          <div className="group">
            <label htmlFor="profileImg" className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 group-focus-within:text-[#4F46E5] transition-colors">
              Profile Image <span className="text-gray-300 lowercase font-normal">(optional)</span>
            </label>
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-xl p-3 hover:border-gray-300 transition-colors">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 overflow-hidden shrink-0">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={18} className="text-[#4F46E5]" />
                )}
              </div>
              <div className="w-full overflow-hidden">
                <input
                  type="file"
                  name="profileImg"
                  id="profileImg"
                  className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white file:text-[#4F46E5] file:shadow-sm hover:file:bg-indigo-50 cursor-pointer focus:outline-none"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          {/* Form Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md mt-6 ${
              isSubmitting 
                ? "bg-indigo-400 cursor-not-allowed" 
                : "bg-[#4F46E5] hover:bg-[#4338ca] hover:shadow-indigo-100"
            }`}
          >
            {isSubmitting ? "Verifying Token..." : "Create Admin Account"}
            {isSubmitting ? (
              <ClipLoader color="#fff" size={16} />
            ) : (
              <ArrowRight size={16} strokeWidth={2.5} />
            )}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 text-center md:text-left">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#4F46E5] transition-all"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Back to login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;