const router = require("express").Router();
const uniqid = require('uniqid');
const { createNote, validateNote } = require('../lib/manageNotes');
const { notes } = require('../db/db.json');

router.get("/notes", (req, res) => {
    res.json(notes);
})

router.get("/notes/:id", (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

router.post("/notes", (req, res) => {
    req.body.id = uniqid();
    if (!validateNote(req.body)) {
      res.status(400).send("This note is not properly formatted.");
    } else {
      const note = createNote(req.body, notes);
      res.json(notes);
    }
});

module.exports = router;