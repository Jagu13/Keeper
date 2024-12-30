const express = require('express');
const router = express.Router();
const pool = require('../db');

// Pobieranie notatek
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Dodawanie notatki
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log("Notatka: ", { title, content });
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const result = await pool.query(
            'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Błąd w post w router: ", err.message);
        res.status(500).send('Server error');
    }
});

// Usuwanie notatki
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM notes WHERE id = $1', [id]);
        res.send('Note deleted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
