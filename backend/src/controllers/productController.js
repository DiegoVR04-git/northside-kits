const Jersey = require('../models/Jersey');
const { cloudinary } = require('../config/cloudinary');

// ==========================================
// 1. SEARCH LOGIC (PUBLIC)
// ==========================================
const getJerseys = async (req, res) => {
  try {
    const { search, team, type, league, minPrice, maxPrice, isRetro } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { team: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { league: { $regex: search, $options: 'i' } }
      ];
    }
    if (team) filter.team = team;
    if (type) filter.type = type;
    if (league) filter.league = league;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (isRetro === 'true') filter.isRetro = true;
    else if (isRetro === 'false') filter.isRetro = false;

    const jerseys = await Jersey.find(filter);
    res.json(jerseys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching for products' });
  }
};

const getFilters = async (req, res) => {
  try {
    const teams = await Jersey.distinct('team');
    const leagues = await Jersey.distinct('league');
    const types = await Jersey.distinct('type');
    res.json({ teams: teams.sort(), leagues: leagues.sort(), types: types.sort() });
  } catch (error) {
    res.status(500).json({ message: 'Error getting filters' });
  }
};

// ==========================================
// 2. ADMIN LOGIC (CRUD + STOCK)
// ==========================================

const getJerseyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    let jersey;
    
    // Try to find by ID first (if it looks like MongoDB ObjectId)
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      jersey = await Jersey.findById(id);
    }
    
    // If not found by ID or not a valid ObjectId, try to find by slug
    if (!jersey) {
      jersey = await Jersey.findOne({ slug: id });
    }
    
    if (!jersey) {
      return res.status(404).json({ message: 'Not found' });
    }
    
    res.json(jersey);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createJersey = async (req, res) => {
  try {
    const { name, team, price, description, season, type, league, isRetro, sizes } = req.body;
    
    // 1. Process Images
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path);
    }

    // 2. Process Sizes (Comes as JSON String from frontend)
    let parsedSizes;
    try {
        parsedSizes = sizes ? JSON.parse(sizes) : ['S', 'M', 'L']; 
    } catch (e) {
        parsedSizes = ['S', 'M', 'L'];
    }

    const newJersey = new Jersey({
      name, team, league, price, description, season, type,
      isRetro: isRetro === 'true',
      sizes: parsedSizes, // Guardamos el array limpio
      images,
      inStock: parsedSizes.length > 0
    });

    await newJersey.save();
    res.status(201).json(newJersey);
  } catch (error) {
    console.error("Error creating:", error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

const updateJersey = async (req, res) => {
  try {
    const updates = req.body;
    
    // 1. Process New Images
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map(file => file.path);
    }

    // 2. Process New Sizes
    if (updates.sizes) {
        try {
            updates.sizes = JSON.parse(updates.sizes);
            updates.inStock = updates.sizes.length > 0;
        } catch (e) {
            delete updates.sizes; // If it fails, don't update sizes
        }
    }

    const updatedJersey = await Jersey.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedJersey);
  } catch (error) {
    res.status(500).json({ message: 'Error updating' });
  }
};

const deleteJersey = async (req, res) => {
  try {
    await Jersey.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting' });
  }
};

module.exports = { 
  getJerseys, 
  getFilters, 
  getJerseyById, 
  createJersey, 
  deleteJersey, 
  updateJersey 
};