import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FaqsPage = () => {
  const navigate = useNavigate()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How do I start trading?',
      answer: 'You can start by learning the basics in the Learn section, then practice with our simulated trading environment.',
    },
    {
      question: 'Is my money safe?',
      answer: 'Yes, we use a simulated environment for practice. No real money is involved in the learning platform.',
    },
    {
      question: 'How do quizzes work?',
      answer: 'Quizzes test your knowledge. Complete them to earn points and improve your ranking.',
    },
    {
      question: 'Can I reset my progress?',
      answer: 'Currently, progress cannot be reset. Contact support if you need assistance.',
    },
  ]

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-text-primary-dark">
          ← Back
        </button>
        <h2 className="text-2xl font-bold font-orbitron">FAQs</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="card">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 flex items-center justify-between"
            >
              <span className="font-semibold text-left">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-text-secondary-light" />
              ) : (
                <ChevronDown size={20} className="text-text-secondary-light" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-text-secondary-light">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FaqsPage


