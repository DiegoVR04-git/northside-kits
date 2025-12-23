const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary'); 
const { 
  getJerseys, 
  getFilters,      // <-- Agregado
  getJerseyById, 
  createJersey, 
  deleteJersey,
  updateJersey 
} = require('../controllers/productController');

// Public Routes
router.get('/', getJerseys);
router.get('/filters', getFilters); // <-- Ruta de filtros
router.get('/:id', getJerseyById);

// Rutas Admin
router.post('/', upload.array('images', 5), createJersey);
router.put('/:id', upload.array('images', 5), updateJersey);
router.delete('/:id', deleteJersey);

module.exports = router;