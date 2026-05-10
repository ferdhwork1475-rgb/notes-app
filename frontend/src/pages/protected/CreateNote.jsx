import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiTag } from 'react-icons/fi';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newNote = { title, content, tag };

        try {
            // Replace with your actual backend URL
            await axios.post('http://localhost:5000/api/notes', newNote);
            navigate('/all-notes'); // Redirect to library after success
        } catch (error) {
            console.error("Error creating note:", error);
            alert("Failed to save the note. Check your 'Waiter' (Backend).");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-['Inter'] p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-['Urbanist'] font-bold text-white">
                        New <span className="text-[#4F46E5]">Note</span>
                    </h1>
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full bg-transparent border-none text-4xl font-bold text-white placeholder-slate-700 focus:outline-none focus:ring-0"
                    />

                    <div className="flex items-center space-x-2 bg-[#1e293b] w-max px-4 py-2 rounded-full border border-slate-700">
                        <FiTag className="text-[#4F46E5]" />
                        <input
                            type="text"
                            placeholder="Add tag..."
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="bg-transparent border-none text-sm focus:outline-none focus:ring-0 text-slate-300"
                        />
                    </div>

                    <textarea
                        placeholder="Start writing your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full h-[50vh] bg-transparent border-none text-lg leading-relaxed text-slate-300 placeholder-slate-700 focus:outline-none focus:ring-0 resize-none"
                    />

                    {/* Action Bar */}
                    <div className="fixed bottom-10 right-10">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex items-center space-x-2 bg-[#4F46E5] hover:bg-[#4338ca] text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all transform hover:scale-105 active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <FiSave size={20} />
                            <span>{loading ? 'Saving to Cloud...' : 'Save Note'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;