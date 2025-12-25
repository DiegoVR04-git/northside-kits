import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ChevronDown } from 'lucide-react'

export default function FAQ({ faqs = [] }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  // Default FAQs if none provided
  const defaultFAQs = [
    {
      question: 'What shipping methods do you offer?',
      answer: 'We primarily use Canada Post tracked shipping for deliveries within Canada (3-5 business days). We also offer other methods that can be previously arranged based on your needs. For US orders, we ship based on Canada Post pricing and rates.'
    },
    {
      question: 'Do you ship to the United States?',
      answer: 'Yes, we ship to the United States! Shipping costs are calculated based on Canada Post rates. Contact us for a custom shipping quote for your specific location.'
    },
    {
      question: 'What makes your jerseys high quality?',
      answer: 'Our jerseys are carefully selected for premium quality. We ensure proper stitching, vibrant colors, authentic materials, and accurate graphics. Each jersey is inspected before shipment to guarantee you receive only the best.'
    },
    {
      question: 'How do security deposits work for custom orders?',
      answer: 'Security deposits for custom orders are not refundable. Instead, the deposit amount is subtracted from the final order total when your jersey is ready to ship. This protects both us and ensures your commitment to the custom order.'
    },
    {
      question: 'Can I change my order after placing it?',
      answer: 'Orders can sometimes be modified, but you must contact us ASAP to request any changes. The sooner you reach out, the better chance we have to accommodate your request. Once processing begins, changes may not be possible.'
    }
  ]

  const questionsToShow = faqs.length > 0 ? faqs : defaultFAQs

  // Generate FAQ schema for Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questionsToShow.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Find answers to common questions about our jerseys, shipping, and policies
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {questionsToShow.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={24}
                    className={`text-blue-900 transition-transform flex-shrink-0 ml-4 ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded Answer */}
                {expandedIndex === index && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <p className="text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-8 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-slate-600 mb-6">
              Can't find the answer you're looking for? Get in touch with us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/525626340102?text=Hi%20NorthSide%20Kits,%20I%20have%20a%20question..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                💬 WhatsApp
              </a>
              <a
                href="sms:+525626340102?body=Hi%20NorthSide%20Kits,%20I%20have%20a%20question..."
                className="inline-block px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
              >
                📱 Text Message
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
