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
  AlertCircle,
  KeyRound,
  FileText,
  Sparkles, 
  X
} from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();
  const user = useOutletContext();

  // Baseline initial state
  const [profile, setProfile] = useState({
    fullName: user?.fullname || "",
    email: user?.email || "",
    joinedDate: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "Year 2026",
    role: user?.role || "Administrator",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validation States
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [previewImage, setPreviewImage] = useState(
    `${uploadPath}${user?.profileImage}` || null,
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
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

      setErrors((prev) => ({ ...prev, fullName: nameErr, email: emailErr }));
    }
  }, [profile, activeTab]);

  useEffect(() => {
    if (activeTab === "security") {
      let passErr = "";
      let confErr = "";

      if (passwords.newPassword && passwords.newPassword.length < 6) {
        passErr = "Password must be at least 6 characters long";
      }

      if (
        passwords.confirmPassword &&
        passwords.newPassword !== passwords.confirmPassword
      ) {
        confErr = "Passwords do not match";
      }

      setErrors((prev) => ({
        ...prev,
        newPassword: passErr,
        confirmPassword: confErr,
      }));
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
      // API mutation simulation here
      toast.success("Profile records updated successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update profile details",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
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
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to alter security keys",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50/50 text-slate-800 antialiased overflow-y-auto">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Close Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute right-5 top-5 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>

          {/* Top Gradient */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600" />

          <div className="px-8 py-10 text-center">
            {/* Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 shadow-sm">
              <Lock size={36} />
            </div>

            {/* Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              <Sparkles size={14} />
              Coming Soon
            </div>

            {/* Title */}
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900">
              Profile Locked
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Your administrator profile section is currently unavailable while
              we build new account management features.
            </p>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              This page will soon allow you to update your profile information,
              change your password, manage preferences, and view account
              activity.
            </p>

            {/* Button */}
            <button
              onClick={() => navigate(-1)}
              className="mt-8 w-full rounded-2xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10 animate-fadeIn">
        {/* Header Block Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div>
            <h1 className="text-3xl font-black text-[#00020f] tracking-tight bg-clip-text">
              Account Settings
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Configure profile specifications, security tokens, and interface
              environments.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-4 py-2 rounded-xl w-fit shadow-sm">
            System Identity:{" "}
            <span className="text-[#4F46E5] font-bold">Root Master</span>
          </div>
        </div>

        {/* Dynamic Asymmetric Columns Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column Left: Profile Badge Container Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm shadow-indigo-100/40 p-6 flex flex-col items-center text-center transition-all">
            {/* Interactive Upload Avatar Circle Container */}
            <div
              className="relative group cursor-pointer mt-4"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-50 bg-slate-50 flex items-center justify-center transition-all group-hover:scale-[1.02] shadow-inner relative">
                {previewImage ? (
                  <img
                    src={
                      previewImage
                        ? previewImage
                        : `${uploadPath}${previewImage}`
                    }
                    alt="Avatar View"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-[#4F46E5] font-extrabold text-3xl tracking-tighter">
                    {profile.fullName
                      ? profile.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "A"}
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-[#00020f]/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-[1px]">
                <Camera className="w-5 h-5 text-white animate-pulse" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
              />
            </div>

            {/* User Meta Information Stack */}
            <h3 className="mt-5 font-black text-lg text-[#00020f] truncate max-w-full tracking-tight">
              {profile.fullName || "Admin User"}
            </h3>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mt-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              {profile.role}
            </span>

            {/* Quick Context Details List block */}
            <div className="w-full border-t border-slate-100 my-5 pt-4 text-[11px] text-left text-slate-400 space-y-2">
              <p className="truncate flex items-center justify-between">
                <span>Email Ref:</span>
                <span className="text-slate-600 font-semibold">
                  {profile.email}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span>Registration Node:</span>
                <span className="text-slate-600 font-semibold">
                  {profile.joinedDate}
                </span>
              </p>
            </div>

            {/* Structural Navigation Tab Option Row Blocks */}
            <div className="w-full space-y-1.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all duration-200 ${
                  activeTab === "details"
                    ? "bg-indigo-50/80 text-[#4F46E5] shadow-sm shadow-indigo-100/50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <FileText
                  className={`w-4 h-4 ${activeTab === "details" ? "text-[#4F46E5]" : "text-slate-400"}`}
                />
                Personal Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all duration-200 ${
                  activeTab === "security"
                    ? "bg-indigo-50/80 text-[#4F46E5] shadow-sm shadow-indigo-100/50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <KeyRound
                  className={`w-4 h-4 ${activeTab === "security" ? "text-[#4F46E5]" : "text-slate-400"}`}
                />
                Security Management
              </button>
            </div>
          </div>

          {/* Column Right: Active Workspace Container Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm shadow-indigo-100/40 overflow-hidden transition-all">
            {/* Conditional Subtree A: Personal Details Module View */}
            {activeTab === "details" ? (
              <form
                onSubmit={handleSaveDetails}
                className="p-6 md:p-8 space-y-6"
                noValidate
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-extrabold text-[#00020f] tracking-tight">
                    Identity Parameters
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Modify baseline records mapping to your administrative
                    credentials.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Field Frame: Full Name */}
                  <div className="group flex flex-col">
                    <label className="text-xs font-bold text-slate-600 group-focus-within:text-[#4F46E5] mb-2 transition-colors">
                      Full Name Signature
                    </label>
                    <div className="relative flex items-center">
                      <User
                        className={`w-4 h-4 absolute left-4 transition-colors ${errors.fullName ? "text-red-400" : "text-slate-400 group-focus-within:text-[#4F46E5]"}`}
                      />
                      <input
                        type="text"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleProfileChange}
                        disabled={loading}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-50/70 text-sm rounded-xl outline-none border transition-all font-medium text-slate-900 ${
                          errors.fullName
                            ? "border-red-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/5"
                            : "border-slate-200/80 focus:border-[#4F46E5] focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/5"
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-2">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{" "}
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Field Frame: Email address */}
                  <div className="group flex flex-col">
                    <label className="text-xs font-bold text-slate-600 group-focus-within:text-[#4F46E5] mb-2 transition-colors">
                      Routing Email Link
                    </label>
                    <div className="relative flex items-center">
                      <Mail
                        className={`w-4 h-4 absolute left-4 transition-colors ${errors.email ? "text-red-400" : "text-slate-400 group-focus-within:text-[#4F46E5]"}`}
                      />
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        disabled={loading}
                        className={`w-full pl-11 pr-4 py-3 bg-slate-50/70 text-sm rounded-xl outline-none border transition-all font-medium text-slate-900 ${
                          errors.email
                            ? "border-red-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/5"
                            : "border-slate-200/80 focus:border-[#4F46E5] focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/5"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-2">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{" "}
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Foot Submission Control Panel */}
                <div className="flex justify-end pt-5 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={loading || !!errors.fullName || !!errors.email}
                    className="px-6 py-3 bg-[#4F46E5] hover:bg-[#4338ca] text-white font-bold rounded-xl flex items-center gap-2 transition-all active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none shadow-md shadow-indigo-100 text-xs tracking-wide"
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    Save Details
                  </button>
                </div>
              </form>
            ) : (
              /* Conditional Subtree B: Security Rotation Management Module View */
              <form
                onSubmit={handleUpdatePassword}
                className="p-6 md:p-8 space-y-6"
                noValidate
              >
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-extrabold text-[#00020f] tracking-tight">
                    Security Access Control
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Regularly switch cryptography string keys to isolate cluster
                    privileges.
                  </p>
                </div>

                {/* Field Block: Current Session Password */}
                <div className="group flex flex-col">
                  <label className="text-xs font-bold text-slate-600 group-focus-within:text-[#4F46E5] mb-2 transition-colors">
                    Current Master Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 absolute left-4 text-slate-400 group-focus-within:text-[#4F46E5] transition-colors" />
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      placeholder="••••••••"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      className="w-full pl-11 pr-11 py-3 bg-slate-50/70 text-sm rounded-xl outline-none border border-slate-200/80 focus:border-[#4F46E5] focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/5 transition-all font-medium text-slate-900 placeholder-slate-300"
                    />
                    <button
                      type="button"
                      tabIndex="-1"
                      className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          current: !showPasswords.current,
                        })
                      }
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Field Block: New System Password */}
                  <div className="group flex flex-col">
                    <label className="text-xs font-bold text-slate-600 group-focus-within:text-[#4F46E5] mb-2 transition-colors">
                      New Security Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock
                        className={`w-4 h-4 absolute left-4 transition-colors ${errors.newPassword ? "text-red-400" : "text-slate-400 group-focus-within:text-[#4F46E5]"}`}
                      />
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        name="newPassword"
                        placeholder="••••••••"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        disabled={loading}
                        className={`w-full pl-11 pr-11 py-3 bg-slate-50/70 text-sm rounded-xl outline-none border transition-all font-medium text-slate-900 placeholder-slate-300 ${
                          errors.newPassword
                            ? "border-red-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/5"
                            : "border-slate-200/80 focus:border-[#4F46E5] focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/5"
                        }`}
                      />
                      <button
                        type="button"
                        tabIndex="-1"
                        className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            new: !showPasswords.new,
                          })
                        }
                      >
                        {showPasswords.new ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-2">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{" "}
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  {/* Field Block: Confirm New Password Match */}
                  <div className="group flex flex-col">
                    <label className="text-xs font-bold text-slate-600 group-focus-within:text-[#4F46E5] mb-2 transition-colors">
                      Confirm New Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock
                        className={`w-4 h-4 absolute left-4 transition-colors ${errors.confirmPassword ? "text-red-400" : "text-slate-400 group-focus-within:text-[#4F46E5]"}`}
                      />
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                        disabled={loading}
                        className={`w-full pl-11 pr-11 py-3 bg-slate-50/70 text-sm rounded-xl outline-none border transition-all font-medium text-slate-900 placeholder-slate-300 ${
                          errors.confirmPassword
                            ? "border-red-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/5"
                            : "border-slate-200/80 focus:border-[#4F46E5] focus:bg-white focus:ring-4 focus:ring-[#4F46E5]/5"
                        }`}
                      />
                      <button
                        type="button"
                        tabIndex="-1"
                        className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                        onClick={() =>
                          setShowPasswords({
                            ...showPasswords,
                            confirm: !showPasswords.confirm,
                          })
                        }
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-2">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{" "}
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Foot Submission Control Panel */}
                <div className="flex justify-end pt-5 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !passwords.currentPassword ||
                      !!errors.newPassword ||
                      !!errors.confirmPassword
                    }
                    className="px-6 py-3 bg-[#4F46E5] hover:bg-[#4338ca] text-white font-bold rounded-xl flex items-center gap-2 transition-all active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none shadow-md shadow-indigo-100 text-xs tracking-wide"
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                    Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
