import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import CreateArea from "./CreateArea.jsx";
import { getNotes, addNote, deleteNote } from "../api.js";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);


  // Dodaj notatkę do backendu i zaktualizuj stan
  async function addNoteHandler(newNote) {
    try {
      const savedNote = await addNote(newNote);
      console.log(newNote);
      setNotes((prevNotes) => [...prevNotes, savedNote]);
    } catch (error) {
      console.error("Nie udało się użyć addNoteHandler", error);
    }
  }

  // Usuń notatkę z backendu i zaktualizuj stan
  async function deleteNoteHandler(id) {
    try {
      await deleteNote(id); // Usuń notatkę z backendu
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Usuń z lokalnego stanu
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
      <div>
        <Header />
        <CreateArea onAdd={addNoteHandler} />
        {notes.map((noteItem) => (
            <Note
                key={noteItem.id}
                id={noteItem.id}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNoteHandler}
            />
        ))}
        <Footer />
      </div>
  );
}

export default App;
