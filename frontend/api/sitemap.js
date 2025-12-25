export default async function handler(req, res) {
  try {
    // Fetch sitemap from backend on Render
    const response = await fetch('https://northside-kits.onrender.com/sitemap.xml', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)'
      }
    });

    // Check if backend request was successful
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    // Get XML content
    const xml = await response.text();

    // Set proper headers for XML sitemap
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Send XML response
    res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch sitemap from backend' });
  }
}
