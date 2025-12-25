import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title = 'NorthSide Kits | Premium Soccer Jerseys in Canada 🇨🇦',
  description = 'Shop high-quality retro and current soccer jerseys in Surrey & Vancouver. Player & Fan versions available. Fast shipping within Canada. No customs fees.',
  image = 'https://res.cloudinary.com/your-cloudinary/image/upload/v1/northside-kits-og.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website'
}) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph Tags (for WhatsApp, Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter/X Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Mobile & Browser */}
      <meta name="theme-color" content="#000000" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Helmet>
  )
}
