const notes = require('express').Router();

const uuid = require('../helpers/uuid');

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    // >>> api/notes
    console.info(`${req.method} request received for notes`);
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
  });

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote,'db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding Note');
    }
  });
  
  module.exports = notes;