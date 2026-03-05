const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    deadline: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: '10:00 AM',
    },
    questions: {
      type: Number,
      default: 10,
      min: 1,
    },
    duration: {
      type: String,
      default: '10 min',
    },
    teacherName: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Quiz', quizSchema)
