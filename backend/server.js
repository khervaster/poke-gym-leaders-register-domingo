require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const GymLeader = require('./GymLeader');

const app = express();
app.use(express.json());
app.use(cors());


// ADDED SUCCESS/ERROR MSG
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));


// made crud methods
// get all
app.get('/api/leaders', async (req, res) => {
  try {
    const leaders = await GymLeader.find();
    res.status(200).json(leaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get one
app.get('/api/leaders/:id', async (req, res) => {
  try {
    const leader = await GymLeader.findById(req.params.id);
    if (!leader) return res.status(404).json({ message: 'Leader not found' });
    res.status(200).json(leader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post
app.post('/api/leaders', async (req, res) => {
  try {
    const leader = new GymLeader(req.body);
    const saved = await leader.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// put
app.put('/api/leaders/:id', async (req, res) => {
  try {
    const updated = await GymLeader.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Leader not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// delete
app.delete('/api/leaders/:id', async (req, res) => {
  try {
    const deleted = await GymLeader.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Leader not found' });
    res.status(200).json({ message: 'Gym Leader deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => 
    console.log('Server running on port 3000')
);