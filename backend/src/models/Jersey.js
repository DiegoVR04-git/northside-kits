const mongoose = require('mongoose');

const jerseySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
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

// Pre-save hook to auto-generate slug from name
jerseySchema.pre('save', function() {
  // Only generate slug if name has been modified or if slug doesn't exist
  if (this.isModified('name') || !this.slug) {
    // Generate slug from name: "Messi 2015" -> "messi-2015"
    let slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w\-]/g, '') // Remove special characters
      .replace(/\-+/g, '-'); // Replace multiple hyphens with single hyphen
    
    // Add team and season to make it more unique
    if (this.team) {
      slug = `${slug}-${this.team.toLowerCase().replace(/\s+/g, '-')}`;
    }
    if (this.season) {
      slug = `${slug}-${this.season}`;
    }
    
    this.slug = slug;
  }
});

const Jersey = mongoose.model('Jersey', jerseySchema);

module.exports = Jersey;