const mongoose = require('mongoose');

const jerseySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  team: { 
    type: String, 
    required: true, 
    index: true 
  },
  league: { 
    type: String, 
    required: true 
  },
  season: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['home', 'away', 'third', 'gk', 'training', 'special'] 
  },
  description: {
    type: String,
    default: "Official jersey with sweat-absorbing technology and high-quality embroidered details."
  },
  price: { 
    type: Number, 
    default: 79.99 
  },
  sizes: {
    type: [String],
    default: ['S', 'M', 'L', 'XL', 'XXL']
  },
  images: {
    type: [String], // Here we will save Cloudinary URLs
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  isRetro: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Creates createdAt and updatedAt fields automatically
});

const Jersey = mongoose.model('Jersey', jerseySchema);

module.exports = Jersey;