import { useState } from 'react'

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width = 'auto',
  height = 'auto',
  cloudinaryId = null,
  priority = false 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // If cloudinaryId is provided, generate optimized URLs
  const baseCloudinaryUrl = 'https://res.cloudinary.com/your-cloudinary/image/upload'
  
  // Generate Cloudinary URLs with different widths for srcset
  const getSrcSet = () => {
    if (!cloudinaryId) return null
    return `
      ${baseCloudinaryUrl}/w_500,q_auto,f_auto/${cloudinaryId} 500w,
      ${baseCloudinaryUrl}/w_800,q_auto,f_auto/${cloudinaryId} 800w,
      ${baseCloudinaryUrl}/w_1200,q_auto,f_auto/${cloudinaryId} 1200w,
      ${baseCloudinaryUrl}/w_1600,q_auto,f_auto/${cloudinaryId} 1600w
    `.trim()
  }

  // Generate Cloudinary optimized URL
  const getOptimizedUrl = () => {
    if (!cloudinaryId) return src
    return `${baseCloudinaryUrl}/q_auto,f_auto/${cloudinaryId}`
  }

  const imageSrc = cloudinaryId ? getOptimizedUrl() : src
  const imageSrcSet = getSrcSet()

  return (
    <picture>
      {/* WebP format for modern browsers */}
      {cloudinaryId && (
        <source 
          srcSet={`
            ${baseCloudinaryUrl}/w_500,q_auto,f_webp/${cloudinaryId} 500w,
            ${baseCloudinaryUrl}/w_800,q_auto,f_webp/${cloudinaryId} 800w,
            ${baseCloudinaryUrl}/w_1200,q_auto,f_webp/${cloudinaryId} 1200w,
            ${baseCloudinaryUrl}/w_1600,q_auto,f_webp/${cloudinaryId} 1600w
          `.trim()}
          type="image/webp"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
        />
      )}
      
      {/* Fallback JPEG/PNG */}
      <img
        src={imageSrc}
        srcSet={imageSrcSet}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
      />

      {/* Placeholder fallback if image fails to load */}
      {error && (
        <div className={`${className} bg-gray-200 flex items-center justify-center text-gray-400`}>
          Image not available
        </div>
      )}
    </picture>
  )
}
