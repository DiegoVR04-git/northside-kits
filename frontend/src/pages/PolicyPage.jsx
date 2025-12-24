import { Helmet } from 'react-helmet-async'
import { MapPin, Clock, AlertCircle } from 'lucide-react'
import PageTransition from '../components/PageTransition'

export default function PolicyPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Shipping & Returns | NorthSide Kits</title>
        <meta name="description" content="Learn about NorthSide Kits shipping policy, return process, and defect handling. Fast shipping from Langley, BC." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Poppins' }}>
              Shipping & Returns
            </h1>
            <p className="text-lg text-slate-200 max-w-2xl" style={{ fontFamily: 'Inter' }}>
              Transparent policies designed for premium satisfaction. Every kit matters.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
          {/* Shipping Policy */}
          <div id="shipping" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-blue-900" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                Shipping
              </h2>
            </div>
            
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4" style={{ fontFamily: 'Inter' }}>
                <p className="text-slate-700 text-lg leading-relaxed">
                  <span className="font-semibold text-slate-900">We ship from Langley, BC</span> and deliver across Canada with reliable logistics.
                </p>
                
                <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Shipping Details</h3>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                      <span><strong>Processing:</strong> Orders are processed within 24-48 hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg text-blue-900 font-bold flex-shrink-0">✨</span>
                      <span><strong>Free Shipping:</strong> Orders over $120 CAD ship free</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg text-blue-900 font-bold flex-shrink-0">📦</span>
                      <span><strong>Flat Rate:</strong> $15 CAD for orders under $120</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg text-emerald-600 font-bold flex-shrink-0">🎁</span>
                      <span><strong>Local Pickup:</strong> Free pickup/meetup in Langley, BC</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Returns Policy */}
          <div id="returns" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                Returns Policy
              </h2>
            </div>
            
            <div className="bg-red-50 rounded-2xl border border-red-200 p-8 md:p-10 shadow-sm">
              <div className="space-y-4" style={{ fontFamily: 'Inter' }}>
                <p className="text-slate-700 text-lg leading-relaxed">
                  <span className="font-semibold text-slate-900">All sales are final.</span> Due to the limited nature of our vintage and special edition kits, we do not offer returns or exchanges.
                </p>
                
                <div className="bg-white rounded-xl border border-red-200 p-6 mt-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Before You Order</h3>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="text-lg text-red-600 font-bold flex-shrink-0">⚠️</span>
                      <span>Please <strong>check measurements carefully</strong> before purchasing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg text-red-600 font-bold flex-shrink-0">📏</span>
                      <span>Each product page includes detailed <strong>sizing information</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg text-red-600 font-bold flex-shrink-0">❌</span>
                      <span>We do <strong>not process returns for sizing issues</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Defects & Issues */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 text-emerald-600 text-2xl flex items-center justify-center">✓</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                Contact Us
              </h2>
            </div>
            
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4" style={{ fontFamily: 'Inter' }}>
                <p className="text-slate-700 text-lg leading-relaxed">
                  <span className="font-semibold text-slate-900">Have questions about shipping or returns?</span> We're here to help!
                </p>
                
                <div className="bg-white rounded-xl border border-emerald-200 p-6 mt-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Get in Touch</h3>
                  <ul className="space-y-4 text-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="text-lg text-emerald-600 font-bold flex-shrink-0">💬</span>
                      <div>
                        <p><strong>WhatsApp</strong></p>
                        <p className="text-emerald-600 font-semibold">+52 562 634 0102</p>
                        <p className="text-xs text-slate-500 mt-1">Fast responses, available for orders & inquiries</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-lg text-emerald-600 font-bold flex-shrink-0">📧</span>
                      <div>
                        <p><strong>Email</strong></p>
                        <p className="text-emerald-600 font-semibold">support@northsidekits.ca</p>
                        <p className="text-xs text-slate-500 mt-1">Monday-Friday, 9 AM - 5 PM PST</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Poppins' }}>
                Ready to Shop?
              </h3>
              <p className="text-slate-600 text-lg mb-6" style={{ fontFamily: 'Inter' }}>
                Browse our premium collection of authentic football jerseys
              </p>
              <a href="/" className="inline-block px-8 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all duration-300 hover:shadow-lg hover:scale-105">
                Shop Now
              </a>
            </div>
          </div>
        </div>

        {/* Footer Spacing */}
        <div className="h-12"></div>
      </div>
    </PageTransition>
  )
}
