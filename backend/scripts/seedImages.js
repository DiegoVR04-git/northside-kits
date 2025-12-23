require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// 1. Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. EL MAPA MAESTRO
const TEAM_MAP = {
  // 🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE
  'arsenal': 'clubs/premier_league',
  'astonvilla': 'clubs/premier_league',
  'chelsea': 'clubs/premier_league',
  'everton': 'clubs/premier_league',
  'liverpool': 'clubs/premier_league',
  'mancity': 'clubs/premier_league',
  'manutd': 'clubs/premier_league',
  'newcastle': 'clubs/premier_league',
  'tottenham': 'clubs/premier_league',
  'westham': 'clubs/premier_league',
  'wolves': 'clubs/premier_league',
  'brighton': 'clubs/premier_league',
  
  // 🇪🇸 LA LIGA
  'atleticomadrid': 'clubs/la_liga',
  'barcelona': 'clubs/la_liga',
  'betis': 'clubs/la_liga',
  'realmadrid': 'clubs/la_liga',
  'realsociedad': 'clubs/la_liga',
  'sevilla': 'clubs/la_liga',
  'valencia': 'clubs/la_liga',
  'villarreal': 'clubs/la_liga',
  'athletic': 'clubs/la_liga',
  
  // 🇮🇹 SERIE A
  'acmilan': 'clubs/serie_a',
  'milan': 'clubs/serie_a',
  'inter': 'clubs/serie_a',
  'juventus': 'clubs/serie_a',
  'lazio': 'clubs/serie_a',
  'napoli': 'clubs/serie_a',
  'roma': 'clubs/serie_a',
  'fiorentina': 'clubs/serie_a',
  'atalanta': 'clubs/serie_a',
  
  // 🇩🇪 BUNDESLIGA
  'bayern': 'clubs/bundesliga',
  'dortmund': 'clubs/bundesliga',
  'leverkusen': 'clubs/bundesliga',
  'leipzig': 'clubs/bundesliga',
  'frankfurt': 'clubs/bundesliga',
  'stuttgart': 'clubs/bundesliga',
  
  // 🇫🇷 LIGUE 1
  'psg': 'clubs/ligue_1',
  'marseille': 'clubs/ligue_1',
  'lyon': 'clubs/ligue_1',
  'monaco': 'clubs/ligue_1',
  'lille': 'clubs/ligue_1',

  // 🇧🇷 BRASILEIRAO
  'santos': 'clubs/brasileirao',
  'flamengo': 'clubs/brasileirao',
  'palmeiras': 'clubs/brasileirao',
  'saopaulo': 'clubs/brasileirao',
  'corinthians': 'clubs/brasileirao',
  'gremio': 'clubs/brasileirao',
  'internacional': 'clubs/brasileirao',
  'vasco': 'clubs/brasileirao',
  'cruzeiro': 'clubs/brasileirao',
  'fluminense': 'clubs/brasileirao',
  'botafogo': 'clubs/brasileirao',
  'atleticomineiro': 'clubs/brasileirao',

  // 🇦🇷 ARGENTINA
  'bocajuniors': 'clubs/argentina',
  'boca': 'clubs/argentina',
  'riverplate': 'clubs/argentina',
  'river': 'clubs/argentina',
  'independiente': 'clubs/argentina',
  'racing': 'clubs/argentina',
  'sanlorenzo': 'clubs/argentina',
  'newells': 'clubs/argentina',
  'rosariocentral': 'clubs/argentina',

  // 🏆 LIBERTADORES
  'penarol': 'clubs/libertadores',
  'nacional': 'clubs/libertadores',
  'colocolo': 'clubs/libertadores',
  'udechile': 'clubs/libertadores',
  'atleticonacional': 'clubs/libertadores',
  'millonarios': 'clubs/libertadores',
  'olimpia': 'clubs/libertadores',

  // 🇲🇽 LIGA MX
  'america': 'clubs/liga_mx',
  'chivas': 'clubs/liga_mx',
  'cruzazul': 'clubs/liga_mx',
  'pumas': 'clubs/liga_mx',
  'tigres': 'clubs/liga_mx',
  'monterrey': 'clubs/liga_mx',
  'toluca': 'clubs/liga_mx',
  'atlas': 'clubs/liga_mx',
  'santoslaguna': 'clubs/liga_mx',

  // 🌎 OTROS EUROPA
  'ajax': 'clubs/eredivisie',
  'feyenoord': 'clubs/eredivisie',
  'psv': 'clubs/eredivisie',
  'benfica': 'clubs/primeira_liga',
  'porto': 'clubs/primeira_liga',
  'sporting': 'clubs/primeira_liga',
  'galatasaray': 'clubs/super_lig',
  'fenerbahce': 'clubs/super_lig',
  'celtic': 'clubs/scotland',
  'rangers': 'clubs/scotland',

  // 🇺🇸 MLS
  'intermiami': 'clubs/mls',
  'lagalaxy': 'clubs/mls',
  'lafc': 'clubs/mls',
  'atlanta': 'clubs/mls',

  // 🌍 SELECCIONES NACIONALES
  'argentina': 'national_teams/conmebol',
  'brazil': 'national_teams/conmebol',
  'uruguay': 'national_teams/conmebol',
  'colombia': 'national_teams/conmebol',
  'chile': 'national_teams/conmebol',
  'peru': 'national_teams/conmebol',
  'ecuador': 'national_teams/conmebol',
  'paraguay': 'national_teams/conmebol',
  'venezuela': 'national_teams/conmebol',
  'bolivia': 'national_teams/conmebol',
  
  'france': 'national_teams/uefa',
  'germany': 'national_teams/uefa',
  'spain': 'national_teams/uefa',
  'italy': 'national_teams/uefa',
  'england': 'national_teams/uefa',
  'portugal': 'national_teams/uefa',
  'netherlands': 'national_teams/uefa',
  'belgium': 'national_teams/uefa',
  'croatia': 'national_teams/uefa',
  
  'mexico': 'national_teams/concacaf',
  'usa': 'national_teams/concacaf',
  'canada': 'national_teams/concacaf',
  
  'japan': 'national_teams/afc',
  'southkorea': 'national_teams/afc',
  'morocco': 'national_teams/caf',
  'senegal': 'national_teams/caf',
  'nigeria': 'national_teams/caf',
  'egypt': 'national_teams/caf',
};

const IMAGES_DIR = path.join(__dirname, '../images_temp');

// 🔍 RECURSIVE FUNCTION: Searches for files inside folders
function getAllFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      // If it's a folder, enter it (Recursion)
      // WARNING: Avoid entering 'backend' or 'node_modules' if copied by mistake
      if (file !== 'backend' && file !== 'node_modules' && file !== '.git') {
         arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      // Si es un archivo, lo agrega a la lista
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

async function uploadImages() {
  try {
    if (!fs.existsSync(IMAGES_DIR)) {
      console.error(`❌ Error: No encuentro la carpeta ${IMAGES_DIR}`);
      return;
    }

    console.log("🔍 Escaneando carpetas en busca de archivos (esto puede tardar)...");
    
    // We get ALL files, even those inside subfolders
    const allFiles = getAllFiles(IMAGES_DIR);
    
    console.log(`🚀 Se encontraron ${allFiles.length} archivos totales. Iniciando carga...`);

    for (const filePath of allFiles) {
      const file = path.basename(filePath); // File name (e.g: chelsea-home.jpg)
      
      // Filtra archivos ocultos o basura
      if (file.startsWith('.') || file === 'Thumbs.db') continue;
      
      // We only accept images
      if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

      const fileNameWithoutExt = path.parse(file).name; 
      
      // Split by hyphens and take first word
      const teamKey = fileNameWithoutExt.split('-')[0].toLowerCase(); 

      let folderPath = 'ecommerce-jerseys/otros';
      
      if (TEAM_MAP[teamKey]) {
        folderPath = `ecommerce-jerseys/${TEAM_MAP[teamKey]}`;
      } else {
        console.warn(`⚠️ Unrecognized team: "${teamKey}". It will be uploaded to "others".`);
      }

      console.log(`📤 Subiendo: ${fileNameWithoutExt} --> [${folderPath}]`);

      try {
        await cloudinary.uploader.upload(filePath, {
            folder: folderPath,
            public_id: fileNameWithoutExt,
            overwrite: true,
            resource_type: "image"
        });
      } catch (uploadError) {
          console.error(`❌ Error subiendo ${file}:`, uploadError.message);
      }
    }

    console.log('✅ Mission Accomplished! Your complete catalog is in the cloud.');

  } catch (error) {
    console.error('❌ Error fatal:', error);
  }
}

uploadImages();