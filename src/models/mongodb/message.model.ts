import mongoose, { mongo } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const readMessageSchema = new mongoose.Schema(
  {
    readByUserId: String,
    readAt: {
      type: Date,
      default: Date.now()
    },
  }, 
  {
    _id: false,
    timestamps: false,
    collection: 'readMessage'
  }
);

const messageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4()
    },
    chatRoomId: {
      type: String,
      required: true,
      default: () => 'text'
    },
    message: mongoose.Schema.Types.Mixed,
    type: {
      type: String,
      default: () => 'text'
    },
    postedByUser: String,
    readByRecipients: [readMessageSchema],
  },
  {
    timestamps: true,
    collection: "message"
  }
);

const ReadMessageModel = mongoose.model('readMessage', readMessageSchema);
const MessageModel = mongoose.model('message', messageSchema);

export {
  MessageModel,
  ReadMessageModel
}