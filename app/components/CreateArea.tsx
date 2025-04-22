import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import { useCreateAreaState } from "../hooks/useCreateAreaState";

interface CreateAreaProps {
  onAdd: (note: { title: string; content: string }) => void;
}

function CreateArea(props: CreateAreaProps) {
  const { isExpanded, note, expand, handleChange, resetNote } = useCreateAreaState();

  function submitNote(event: React.MouseEvent<HTMLButtonElement>) {
    props.onAdd(note);
    resetNote();
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Titlu"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Scrie o nota..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
