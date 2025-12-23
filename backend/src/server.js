require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// 1. Conectar a Base de Datos
connectDB();

// 2. Middlewares (Configuration)
app.use(cors()); // Permite que el Frontend (React) nos hable
app.use(express.json()); // Permite recibir datos JSON

// 3. Rutas
app.use('/api/auth', authRoutes); // Authentication (Login)
app.use('/api/jerseys', productRoutes); // Products (CRUD)

// Test route to see if server is alive
app.get('/', (req, res) => {
  res.send('API de Jersey E-commerce funcionando 🚀');
});

// 4. Encender el Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});