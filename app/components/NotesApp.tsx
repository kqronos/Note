'use client';

import { useState, useEffect } from "react";
import Note from "./Notes";
import CreateArea from "./CreateArea";

export default function NotesApp() {
  const [notes, setNotes] = useState<{ title: string; content: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch("/api/notes");
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      }
    }
    fetchNotes();
  }, []);

  async function addNote(newNote: { title: string; content: string }) {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });

    if (res.ok) {
      const updatedNotes = await res.json();
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setError(null);
    } else {
      const errorData = await res.json();
      setError(errorData.error);
    }
  }

  return (
    <div>
      <CreateArea onAdd={addNote} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={() => {} /* Deleting notes can be implemented similarly */}
        />
      ))}
    </div>
  );
}