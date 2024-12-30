import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';



function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [focusOnTextArea, setFocusOnTextArea] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function enlargeArea() {
    setFocusOnTextArea(true);
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">

        <input
          name="title"
          onChange={handleChange}
          onFocus={enlargeArea}
          value={note.title}
          placeholder={focusOnTextArea ? "Title" : "Take a note..." }
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={focusOnTextArea ? 3 : null}
          style={{ display: focusOnTextArea ? "block" : "none" }}
        />
        <Zoom in={focusOnTextArea}>
          <Fab onClick={submitNote}><AddIcon /></Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
