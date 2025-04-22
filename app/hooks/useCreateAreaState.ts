'use client'   

import { useState } from "react";

export interface Note {
  title: string;
  content: string;
}

export function useCreateAreaState() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState<Note>({ title: "", content: "" });

  function expand() {
    setIsExpanded(true);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function resetNote() {
    setNote({ title: "", content: "" });
  }

  return { isExpanded, note, expand, handleChange, resetNote };
}