/**
 * Script para generar slugs para todos los productos existentes
 * Ejecutar con: node backend/scripts/generateSlugs.js
 */

require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const Jersey = require('../src/models/Jersey');

const generateSlug = (name, team, season) => {
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '')
    .replace(/\-+/g, '-');
  
  if (team) {
    slug = `${slug}-${team.toLowerCase().replace(/\s+/g, '-')}`;
  }
  if (season) {
    slug = `${slug}-${season}`;
  }
  
  return slug;
};

async function generateSlugs() {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/jersey-shop';
    
    console.log('🔗 Conectando a MongoDB...');
    await mongoose.connect(mongoURI);

    console.log('📊 Buscando productos sin slug...');
    const jerseysWithoutSlug = await Jersey.find({ slug: { $exists: false } });
    
    console.log(`Found ${jerseysWithoutSlug.length} products without slug`);

    if (jerseysWithoutSlug.length === 0) {
      console.log('✅ Todos los productos ya tienen slug');
      await mongoose.connection.close();
      return;
    }

    // Actualizar cada producto
    for (const jersey of jerseysWithoutSlug) {
      const slug = generateSlug(jersey.name, jersey.team, jersey.season);
      jersey.slug = slug;
      await jersey.save();
      console.log(`✅ ${jersey.name} -> ${slug}`);
    }

    console.log(`\n🎉 Se generaron ${jerseysWithoutSlug.length} slugs exitosamente`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error generating slugs:', error);
    process.exit(1);
  }
}

generateSlugs();
