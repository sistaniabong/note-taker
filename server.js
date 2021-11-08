const express = require('express');
const path = require('path');
const api = require('./routes/index.js')
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);


app.use(express.static('public'));

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);


// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

//ROUTES
    //HTML Routes
        //home route
            //send index.html
        //notes ROUTE 
            //send notes.html
    //API Routes
        //GET /api/notes
            //read db.json
            //parse data into JSON (JSON.parse)
            //send data to front end
        //POST /api/notes
            //make a barebones POST /api/notes route
            // console.log(req.body) and see what is being sent in the payload
            //receive a new note and add to db.json with UUID 





