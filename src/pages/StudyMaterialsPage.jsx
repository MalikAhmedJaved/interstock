import { useState, useEffect } from 'react'
import { FileText, Book, Video, AlertCircle, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const StudyMaterialsPage = () => {
  const { user } = useAuth()
  const isActive = user?.isActive !== false
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setShowDialog(true)
    }
  }, [isActive])

  const materials = [
    { id: 1, title: 'Stock Market Basics PDF', type: 'PDF', icon: FileText },
    { id: 2, title: 'Trading Guide Book', type: 'Book', icon: Book },
    { id: 3, title: 'Video Tutorial Series', type: 'Video', icon: Video },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <h2 className="text-2xl font-bold font-orbitron">Study Materials</h2>

      {showDialog && !isActive && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 relative">
          <button
            onClick={() => setShowDialog(false)}
            className="absolute top-3 right-3 text-blue-600 hover:text-blue-800"
          >
            <X size={18} />
          </button>
          <div className="flex items-start gap-3 pr-6">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-blue-800 font-semibold text-sm">Account Deactivated</p>
              <p className="text-blue-700 text-sm mt-1">You can see only old study materials which were shown before account deactivation. You can see new study materials when you activate your account.</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {materials.map((material) => {
          const Icon = material.icon
          return (
            <div key={material.id} className="card p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{material.title}</h3>
                  <p className="text-sm text-text-secondary-light">{material.type}</p>
                </div>
                <button className="text-primary font-semibold">Download</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StudyMaterialsPage


