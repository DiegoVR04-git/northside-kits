require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const connectDB = require('../src/config/db');
const Jersey = require('../src/models/Jersey');

// 1. Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Mapa de Ligas
const TEAM_LEAGUE_MAP = {
  // Premier League
  'arsenal': 'Premier League', 'astonvilla': 'Premier League', 'chelsea': 'Premier League',
  'everton': 'Premier League', 'liverpool': 'Premier League', 'mancity': 'Premier League',
  'manutd': 'Premier League', 'newcastle': 'Premier League', 'tottenham': 'Premier League',
  'westham': 'Premier League', 'wolves': 'Premier League', 'brighton': 'Premier League',
  
  // La Liga
  'atleticomadrid': 'La Liga', 'barcelona': 'La Liga', 'betis': 'La Liga',
  'realmadrid': 'La Liga', 'realsociedad': 'La Liga', 'sevilla': 'La Liga',
  'valencia': 'La Liga', 'villarreal': 'La Liga', 'athletic': 'La Liga',
  
  // Serie A
  'acmilan': 'Serie A', 'milan': 'Serie A', 'inter': 'Serie A', 'juventus': 'Serie A',
  'lazio': 'Serie A', 'napoli': 'Serie A', 'roma': 'Serie A', 'fiorentina': 'Serie A', 'atalanta': 'Serie A',
  
  // Bundesliga
  'bayern': 'Bundesliga', 'dortmund': 'Bundesliga', 'leverkusen': 'Bundesliga',
  'leipzig': 'Bundesliga', 'frankfurt': 'Bundesliga', 'stuttgart': 'Bundesliga',
  
  // Ligue 1
  'psg': 'Ligue 1', 'marseille': 'Ligue 1', 'lyon': 'Ligue 1', 'monaco': 'Ligue 1', 'lille': 'Ligue 1',

  // Brasileirao
  'santos': 'Brasileirao', 'flamengo': 'Brasileirao', 'palmeiras': 'Brasileirao',
  'saopaulo': 'Brasileirao', 'corinthians': 'Brasileirao', 'gremio': 'Brasileirao',
  'internacional': 'Brasileirao', 'vasco': 'Brasileirao', 'cruzeiro': 'Brasileirao',
  'fluminense': 'Brasileirao', 'botafogo': 'Brasileirao', 'atleticomineiro': 'Brasileirao',

  // Argentina
  'bocajuniors': 'Primera División AR', 'boca': 'Primera División AR',
  'riverplate': 'Primera División AR', 'river': 'Primera División AR',
  'independiente': 'Primera División AR', 'racing': 'Primera División AR',
  'sanlorenzo': 'Primera División AR', 'newells': 'Primera División AR',

  // Libertadores
  'penarol': 'Copa Libertadores', 'nacional': 'Copa Libertadores', 
  'colocolo': 'Copa Libertadores', 'udechile': 'Copa Libertadores',
  'atleticonacional': 'Copa Libertadores', 'millonarios': 'Copa Libertadores',

  // Liga MX
  'america': 'Liga MX', 'chivas': 'Liga MX', 'cruzazul': 'Liga MX', 'pumas': 'Liga MX',
  'tigres': 'Liga MX', 'monterrey': 'Liga MX', 'toluca': 'Liga MX', 'santoslaguna': 'Liga MX',
  'atlas': 'Liga MX',

  // Selecciones
  'argentina': 'National Teams', 'brazil': 'National Teams', 'france': 'National Teams',
  'germany': 'National Teams', 'mexico': 'National Teams', 'usa': 'National Teams',
  'england': 'National Teams', 'italy': 'National Teams', 'spain': 'National Teams',
  'portugal': 'National Teams', 'japan': 'National Teams', 'uruguay': 'National Teams',
  'colombia': 'National Teams', 'chile': 'National Teams',
  
  // Otros
  'intermiami': 'MLS', 'lagalaxy': 'MLS', 'lafc': 'MLS',
  'ajax': 'Eredivisie', 'benfica': 'Primeira Liga', 'porto': 'Primeira Liga',
  'galatasaray': 'Süper Lig', 'fenerbahce': 'Süper Lig', 'celtic': 'Scottish Premiership'
};

// 💰 UPDATED PRICING LOGIC
const determinePrice = (details) => {
    const textToCheck = `${details.type} ${details.variant} ${details.season}`.toLowerCase();
    
    // Regla 1: Long Sleeve = $45
    if (textToCheck.includes('longsleeve')) {
        return 45;
    }

    // Regla 2: Retro (antes de 2023) = $45
    const yearMatch = details.season.match(/\d{4}/);
    if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        if (year < 2023) return 45; 
    }

    // Rule 3: EVERYTHING ELSE (Standard, Player, Fan, Kids) = $35
    return 35;
};

const importProducts = async () => {
  try {
    await connectDB();

    console.log("🧹 Limpiando base de datos anterior...");
    await Jersey.deleteMany({}); 

    console.log("☁️  Getting images from Cloudinary...");
    
    // We fetch up to 500 images
    const result = await cloudinary.search
      .expression('folder:ecommerce-jerseys/*')
      .max_results(500)
      .execute();

    const resources = result.resources;
    const productsMap = {};

    console.log(`📸 Found ${resources.length} images. Processing...`);

    // 1. AGRUPAR
    resources.forEach(img => {
      // public_id: ecommerce-jerseys/clubs/premier_league/chelsea-2425-home-front
      const fullName = img.public_id.split('/').pop(); 
      const parts = fullName.split('-');

      if (parts.length < 3) return;

      const team = parts[0];     
      const season = parts[1];   
      const type = parts[2];     

      let variant = '';
      if (parts.length > 4) {
          variant = parts[3]; // ej: 'messi', 'player', 'longsleeve'
      }

      // Unique SKU
      const productKey = variant ? `${team}-${season}-${type}-${variant}` : `${team}-${season}-${type}`;

      if (!productsMap[productKey]) {
        productsMap[productKey] = {
          name: `${team.charAt(0).toUpperCase() + team.slice(1)} ${season} ${type.toUpperCase()} Jersey`,
          team: team,
          season: season,
          type: type,
          variant: variant,
          league: TEAM_LEAGUE_MAP[team.toLowerCase()] || 'Other',
          images: []
        };
      }

      productsMap[productKey].images.push(img.secure_url);
    });

    // 2. GUARDAR
    const productsArray = Object.values(productsMap).map(p => {
        const price = determinePrice(p);
        
        let finalName = p.name;
        
        // Tag as Retro or Player in name, even if price is 35 for Player
        if (parseInt(p.season) < 2023 || p.season.startsWith('19') || p.season.startsWith('200')) {
            finalName += " (Retro)";
        } else if (p.variant.includes('player')) {
            finalName += " (Player Version)";
        } else if (p.variant.includes('longsleeve')) {
            finalName += " (Long Sleeve)";
        }

        return {
            name: finalName,
            team: p.team,
            league: p.league,
            season: p.season,
            type: p.type,
            price: price, // $35 or $45 according to new rule
            images: p.images,
            description: `Official ${p.team} jersey. Season ${p.season}`,
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            isRetro: price === 45 && !p.variant.includes('longsleeve') // Retro flag
        };
    });

    console.log(`📦 Creando ${productsArray.length} productos en MongoDB...`);
    
    await Jersey.insertMany(productsArray);

    console.log('✅ Product Import Completed Successfully!');
    process.exit();

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importProducts();