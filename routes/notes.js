const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');



// GET request for notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received to get all notes`);

    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data)));
  });


// POST request to add notes
notes.post('/',(req,res) => {
    console.info(`${req.method} request received to get all notes`);
    const { title, text } = req.body;

    //validate payload and only run the request if both test and title are sent
    if (title && text) {
        // creating a new note object
        const newNotes = {
          title,
          text,
          note_id: uuidv4(),
        };

        // adding the note to db.json
        readAndAppend(newNotes, './db/db.json');
    
        const response = {
            status: 'success',
            body: newNotes,
        };
  
        res.json(response);
    } else {
        res.json('Error in saving notes');
    }
});

module.exports = notes;