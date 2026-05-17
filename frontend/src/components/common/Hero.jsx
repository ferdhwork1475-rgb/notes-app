import React from "react";
import notepad from "../../assets/images/notepad.png";
import notetab from "../../assets/images/notetabs.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Capture thoughts in the clarity of silence.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Organize your thoughts, ideas, and notes in one place.
        </p>
        <Link
          to="/dashboard/create-note"
          className="inline-block bg-[#4F46E5] text-white px-6 py-3 rounded-lg hover:bg-[#4338ca] transition-colors font-semibold shadow-md hover:shadow-lg"
        >
          Start writing for Free
        </Link>
      </div>
    </section>
  );
};

export default Hero;
