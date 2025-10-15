import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteBlock from "./components/NoteBlock";
import './App.css';
import NoteEditor from "./components/NoteEditor";


function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get("https://notekit-backend-pnlk.onrender.com/api/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
    fetchNotes();
  }, []);

    async function createNote(note) {
    try {
      const response = await axios.post("https://notekit-backend-pnlk.onrender.com/api/notes", note);
      setNotes(prev => [...prev, response.data]);
    } catch (e) {
      alert("Could not create note");
    }
  }

  async function updateNote(id, note) {
    try {
      const response = await axios.put(`https://notekit-backend-pnlk.onrender.com/api/notes/${id}`, note);
      setNotes(prev => prev.map(n => n.id === id ? response.data : n));
    } catch (e) {
      alert("Could not update note");
    }
  }

  // Delete note from backend and then update state
  async function deleteNote(id) {
    try {
      await axios.delete(`https://notekit-backend-pnlk.onrender.com/api/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

   if (editingNote || showForm) {
    // Show the editor page instead of notes list
    return (
      <div className="editor-page">
        <h2>{editingNote ? "Edit Note" : "Add Note"}</h2>
        <NoteEditor
          note={editingNote}
          onCancel={() => {
            setEditingNote(null);
            setShowForm(false);
          }}
          onSave={async (note) => {
            if (editingNote) {
              await updateNote(editingNote.id, note);
              setEditingNote(null);
            } else {
              await createNote(note);
              setShowForm(false);
            }
          }}
        />
      </div>
    );
  }

  // Normal notes list page
  return (
    <div className="app-container">
      <h1 className="title-header">
      <span role="img" aria-label="notepad">📝</span> NoteKit
      </h1>
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteBlock
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onClick={() => setEditingNote(note)}
          />
        ))}
      </div>
      <button className="fab" onClick={() => setShowForm(true)} aria-label="Add Note">
        +
      </button>
    </div>
  );
}

export default App;
