// Import Express.js
const express = require('express');

const data = require('./Develop/db/db.json')

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
// const path = require('path');


// const api = require('./Develop/public/assets/js/index.js');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3002;

// Static middleware pointing to the public folder
app.use(express.static('./Develop/public'));

// Middleware for parsing application/json
app.use(express.json());


app.get('/', (req, res) => res.sendFile(__dirname, 'Develop/public/index.html'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
);
app.get('/api', (req, res) =>
  res.json(data)
);

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);