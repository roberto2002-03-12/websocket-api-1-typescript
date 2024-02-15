import { HttpError } from '../models/classes';
import { ChatRoomModel } from '../models/mongodb';

export const initiateChat = async (userIds: string[], chatRoomType: string, chatInitiator: string) => {
  try {
    const room = await ChatRoomModel.findOne({
      userIds: {
        $size: userIds.length, // buscar por cantidad de elementos
        $all: [...userIds] // buscar que dicho array contenga dichos ids especificados
      },
      chatRoomType
    });

    if (room) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: room._id,
        type: room.chatRoomType
      };
    };

    const newRoom = await ChatRoomModel.create({
      userIds,
      chatRoomType,
      chatInitiator,
    });

    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._id,
      type: newRoom.chatRoomType
    };
  } catch (error) {
    console.log('error on start chat method ', error);
    throw error;
  }
};

export const getChatRoomByRoomId = async (roomId: string) => {
  try {
    const room = await ChatRoomModel.findOne({ _id: roomId });

    if (!room) throw new HttpError(404, false, { message: 'Room not found' });

    return room;
  } catch (error) {
    throw error;
  }
};

