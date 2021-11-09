const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');



// GET request for notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received to get all notes`);

    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data)));
  });

// notes.get('/:note_id', (req, res) => {
//     console.info(`${req.method} request received to get a specific note`);
//     console.log(req.params);
//     const noteId = req.params.note_id;

//     readFromFile('./db/db.json')
//     .then((data) => res.json(JSON.parse(data)))
//     .then((json) => {
//         const result = json.filter((note) => note.note_id === noteId);
//         return result.length > 0
//             ? res.json(result)
//             : res.json('No note with that ID');
//     });
//   });


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
          id: uuidv4(),
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

notes.delete('/:note_id', (req,res) => {
    console.info(`${req.method} request received to delete ${req.params.note_id} all notes`);
    console.log(req.params.note_id)
    const noteId = req.params.note_id
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => { 
            // Filter out the deleted note_id and return a new array of notes
            const result = json.filter((note) => note.id !== noteId);

            writeToFile('./db/db.json', result);
            res.json(`Note ${noteId} has been deleted 🗑️`);
        });
})


module.exports = notes;