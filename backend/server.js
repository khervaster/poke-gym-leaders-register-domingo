 require('dotenv').config();
 const express= require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
const { minLength, maxLength } = require('@angular/forms/signals');

 const app = express();
 app.use(express.json());
 app.use(cors());

 app.use(cors({
  origin: 'http://localhost:4200'
}));

 mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
}) 

const GymLeader = mongoose.Schema( {

    id: { type: String },
    name: { type: String, required: true },
    region: { type: String, required: true, enum: ['Johto', 'Hoenn', 'Kanto'] },
    town: { type: String, required: true},
    badge: {type: String, required: true},
    specialty: {type: String, required: true, 
        enum: ['Fire', 'Water', 'Dark', 'Flying', 
               'Fighting', 'Grass', 'Normal', 'Rock',

            ]},
    aceLevel: { type: Number, required: true, min: 1, max: 5},
    motto: {type: String, maxLength: 150}

})