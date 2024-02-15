import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const chatRoomSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    userIds: {
      type: Array,
      requried: true
    },
    chatRoomType: {
      type: String,
      required: true
    },
    chatInitiator: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'chatroom'
  }
);

export const ChatRoomModel = mongoose.model('chatroom', chatRoomSchema);