// Shared quizzes data - used by QuizHomePage, QuizDetailPage, and UpcomingTasksPage
// In a real app, this would come from an API

export const quizzesData = [
  {
    id: 1,
    title: 'Stock Market Basics Quiz',
    deadline: '2025-11-27',
    time: '10:00 AM',
    questions: 15,
    subject: 'Trading Fundamentals',
    status: 'upcoming',
    description: 'Test your knowledge of stock market fundamentals. This quiz covers basic concepts including stock types, market operations, and trading principles.'
  },
  {
    id: 2,
    title: 'Risk Management Assessment',
    deadline: '2025-12-10',
    time: '2:00 PM',
    questions: 20,
    subject: 'Risk Management',
    status: 'upcoming',
    description: 'Assess your understanding of risk management strategies in trading. Topics include portfolio diversification, stop-loss orders, and risk assessment techniques.'
  },
  {
    id: 3,
    title: 'Options Trading Quiz',
    deadline: '2025-12-15',
    time: '3:30 PM',
    questions: 18,
    subject: 'Options Trading',
    status: 'upcoming',
    description: 'Evaluate your knowledge of options trading. This quiz covers call and put options, option strategies, and options pricing fundamentals.'
  },
  {
    id: 4,
    title: 'Quick Knowledge Check',
    deadline: '2025-12-04',
    time: '11:00 AM',
    questions: 1,
    subject: 'General Knowledge',
    status: 'upcoming',
    description: 'A quick single-question quiz to test your basic knowledge. You have 30 seconds to answer.',
    durationSeconds: 30 // Custom duration in seconds
  },
  {
    id: 5,
    title: 'Technical Analysis Fundamentals',
    deadline: '2025-12-25',
    time: '9:00 AM',
    questions: 5,
    subject: 'Technical Analysis',
    status: 'upcoming',
    description: 'Test your understanding of technical analysis concepts including chart patterns, indicators, and trend analysis.'
  },
  {
    id: 6,
    title: 'Portfolio Management Basics',
    deadline: '2025-12-08',
    time: '2:30 PM',
    questions: 5,
    subject: 'Portfolio Management',
    status: 'upcoming',
    description: 'Assess your knowledge of portfolio management principles including asset allocation, rebalancing, and risk-return tradeoffs.'
  },
 
]

// Helper function to add duration property
export const getQuizzesWithDuration = () => {
  return quizzesData.map(quiz => ({
    ...quiz,
    duration: quiz.durationSeconds ? `${quiz.durationSeconds} sec` : `${quiz.questions} min`
  }))
}
