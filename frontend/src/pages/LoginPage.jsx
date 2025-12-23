import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff } from 'lucide-react'

function LoginPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      if (password === 'DiegoVidalesRodriguez01022004@') {
        localStorage.setItem('isAdmin', 'true')
        navigate('/admin')
      } else {
        alert('Incorrect password 🚫')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* DECORATIVE BLURS */}
      <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl top-1/4 left-1/4 opacity-50"></div>
      <div className="absolute w-96 h-96 bg-slate-500/10 rounded-full blur-3xl bottom-1/4 right-1/4 opacity-50"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">
        <div className="card bg-white border-2 border-slate-200 rounded-2xl p-10 sm:p-12 shadow-2xl">
          
          {/* ICON */}
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="w-10 h-10 text-blue-900" />
          </div>

          {/* TITLE */}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-2">
            NorthSide Kits
          </h1>
          <p className="text-sm font-bold text-slate-600 text-center mb-10 uppercase tracking-widest">
            Admin Portal
          </p>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* PASSWORD INPUT */}
            <div className="relative">
              <div className="input-premium relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Master Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Access Admin'}
            </button>
          </form>

          {/* SECURITY NOTE */}
          <div className="mt-8 pt-8 border-t border-slate-200 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-emerald-700">✓</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This is a secure login portal. Only authorized personnel should access this area.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage