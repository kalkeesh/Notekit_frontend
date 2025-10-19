import React, { useState, useEffect } from "react";
import "./NoteEditor.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
      <button 
        className="cancel-btn btn position-absolute top-0 end-0 mt-3 me-3"
        onClick={onCancel}
        aria-label="Cancel"
      >
        <i className="bi bi-x-circle fs-3 text-secondary"></i>
      </button>

      <div className="container h-100 d-flex flex-column pt-5">
        <input
          type="text"
          className="form-control form-control-lg fw-bold mb-3"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />

        <textarea
          className="form-control flex-grow-1"
          placeholder="Enter note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          required
        />

        <button 
          className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow"
          style={{ width: "60px", height: "60px" }}
          onClick={() => onSave({ title, content })}
          aria-label="Save"
        >
          <i className="bi bi-check-lg fs-3 text-white"></i>
        </button>
      </div>
    </div>
  );
}
