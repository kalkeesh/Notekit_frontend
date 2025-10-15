import React from "react";
import "./NoteBlock.css";

export default function NoteBlock({ note, onDelete, onClick }) {
  return (
    <div className="note-block" onClick={onClick} style={{cursor:"pointer"}}>
      <div className="note-header">
        <h3>{note.title}</h3>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
          className="delete-btn" 
          aria-label="Delete Note"
        >🗑️</button>
      </div>
      <p>{note.content}</p>
    </div>
  );
}
