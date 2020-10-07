const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb+srv://koteuko:9372447924@koteuko-cluster.cqbbz.mongodb.net/koteuko-db?retryWrites=true&w=majority';
const Note = require('./model/note');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/notes', (req, res) => {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) throw err;
    Note.find({})
      .then(notes => res.send(notes.map(note => {
        return {
          id: note._id,
          title: note.title,
          text: note.text
        }
      })))
  });
})

app.post('/api/add', (req, res) => {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) throw err;

    const newNote = new Note({
      title: req.body.title,
      text: req.body.text
    })
    newNote.save()
      .then(note => res.send({
        id: note._id,
        title: note.title,
        text: note.text
      }))
  });
})

app.put('/api/update', (req, res) => {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) throw err;
    Note.updateOne({_id: req.body.id}, {title: req.body.title, text: req.body.text})
      .then(() => {
      })
  });
})

app.delete('/api/delete/:id', (req, res) => {
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) throw err;
    Note.deleteOne({_id: req.params['id']}).then(() => {
    })
  });
})

app.listen(3210, () => console.log('Node server has been started.'))
