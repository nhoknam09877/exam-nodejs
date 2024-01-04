const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/music', { useNewUrlParser: true, useUnifiedTopology: true });

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    size: { type: Number, required: true },
    views: { type: Number, default: 0 }
  });
  
  const Song = mongoose.model('Song', songSchema);
  

  app.use(express.json());

  app.post('/songs', async (req, res) => {
    const song = new Song(req.body);
    try {
      await song.save();
      res.status(201).send(song);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

  app.get('/songs', async (req, res) => {
    try {
      const songs = await Song.find({});
      res.send(songs);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  

  app.get('/songs/:id', async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) {
        return res.status(404).send();
      }
      res.send(song);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

  app.put('/songs/:id', async (req, res) => {
    try {
      const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!song) {
        return res.status(404).send();
      }
      res.send(song);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

  app.delete('/songs/:id', async (req, res) => {
    try {
      const song = await Song.findByIdAndDelete(req.params.id);
      if (!song) {
        return res.status(404).send();
      }
      res.send({ message: 'Song deleted successfully' });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
