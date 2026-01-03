import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ChevronRight, MessageCircle, Shield, Truck, Lock } from 'lucide-react'
import PageTransition from '../components/PageTransition'

export default function FacebookMarketplacePage() {
  const MY_PHONE_NUMBER = "+525626340102"

  return (
    <PageTransition>
      <Helmet>
        <title>Ordering from Facebook Marketplace | NorthSide Kits</title>
        <meta name="description" content="Simple and secure ordering process for Facebook Marketplace customers. Learn about our security deposit policy and how to order your favorite soccer jerseys." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-10 h-10 md:w-12 md:h-12" />
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: 'Poppins' }}>
                Ordering from Facebook Marketplace?
              </h1>
            </div>
            <p className="text-lg text-slate-200 max-w-2xl mt-6" style={{ fontFamily: 'Inter' }}>
              We make it simple and secure for you to get your favorite soccer jerseys. Here's exactly how it works.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          
          {/* 4-Step Process - Large */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center" style={{ fontFamily: 'Poppins' }}>
              Our Ordering Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {[
                {
                  step: '1',
                  title: 'Browse our Collection',
                  desc: 'Check out our wide selection of authentic soccer jerseys from all major leagues and national teams',
                  icon: '🔍'
                },
                {
                  step: '2',
                  title: 'Message us on WhatsApp',
                  desc: 'Contact us directly with the jersey you want and your size preference',
                  icon: '💬'
                },
                {
                  step: '3',
                  title: 'Send Security Deposit',
                  desc: 'Send a $10 security deposit per jersey via E-Transfer or PayPal',
                  icon: '💳'
                },
                {
                  step: '4',
                  title: 'Get Your Jersey',
                  desc: 'We deliver to you or arrange local pickup in Langley, BC',
                  icon: '🎁'
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-slate-200 h-full hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl mb-4 mx-auto shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 text-center mb-3" style={{ fontFamily: 'Poppins' }}>
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-center text-sm" style={{ fontFamily: 'Inter' }}>
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Arrow between steps */}
                  {index < 3 && (
                    <div className="hidden md:flex absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Why Security Deposit - Detailed */}
          <div className="mb-20 bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                Why Do We Ask for a $10 Deposit?
              </h2>
            </div>

            <p className="text-slate-600 mb-8 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Inter' }}>
              We work directly with Facebook Marketplace customers and understand that building trust is essential. The $10 security deposit per jersey ensures both of us are committed to completing the transaction fairly and securely.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="text-3xl mb-3">✓</div>
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'Poppins' }}>
                  Complete Your Purchase
                </h3>
                <p className="text-slate-600 text-sm">
                  The deposit counts toward your final payment - no extra cost!
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="text-3xl mb-3">↩️</div>
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'Poppins' }}>
                  Change Your Mind?
                </h3>
                <p className="text-slate-600 text-sm">
                  Message us within 24 hours for a full refund - no questions asked.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'Poppins' }}>
                  Both Protected
                </h3>
                <p className="text-slate-600 text-sm">
                  Creates accountability and trust for both buyer and seller.
                </p>
              </div>
            </div>

            <p className="text-slate-600 text-base" style={{ fontFamily: 'Inter' }}>
              <strong>Want more details?</strong> {' '}
              <Link to="/security-deposit" className="text-red-600 font-bold hover:underline">
                Read our full security deposit policy
              </Link>
            </p>
          </div>

          {/* Trust & Features */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center" style={{ fontFamily: 'Poppins' }}>
              Why Choose NorthSide Kits?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white rounded-xl p-8 border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                    Local Pickup Available
                  </h3>
                </div>
                <p className="text-slate-600" style={{ fontFamily: 'Inter' }}>
                  Located in Langley, BC. Pick up your jersey locally and save on shipping, or we'll ship across Canada.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-green-900" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                    Secure Payment Options
                  </h3>
                </div>
                <p className="text-slate-600" style={{ fontFamily: 'Inter' }}>
                  Pay via E-Transfer, PayPal, or WhatsApp. All payments are secure and protected.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-red-900" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Poppins' }}>
                    Direct WhatsApp Support
                  </h3>
                </div>
                <p className="text-slate-600" style={{ fontFamily: 'Inter' }}>
                  Fast responses on WhatsApp. Ask questions, confirm orders, and track your jersey.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-20 bg-slate-900 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center" style={{ fontFamily: 'Poppins' }}>
              Payment Methods
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-700">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
                  💳 Interac E-Transfer
                </h3>
                <p className="text-slate-300 mb-4">Fast and secure transfer in Canada</p>
                <div className="bg-slate-900 rounded-lg p-4">
                  <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Email Address</p>
                  <p className="text-lg font-bold break-all">diegovidales0104@gmail.com</p>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-700">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'Poppins' }}>
                  🔒 PayPal
                </h3>
                <p className="text-slate-300 mb-4">Secure with buyer protection</p>
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

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Poppins' }}>
              Ready to Get Your Jersey?
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-base md:text-lg" style={{ fontFamily: 'Inter' }}>
              Message us on WhatsApp to get started. We'll help you find the perfect jersey and guide you through the process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/525626340102?text=Hi%20NorthSide%20Kits!%20I%20found%20you%20on%20Facebook%20Marketplace.%20I'm%20interested%20in%20ordering%20some%20jerseys.%20Can%20you%20help%20me?`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-600/40 hover:-translate-y-1 text-base"
              >
                <MessageCircle size={24} />
                Message us on WhatsApp
              </a>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-base"
              >
                <ChevronRight size={24} />
                Browse All Jerseys
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 pt-20 border-t border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center" style={{ fontFamily: 'Poppins' }}>
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: 'Is the deposit refundable?',
                  a: 'Yes! If you change your mind within 24 hours, message us for a full refund. The deposit is only kept if you complete the purchase, at which point it applies to your total.'
                },
                {
                  q: 'How long does delivery take?',
                  a: 'Local pickup in Langley is immediate. For shipping within BC and Canada, expect 3-5 business days depending on your location.'
                },
                {
                  q: 'What if the jersey doesn\'t fit?',
                  a: 'We can discuss sizing before you send the deposit. Check our size guide and let us know your preferences via WhatsApp.'
                },
                {
                  q: 'Are the jerseys authentic?',
                  a: 'Yes, all our jerseys are premium quality. We source from trusted suppliers and stand behind our products.'
                },
                {
                  q: 'Do you ship outside Canada?',
                  a: 'Currently we primarily serve BC and Canada. Contact us on WhatsApp to discuss international orders.'
                },
                {
                  q: 'Can I pay the full amount at once?',
                  a: 'Absolutely! You can send the full payment via E-Transfer or PayPal. The deposit process is for those who prefer to verify first.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-slate-900 mb-3 text-base md:text-lg" style={{ fontFamily: 'Poppins' }}>
                    {item.q}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base" style={{ fontFamily: 'Inter' }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
