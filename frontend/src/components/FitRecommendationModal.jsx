import { useState } from 'react'
import { X, Check } from 'lucide-react'

export default function FitRecommendationModal({ isOpen, onClose, availableSizes = [] }) {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [recommendedSize, setRecommendedSize] = useState(null)
  const [unit, setUnit] = useState('cm') // cm or inches

  // Size chart data based on height and weight
  const sizeChart = {
    'XS': { heightMin: 160, heightMax: 170, weightMin: 50, weightMax: 60 },
    'S': { heightMin: 165, heightMax: 175, weightMin: 60, weightMax: 70 },
    'M': { heightMin: 170, heightMax: 180, weightMin: 70, weightMax: 80 },
    'L': { heightMin: 175, heightMax: 185, weightMin: 80, weightMax: 90 },
    'XL': { heightMin: 180, heightMax: 190, weightMin: 90, weightMax: 100 },
    'XXL': { heightMin: 185, heightMax: 200, weightMin: 100, weightMax: 120 }
  }

  const getRecommendation = () => {
    if (!height || !weight) {
      alert('Please enter both height and weight')
      return
    }

    // Convert to cm if needed
    let heightCm = unit === 'cm' ? parseFloat(height) : parseFloat(height) * 2.54
    let weightKg = parseFloat(weight) // Assuming weight is always in kg, or could add unit toggle

    let bestMatch = null
    let bestScore = -1

    // Find the size with the best match
    Object.entries(sizeChart).forEach(([size, range]) => {
      // Check if available
      if (!availableSizes.includes(size)) return

      const heightMatch = heightCm >= range.heightMin && heightCm <= range.heightMax ? 1 : 0
      const weightMatch = weightKg >= range.weightMin && weightKg <= range.weightMax ? 1 : 0
      const score = heightMatch + weightMatch

      // If both match, it's a perfect fit
      if (score > bestScore) {
        bestScore = score
        bestMatch = size
      }
    })

    // If no perfect match, find closest
    if (!bestMatch) {
      let minDifference = Infinity
      Object.entries(sizeChart).forEach(([size, range]) => {
        if (!availableSizes.includes(size)) return
        const heightDiff = Math.abs(heightCm - (range.heightMin + range.heightMax) / 2)
        const weightDiff = Math.abs(weightKg - (range.weightMin + range.weightMax) / 2)
        const totalDiff = heightDiff + weightDiff

        if (totalDiff < minDifference) {
          minDifference = totalDiff
          bestMatch = size
        }
      })
    }

    setRecommendedSize(bestMatch)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-black">👕 Which Size Fits Me?</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!recommendedSize ? (
            <div className="space-y-6">
              {/* Input Section */}
              <div className="space-y-4">
                <p className="text-slate-600 font-medium">Enter your measurements to get a personalized size recommendation:</p>

                {/* Unit Toggle */}
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="cm"
                      checked={unit === 'cm'}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-700 font-medium">Metric (cm, kg)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="inches"
                      checked={unit === 'inches'}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-700 font-medium">Imperial (inches, kg)</span>
                  </label>
                </div>

                {/* Height Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Height {unit === 'cm' ? '(cm)' : '(inches)'}
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === 'cm' ? '170' : '67'}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-900 focus:outline-none font-semibold"
                  />
                </div>

                {/* Weight Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="75"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-900 focus:outline-none font-semibold"
                  />
                </div>
              </div>

              {/* Size Chart Reference */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-sm font-bold text-slate-700 mb-3">Size Reference Chart:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-200">
                        <th className="px-3 py-2 text-left font-bold">Size</th>
                        <th className="px-3 py-2 text-left font-bold">Height</th>
                        <th className="px-3 py-2 text-left font-bold">Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(sizeChart).map(([size, range]) => (
                        <tr key={size} className="border-b border-slate-200 hover:bg-white">
                          <td className="px-3 py-2 font-bold text-slate-900">{size}</td>
                          <td className="px-3 py-2 text-slate-700">{range.heightMin}-{range.heightMax}cm</td>
                          <td className="px-3 py-2 text-slate-700">{range.weightMin}-{range.weightMax}kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Get Recommendation Button */}
              <button
                onClick={getRecommendation}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 text-lg"
              >
                Get My Size Recommendation 🎯
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              {/* Recommendation Result */}
              <div className="space-y-4">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-12 h-12 text-emerald-600" />
                </div>

                <div>
                  <p className="text-slate-600 font-medium mb-2">Based on your measurements:</p>
                  <p className="text-4xl font-black text-blue-900 mb-2">{recommendedSize}</p>
                  <p className="text-slate-700">
                    This size should fit you best! 👌
                  </p>
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-left space-y-2">
                  <p className="text-sm font-semibold text-slate-900">💡 Tips for the perfect fit:</p>
                  <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                    <li>Allow for a comfortable 2-3cm ease when measuring</li>
                    <li>These jerseys have a modern athletic fit</li>
                    <li>Size up if you prefer a looser fit</li>
                    <li>Size down if you prefer a more fitted look</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setRecommendedSize(null)
                    setHeight('')
                    setWeight('')
                  }}
                  className="flex-1 px-4 py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Got It! 👍
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
