const { notes } = require('./db/db.json');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
});














app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});