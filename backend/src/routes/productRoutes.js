const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { verifyToken } = require('../middleware/auth');
const { 
  getJerseys, 
  getFilters,      // <-- Agregado
  getJerseyById, 
  createJersey, 
  deleteJersey,
  updateJersey,
  getSitemap       // <-- Agregado
} = require('../controllers/productController');

// Public Routes
router.get('/sitemap.xml', getSitemap);  // Sitemap must be before /:id to avoid conflict
router.get('/', getJerseys);
router.get('/filters', getFilters); // <-- Ruta de filtros
// Dynamic route that accepts both ID and slug
router.get('/:id', getJerseyById);

// Protected Admin Routes (Require JWT Token)
router.post('/', verifyToken, upload.array('images', 5), createJersey);
router.put('/:id', verifyToken, upload.array('images', 5), updateJersey);
router.delete('/:id', verifyToken, deleteJersey);

module.exports = router;