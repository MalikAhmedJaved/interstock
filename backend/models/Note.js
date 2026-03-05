const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)
