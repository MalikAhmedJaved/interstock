import { useNavigate } from 'react-router-dom'
import { Plus, Heart, MessageCircle, Share } from 'lucide-react'

const CommunityPostsPage = () => {
  const navigate = useNavigate()

  const posts = [
    {
      id: 1,
      author: 'John Doe',
      content: 'Just made my first profitable trade! Excited to learn more.',
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'Great analysis on tech stocks. What are your thoughts?',
      likes: 18,
      comments: 8,
    },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-orbitron">Community Posts</h2>
        <button
          onClick={() => navigate('/new-post')}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="card p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <span className="font-semibold">{post.author}</span>
            </div>
            <p className="text-text-primary-dark">{post.content}</p>
            <div className="flex items-center gap-6 text-text-secondary-light">
              <button className="flex items-center gap-2 hover:text-stock-red">
                <Heart size={18} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary">
                <MessageCircle size={18} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary">
                <Share size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommunityPostsPage


