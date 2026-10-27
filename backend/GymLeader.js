const mongoose = require('mongoose');

const gymLeaderSchema = new mongoose.Schema({

  name: { 
    type: String, 
    required: true, 
    minlength: 2 },
    
  region: { type: String, 
    required: true, 
    enum: ['Kanto', 'Johto', 'Hoenn'] },

  town: { type: String, 
    required: true },

  badge: { type: String, 
    required: true },

  specialty: { type: String, 
    required: true },

  aceLevel: { type: Number, 
    required: true, 
    min: 1, 
    max: 100 },
  motto: { type: String,
     maxlength: 150 }

}, 
{ timestamps: true });

module.exports = mongoose.model('GymLeader', gymLeaderSchema);