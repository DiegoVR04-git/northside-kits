import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Trash2, Plus, Upload, X, Pencil, Save, LogOut, BarChart3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function AdminPage() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()
  
  const POSIBLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const initialFormState = {
    name: '', team: '', price: '', description: '', 
    season: '24/25', type: 'home', league: 'Premier League', isRetro: 'false',
    selectedSizes: []
  }

  const [formData, setFormData] = useState(initialFormState)
  const [files, setFiles] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jerseys`)
      setProducts(res.data)
    } catch (error) { 
      console.error(error) 
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSizeToggle = (size) => {
    setFormData(prev => {
      if (prev.selectedSizes.includes(size)) {
        return { ...prev, selectedSizes: prev.selectedSizes.filter(s => s !== size) }
      } else {
        return { ...prev, selectedSizes: [...prev.selectedSizes, size] }
      }
    })
  }

  const handleFileChange = (e) => {
    setFiles(e.target.files)
  }

  const handleEdit = (product) => {
    setEditingId(product._id)
    setFormData({
      name: product.name,
      team: product.team,
      price: product.price,
      description: product.description,
      season: product.season,
      type: product.type,
      league: product.league,
      isRetro: product.isRetro.toString(),
      selectedSizes: product.sizes || []
    })
    setFiles(null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = () => {
    setFormData(initialFormState)
    setFiles(null)
    setEditingId(null)
    setShowForm(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    
    Object.keys(formData).forEach(key => {
      if (key !== 'selectedSizes') data.append(key, formData[key])
    })

    data.append('sizes', JSON.stringify(formData.selectedSizes))

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        data.append('images', files[i])
      }
    }

    try {
      const url = editingId 
        ? `${import.meta.env.VITE_API_URL}/api/jerseys/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/jerseys`
      
      const method = editingId ? 'put' : 'post'
      const token = localStorage.getItem('adminToken')

      await axios[method](url, data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })

      toast.success(editingId ? '✅ Jersey updated!' : '✅ Jersey created!')
      resetForm()
      fetchProducts()
    } catch (error) {
      console.error(error)
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('❌ Session expired. Please login again.')
        handleLogout()
      } else {
        toast.error('❌ Error saving product. Check console.')
      }
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken')
    toast((t) => (
      <div className="flex gap-3 items-center">
        <span>Delete this jersey?</span>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/jerseys/${id}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                })
                toast.dismiss(t.id)
                toast.success('Jersey deleted')
                fetchProducts()
              } catch (error) {
                toast.dismiss(t.id)
                if (error.response?.status === 401 || error.response?.status === 403) {
                  toast.error('Session expired. Please login again.')
                  handleLogout()
                } else {
                  toast.error('Error deleting product')
                }
              }
            }}
            className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700"
          >
            Sí
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-slate-300 text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-400"
          >
            No
          </button>
        </div>
      </div>
    ), { duration: Infinity })
  }

  const totalProducts = products.length
  const inStock = products.filter(p => p.sizes && p.sizes.length > 0).length
  const soldOut = totalProducts - inStock

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <BarChart3 size={28} />
                </div>
                <h1 className="text-3xl sm:text-4xl font-black">NorthSide Kits</h1>
              </div>
              <p className="text-blue-100 font-medium">Dashboard</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95"
              title="Logout"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <p className="text-blue-100 text-sm font-medium mb-1">Total Products</p>
              <p className="text-3xl font-black">{totalProducts}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <p className="text-blue-100 text-sm font-medium mb-1">In Stock</p>
              <p className="text-3xl font-black text-emerald-300">{inStock}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
              <p className="text-blue-100 text-sm font-medium mb-1">Sold Out</p>
              <p className="text-3xl font-black text-red-300">{soldOut}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
        
        {/* CREATE/EDIT FORM */}
        {showForm && (
          <div className="card bg-white border-2 border-slate-200 rounded-2xl p-8 mb-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {editingId ? 'Edit Jersey' : 'Create New Jersey'}
              </h2>
              <button 
                onClick={resetForm}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ROW 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  name="name" 
                  value={formData.name} 
                  placeholder="Jersey Name (e.g. Arsenal Home)" 
                  onChange={handleChange} 
                  className="input-premium" 
                  required 
                />
                <input 
                  name="team" 
                  value={formData.team} 
                  placeholder="Team (e.g. Arsenal)" 
                  onChange={handleChange} 
                  className="input-premium" 
                  required 
                />
              </div>

              {/* ROW 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <input 
                  name="league" 
                  value={formData.league} 
                  placeholder="League (e.g. Premier League)" 
                  onChange={handleChange} 
                  className="input-premium" 
                  required 
                />
                <input 
                  name="price" 
                  value={formData.price} 
                  type="number" 
                  placeholder="Price" 
                  onChange={handleChange} 
                  className="input-premium" 
                  required 
                />
                <input 
                  name="season" 
                  value={formData.season} 
                  placeholder="Season (e.g. 24/25)" 
                  onChange={handleChange} 
                  className="input-premium" 
                />
              </div>

              {/* ROW 3 - SELECTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  className="input-premium"
                >
                  <option value="home">Home</option>
                  <option value="away">Away</option>
                  <option value="third">Third</option>
                  <option value="special">Special</option>
                  <option value="gk">Goalkeeper</option>
                </select>
                <select 
                  name="isRetro" 
                  value={formData.isRetro} 
                  onChange={handleChange} 
                  className="input-premium"
                >
                  <option value="false">Current</option>
                  <option value="true">Retro</option>
                </select>
              </div>

              {/* SIZE CHECKBOXES */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6">
                <p className="font-black text-slate-900 mb-4">Available Sizes</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {POSIBLE_SIZES.map(size => (
                    <label 
                      key={size} 
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 font-bold cursor-pointer transition-all ${
                        formData.selectedSizes.includes(size)
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-white text-slate-900 border-slate-300 hover:border-blue-900'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={formData.selectedSizes.includes(size)}
                        onChange={() => handleSizeToggle(size)}
                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                      />
                      {size}
                    </label>
                  ))}
                </div>
                {formData.selectedSizes.length === 0 && (
                  <div className="bg-red-50 border-l-4 border-red-600 text-red-700 p-4 rounded">
                    <p className="font-bold">⚠️ No sizes selected. Product will show as SOLD OUT.</p>
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <textarea 
                name="description" 
                value={formData.description} 
                placeholder="Product description..." 
                onChange={handleChange} 
                className="input-premium h-28"
              />

              {/* FILE UPLOAD */}
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-900 hover:bg-blue-50 transition-all">
                <Upload size={32} className="text-slate-400 mx-auto mb-2" />
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange} 
                  className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-blue-900 file:text-white hover:file:bg-blue-800" 
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                type="submit" 
                className="btn-primary w-full py-4 px-6 flex justify-center items-center gap-3 text-lg"
              >
                <Save size={24} /> 
                {editingId ? 'Update Jersey' : 'Create Jersey'}
              </button>
            </form>
          </div>
        )}

        {/* NEW JERSEY BUTTON */}
        {!showForm && (
          <button 
            onClick={() => { resetForm(); setShowForm(true); }} 
            className="btn-primary mb-10 w-full sm:w-auto inline-flex items-center gap-3 py-4 px-8 text-lg"
          >
            <Plus size={24} />
            New Jersey
          </button>
        )}

        {/* PRODUCTS TABLE */}
        <div className="card bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200">
                <tr>
                  <th className="p-4 text-left font-black text-slate-900">Image</th>
                  <th className="p-4 text-left font-black text-slate-900">Name / Team</th>
                  <th className="p-4 text-left font-black text-slate-900">Type</th>
                  <th className="p-4 text-left font-black text-slate-900">Stock</th>
                  <th className="p-4 text-left font-black text-slate-900">Price</th>
                  <th className="p-4 text-center font-black text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...products].sort((a, b) => {
                  const aSoldOut = !a.sizes || a.sizes.length === 0
                  const bSoldOut = !b.sizes || b.sizes.length === 0
                  return aSoldOut - bSoldOut
                }).map(p => {
                  const isSoldOut = !p.sizes || p.sizes.length === 0
                  return (
                    <tr key={p._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className={`w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden ${isSoldOut ? 'grayscale opacity-50' : ''}`}>
                          <img 
                            src={p.images[0]} 
                            alt={p.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{p.name}</p>
                        <p className="text-sm text-slate-600">{p.team} • {p.league}</p>
                      </td>
                      <td className="p-4">
                        <span className="badge bg-slate-100 text-slate-800 capitalize">{p.type}</span>
                      </td>
                      <td className="p-4">
                        {isSoldOut ? (
                          <span className="badge bg-red-100 text-red-800 font-bold">SOLD OUT</span>
                        ) : (
                          <span className="badge bg-emerald-100 text-emerald-800 font-mono text-xs">
                            {p.sizes.join(', ')}
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-black text-lg text-blue-900">${p.price}</td>
                      <td className="p-4">
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={() => handleEdit(p)} 
                            className="p-2 text-slate-600 hover:bg-blue-100 hover:text-blue-900 rounded-lg transition-all" 
                            title="Edit"
                          >
                            <Pencil size={20} />
                          </button>
                          <button 
                            onClick={() => handleDelete(p._id)} 
                            className="p-2 text-slate-600 hover:bg-red-100 hover:text-red-900 rounded-lg transition-all" 
                            title="Delete"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage