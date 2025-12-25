import { Helmet } from 'react-helmet-async'
import { Shield, Lock, Check, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

export default function SecurityDepositPage() {
  const MY_PHONE_NUMBER = "+525626340102"

  return (
    <PageTransition>
      <Helmet>
        <title>Security Deposit Policy | NorthSide Kits</title>
        <meta name="description" content="Learn about our first-time customer security deposit policy for Facebook Marketplace orders. Secure payment options and transparent terms." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10 md:w-12 md:h-12" />
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: 'Poppins' }}>
                First-Time Customer Security Deposit
              </h1>
            </div>
            <p className="text-lg text-slate-200 max-w-2xl mt-6" style={{ fontFamily: 'Inter' }}>
              We understand trust is the main factor in online purchases. Here's how we keep both parties protected.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
          
          {/* Payment Methods */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'Poppins' }}>
              Payment Methods
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interac E-Transfer Card */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-blue-400 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                    Interac E-Transfer (Canada)
                  </h3>
                </div>
                <p className="text-slate-600 mb-4" style={{ fontFamily: 'Inter' }}>
                  Fast and secure money transfer
                </p>
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-slate-500 uppercase font-semibold mb-2">Email Address</p>
                  <p className="text-lg font-bold text-slate-900 break-all">diegovidales0104@gmail.com</p>
                </div>
                <p className="text-sm text-slate-600 italic" style={{ fontFamily: 'Inter' }}>
                  ℹ️ Please use this <strong>Gmail address</strong> specifically for E-transfers.
                </p>
              </div>

              {/* PayPal Card */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-blue-400 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                    PayPal (Secure)
                  </h3>
                </div>
                <p className="text-slate-600 mb-4" style={{ fontFamily: 'Inter' }}>
                  Buyer protection and instant payment
                </p>
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-slate-500 uppercase font-semibold mb-2">Email Address</p>
                  <p className="text-lg font-bold text-slate-900 break-all">diegovidales0104@icloud.com</p>
                </div>
                <p className="text-sm text-slate-600 italic mb-4" style={{ fontFamily: 'Inter' }}>
                  ℹ️ Please use this <strong>iCloud address</strong> specifically for PayPal.
                </p>
                <a
                  href="https://www.paypal.com/paypalme/NorthsideKits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 text-center"
                  style={{ fontFamily: 'Inter' }}
                >
                  Pay via PayPal
                </a>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8" style={{ fontFamily: 'Poppins' }}>
              Next Steps
            </h2>
            
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 md:p-10">
              <ul className="space-y-4" style={{ fontFamily: 'Inter' }}>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    1
                  </div>
                  <p className="text-slate-700 text-lg">
                    Send your deposit via <strong>Interac E-Transfer</strong> or <strong>PayPal</strong>
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    2
                  </div>
                  <p className="text-slate-700 text-lg">
                    Feel free to explore our website for in-stock options while you wait
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    3
                  </div>
                  <p className="text-slate-700 text-lg">
                    After sending the deposit, please send a <strong>screenshot to confirm</strong> via WhatsApp
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    4
                  </div>
                  <p className="text-slate-700 text-lg">
                    Once confirmed, your jersey will be <strong>ordered</strong> and we'll coordinate final payment and <strong>delivery/pick up</strong>
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            <a
              href={`https://wa.me/${MY_PHONE_NUMBER}?text=Hi%20NorthSide%20Kits,%20I%20have%20sent%20my%20security%20deposit.%20Please%20find%20the%20screenshot%20attached.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-md"
              style={{ fontFamily: 'Inter' }}
            >
              <MessageCircle className="w-5 h-5" />
              Send Screenshot via WhatsApp
            </a>
            
            <a
              href="sms:(604)265-3223?body=Hi%20NorthSide%20Kits,%20I%20have%20sent%20my%20security%20deposit.%20Please%20confirm."
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-md"
              style={{ fontFamily: 'Inter' }}
            >
              <MessageCircle className="w-5 h-5" />
              Send Text Message
            </a>
            
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all duration-300"
              style={{ fontFamily: 'Inter' }}
            >
              Browse In-Stock Kits
            </Link>
          </div>
          
          {/* Why Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-blue-900" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                Why We Require a Deposit
              </h2>
            </div>
            
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-slate-700 text-lg leading-relaxed" style={{ fontFamily: 'Inter' }}>
                For <strong>first-time Facebook Marketplace orders</strong>, we require a <strong>$10 security deposit per jersey</strong> in advance.
              </p>
              <p className="text-slate-700 text-lg leading-relaxed mt-4" style={{ fontFamily: 'Inter' }}>
                We understand trust is the main factor in online purchases. However, to ensure serious inquiries and reserve your custom kit, this small deposit is required.
              </p>
            </div>
          </div>

          {/* The Promise Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Check className="w-8 h-8 text-emerald-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                Our Promise
              </h2>
            </div>
            
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-8 md:p-10 shadow-sm">
              <p className="text-slate-700 text-lg leading-relaxed font-semibold" style={{ fontFamily: 'Inter' }}>
                Once your first order is completed successfully, you will be added to our <strong className="text-emerald-700">Trusted Customers List</strong> and no further deposits will be required for future orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
