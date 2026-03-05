const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema(
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
      default: '11:59 PM',
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

module.exports = mongoose.model('Assignment', assignmentSchema)
