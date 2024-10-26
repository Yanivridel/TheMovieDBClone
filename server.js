require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // You can use any port you like
const bearerToken = process.env.bearerToken;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Optionally, you can handle the root URL to serve the index.html directly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/token', (req, res) => {
    res.json({ bearerToken }); // Send the token as JSON
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
