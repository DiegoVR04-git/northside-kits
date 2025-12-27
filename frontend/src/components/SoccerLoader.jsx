function SoccerLoader() {
  return (
    <div className="flex justify-center items-center h-96 flex-col gap-4">
      {/* Soccer Ball SVG with spin animation */}
      <svg
        className="animate-spin h-16 w-16 text-slate-900"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 0-10 10" />
        <path d="M12 2a10 10 0 0 1 10 10" />
        <path d="M2 12a10 10 0 0 0 10 10" />
        <path d="M22 12a10 10 0 0 1-10 10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      
      {/* Loading Text with Jersey Icon */}
      <div className="flex items-center gap-2">
        <span className="text-3xl animate-bounce">👕</span>
        <p className="text-lg font-semibold text-slate-700">
          Loading jerseys...
        </p>
      </div>
    </div>
  )
}

export default SoccerLoader
