import { useState, useEffect } from 'react'
import { Star, X } from 'lucide-react'
import toast from 'react-hot-toast'

const NAMES = [
  'Matt',
  'Sarah Jenkins',
  'Gurdeep S.',
  'Alex',
  'J.R.',
  'Mikey',
  'Lisa Wong',
  'Kevin',
  'David B.',
  'Priya',
  'Chris',
  'Mrs. Robinson',
  'Jason',
  'Sam K.',
  'Tyler',
  'Big Rob',
  'Emma',
  'Daniel V.',
  'Ash',
  'Mohammed',
  'Jessica',
  'Ryan',
  'K.L.',
  'Steve',
  'Amanda',
  'Nick P.',
  'Josh',
  'Uncle T',
  'Brandon',
  'Melissa',
  'Justin',
  'H. Lee',
  'Kyle',
  'Rachel',
  'O.G. Fan'
]

const REVIEWS = [
  'legit.',
  'My son loves it thanks',
  'Fast shipping to Burnaby.',
  'Good quality',
  '5 stars',
  'Material feels nice, not cheap.',
  'Better than expected tbh',
  'Will buy again',
  'took a few days but worth it',
  'The badge is stitched perfectly.',
  'Solid.',
  'got the retro one, looks sick',
  'Great service',
  'Fits true to size',
  'Finally found this jersey!!',
  'super happy with it',
  'Responsive on whatsapp',
  'Recommended.',
  'Jersey is fire 🔥',
  'Clean.',
  'No complaints here',
  'Awesome',
  'Packaging was good',
  'Buying another one soon',
  'Love it.',
  'looks exactly like the photo',
  'Very good',
  'Thanks NorthSide',
  'A++',
  'Fits perfect.'
]

const TIMES = ['Just now', '2 mins ago', '5 mins ago', '1 hour ago', 'Yesterday', '2 days ago']

const PASTEL_COLORS = [
  '#FFB3BA',
  '#FFDFBA',
  '#FFFFBA',
  '#BAFFC9',
  '#BAE1FF',
  '#E0BBE4',
  '#D4F1F4',
  '#FEC8D8',
  '#FFDDC1',
  '#C9ADA7'
]

function getAvatarColor(name) {
  return PASTEL_COLORS[name.charCodeAt(0) % PASTEL_COLORS.length]
}

function getInitials(name) {
  return name.split(' ')[0][0].toUpperCase()
}

export default function LiveReviews() {

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Emma',
      review: 'Love it.',
      time: '2 days ago',
      isUserSubmitted: false
    },
    {
      id: 2,
      name: 'Big Rob',
      review: 'got the retro one, looks sick',
      time: 'Yesterday',
      isUserSubmitted: false
    },
    {
      id: 3,
      name: 'Sarah Jenkins',
      review: 'Material feels nice, not cheap.',
      time: '1 hour ago',
      isUserSubmitted: false
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5
  })

  const [intervalPaused, setIntervalPaused] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  // Auto-rotate reviews every 6 seconds
  useEffect(() => {
    if (intervalPaused) return

    const interval = setInterval(() => {
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)]
      const randomReview = REVIEWS[Math.floor(Math.random() * REVIEWS.length)]
      const randomTime = TIMES[Math.floor(Math.random() * TIMES.length)]

      const newReview = {
        id: Date.now(),
        name: randomName,
        review: randomReview,
        time: randomTime,
        isUserSubmitted: false
      }

      setReviews((prev) => [newReview, ...prev.slice(0, 2)])
    }, 6000)

    return () => clearInterval(interval)
  }, [intervalPaused])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.review.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    // Add user's review to the top
    const userReview = {
      id: Date.now(),
      name: formData.name,
      review: formData.review,
      rating: formData.rating,
      time: 'Just now',
      isUserSubmitted: true
    }

    setReviews((prev) => [userReview, ...prev.slice(0, 2)])
    toast.success('Review published! 🎉')

    // Reset form
    setFormData({ name: '', review: '', rating: 5 })
    setShowForm(false)

    // Show thank you message permanently
    setShowThankYou(true)

    // Pause auto-rotation for 10 seconds
    setIntervalPaused(true)
    setTimeout(() => setIntervalPaused(false), 10000)
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4"
            style={{ fontFamily: 'Poppins' }}
          >
            What the Squad is Saying 🗣️
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Inter' }}>
            Live reviews from the NorthSide Kits community
          </p>
        </div>

        {/* Reviews Grid - Google Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300"
              style={{
                animation: `slideIn 0.5s ease-out ${index * 0.1}s`
              }}
            >
              {/* Top Row: Avatar + Name + Time */}
              <div className="flex items-center gap-3 mb-3">
                {/* Avatar Circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-gray-700"
                  style={{ backgroundColor: getAvatarColor(review.name) }}
                >
                  {getInitials(review.name)}
                </div>

                {/* Name and Time */}
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm" style={{ fontFamily: 'Inter' }}>
                    {review.name}
                  </p>
                </div>

                {/* YOU Badge */}
                {review.isUserSubmitted && (
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md whitespace-nowrap">
                    YOU
                  </span>
                )}
              </div>

              {/* Stars Row */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < (review.rating || 5) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
                {review.review}
              </p>
            </div>
          ))}
        </div>

        {/* Write a Review Section */}
        {!showForm ? (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              disabled={showThankYou}
              className={`px-8 py-3 font-bold rounded-lg transition-all duration-300 ${
                showThankYou
                  ? 'bg-emerald-600 text-white hover:shadow-lg'
                  : 'bg-slate-900 text-white hover:-translate-y-1 hover:shadow-lg'
              }`}
              style={{ fontFamily: 'Inter' }}
            >
              {showThankYou ? '✨ Thanks for giving us a review!' : '✍️ Write a Review'}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 max-w-2xl mx-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="float-right text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Poppins' }}>
              Share Your Experience
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Inter' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="e.g., Alex or Sarah J."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  style={{ fontFamily: 'Inter' }}
                />
              </div>

              {/* Review Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Inter' }}>
                  Your Review
                </label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleFormChange}
                  placeholder="Share your thoughts about NorthSide Kits..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                  style={{ fontFamily: 'Inter' }}
                />
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Inter' }}>
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                      className="transition-transform duration-200 hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
                  style={{ fontFamily: 'Inter' }}
                >
                  Post Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-2 bg-gray-200 text-slate-900 font-bold rounded-lg hover:bg-gray-300 transition-all duration-300"
                  style={{ fontFamily: 'Inter' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
