import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import PageTransition from '../components/PageTransition';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [displayLimit, setDisplayLimit] = useState(28);

  const displayedItems = wishlist.slice(0, displayLimit);

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 28);
  };

  const handleShowLess = () => {
    setDisplayLimit(28);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>My Wishlist | NorthSide Kits</title>
        <meta name="description" content="View your favorite football jerseys at NorthSide Kits. Create your custom kit collection." />
        <meta property="og:title" content="My Wishlist | NorthSide Kits" />
        <meta property="og:description" content="Save your favorite jerseys to your wishlist at NorthSide Kits." />
        {/* Canonical Tag */}
        <link rel="canonical" href={`${window.location.origin}/wishlist`} />
      </Helmet>

      <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <Heart size={32} className="text-red-600 fill-red-600" />
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">My Wishlist</h1>
            </div>
            <p className="text-slate-600 text-lg mt-2">
              {wishlist.length === 0 
                ? 'No items in your wishlist yet' 
                : `${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved`}
            </p>
          </div>

          {wishlist.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <Heart size={64} className="text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">No items yet</h2>
              <p className="text-slate-600 text-center mb-8 max-w-md">
                Start exploring our collection and add your favorite jerseys to your wishlist!
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Go Explore Kits
                <ArrowRight size={20} />
              </Link>
            </div>
          ) : (
            <>
              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {displayedItems.map((jersey) => (
                  <Link
                    key={jersey._id}
                    to={`/product/${jersey._id}`}
                    className="group"
                  >
                    <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
                      <img
                        src={jersey.images && jersey.images.length > 0 ? jersey.images[0] : '/placeholder.png'}
                        alt={jersey.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {jersey.season && (
                          <span className="text-xs font-bold bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full">
                            {jersey.season}
                          </span>
                        )}
                        {jersey.type && (
                          <span className="text-xs font-bold bg-blue-600 text-white px-3 py-1.5 rounded-full">
                            {jersey.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="mb-3">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        {jersey.team}
                      </p>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-900 transition-colors">
                        {jersey.name}
                      </h3>
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-900">
                        ${jersey.price}
                      </span>
                      <button className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
                        <Heart size={18} className="fill-white" />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {wishlist.length > 28 && (
                <div className="flex gap-4 justify-center mb-8">
                  {displayLimit < wishlist.length && (
                    <button
                      onClick={handleLoadMore}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Load More ({wishlist.length - displayLimit} remaining)
                    </button>
                  )}
                  {displayLimit > 28 && (
                    <button
                      onClick={handleShowLess}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-3 px-8 rounded-xl transition-all duration-300"
                    >
                      Show Less
                    </button>
                  )}
                </div>
              )}

              {/* Continue Shopping */}
              <div className="text-center pt-8 border-t border-gray-100">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-bold transition-colors group"
                >
                  <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
