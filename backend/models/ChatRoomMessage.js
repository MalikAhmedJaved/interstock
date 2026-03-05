const mongoose = require('mongoose')

const chatRoomMessageSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

chatRoomMessageSchema.index({ roomId: 1, createdAt: 1 })

module.exports = mongoose.model('ChatRoomMessage', chatRoomMessageSchema)
