import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, User } from 'lucide-react'
import Button from '../components/Button'

const UploadPicturePage = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState(null)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-background-light px-6 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-medium font-orbitron mb-2">Upload Picture</h2>
        <p className="text-text-secondary-light mb-8">Add your profile picture</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-primary">
                {image ? (
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-gray-400" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="text-center">
            <label className="cursor-pointer">
              <div className="inline-flex items-center gap-2 text-primary font-medium">
                <Upload size={20} />
                <span>Upload Photo</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <Button type="submit" className="w-full">
            Complete Registration
          </Button>

          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full text-center text-text-secondary-light hover:text-primary transition-colors"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadPicturePage




