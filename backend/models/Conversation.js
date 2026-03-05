const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    lastMessage: {
      type: String,
      default: '',
    },
    lastMessageSenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    unreadFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
)

conversationSchema.index({ participants: 1 })

module.exports = mongoose.model('Conversation', conversationSchema)
