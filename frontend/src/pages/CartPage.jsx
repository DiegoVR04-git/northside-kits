import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Trash2, ShoppingBag, MessageCircle, CreditCard, Check, Truck, MapPin, ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'

function CartPage() {
  const { cart, removeFromCart, getTotal } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState('shipping') // 'shipping' or 'pickup'

  const MY_PHONE_NUMBER = "+525626340102"
  const MY_PAYPAL_USER = "NorthsideKits"
  const MY_EMAIL = "diegovidales0104@gmail.com"

  // Shipping Logic: Free over $120, $15 otherwise (only for shipping method)
  const subtotal = getTotal()
  const SHIPPING_THRESHOLD = 120
  const FLAT_RATE_SHIPPING = 15
  const shippingCost = deliveryMethod === 'pickup' ? 0 : (subtotal >= SHIPPING_THRESHOLD ? 0 : FLAT_RATE_SHIPPING)
  const totalWithDelivery = subtotal + shippingCost
  const amountForFreeShipping = deliveryMethod === 'pickup' ? 0 : (subtotal >= SHIPPING_THRESHOLD ? 0 : (SHIPPING_THRESHOLD - subtotal).toFixed(2))

  const handleWhatsApp = () => {
    const productsList = cart.map(item => 
      `• ${item.name} (Size: ${item.size})`
    ).join('%0A')

    const deliveryInfo = deliveryMethod === 'pickup' 
      ? '📍 Pickup/Meetup in Langley, BC%0A'
      : `🚚 Shipping: $${shippingCost.toFixed(2)} CAD%0A`

    const message = `Hi NorthSide Kits! 👋%0A%0AI would like to order these jerseys:%0A%0A${productsList}%0A%0A📦 Subtotal: $${subtotal.toFixed(2)} CAD%0A${deliveryInfo}💰 Total: $${totalWithDelivery.toFixed(2)} CAD%0A%0APlease confirm and let me know about payment and delivery details.`
    
    window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${message}`, '_blank')
  }

  const handlePayPal = () => {
    const url = `https://www.paypal.com/paypalme/${MY_PAYPAL_USER}/${totalWithDelivery.toFixed(2)}`
    window.open(url, '_blank')
  }

  if (cart.length === 0) {
    return (
      <PageTransition>
        <Helmet>
          <title>Shopping Cart | NorthSide Kits</title>
          <meta name="description" content="Review your order and proceed to checkout at NorthSide Kits." />
        </Helmet>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="mb-8 p-8 bg-slate-100 rounded-full">
          <ShoppingBag size={80} className="text-slate-600" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-600 mb-10 max-w-sm text-lg leading-relaxed">Discover our premium collection of authentic jerseys and find your next favorite piece.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          Start Shopping
          <ArrowRight size={20} />
        </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Shopping Cart | NorthSide Kits</title>
        <meta name="description" content="Review and proceed to checkout. Free shipping on orders over $120 CAD across Canada." />
      </Helmet>
      <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">Order Review</h1>
          <p className="text-slate-600 font-medium">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* ITEMS LIST - LEFT SIDE */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div 
                  key={item.cartId}
                  className="card group border border-slate-200 rounded-2xl p-6 flex gap-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.images[0]} 
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex-grow min-w-0">
                    <div className="mb-3">
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">{item.team}</p>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{item.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="badge bg-blue-100 text-blue-800">Size: {item.size}</span>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold text-sm transition-colors group/btn"
                    >
                      <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                      Remove
                    </button>
                  </div>

                  {/* PRICE */}
                  <div className="text-right">
                    <p className="text-3xl sm:text-4xl font-black gradient-text">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ORDER SUMMARY - RIGHT SIDE */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 card bg-slate-50 border-2 border-slate-200 rounded-2xl p-8">
              
              {/* TITLE */}
              <h2 className="text-2xl font-black text-slate-900 mb-8 pb-6 border-b-2 border-slate-200">
                Order Summary
              </h2>

              {/* DELIVERY METHOD SELECTOR */}
              <div className="mb-8 pb-8 border-b-2 border-slate-200">
                <p className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Delivery Method</p>
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'shipping' 
                      ? 'bg-blue-50 border-blue-900' 
                      : 'bg-slate-50 border-slate-300 hover:border-blue-900'
                  }`}>
                    <input
                      type="radio"
                      name="delivery"
                      value="shipping"
                      checked={deliveryMethod === 'shipping'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="w-4 h-4 accent-blue-900 cursor-pointer"
                    />
                    <div className="flex-grow">
                      <p className="font-bold text-slate-900">Ship to Me</p>
                      <p className="text-xs text-slate-600">Across Canada</p>
                    </div>
                    <Truck className="w-5 h-5 text-slate-600" />
                  </label>
                  
                  <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    deliveryMethod === 'pickup' 
                      ? 'bg-emerald-50 border-emerald-600' 
                      : 'bg-slate-50 border-slate-300 hover:border-emerald-600'
                  }`}>
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={deliveryMethod === 'pickup'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="w-4 h-4 accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex-grow">
                      <p className="font-bold text-slate-900">Pickup/Meetup</p>
                      <p className="text-xs text-slate-600">Langley, BC • Save on Shipping</p>
                    </div>
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </label>
                </div>
              </div>

              {/* PRICING */}
              <div className="space-y-4 mb-8 pb-8 border-b-2 border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-medium">Subtotal</span>
                  <span className="font-bold text-slate-900 text-lg">${subtotal.toFixed(2)}</span>
                </div>
                {deliveryMethod === 'shipping' && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium flex items-center gap-2">
                        <Truck size={18} className="text-blue-600" />
                        Shipping (Flat Rate)
                      </span>
                      <span className={`font-black text-lg ${
                        shippingCost === 0 ? 'text-emerald-600' : 'text-slate-900'
                      }`}>
                        ${shippingCost.toFixed(2)}
                      </span>
                    </div>
                    {shippingCost > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-900 font-medium">
                        ✨ Add ${amountForFreeShipping} more for Free Shipping!
                      </div>
                    )}
                  </>
                )}
                {deliveryMethod === 'pickup' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-900 font-medium flex items-center gap-2">
                    <MapPin size={16} />
                    Free local pickup in Langley
                  </div>
                )}
              </div>

              {/* TOTAL */}
              <div className="mb-10">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-4xl sm:text-5xl font-black gradient-text">
                    ${totalWithDelivery.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-600">VAT & duties may apply at checkout</p>
              </div>

              {/* PAYMENT BUTTONS */}
              <div className="space-y-3 mb-8">
                {/* WHATSAPP */}
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-emerald-600/30 transform hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp</span>
                </button>
                
                {/* PAYPAL */}
                <button 
                  onClick={handlePayPal}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 transform hover:scale-105 active:scale-95"
                >
                  <CreditCard size={20} />
                  <span>PayPal</span>
                </button>
              </div>

              {/* DIVIDER */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-1 h-px bg-slate-300"></div>
                <span className="text-xs font-bold text-slate-600 uppercase">OR</span>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>

              {/* E-TRANSFER */}
              <div className="glass bg-white/50 border border-slate-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CreditCard size={16} className="text-blue-900" />
                  </div>
                  <p className="font-bold text-slate-900">Bank Transfer</p>
                </div>
                <p className="text-sm text-slate-700 mb-3">Send E-transfer to:</p>
                <div 
                  className="bg-slate-900 text-white text-center p-3 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors font-mono text-sm mb-3 select-all"
                  onClick={() => navigator.clipboard.writeText(MY_EMAIL)}
                  title="Click to copy"
                >
                  {MY_EMAIL}
                </div>
                <p className="text-xs text-slate-600 text-center">Click to copy • Send screenshot via WhatsApp</p>
              </div>

              {/* TRUST BADGE */}
              <div className="flex items-center justify-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <Check size={18} className="flex-shrink-0" />
                <span className="font-bold">100% Secure</span>
              </div>
            </div>
          </div>

        </div>

        {/* CONTINUE SHOPPING LINK */}
        <div className="mt-12 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-bold transition-colors group"
          >
            <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>
      </div>
    </PageTransition>
  )
}

export default CartPage