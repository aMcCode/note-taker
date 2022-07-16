const path = require('path');
const fs = require('fs')
const router = require('express').Router();
const uniqid = require('uniqid');
const { createNote, validateNote, findById, deleteNote } = require('../lib/manageNotes');
const { notes } = require('../db/db.json');

router.get('/notes', (req, res) => {
    res.json(notes);
})

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = uniqid();
    if (!validateNote(req.body)) {
      res.status(400).send("This note is not properly formatted.");
    } else {
      createNote(req.body, notes);
      res.json(notes);
    }
});

router.delete('/notes/:id', (req, res) => {
  console.log(req.params.id);
  const notesArray = notes.filter(note => note.id != req.params.id);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  const updatedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
   if (updatedNotes) {
    console.log("updatedNotes: " + JSON.stringify(updatedNotes));
    res.json(updatedNotes);
   } else {
      res.send(404);
   }
});

module.exports = router;