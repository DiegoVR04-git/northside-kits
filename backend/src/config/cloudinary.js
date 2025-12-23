const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// 1. Configurar Cloudinary con tus llaves
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configurar el Almacenamiento (Storage)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce-jerseys', // Carpeta principal
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    // THIS IS KEY: We use public_id to keep YOUR exact name
    public_id: (req, file) => {
      // Returns the file name without extension (e.g: 'chelsea-2425-home')
      return path.parse(file.originalname).name;
    },
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };