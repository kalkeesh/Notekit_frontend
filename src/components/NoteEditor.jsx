import React, { useState, useEffect } from "react";

export default function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  return (
    <div className="fullpage-editor">
      <button className="cancel-btn" onClick={onCancel} aria-label="Cancel">
        &#10006;
      </button>

      <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        className="title-input"
        required
      />
      <textarea
        placeholder="Enter note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
        className="content-input"
        required
      />

      <button
        className="save-btn"
        onClick={() => onSave({ title, content })}
        aria-label="Save"
      >
        &#10003;
      </button>
    </div>
  );
}
