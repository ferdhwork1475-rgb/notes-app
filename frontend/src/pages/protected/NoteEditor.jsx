import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const NoteEditor = () => {
  // This state holds the raw string WITH the asterisks and hashes
  const [markdownInput, setMarkdownInput] = useState("");

  const handleSave = () => {
    // This is where you would send 'markdownInput' to your backend API
    console.log("Saving to database:", markdownInput);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      
      {/* LEFT SIDE: The standard textarea for manual typing */}
      <div style={{ flex: 1 }}>
        <h3>Write Your Note (Use #, **, etc.)</h3>
        <textarea
          style={{ width: '100%', height: '300px', fontFamily: 'monospace' }}
          placeholder="Type here... e.g., # Hello World"
          value={markdownInput}
          onChange={(e) => setMarkdownInput(e.target.value)}
        />
        <button onClick={handleSave} style={{ marginTop: '10px' }}>Save Note</button>
      </div>

      {/* RIGHT SIDE: The Live "Newspaper" Preview */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>Live Preview (How it actually looks)</h3>
        
        {/* The parser intercepts the raw text and strips the asterisks out */}
        <ReactMarkdown>{markdownInput}</ReactMarkdown>
      </div>

    </div>
  );
};

export default NoteEditor;