const express = require('express');
const path = require('path');
const app = express();
const PORT = 3500;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve static files from the "components" directory
app.use('/dist', express.static('dist'));
app.use('/services', express.static('services'));
app.use('/styles', express.static('styles'));

app.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.js'));
});

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
