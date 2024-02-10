const PORT = process.env.PORT || 3500;
const express = require('express');
const path = require('path');
const { send } = require('process');
const app = express();

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
});

// Route handler
app.get(
    '/hello(.html)?',
    (req, res, next) => {
        console.log('attempting to access /hello');
        next();
    },
    (req, res) => {
        res.send('Hello, World!');
    },
);

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
