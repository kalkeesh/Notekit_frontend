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
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState(null);

  // Apply theme
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Fetch notes on load if user logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedName = localStorage.getItem("username");
    if (token && storedName) setUsername(storedName);

    async function fetchNotes() {
      if (!storedName) return;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/notes?username=${storedName}`
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }

    if (token) fetchNotes();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUsername(null);
    window.location.href = "/";
  };

  // Create new note
  async function createNote(note) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/notes?username=${username}`,
        note
      );
      setNotes((prev) => [...prev, response.data]);
    } catch (e) {
      alert("Could not create note");
    }
  }

  // Update existing note
  async function updateNote(id, note) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/notes/${id}?username=${username}`,
        note
      );
      setNotes((prev) => prev.map((n) => (n.id === id ? response.data : n)));
    } catch (e) {
      alert("Could not update note");
    }
  }

  // Delete note
  async function deleteNote(id) {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/notes/${id}?username=${username}`
      );
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  // Navbar Component
  const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-primary" href="/">NoteKit</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {username ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hello, {username}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signIn">Sign Up</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );

  // Show NoteEditor if creating/editing
  if (editingNote || showForm) {
    return (
      <div className="editor-page vh-100">
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

  // Main layout
  return (
    <div className="app-container container py-4">
      <Navbar />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          {/* Theme toggle icon */}
          <i
            className={`bi ${theme === "light" ? "bi-moon-fill" : "bi-sun-fill"} fs-3 me-2 text-secondary`}
            style={{ cursor: 'pointer' }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          ></i>

          <i className="bi bi-journal-text text-primary fs-2 me-2"></i>
          <h1 className="fw-bold m-0 text-primary">NoteKit</h1>
        </div>
      </div>

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
