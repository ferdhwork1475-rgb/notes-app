import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Save, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useOutletContext } from "react-router-dom"; 

const uploadPath = import.meta.env.VITE_UPLOADS_PATH || "";


const AdminProfile = () => {
  const user = useOutletContext();

  // Baseline initial state
  const [profile, setProfile] = useState({
    fullName: user.fullname,
    email: user.email,
    joinedDate: "June 2026"
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Validation States
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [previewImage, setPreviewImage] = useState(user.profileImage || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details"); // 'details' | 'security'

  const fileInputRef = useRef(null);

  // Real-time Input Validator Hook logic
  useEffect(() => {
    if (activeTab === "details") {
      let nameErr = "";
      let emailErr = "";
      
      if (!profile.fullName.trim()) {
        nameErr = "Full name cannot be empty";
      }
      
      if (!profile.email.trim()) {
        emailErr = "Email address is required";
      } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
        emailErr = "Please enter a valid email address";
      }

      setErrors(prev => ({ ...prev, fullName: nameErr, email: emailErr }));
    }
  }, [profile, activeTab]);

  useEffect(() => {
    if (activeTab === "security") {
      let passErr = "";
      let confErr = "";

      if (passwords.newPassword && passwords.newPassword.length < 6) {
        passErr = "Password must be at least 6 characters long";
      }

      if (passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword) {
        confErr = "Passwords do not match";
      }

      setErrors(prev => ({ ...prev, newPassword: passErr, confirmPassword: confErr }));
    }
  }, [passwords, activeTab]);

  // Handlers
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/webp", "image/jpeg"];

    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image (PNG/JPG/WebP)");
      return;
    }

    if (file) {
      setAvatarFile(file);
      setPreviewImage(URL.createObjectURL(file));
      toast.info("New avatar loaded. Click 'Save Details' to persist change.");
    }
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    if (errors.fullName || errors.email) {
      toast.error("Please fix form errors before saving.");
      return;
    }

    setLoading(true);
    try {
      // API mutation simulation
      toast.success("Profile records updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (errors.newPassword || errors.confirmPassword) {
      toast.error("Please fix password errors before saving.");
      return;
    }

    setLoading(true);
    try {
      toast.success("Security password rotated successfully");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to alter security keys");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#00020f] tracking-tight">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your administrative details and security keys.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info Sidebar */}
        <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100 flex flex-col items-center text-center h-fit">
          <div className="relative group cursor-pointer mt-2" onClick={() => fileInputRef.current.click()}>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50/50 bg-gray-50 flex items-center justify-center transition-all group-hover:opacity-90 relative">
              {previewImage ? (
                <img src={`${uploadPath}${previewImage}`} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-indigo-600 font-bold text-3xl">
                  {profile.fullName ? profile.fullName.split(" ").map(n => n[0]).join("") : "A"}
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-[#00020f]/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          <h3 className="mt-4 font-bold text-lg text-[#00020f] truncate max-w-full">{profile.fullName || "Admin User"}</h3>
          <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 mt-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            {profile.role}
          </p>
          <div className="w-full border-t border-gray-100 my-4 pt-4 text-xs text-left text-gray-400 space-y-1">
            <p className="truncate">Email: <span className="text-gray-600 font-medium">{profile.email}</span></p>
            <p>Member Since: <span className="text-gray-600 font-medium">{profile.joinedDate}</span></p>
          </div>

          <div className="w-full space-y-2 mt-2">
            <button
              onClick={() => setActiveTab("details")}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "details" ? "bg-indigo-50 text-[#4F46E5]" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full text-left px-4 py-2.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "security" ? "bg-indigo-50 text-[#4F46E5]" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Security Settings
            </button>
          </div>
        </div>

        {/* Working Workspace Area */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100 overflow-hidden">
          {activeTab === "details" ? (
            <form onSubmit={handleSaveDetails} className="p-6 md:p-8 space-y-6" noValidate>
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-lg font-bold text-[#00020f]">Personal Details</h2>
                <p className="text-xs text-gray-400">Update your account identity details.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 group-focus-within:text-[#4F46E5] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className={`w-5 h-5 absolute left-4 transition-colors ${errors.fullName ? "text-red-400" : "text-gray-400 group-focus-within:text-[#4F46E5]"}`} />
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleProfileChange}
                      disabled={loading}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none border transition-all font-medium text-gray-900 ${
                        errors.fullName 
                          ? "border-red-200 focus:border-red-500 focus:ring-red-500/10" 
                          : "border-gray-200 focus:border-[#4F46E5] focus:bg-white focus:ring-[#4F46E5]/10"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 group-focus-within:text-[#4F46E5] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className={`w-5 h-5 absolute left-4 transition-colors ${errors.email ? "text-red-400" : "text-gray-400 group-focus-within:text-[#4F46E5]"}`} />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      disabled={loading}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none border transition-all font-medium text-gray-900 ${
                        errors.email 
                          ? "border-red-200 focus:border-red-500 focus:ring-red-500/10" 
                          : "border-gray-200 focus:border-[#4F46E5] focus:bg-white focus:ring-[#4F46E5]/10"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading || !!errors.fullName || !!errors.email}
                  className="px-6 py-3 bg-[#4F46E5] hover:bg-[#4338ca] text-white font-bold rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-indigo-100 text-sm"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Details
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword} className="p-6 md:p-8 space-y-5" noValidate>
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-lg font-bold text-[#00020f]">Security Management</h2>
                <p className="text-xs text-gray-400">Regularly change passwords to protect your privileges.</p>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 group-focus-within:text-[#4F46E5] mb-1.5">
                  Current Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-5 h-5 absolute left-4 text-gray-400 group-focus-within:text-[#4F46E5] transition-colors" />
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    placeholder="••••••••"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    disabled={loading}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 rounded-xl outline-none border border-gray-200 focus:border-[#4F46E5] focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/10 transition-all font-medium text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 group-focus-within:text-[#4F46E5] mb-1.5">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className={`w-5 h-5 absolute left-4 transition-colors ${errors.newPassword ? "text-red-400" : "text-gray-400 group-focus-within:text-[#4F46E5]"}`} />
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      placeholder="••••••••"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      className={`w-full pl-12 pr-12 py-3 bg-gray-50 rounded-xl outline-none border transition-all font-medium text-gray-900 placeholder-gray-400 ${
                        errors.newPassword 
                          ? "border-red-200 focus:border-red-500 focus:ring-red-500/10" 
                          : "border-gray-200 focus:border-[#4F46E5] focus:bg-white focus:ring-[#4F46E5]/10"
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.newPassword}
                    </p>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 group-focus-within:text-[#4F46E5] mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className={`w-5 h-5 absolute left-4 transition-colors ${errors.confirmPassword ? "text-red-400" : "text-gray-400 group-focus-within:text-[#4F46E5]"}`} />
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      className={`w-full pl-12 pr-12 py-3 bg-gray-50 rounded-xl outline-none border transition-all font-medium text-gray-900 placeholder-gray-400 ${
                        errors.confirmPassword 
                          ? "border-red-200 focus:border-red-500 focus:ring-red-500/10" 
                          : "border-gray-200 focus:border-[#4F46E5] focus:bg-white focus:ring-[#4F46E5]/10"
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading || !passwords.currentPassword || !!errors.newPassword || !!errors.confirmPassword}
                  className="px-6 py-3 bg-[#4F46E5] hover:bg-[#4338ca] text-white font-bold rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-indigo-100 text-sm"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;