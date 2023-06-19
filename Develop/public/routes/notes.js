const Notes = require('express').Router();

const uuid = require('../helpers/uuid');

const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');

notes.get('/', (req, res) => {
    // >>> api/tips
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/tips.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding Note');
    }
  });
  
  module.exports = notes;