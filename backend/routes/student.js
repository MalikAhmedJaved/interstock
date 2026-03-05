const express = require('express')
const Assignment = require('../models/Assignment')
const Quiz = require('../models/Quiz')
const Notification = require('../models/Notification')
const Note = require('../models/Note')

const router = express.Router()

const timeAgo = (dateValue) => {
  const diffMs = Date.now() - new Date(dateValue).getTime()
  const mins = Math.floor(diffMs / (1000 * 60))
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} minute${mins > 1 ? 's' : ''} ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

router.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 })
    res.json({ success: true, assignments })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch assignments' })
  }
})

router.get('/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' })
    }
    res.json({ success: true, assignment })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch assignment' })
  }
})

router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 })
    res.json({ success: true, quizzes })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch quizzes' })
  }
})

router.get('/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' })
    }
    res.json({ success: true, quiz })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch quiz' })
  }
})

router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50)

    const formatted = notifications.map((item) => ({
      id: item._id,
      title: item.title,
      message: item.message,
      type: item.type,
      time: timeAgo(item.createdAt),
      referenceId: item.referenceId,
      teacherName: item.teacherName,
      createdAt: item.createdAt,
    }))

    res.json({ success: true, notifications: formatted })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' })
  }
})

router.post('/assignments', async (req, res) => {
  try {
    const { title, subject, description, deadline, time, teacherName, uploadedBy } = req.body

    if (!title || !subject || !deadline || !teacherName) {
      return res.status(400).json({
        success: false,
        message: 'title, subject, deadline and teacherName are required',
      })
    }

    const assignment = await Assignment.create({
      title,
      subject,
      description: description || '',
      deadline,
      time: time || '11:59 PM',
      teacherName,
      uploadedBy: uploadedBy || null,
    })

    await Notification.create({
      type: 'assignment',
      title: 'New Assignment Uploaded',
      message: `${teacherName} uploaded "${title}" assignment`,
      referenceId: assignment._id,
      teacherName,
    })

    res.status(201).json({ success: true, assignment })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload assignment' })
  }
})

router.post('/quizzes', async (req, res) => {
  try {
    const { title, subject, description, deadline, time, questions, duration, teacherName, uploadedBy } = req.body

    if (!title || !subject || !deadline || !teacherName) {
      return res.status(400).json({
        success: false,
        message: 'title, subject, deadline and teacherName are required',
      })
    }

    const quiz = await Quiz.create({
      title,
      subject,
      description: description || '',
      deadline,
      time: time || '10:00 AM',
      questions: questions || 10,
      duration: duration || `${questions || 10} min`,
      teacherName,
      uploadedBy: uploadedBy || null,
    })

    await Notification.create({
      type: 'quiz',
      title: 'New Quiz Uploaded',
      message: `${teacherName} uploaded "${title}" quiz`,
      referenceId: quiz._id,
      teacherName,
    })

    res.status(201).json({ success: true, quiz })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to upload quiz' })
  }
})

router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 })
    res.json({ success: true, notes })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notes' })
  }
})

router.post('/notes', async (req, res) => {
  try {
    const { title, content, username, userId } = req.body

    if (!title || !content || !username || !userId) {
      return res.status(400).json({
        success: false,
        message: 'title, content, username and userId are required',
      })
    }

    const note = await Note.create({
      title: title.trim(),
      content,
      preview: content.length > 50 ? `${content.substring(0, 50)}...` : content,
      date: new Date().toISOString().split('T')[0],
      username,
      userId,
    })

    res.status(201).json({ success: true, note })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save note' })
  }
})

router.put('/notes/:id', async (req, res) => {
  try {
    const { title, content, userId } = req.body

    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' })
    }

    if (!userId || note.userId !== userId) {
      return res.status(403).json({ success: false, message: 'You can only edit your own notes' })
    }

    note.title = title?.trim() || note.title
    note.content = content || note.content
    note.preview = note.content.length > 50 ? `${note.content.substring(0, 50)}...` : note.content
    await note.save()

    res.json({ success: true, note })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update note' })
  }
})

router.delete('/notes/:id', async (req, res) => {
  try {
    const { userId } = req.body

    const note = await Note.findById(req.params.id)
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' })
    }

    if (!userId || note.userId !== userId) {
      return res.status(403).json({ success: false, message: 'You can only delete your own notes' })
    }

    await Note.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Note deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete note' })
  }
})

module.exports = router
