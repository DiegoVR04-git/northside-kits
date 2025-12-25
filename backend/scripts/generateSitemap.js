import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Este script genera un sitemap.xml dinámico con todos los productos
// Ejecútalo con: node backend/scripts/generateSitemap.js

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
const FRONTEND_URL = 'https://northsidekits.ca';

async function generateSitemap() {
  try {
    console.log('📡 Fetching all products...');
    
    // Fetch all jerseys from your API
    const response = await axios.get(`${API_URL}/api/jerseys`);
    const jerseys = response.data;

    console.log(`✅ Found ${jerseys.length} products`);

    // Start building XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    // Static pages
    const staticPages = [
      { loc: '', changefreq: 'weekly', priority: 1.0 },
      { loc: 'login', changefreq: 'monthly', priority: 0.8 },
      { loc: 'policy', changefreq: 'yearly', priority: 0.3 },
      { loc: 'security-deposit', changefreq: 'yearly', priority: 0.3 }
    ];

    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${FRONTEND_URL}/${page.loc}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Dynamic product pages
    jerseys.forEach(jersey => {
      xml += '  <url>\n';
      xml += `    <loc>${FRONTEND_URL}/product/${jersey._id}</loc>\n`;
      xml += `    <lastmod>${new Date(jersey.updatedAt || jersey.createdAt).toISOString().split('T')[0]}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      
      // Add images
      if (jersey.images && jersey.images.length > 0) {
        jersey.images.slice(0, 5).forEach(image => {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${image}</image:loc>\n`;
          xml += `      <image:title>${jersey.name} - ${jersey.team}</image:title>\n`;
          xml += '    </image:image>\n';
        });
      }
      
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    // Write to file
    const outputPath = path.join(process.cwd(), 'frontend', 'public', 'sitemap.xml');
    fs.writeFileSync(outputPath, xml, 'utf-8');

    console.log(`✨ Sitemap generated successfully at ${outputPath}`);
    console.log(`📊 Total URLs: ${staticPages.length + jerseys.length}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

generateSitemap();
