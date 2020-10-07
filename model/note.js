const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true},
  text: { type: String, required: true }
}, { collection : 'notes' });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
