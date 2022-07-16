const fs = require("fs");
const path = require("path");

function createNote(body, notesArray) {
    notesArray.push(body);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

// function deleteNote(id, notesArray) {
//     notesArray = notesArray.filter(note => note.id !== id);
//     fs.writeFileSync(
//         path.join(__dirname, '../db/db.json'),
//         JSON.stringify({ notes: notesArray }, null, 2)
//     );
//     return notesArray;
// }

module.exports = { createNote, validateNote, findById/*, deleteNote */};