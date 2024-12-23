// FOR LOCAL ONLY
require('dotenv').config();
//
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const bearerToken = process.env.bearerToken;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/token', (req, res) => {
    res.json({ bearerToken });
});

// FOR LOCAL ONLY
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});
//