import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ChevronRight, Star, Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import SkeletonCard from '../components/SkeletonCard'
import LiveReviews from '../components/LiveReviews'
import PageTransition from '../components/PageTransition'
import { useWishlist } from '../context/WishlistContext'
import SoccerLoader from '../components/SoccerLoader'
import SEO from '../components/SEO'

function Home() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [jerseys, setJerseys] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [displayLimit, setDisplayLimit] = useState(28)
  const [filters, setFilters] = useState({
    search: '',
    team: '',
    type: '',
    league: '',
    minPrice: '',
    maxPrice: ''
  })
  const [availableFilters, setAvailableFilters] = useState({
    teams: [],
    leagues: [],
    types: []
  })
  const [showFilters, setShowFilters] = useState(false)

  // Fetch available filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jerseys/filters`)
        setAvailableFilters(response.data)
      } catch (error) {
        console.error("Error fetching filters:", error)
      }
    }
    fetchFilters()
  }, [])

  // Fetch jerseys with filters
  useEffect(() => {
    const fetchJerseys = async () => {
      try {
        setIsLoading(true)
        setLoading(true)
        const params = new URLSearchParams()
        
        if (filters.search) params.append('search', filters.search)
        if (filters.team) params.append('team', filters.team)
        if (filters.type) params.append('type', filters.type)
        if (filters.league) params.append('league', filters.league)
        if (filters.minPrice) params.append('minPrice', filters.minPrice)
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jerseys?${params}`)
        setJerseys(response.data)
        setLoading(false)
        setIsLoading(false)
      } catch (error) {
        console.error("Error:", error)
        setLoading(false)
        setIsLoading(false)
      }
    }
    fetchJerseys()
  }, [filters])

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  const resetFilters = () => {
    setFilters({
      search: '',
      team: '',
      type: '',
      league: '',
      minPrice: '',
      maxPrice: ''
    })
    setDisplayLimit(28)
  }

  const hasActiveFilters = Object.values(filters).some(val => val !== '')

  return (
    <PageTransition>
      <SEO 
        title="NorthSide Kits | Premium Soccer Jerseys in Langley & Vancouver 🇨🇦"
        description="Shop authentic retro and new season football kits at NorthSide Kits. Based in British Columbia, Canada. Free shipping over $120 CAD. Player and fan versions available."
        url="https://northsidekits.ca"
        type="website"
      />
      
      <Helmet>
        <meta name="keywords" content="football jerseys, soccer kits, retro jerseys, football shirts, Canada, Langley, Vancouver, jersey shop" />
        <link rel="canonical" href="https://northsidekits.ca" />
        
        {/* JSON-LD Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "LocalBusiness",
            "name": "NorthSide Kits",
            "image": "https://res.cloudinary.com/your-cloudinary/image/upload/v1/northside-kits-logo.png",
            "description": "Premier football jersey shop in British Columbia, Canada. Authentic retro and current season jerseys.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CA",
              "addressRegion": "BC"
            },
            "url": "https://northsidekits.ca",
            "telephone": "+1-604-xxx-xxxx",
            "priceRange": "CAD 50 - CAD 200",
            "areaServed": "CA"
          })}
        </script>
      </Helmet>
      <div className="bg-white">
      {/* PREMIUM HERO SECTION */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Decorative blur elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl -ml-48 pointer-events-none"></div>

        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
            Premium Football Kits
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
            Curated collection of jerseys from the world's greatest clubs and national teams
          </p>
          <button 
            onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Shop Collection
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FILTERS & SEARCH */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name, team, league..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input-premium"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 font-medium text-sm"
          >
            <ChevronRight size={18} className={`transition-transform duration-300 ${showFilters ? 'rotate-90' : ''}`} />
            Filters
          </button>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Team */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5 uppercase tracking-wide">Team</label>
                <select
                  value={filters.team}
                  onChange={(e) => handleFilterChange('team', e.target.value)}
                  className="input-premium text-sm"
                >
                  <option value="">All Teams</option>
                  {availableFilters.teams.map((team) => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5 uppercase tracking-wide">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="input-premium text-sm"
                >
                  <option value="">All Types</option>
                  {availableFilters.types.map((type) => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>

              {/* League */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5 uppercase tracking-wide">League</label>
                <select
                  value={filters.league}
                  onChange={(e) => handleFilterChange('league', e.target.value)}
                  className="input-premium text-sm"
                >
                  <option value="">All Leagues</option>
                  {availableFilters.leagues.map((league) => (
                    <option key={league} value={league}>{league}</option>
                  ))}
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5 uppercase tracking-wide">Min Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="input-premium text-sm"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5 uppercase tracking-wide">Max Price</label>
                <input
                  type="number"
                  placeholder="999"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="input-premium text-sm"
                />
              </div>

              {/* Reset */}
              {hasActiveFilters && (
                <div className="sm:col-span-2 lg:col-span-5">
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2.5 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-bold text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section id="products" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {isLoading ? (
          <SoccerLoader />
        ) : loading ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))}
            </div>
          </div>
        ) : jerseys.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-slate-600 mb-6">No jerseys found matching your filters.</p>
            <button
              onClick={resetFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            <p className="text-slate-600 mb-8 font-medium">
              Showing <span className="font-bold text-slate-900">{jerseys.length}</span> jersey{jerseys.length !== 1 ? 's' : ''}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...jerseys].slice(0, displayLimit).sort((a, b) => {
                const aSoldOut = !a.sizes || a.sizes.length === 0;
                const bSoldOut = !b.sizes || b.sizes.length === 0;
                return aSoldOut - bSoldOut;
              }).map((jersey, index) => {
                const isSoldOut = !jersey.sizes || jersey.sizes.length === 0;

                return (
                  <Link to={`/product/${jersey._id}`} key={jersey._id || `jersey-${index}`} className="group">
                    <div className={`overflow-hidden flex flex-col h-full rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 ${isSoldOut ? 'opacity-60' : ''}`}>
                      
                      {/* IMAGE */}
                      <div className="h-80 sm:h-96 bg-gray-100 overflow-hidden flex items-center justify-center p-6 relative">
                        {jersey.images && jersey.images.length > 0 ? (
                          <img 
                            src={jersey.images[0]} 
                            alt={jersey.name}
                            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <span className="text-sm">No Image</span>
                          </div>
                        )}
                        
                        {jersey.isRetro && !isSoldOut && (
                          <span className="absolute top-4 left-4 bg-slate-900 text-white px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg">Retro</span>
                        )}

                        {/* WISHLIST HEART BUTTON */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (isInWishlist(jersey._id)) {
                              removeFromWishlist(jersey._id);
                              toast.success('Removed from Wishlist');
                            } else {
                              addToWishlist(jersey);
                              toast.success('Added to Wishlist');
                            }
                          }}
                          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <Heart 
                            size={20} 
                            className={`transition-colors duration-300 ${
                              isInWishlist(jersey._id) 
                                ? 'fill-red-600 text-red-600' 
                                : 'text-gray-400 hover:text-red-600'
                            }`}
                          />
                        </button>

                        {isSoldOut && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
                            <span className="bg-slate-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-2xl transform -rotate-3">
                              SOLD OUT
                            </span>
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-6 flex-grow flex flex-col justify-between bg-white">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{jersey.team}</p>
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-slate-700 transition-colors line-clamp-2 mb-2">
                            {jersey.name}
                          </h3>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          {isSoldOut ? (
                            <span className="text-slate-500 font-bold text-sm">Out of Stock</span>
                          ) : (
                            <span className="text-2xl font-black text-slate-900">${jersey.price}</span>
                          )}
                          
                          <button className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300 hover:-translate-y-1 ${
                            isSoldOut 
                              ? 'bg-gray-100 text-gray-500' 
                              : 'bg-slate-900 text-white group-hover:shadow-lg'
                          }`}>
                            {isSoldOut ? 'View' : 'View'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Show More/Show Less Buttons */}
            {(displayLimit < jerseys.length || displayLimit > 28) && (
              <div className="flex justify-center gap-4 mt-12">
                {displayLimit < jerseys.length && (
                  <button
                    onClick={() => setDisplayLimit(displayLimit + 28)}
                    className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Load More Jerseys
                  </button>
                )}
                {displayLimit > 28 && (
                  <button
                    onClick={() => setDisplayLimit(28)}
                    className="px-8 py-3 bg-gray-600 text-white font-bold rounded-lg hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
                    style={{ fontFamily: 'Inter' }}
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* LIVE REVIEWS SECTION - DYNAMIC COMMUNITY */}
      <LiveReviews />

      {/* REQUEST A KIT BANNER - CUSTOM SOURCING */}
      <section className="w-full bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ fontFamily: 'Poppins' }}>
            Don't see what you're looking for?
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Inter' }}>
            We can source almost any jersey for you. Retro classics, specific players, or rare finds. Just send us a message!
          </p>
          <a
            href="https://wa.me/525626340102?text=Hi%20NorthSide%20Kits,%20I%20am%20looking%20for%20a%20specific%20jersey..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-md"
            style={{ fontFamily: 'Inter' }}
          >
            📲 Chat with us on WhatsApp
          </a>
        </div>
      </section>
      </div>
    </PageTransition>
  )
}

export default Home