export default function SkeletonCard() {
  return (
    <div className="group">
      <div className="rounded-2xl overflow-hidden flex flex-col h-full bg-white border border-slate-200 shadow-sm">
        {/* Image Skeleton */}
        <div className="h-80 sm:h-96 bg-slate-200 animate-pulse" />
        
        {/* Content Skeleton */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            {/* Team Badge Skeleton */}
            <div className="h-3 bg-slate-200 animate-pulse rounded mb-3 w-24" />
            
            {/* Title Skeleton (2 lines) */}
            <div className="space-y-2 mb-3">
              <div className="h-5 bg-slate-200 animate-pulse rounded w-full" />
              <div className="h-5 bg-slate-200 animate-pulse rounded w-3/4" />
            </div>
          </div>
          
          {/* Price & Button Skeleton */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <div className="h-6 bg-slate-200 animate-pulse rounded w-20" />
            <div className="h-10 bg-slate-200 animate-pulse rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}
