import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom' // <--- IMPORTS Navigate
import { ShoppingCart, Menu, X, MessageCircle, Heart, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useCart } from './context/CartContext'
import { useWishlist } from './context/WishlistContext'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage' 
import AdminPage from './pages/AdminPage' 
import LoginPage from './pages/LoginPage'
import PolicyPage from './pages/PolicyPage'
import WishlistPage from './pages/WishlistPage' // <--- IMPORTS WISHLIST PAGE

// --- COMPONENTE GUARDIA DE SEGURIDAD ---
// If it has the 'isAdmin' key, show the page. If not, send to Login.
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin ? children : <Navigate to="/login" />;
};

function App() {
  const { cart } = useCart();
  const { getWishlistCount } = useWishlist();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Server wake-up call on app mount
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/jerseys`)
        toast.success('Welcome to NorthSide Kits ❄️', {
          duration: 4000,
          position: 'top-center'
        })
      } catch (error) {
        console.error('Server wake-up error:', error)
      }
    }
    wakeUpServer()
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Toaster position="top-center" />
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-black text-white text-xs sm:text-sm font-bold py-2 px-4 text-center">
        🇨🇦 FREE SHIPPING on orders over $120 CAD | Based in Langley, BC
      </div>
      
      {/* PREMIUM GLASSMORPHIC NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            
            {/* Logo with tracking */}
            <Link to="/" className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 hover:opacity-75 transition-opacity duration-300 flex items-center gap-2">
              <span className="text-2xl">⚽</span>
              <span className="hidden sm:inline">NorthSide Kits</span>
              <span className="sm:hidden">NSK</span>
            </Link>
            
            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4 sm:gap-8">
              {/* Information Dropdown (Desktop) */}
              <div className="hidden md:block relative group">
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-700 hover:bg-gray-100 transition-all duration-300 text-sm font-medium">
                  Info
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2">
                  <a href="/policy" className="block px-4 py-2 text-slate-700 hover:bg-gray-50 transition-colors text-sm">
                    Shipping & Returns
                  </a>
                </div>
              </div>

              {/* Wishlist Icon */}
              <Link 
                to="/wishlist" 
                className="relative group cursor-pointer transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 group-hover:text-red-600 transition-colors" />
                </div>
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link 
                to="/cart" 
                className="relative group cursor-pointer transition-all duration-300"
              >
                <div className="p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 group-hover:text-slate-900 transition-colors" />
                </div>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-300 text-slate-700"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-100 space-y-2">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-gray-50 transition-colors"
              >
                Shop
              </Link>
              <a 
                href="/policy" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-gray-50 transition-colors"
              >
                Shipping & Returns
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* RUTAS */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          
          {/* PUBLIC LOGIN ROUTE */}
          <Route path="/login" element={<LoginPage />} />

          {/* 👇 RUTA PROTEGIDA (CANDADO) 👇 */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white mt-20 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <span className="text-2xl">⚽</span>
                NorthSide Kits
              </h3>
              <p className="text-slate-400 text-sm">Premium authentic football jerseys shipped across Canada</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wide text-xs">Information</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><a href="/" className="hover:text-white transition-colors">Shop</a></li>
                <li><a href="/policy" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wide text-xs">Location</h4>
              <p className="text-slate-400 text-sm">Based in <span className="font-bold text-white">Langley, BC</span> 🇨🇦</p>
              <p className="text-slate-500 text-xs mt-2">Shipping across Canada</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
            <p>© 2025 NorthSide Kits. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/525626340102"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-75 group-hover:opacity-0 transition-opacity duration-300 animate-pulse"></div>
      </a>
    </div>
  )
}

export default App