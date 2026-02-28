// Utility functions for tracking assignment submissions

const STORAGE_KEY = 'assignmentSubmissions'

/**
 * Get all submitted assignments
 * @returns {Object} Object with assignment IDs as keys and submission dates as values
 */
export const getSubmittedAssignments = () => {
  try {
    const submissions = localStorage.getItem(STORAGE_KEY)
    return submissions ? JSON.parse(submissions) : {}
  } catch (error) {
    console.error('Error reading assignment submissions:', error)
    return {}
  }
}

/**
 * Check if an assignment is submitted
 * @param {number} assignmentId - The assignment ID
 * @returns {boolean} True if assignment is submitted
 */
export const isAssignmentSubmitted = (assignmentId) => {
  const submissions = getSubmittedAssignments()
  return !!submissions[assignmentId]
}

/**
 * Get submission date for an assignment
 * @param {number} assignmentId - The assignment ID
 * @returns {string|null} Submission date or null if not submitted
 */
export const getSubmissionDate = (assignmentId) => {
  const submissions = getSubmittedAssignments()
  return submissions[assignmentId] || null
}

/**
 * Mark an assignment as submitted
 * @param {number} assignmentId - The assignment ID
 * @returns {string} Submission date
 */
export const submitAssignment = (assignmentId) => {
  try {
    const submissions = getSubmittedAssignments()
    const submissionDate = new Date().toISOString()
    submissions[assignmentId] = submissionDate
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))
    return submissionDate
  } catch (error) {
    console.error('Error saving assignment submission:', error)
    throw error
  }
}
