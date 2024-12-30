import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

// Pobieranie notatek
export const getNotes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Dodawanie notatki
export const addNote = async (note) => {
    const response = await axios.post(API_URL, { note });
    return response.data;
};

// Usuwanie notatki
export const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
