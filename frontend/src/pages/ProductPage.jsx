import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ShoppingCart, Check, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import SizeGuideModal from '../components/SizeGuideModal'
import Breadcrumbs from '../components/Breadcrumbs'
import PageTransition from '../components/PageTransition'

function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [jersey, setJersey] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [mainImage, setMainImage] = useState('')
  const [addedToCart, setAddedToCart] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  useEffect(() => {
    const fetchJersey = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jerseys/${id}`)
        setJersey(response.data)
        if(response.data && response.data.images.length > 0) {
            setMainImage(response.data.images[0])
        }
        
        // Fetch all jerseys for related products
        const allJerseysResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/jerseys`)
        const allJerseys = allJerseysResponse.data
        
        // Filter related products: same league or same team, exclude current product
        let related = allJerseys.filter(j => 
          j._id !== id && 
          (j.league === response.data.league || j.team === response.data.team)
        )
        
        // If less than 4 matches, fill with random jerseys
        if (related.length < 4) {
          const remaining = allJerseys.filter(j => 
            j._id !== id && !related.some(r => r._id === j._id)
          )
          const randomJerseys = remaining.sort(() => Math.random() - 0.5)
          related = [...related, ...randomJerseys].slice(0, 4)
        } else {
          related = related.slice(0, 4)
        }
        
        setRelatedProducts(related)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchJersey()
  }, [id])

  const handleAddToCart = () => {
    addToCart(jersey, selectedSize);
    toast.success(`${jersey.name} (${selectedSize}) added to cart ✅`, {
      duration: 3000
    })
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-blue-900 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!jersey) {
    return (
      <>
        <Helmet>
          <title>Product Not Found | NorthSide Kits</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-slate-600 font-medium mb-6">Product not found</p>
            <Link to="/" className="text-blue-900 font-bold hover:text-blue-800">Back to Shop</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{jersey.name} - Buy in Canada | NorthSide Kits</title>
        <meta name="description" content={`Shop ${jersey.name} at NorthSide Kits. Premium authentic football jersey, ${jersey.league}. Based in Langley, BC. Free shipping over $120 CAD.`} />
        <meta name="keywords" content={`${jersey.name}, ${jersey.team}, ${jersey.league}, football jersey, soccer kit, Canada`} />
        
        {/* Canonical Tag - Prevent Duplicate Content (excludes query parameters) */}
        <link rel="canonical" href={`${window.location.origin}/product/${id}`} />
        
        {/* OpenGraph Meta Tags for Social Sharing */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${jersey.name} - Premium Football Jersey | NorthSide Kits`} />
        <meta 
          property="og:description" 
          content={`${(jersey.description || `Shop ${jersey.name} - ${jersey.team} ${jersey.league}`).substring(0, 150)}...`}
        />
        <meta property="og:image" content={mainImage || jersey.images?.[0]} />
        <meta property="og:url" content={`${window.location.origin}/product/${id}`} />
        <meta property="og:site_name" content="NorthSide Kits" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${jersey.name} - NorthSide Kits`} />
        <meta name="twitter:description" content={`Premium authentic ${jersey.team} jersey from NorthSide Kits. Free shipping over $120 CAD`} />
        <meta name="twitter:image" content={mainImage || jersey.images?.[0]} />

        {/* JSON-LD Schema Markup for Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": jersey.name,
            "image": jersey.images && jersey.images.length > 0 ? jersey.images : [],
            "description": jersey.description || `Premium ${jersey.team} ${jersey.league} football jersey from NorthSide Kits. Authentic and verified merchandise.`,
            "brand": {
              "@type": "Brand",
              "name": "NorthSide Kits"
            },
            "offers": {
              "@type": "Offer",
              "url": `${window.location.origin}/product/${id}`,
              "priceCurrency": "CAD",
              "price": jersey.price.toString(),
              "availability": jersey.sizes && jersey.sizes.length > 0 
                ? "https://schema.org/InStock" 
                : "https://schema.org/OutOfStock",
              "seller": {
                "@type": "Organization",
                "name": "NorthSide Kits",
                "url": "https://northsidekits.ca"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "@context": "https://schema.org/",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <Breadcrumbs 
            paths={[
              { name: 'Home', url: '/' },
              { name: jersey.league, url: '/' },
              { name: jersey.name, url: null }
            ]}
          />
        </div>
      </div>

      {/* PRODUCT SHOWCASE */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* GALLERY - STICKY */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg">
              {/* Main Image */}
              <div className="aspect-square flex items-center justify-center overflow-hidden group bg-gray-100 relative">
                <img 
                  src={mainImage} 
                  alt={`${jersey.name} - Front View - ${jersey.team} - NorthSide Kits`}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* WISHLIST HEART BUTTON */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (isInWishlist(jersey._id)) {
                      removeFromWishlist(jersey._id);
                      toast.success('Removed from Wishlist');
                    } else {
                      addToWishlist(jersey);
                      toast.success('Added to Wishlist');
                    }
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 z-20"
                >
                  <Heart 
                    size={24} 
                    className={`transition-colors duration-300 ${
                      isInWishlist(jersey._id) 
                        ? 'fill-red-600 text-red-600' 
                        : 'text-gray-400 hover:text-red-600'
                    }`}
                  />
                </button>
              </div>

              {/* Thumbnails */}
              {jersey.images && jersey.images.length > 1 && (
                <div className="p-4 border-t border-gray-100 flex gap-3 overflow-x-auto">
                  {jersey.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImage(img)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        mainImage === img ? 'border-slate-900 scale-105' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="space-y-8">
            
            {/* BADGES */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-slate-900 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md">{jersey.season}</span>
              <span className="bg-gray-200 text-gray-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md capitalize">{jersey.type}</span>
              {jersey.isRetro && <span className="bg-slate-900 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md">Retro</span>}
              <span className="bg-gray-200 text-gray-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md">{jersey.league}</span>
            </div>

            {/* TITLE & META */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{jersey.team}</p>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">{jersey.name}</h1>
              <p className="text-4xl sm:text-5xl font-black text-slate-900">${jersey.price}</p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-base text-gray-700 leading-relaxed border-l-4 border-slate-900 pl-6">
              {jersey.description || "Premium quality authentic football jersey from our curated collection."}
            </p>

            {/* SIZE SELECTOR */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  {jersey.sizes.length > 0 ? "Select Your Size" : "Status"}
                </h3>
                {jersey.sizes.length > 0 && (
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    📏 Size Guide
                  </button>
                )}
              </div>
              
              {jersey.sizes.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {jersey.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-16 h-16 rounded-lg font-bold text-lg transition-all duration-300 border-2 ${
                        selectedSize === size 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-white border-gray-300 text-gray-700 hover:border-slate-900 hover:text-slate-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-gray-700 font-bold text-lg">🚫 Out of Stock</p>
                  <p className="text-gray-600 text-sm mt-1">This item is currently unavailable</p>
                </div>
              )}
            </div>

            {/* ADD TO CART BUTTON */}
            <button 
              disabled={!selectedSize || jersey.sizes.length === 0}
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 ${
                selectedSize && jersey.sizes.length > 0
                  ? 'bg-slate-900 text-white shadow-md hover:shadow-lg' 
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <><Check size={24} className="text-green-400" /> Added to Cart!</>
              ) : jersey.sizes.length === 0 ? (
                'Out of Stock'
              ) : !selectedSize ? (
                'Select a Size'
              ) : (
                <><ShoppingCart size={24} /> Add to Cart</>
              )}
            </button>

            {/* TRUST BADGES */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
              <Check size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900">Authentic & Verified</p>
                <p className="text-sm text-emerald-700">Guaranteed original merchandise with secure worldwide shipping</p>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-slate-200">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12" style={{ fontFamily: 'Poppins' }}>
              You Might Also Like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedJersey) => (
                <Link to={`/product/${relatedJersey._id}`} key={relatedJersey._id} className="group">
                  <div className="card-hover rounded-2xl overflow-hidden flex flex-col h-full">
                    
                    {/* IMAGE */}
                    <div className="h-64 sm:h-72 bg-slate-100 overflow-hidden flex items-center justify-center p-4 relative">
                      {relatedJersey.images && relatedJersey.images.length > 0 ? (
                        <img 
                          src={relatedJersey.images[0]} 
                          alt={relatedJersey.name}
                          className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                          <span className="text-sm">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{relatedJersey.team}</p>
                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-slate-700 transition-colors line-clamp-2 mb-2">
                          {relatedJersey.name}
                        </h3>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="text-lg font-black text-slate-900">${relatedJersey.price}</span>
                        <button className="px-2 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all duration-300">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
      
      {/* SIZE GUIDE MODAL */}
      <SizeGuideModal 
        isOpen={sizeGuideOpen} 
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* STICKY MOBILE ADD TO CART BAR */}
      {jersey && (
        <div className="hidden sm:hidden md:hidden lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 sm:hidden">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            {/* Price */}
            <div className="flex-shrink-0">
              {jersey.sizes && jersey.sizes.length > 0 ? (
                <p className="text-2xl font-black text-slate-900">${jersey.price}</p>
              ) : (
                <p className="text-gray-600 font-bold">Out of Stock</p>
              )}
            </div>

            {/* Add to Cart Button */}
            <button 
              disabled={!selectedSize || !jersey.sizes || jersey.sizes.length === 0}
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                selectedSize && jersey.sizes && jersey.sizes.length > 0
                  ? 'bg-slate-900 text-white hover:shadow-lg' 
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <><Check size={20} className="text-green-400" /> Added!</>
              ) : jersey.sizes && jersey.sizes.length === 0 ? (
                'Out of Stock'
              ) : !selectedSize ? (
                'Select Size'
              ) : (
                <><ShoppingCart size={20} /> Add</>
              )}
            </button>
          </div>
        </div>
      )}
    </PageTransition>
  )
}

export default ProductPage