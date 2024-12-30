const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Trasy
app.use('/api/notes', notesRouter);

// Uruchomienie serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});