import { useState } from 'react'

export default function ImageZoom({ src, alt }) {
  const [isHovering, setIsHovering] = useState(false)
  const [origin, setOrigin] = useState({ x: '50%', y: '50%' })

  const handleMouseMove = (e) => {
    const container = e.currentTarget
    const rect = container.getBoundingClientRect()

    // Calculate mouse position as percentage
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    // Set transform origin to follow cursor
    setOrigin({ x: `${x}%`, y: `${y}%` })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setOrigin({ x: '50%', y: '50%' })
  }

  return (
    <div
      className="overflow-hidden cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-200 ease-out"
        style={{
          transform: isHovering ? 'scale(2)' : 'scale(1)',
          transformOrigin: `${origin.x} ${origin.y}`,
        }}
      />
    </div>
  )
}
