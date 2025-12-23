import { useState } from 'react'
import { X } from 'lucide-react'

export default function SizeGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('fans')

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Inter' }}>
              📏 Size Guide
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex gap-0">
              <button
                onClick={() => setActiveTab('fans')}
                className={`flex-1 py-4 px-6 font-bold text-center transition-all duration-300 ${
                  activeTab === 'fans'
                    ? 'border-b-2 border-slate-900 text-slate-900 bg-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Fans Version (Standard Fit)
              </button>
              <button
                onClick={() => setActiveTab('player')}
                className={`flex-1 py-4 px-6 font-bold text-center transition-all duration-300 ${
                  activeTab === 'player'
                    ? 'border-b-2 border-slate-900 text-slate-900 bg-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Player Version (Slim Fit)
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'fans' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6" style={{ fontFamily: 'Inter' }}>
                  Standard Fit - Fans Version
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm" style={{ fontFamily: 'Inter' }}>
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-center font-bold text-slate-900 py-3 px-4">Size</th>
                        <th className="text-center font-bold text-slate-900 py-3 px-4">Chest (cm)</th>
                        <th className="text-center font-bold text-slate-900 py-3 px-4">Length (cm)</th>
                        <th className="text-center font-bold text-slate-900 py-3 px-4">Height (cm)</th>
                        <th className="text-center font-bold text-slate-900 py-3 px-4">Weight (kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="even:bg-gray-50 border-b border-gray-200">
                        <td className="text-center font-bold py-3 px-4">S</td>
                        <td className="text-center py-3 px-4">48-50</td>
                        <td className="text-center py-3 px-4">71-73</td>
                        <td className="text-center py-3 px-4">160-165</td>
                        <td className="text-center py-3 px-4">60-65</td>
                      </tr>
                      <tr className="even:bg-gray-50 border-b border-gray-200">
                        <td className="text-center font-bold py-3 px-4">M</td>
                        <td className="text-center py-3 px-4">52-54</td>
                        <td className="text-center py-3 px-4">73-75</td>
                        <td className="text-center py-3 px-4">165-170</td>
                        <td className="text-center py-3 px-4">66-70</td>
                      </tr>
                      <tr className="even:bg-gray-50 border-b border-gray-200">
                        <td className="text-center font-bold py-3 px-4">L</td>
                        <td className="text-center py-3 px-4">54-56</td>
                        <td className="text-center py-3 px-4">75-77</td>
                        <td className="text-center py-3 px-4">170-175</td>
                        <td className="text-center py-3 px-4">71-75</td>
                      </tr>
                      <tr className="even:bg-gray-50 border-b border-gray-200">
                        <td className="text-center font-bold py-3 px-4">XL</td>
                        <td className="text-center py-3 px-4">56-58</td>
                        <td className="text-center py-3 px-4">77-79</td>
                        <td className="text-center py-3 px-4">175-180</td>
                        <td className="text-center py-3 px-4">76-80</td>
                      </tr>
                      <tr className="even:bg-gray-50 border-b border-gray-200">
                        <td className="text-center font-bold py-3 px-4">2XL</td>
                        <td className="text-center py-3 px-4">58-60</td>
                        <td className="text-center py-3 px-4">79-81</td>
                        <td className="text-center py-3 px-4">180-185</td>
                        <td className="text-center py-3 px-4">81-87</td>
                      </tr>
                      <tr className="even:bg-gray-50 border-b border-gray-200">
                        <td className="text-center font-bold py-3 px-4">3XL</td>
                        <td className="text-center py-3 px-4">60-62</td>
                        <td className="text-center py-3 px-4">80-82</td>
                        <td className="text-center py-3 px-4">185-190</td>
                        <td className="text-center py-3 px-4">88-95</td>
                      </tr>
                      <tr className="even:bg-gray-50 border-b border-gray-200">
                        <td className="text-center font-bold py-3 px-4">4XL</td>
                        <td className="text-center py-3 px-4">62-64</td>
                        <td className="text-center py-3 px-4">81-83</td>
                        <td className="text-center py-3 px-4">190-195</td>
                        <td className="text-center py-3 px-4">96-103</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'player' && (
              <div className="space-y-10">
                {/* Adidas */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6" style={{ fontFamily: 'Inter' }}>
                    🏟️ Adidas Jersey (Slim Fit)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm" style={{ fontFamily: 'Inter' }}>
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-center font-bold text-slate-900 py-3 px-4">Size</th>
                          <th className="text-center font-bold text-slate-900 py-3 px-4">Length (cm)</th>
                          <th className="text-center font-bold text-slate-900 py-3 px-4">Chest (cm)</th>
                          <th className="text-center font-bold text-slate-900 py-3 px-4">Waist (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">S</td>
                          <td className="text-center py-3 px-4">70</td>
                          <td className="text-center py-3 px-4">47</td>
                          <td className="text-center py-3 px-4">44</td>
                        </tr>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">M</td>
                          <td className="text-center py-3 px-4">72</td>
                          <td className="text-center py-3 px-4">49</td>
                          <td className="text-center py-3 px-4">46</td>
                        </tr>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">L</td>
                          <td className="text-center py-3 px-4">75</td>
                          <td className="text-center py-3 px-4">51</td>
                          <td className="text-center py-3 px-4">48</td>
                        </tr>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">XL</td>
                          <td className="text-center py-3 px-4">78</td>
                          <td className="text-center py-3 px-4">53</td>
                          <td className="text-center py-3 px-4">50</td>
                        </tr>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">XXL</td>
                          <td className="text-center py-3 px-4">80</td>
                          <td className="text-center py-3 px-4">55</td>
                          <td className="text-center py-3 px-4">52</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Nike / Puma / NB */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6" style={{ fontFamily: 'Inter' }}>
                    ⚽ Nike / Puma / New Balance Jersey (Slim Fit)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm" style={{ fontFamily: 'Inter' }}>
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-center font-bold text-slate-900 py-3 px-4">Size</th>
                          <th className="text-center font-bold text-slate-900 py-3 px-4">Length (cm)</th>
                          <th className="text-center font-bold text-slate-900 py-3 px-4">Chest (cm)</th>
                          <th className="text-center font-bold text-slate-900 py-3 px-4">Waist (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">S</td>
                          <td className="text-center py-3 px-4">69</td>
                          <td className="text-center py-3 px-4">49</td>
                          <td className="text-center py-3 px-4">45</td>
                        </tr>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">M</td>
                          <td className="text-center py-3 px-4">72</td>
                          <td className="text-center py-3 px-4">51</td>
                          <td className="text-center py-3 px-4">47</td>
                        </tr>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">L</td>
                          <td className="text-center py-3 px-4">74</td>
                          <td className="text-center py-3 px-4">53</td>
                          <td className="text-center py-3 px-4">49</td>
                        </tr>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">XL</td>
                          <td className="text-center py-3 px-4">77</td>
                          <td className="text-center py-3 px-4">56</td>
                          <td className="text-center py-3 px-4">52</td>
                        </tr>
                        <tr className="even:bg-gray-50 border-b border-gray-200">
                          <td className="text-center font-bold py-3 px-4">XXL</td>
                          <td className="text-center py-3 px-4">80</td>
                          <td className="text-center py-3 px-4">59</td>
                          <td className="text-center py-3 px-4">55</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Note */}
            <div className="mt-10 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter' }}>
                <strong>Note:</strong> Measurements allowed error 1-3cm
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
