import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Upload } from 'lucide-react'
import Button from '../components/Button'
import TextField from '../components/TextField'

const EditProfilePage = () => {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  // Load current user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      })
      navigate('/profile')
    } catch (error) {
      alert('Failed to update profile. Please try again.')
      console.error('Profile update error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">Edit Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <label className="cursor-pointer">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-primary/20">
                {image ? (
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                <Upload size={16} />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </div>
  )
}

export default EditProfilePage


