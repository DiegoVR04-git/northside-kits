import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title = 'NorthSide Kits | Premium Soccer Jerseys in Canada 🇨🇦',
  description = 'Shop high-quality retro and current soccer jerseys in Surrey & Vancouver. Player & Fan versions available. Fast shipping within Canada. No customs fees.',
  image = 'https://res.cloudinary.com/your-cloudinary/image/upload/v1/northside-kits-og.jpg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://northsidekits.ca',
  type = 'website',
  author = 'NorthSide Kits',
  publishedDate = null,
  modifiedDate = null
}) {
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": type === 'product' ? "Product" : "WebPage",
    "name": title,
    "description": description,
    "image": image,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": author
    }
  };

  if (publishedDate) {
    structuredData.datePublished = publishedDate;
  }
  if (modifiedDate) {
    structuredData.dateModified = modifiedDate;
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      
      {/* Open Graph Tags (for WhatsApp, Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="NorthSide Kits" />
      
      {/* Twitter/X Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@NorthSideKits" />
      
      {/* Mobile & Browser */}
      <meta name="theme-color" content="#000000" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* SEO & Indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}
