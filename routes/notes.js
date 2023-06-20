const notes = require('express').Router();

const uuid = require('../helpers/uuid');

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

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
        id: uuid(),
      };
  
      readAndAppend(newNote,'db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding Note');
    }
  });

  notes.delete('/:id', (req, res) => { 
    const noteId  = req.params.id;
    readFromFile('db/db.json').then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note)=> note.id !== noteId)
      writeToFile('db/db.json', result);
    })});
   
  
  module.exports = notes;