import React from "react";
import "./NoteBlock.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function NoteBlock({ note, onDelete, onClick }) {
  return (
    <div 
      className="note-block card shadow-sm border-0 p-3 mb-3"
      onClick={onClick}
      style={{ cursor: "pointer", borderRadius: "12px" }}
    >
      <div className="note-header d-flex justify-content-between align-items-start">
        <h5 className="fw-bold text-dark">{note.title}</h5>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
          className="btn btn-sm text-danger"
          aria-label="Delete Note"
        >
          <i className="bi bi-trash3"></i>
        </button>
      </div>
      <p className="text-muted small mt-2">{note.content}</p>
    </div>
  );
}
