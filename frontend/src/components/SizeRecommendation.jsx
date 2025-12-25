import { useState } from 'react'
import { Check, AlertCircle } from 'lucide-react'

export default function SizeRecommendation() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [fitType, setFitType] = useState('fan') // 'fan' or 'player'
  const [recommendedSize, setRecommendedSize] = useState(null)
  const [message, setMessage] = useState('')
  const [hasError, setHasError] = useState(false)

  // Size reference data (Hardcoded - Fan Version)
  const sizeFanChart = {
    'S': { heightMin: 165, heightMax: 175, weightMin: 60, weightMax: 70 },
    'M': { heightMin: 175, heightMax: 180, weightMin: 70, weightMax: 80 },
    'L': { heightMin: 180, heightMax: 185, weightMin: 80, weightMax: 85 },
    'XL': { heightMin: 185, heightMax: 190, weightMin: 85, weightMax: 90 },
    '2XL': { heightMin: 190, heightMax: 195, weightMin: 90, weightMax: 100 },
    '3XL': { heightMin: 195, heightMax: 200, weightMin: 100, weightMax: 110 },
    '4XL': { heightMin: 200, heightMax: 250, weightMin: 110, weightMax: 120 }
  }

  // Size order for comparison
  const sizeOrder = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']

  // Function to get size from height
  const getSizeFromHeight = (heightCm) => {
    for (const [size, range] of Object.entries(sizeFanChart)) {
      if (heightCm >= range.heightMin && heightCm <= range.heightMax) {
        return size
      }
    }
    return null
  }

  // Function to get size from weight
  const getSizeFromWeight = (weightKg) => {
    for (const [size, range] of Object.entries(sizeFanChart)) {
      if (weightKg >= range.weightMin && weightKg <= range.weightMax) {
        return size
      }
    }
    return null
  }

  // Function to get the larger size between two sizes
  const getLargerSize = (size1, size2) => {
    if (!size1) return size2
    if (!size2) return size1
    
    const index1 = sizeOrder.indexOf(size1)
    const index2 = sizeOrder.indexOf(size2)
    
    return index1 > index2 ? size1 : size2
  }

  // Function to increase size by one (for Player Version)
  const increaseSize = (size) => {
    const currentIndex = sizeOrder.indexOf(size)
    if (currentIndex < sizeOrder.length - 1) {
      return sizeOrder[currentIndex + 1]
    }
    return size // Return same if already at max
  }

  // Main calculation function
  const calculateSize = () => {
    if (!height || !weight) {
      setMessage('Please enter both height and weight')
      setHasError(true)
      setRecommendedSize(null)
      return
    }

    const heightCm = parseFloat(height)
    const weightKg = parseFloat(weight)

    // Validate inputs
    if (heightCm < 150 || heightCm > 230) {
      setMessage('Height must be between 150cm and 230cm')
      setHasError(true)
      setRecommendedSize(null)
      return
    }

    if (weightKg < 40 || weightKg > 150) {
      setMessage('Weight must be between 40kg and 150kg')
      setHasError(true)
      setRecommendedSize(null)
      return
    }

    // Get size from height and weight
    const sizeFromHeight = getSizeFromHeight(heightCm)
    const sizeFromWeight = getSizeFromWeight(weightKg)

    // Check if measurements exceed maximum
    if (!sizeFromHeight && heightCm > 200) {
      setMessage('For these measurements, please contact us to verify special availability')
      setHasError(true)
      setRecommendedSize(null)
      return
    }

    if (!sizeFromWeight && weightKg > 120) {
      setMessage('For these measurements, please contact us to verify special availability')
      setHasError(true)
      setRecommendedSize(null)
      return
    }

    // If no match found
    if (!sizeFromHeight || !sizeFromWeight) {
      setMessage('Measurements are outside our standard size range. Please contact us')
      setHasError(true)
      setRecommendedSize(null)
      return
    }

    // Apply "Safe Fit Algorithm" - Always choose the larger size
    let finalSize = getLargerSize(sizeFromHeight, sizeFromWeight)

    // If Player Version selected, increase one size with message
    if (fitType === 'player') {
      const originalSize = finalSize
      finalSize = increaseSize(finalSize)
      setMessage(`Since you prefer the Player Version (Slim Fit), we recommend size ${finalSize} for better comfort. (Normally would be ${originalSize})`)
      setHasError(false)
    } else {
      setMessage('Your recommended size based on your measurements')
      setHasError(false)
    }

    setRecommendedSize(finalSize)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-900">👕 Find Your Perfect Size</h2>
          <p className="text-slate-600">Enter your measurements for a personalized recommendation</p>
        </div>

        {/* Inputs Section */}
        <div className="space-y-6">
          {/* Height Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 180"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-900 focus:outline-none font-semibold text-lg"
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
              placeholder="e.g., 80"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-900 focus:outline-none font-semibold text-lg"
            />
          </div>

          {/* Fit Type Selector */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              Fit Type
            </label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all" style={{
                borderColor: fitType === 'fan' ? '#1e293b' : '#cbd5e1',
                backgroundColor: fitType === 'fan' ? '#f1f5f9' : 'white'
              }}>
                <input
                  type="radio"
                  name="fitType"
                  value="fan"
                  checked={fitType === 'fan'}
                  onChange={(e) => setFitType(e.target.value)}
                  className="w-4 h-4 accent-blue-900 cursor-pointer"
                />
                <span className="font-semibold text-slate-900">Fan Version (Standard)</span>
              </label>

              <label className="flex items-center gap-2 flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all" style={{
                borderColor: fitType === 'player' ? '#1e293b' : '#cbd5e1',
                backgroundColor: fitType === 'player' ? '#f1f5f9' : 'white'
              }}>
                <input
                  type="radio"
                  name="fitType"
                  value="player"
                  checked={fitType === 'player'}
                  onChange={(e) => setFitType(e.target.value)}
                  className="w-4 h-4 accent-blue-900 cursor-pointer"
                />
                <span className="font-semibold text-slate-900">Player Version (Slim)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateSize}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
        >
          Calculate My Size 🎯
        </button>

        {/* Result Section */}
        {recommendedSize && (
          <div className="space-y-4 animate-fadeIn">
            {/* Success Box */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6 text-emerald-600" />
                <p className="text-sm font-semibold text-emerald-900">{message}</p>
              </div>

              {/* Size Display */}
              <div className="bg-white rounded-lg p-4 text-center border-2 border-emerald-200">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Your recommended size</p>
                <p className="text-5xl font-black text-blue-900">{recommendedSize}</p>
              </div>

              {/* Tips */}
              <div className="bg-white rounded-lg p-4 space-y-2 border border-emerald-200">
                <p className="text-xs font-bold text-slate-700 uppercase">💡 Sizing Tips:</p>
                <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                  <li>Allow 2-3cm ease for comfortable fit</li>
                  <li>These jerseys have a modern athletic fit</li>
                  <li>Size up for a looser, relaxed fit</li>
                  <li>Size down for a tighter, fitted look</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Error Section */}
        {hasError && message && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-red-900">{message}</p>
          </div>
        )}

        {/* Size Chart Reference */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-3">
          <p className="text-sm font-bold text-slate-700 uppercase">📏 Quick Reference (Fan Version)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {sizeOrder.map((size) => {
              const range = sizeFanChart[size]
              return (
                <div key={size} className="bg-white p-2 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900">{size}</p>
                  <p className="text-slate-600 text-xs">{range.heightMin}-{range.heightMax}cm</p>
                  <p className="text-slate-600 text-xs">{range.weightMin}-{range.weightMax}kg</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
