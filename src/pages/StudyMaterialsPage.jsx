import { FileText, Book, Video } from 'lucide-react'

const StudyMaterialsPage = () => {
  const materials = [
    { id: 1, title: 'Stock Market Basics PDF', type: 'PDF', icon: FileText },
    { id: 2, title: 'Trading Guide Book', type: 'Book', icon: Book },
    { id: 3, title: 'Video Tutorial Series', type: 'Video', icon: Video },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <h2 className="text-2xl font-bold font-orbitron">Study Materials</h2>

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


