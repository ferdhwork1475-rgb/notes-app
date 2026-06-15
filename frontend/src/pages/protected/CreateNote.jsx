import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, Tag } from "lucide-react";
import { createNote } from "../../services/authService";
import { toast } from "react-toastify";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/webp", "image/jpeg"];

    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image (PNG/JPG/WebP)");
      e.target.value = null;
      setThumbnail(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createNote(title, tags, content, thumbnail);
      setTitle("");
      setContent("");
      setTags("");
      setThumbnail(null);
      navigate("/dashboard");
      toast.success("News article created successfully");
    } catch (error) {
      console.log("Error creating note:", error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      <header className="h-20 border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
        {/* <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Draft Mode
          </span>
        </div> */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
        >
          <X size={20} />
        </button>
      </header>

      {/* News Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col p-8 max-w-4xl w-full mx-auto space-y-6"
      >
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#4F46E5] hover:file:bg-indigo-100 cursor-pointer"
        />
        {preview && (
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Untitled Document..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-transparent border-none text-4xl font-bold text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-0 tracking-tight"
        />

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 w-fit px-4 py-1.5 rounded-xl shadow-sm">
          <Tag className="text-indigo-500" size={14} />
          <input
            type="text"
            placeholder="Categorize with a tag..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-transparent border-none text-xs focus:outline-none focus:ring-0 text-slate-600 font-medium placeholder-slate-400 p-0"
          />
        </div>

        <textarea
          placeholder="Briefly describe your news article..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full flex-1 bg-transparent border-none text-base leading-relaxed text-slate-600 placeholder-slate-300 focus:outline-none focus:ring-0 resize-none pt-4"
        />

        <div className="flex justify-end pt-4 border-t border-slate-100 bg-white">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-md shadow-indigo-100 transition-all active:scale-95 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Save size={18} />
            <span>{loading ? "Saving News..." : "Save News"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
