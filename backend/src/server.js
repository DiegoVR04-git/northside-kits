require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const Jersey = require('./models/Jersey');

const app = express();

// 1. Conectar a Base de Datos
connectDB();

// 2. Middlewares (Configuration)
app.use(cors()); // Permite que el Frontend (React) nos hable
app.use(express.json()); // Permite recibir datos JSON

// 3. Rutas
app.use('/api/auth', authRoutes); // Authentication (Login)
app.use('/api/jerseys', productRoutes); // Products (CRUD)

// Dynamic Sitemap XML (for SEO at root level)
app.get('/sitemap.xml', async (req, res) => {
  try {
    const products = await Jersey.find({}, { slug: 1, updatedAt: 1 }).lean();
    const baseURL = 'https://northsidekits.ca';

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static pages
    const staticPages = [
      { loc: '', changefreq: 'weekly', priority: 1.0 },
      { loc: 'login', changefreq: 'monthly', priority: 0.8 },
      { loc: 'cart', changefreq: 'never', priority: 0.5 },
      { loc: 'wishlist', changefreq: 'never', priority: 0.5 },
      { loc: 'policy', changefreq: 'yearly', priority: 0.3 },
      { loc: 'security-deposit', changefreq: 'yearly', priority: 0.3 }
    ];

    const today = new Date().toISOString().split('T')[0];

    staticPages.forEach(page => {
      const url = page.loc ? `${baseURL}/${page.loc}` : baseURL;
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Dynamic products
    products.forEach(product => {
      if (product.slug) {
        const lastmod = product.updatedAt ? product.updatedAt.toISOString().split('T')[0] : today;
        xml += '  <url>\n';
        xml += `    <loc>${baseURL}/product/${product.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        xml += '  </url>\n';
      }
    });

    xml += '</urlset>';

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// Test route to see if server is alive
app.get('/', (req, res) => {
  res.send('API de Jersey E-commerce funcionando 🚀');
});

// 4. Encender el Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});