import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteBlock from "./components/NoteBlock";
import NoteEditor from "./components/NoteEditor";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

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

  async function deleteNote(id) {
    try {
      await axios.delete(`https://notekit-backend-pnlk.onrender.com/api/notes/${id}`);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  if (editingNote || showForm) {
    return (
      <div className="editor-page bg-light vh-100">
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

  return (
    <div className="app-container container py-4">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <i className="bi bi-journal-text text-primary fs-2 me-2"></i>
        <h1 className="fw-bold m-0 text-primary">NoteKit</h1>
      </div>

      {/* Volatile notes grid */}
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

      <button 
        className="btn btn-primary rounded-circle position-fixed d-flex justify-content-center align-items-center shadow fab"
        onClick={() => setShowForm(true)}
        aria-label="Add Note"
      >
        <i className="bi bi-plus-lg fs-3 text-white"></i>
      </button>
    </div>
  );
}

export default App;
