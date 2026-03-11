const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const Conversation = require('../models/Conversation')
const Message = require('../models/Message')
const ChatRoom = require('../models/ChatRoom')
const ChatRoomMessage = require('../models/ChatRoomMessage')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.use(authMiddleware)

const formatTime = (dateValue) => {
  if (!dateValue) return ''
  const date = new Date(dateValue)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })

  return `${dateStr}, ${timeStr}`
}

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
      isActive: true,
    })
      .select('_id name email')
      .sort({ name: 1 })

    return res.json({ success: true, users })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch users' })
  }
})

router.get('/conversations', async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
      lastMessage: { $ne: '' },
    })
      .sort({ lastMessageAt: -1 })
      .populate('participants', '_id name')

    const payload = conversations.map((conversation) => {
      const other = conversation.participants.find(
        (participant) => String(participant._id) !== String(req.user._id)
      )

      return {
        id: conversation._id,
        otherUserId: other?._id || null,
        name: other?.name || 'Unknown',
        lastMessage: conversation.lastMessage || 'No messages yet',
        time: formatTime(conversation.lastMessageAt),
        updatedAt: conversation.lastMessageAt,
        hasUnread: (conversation.unreadFor || []).some(
          (userId) => String(userId) === String(req.user._id)
        ),
      }
    })

    return res.json({ success: true, conversations: payload })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch conversations' })
  }
})

const ensureConversation = async (currentUserId, otherUserId) => {
  let conversation = await Conversation.findOne({
    participants: { $all: [currentUserId, otherUserId] },
    $expr: { $eq: [{ $size: '$participants' }, 2] },
  })

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [currentUserId, otherUserId],
      lastMessage: '',
      lastMessageAt: new Date(),
    })
  }

  return conversation
}

router.get('/messages/:otherUserId', async (req, res) => {
  try {
    const { otherUserId } = req.params

    if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' })
    }

    const otherUser = await User.findById(otherUserId).select('_id name')
    if (!otherUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, otherUserId] },
      $expr: { $eq: [{ $size: '$participants' }, 2] },
    })

    if (!conversation) {
      return res.json({
        success: true,
        conversationId: null,
        otherUser,
        messages: [],
      })
    }

    if ((conversation.unreadFor || []).some((userId) => String(userId) === String(req.user._id))) {
      conversation.unreadFor = (conversation.unreadFor || []).filter(
        (userId) => String(userId) !== String(req.user._id)
      )
      await conversation.save()
    }

    const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 })

    const payload = messages.map((message) => ({
      id: message._id,
      senderId: message.senderId,
      sender: String(message.senderId) === String(req.user._id) ? 'You' : otherUser.name,
      text: message.text,
      time: formatTime(message.createdAt),
      createdAt: message.createdAt,
    }))

    return res.json({
      success: true,
      conversationId: conversation._id,
      otherUser,
      messages: payload,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch messages' })
  }
})

router.post('/messages/:otherUserId', async (req, res) => {
  try {
    const { otherUserId } = req.params
    const { text } = req.body

    if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' })
    }

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Message text is required' })
    }

    const otherUser = await User.findById(otherUserId).select('_id name')
    if (!otherUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const conversation = await ensureConversation(req.user._id, otherUserId)

    const message = await Message.create({
      conversationId: conversation._id,
      senderId: req.user._id,
      receiverId: otherUserId,
      text: text.trim(),
    })

    conversation.lastMessage = message.text
    conversation.lastMessageSenderId = req.user._id
    conversation.lastMessageAt = message.createdAt
    conversation.unreadFor = [otherUser._id]
    await conversation.save()

    return res.status(201).json({
      success: true,
      message: {
        id: message._id,
        senderId: message.senderId,
        sender: 'You',
        text: message.text,
        time: formatTime(message.createdAt),
        createdAt: message.createdAt,
      },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to send message' })
  }
})

router.get('/rooms', async (req, res) => {
  try {
    const rooms = await ChatRoom.find({ members: req.user._id }).sort({ lastMessageAt: -1 })

    const payload = rooms.map((room) => ({
      id: room._id,
      name: room.name,
      members: room.members.length,
      lastMessage: room.lastMessage || 'No messages yet',
      time: formatTime(room.lastMessageAt),
      hasUnread: (room.unreadFor || []).some((userId) => String(userId) === String(req.user._id)),
      createdAt: room.createdAt,
    }))

    return res.json({ success: true, rooms: payload })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch rooms' })
  }
})

router.post('/rooms', async (req, res) => {
  try {
    const { name } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Room name is required' })
    }

    const allActiveUsers = await User.find({ isActive: true }).select('_id')
    const memberIds = allActiveUsers.map((item) => item._id)

    if (!memberIds.some((id) => String(id) === String(req.user._id))) {
      memberIds.push(req.user._id)
    }

    const room = await ChatRoom.create({
      name: name.trim(),
      createdBy: req.user._id,
      members: memberIds,
      lastMessage: '',
      lastMessageAt: new Date(),
      unreadFor: [],
    })

    return res.status(201).json({
      success: true,
      room: {
        id: room._id,
        name: room.name,
        members: room.members.length,
        lastMessage: room.lastMessage,
        time: formatTime(room.lastMessageAt),
        hasUnread: false,
      },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create room' })
  }
})

router.get('/rooms/:roomId/messages', async (req, res) => {
  try {
    const { roomId } = req.params

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ success: false, message: 'Invalid room id' })
    }

    const room = await ChatRoom.findById(roomId)
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' })
    }

    const isMember = room.members.some((memberId) => String(memberId) === String(req.user._id))
    if (!isMember) {
      return res.status(403).json({ success: false, message: 'You are not a member of this room' })
    }

    if ((room.unreadFor || []).some((userId) => String(userId) === String(req.user._id))) {
      room.unreadFor = (room.unreadFor || []).filter((userId) => String(userId) !== String(req.user._id))
      await room.save()
    }

    const messages = await ChatRoomMessage.find({ roomId: room._id }).sort({ createdAt: 1 })

    const payload = messages.map((message) => ({
      id: message._id,
      senderId: message.senderId,
      sender: String(message.senderId) === String(req.user._id) ? 'You' : message.senderName,
      text: message.text,
      time: formatTime(message.createdAt),
      createdAt: message.createdAt,
    }))

    return res.json({
      success: true,
      room: {
        id: room._id,
        name: room.name,
        members: room.members.length,
      },
      messages: payload,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch room messages' })
  }
})

router.post('/rooms/:roomId/messages', async (req, res) => {
  try {
    const { roomId } = req.params
    const { text } = req.body

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ success: false, message: 'Invalid room id' })
    }

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Message text is required' })
    }

    const room = await ChatRoom.findById(roomId)
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' })
    }

    const isMember = room.members.some((memberId) => String(memberId) === String(req.user._id))
    if (!isMember) {
      return res.status(403).json({ success: false, message: 'You are not a member of this room' })
    }

    const message = await ChatRoomMessage.create({
      roomId: room._id,
      senderId: req.user._id,
      senderName: req.user.name,
      text: text.trim(),
    })

    room.lastMessage = message.text
    room.lastMessageAt = message.createdAt
    room.unreadFor = room.members.filter((memberId) => String(memberId) !== String(req.user._id))
    await room.save()

    return res.status(201).json({
      success: true,
      message: {
        id: message._id,
        senderId: message.senderId,
        sender: 'You',
        text: message.text,
        time: formatTime(message.createdAt),
        createdAt: message.createdAt,
      },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to send room message' })
  }
})

module.exports = router
