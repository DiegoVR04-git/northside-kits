import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ paths = [] }) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb" style={{ fontFamily: 'Inter' }}>
      {paths.map((path, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Link or Text */}
          {path.url ? (
            <Link
              to={path.url}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              {path.name}
            </Link>
          ) : (
            <span className="text-slate-900 font-semibold">
              {path.name}
            </span>
          )}

          {/* Chevron - Only show if not the last item */}
          {index < paths.length - 1 && (
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          )}
        </div>
      ))}
    </nav>
  )
}
