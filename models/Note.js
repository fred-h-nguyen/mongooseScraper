const mongoose = require('mongoose');

//reference to Schema constructor
const Schema = mongoose.Schema;

//Note Schema
const NoteSchema = new Schema({
    body: String
});

const Note = mongoose.model('Note', NoteSchema);

//exporting note model
module.exports = Note;