import { MessageModel } from '../models/mongodb';
import { IMessage, IOptions } from '../models/classes';
import { getChatRoomByRoomId } from './chatroom.service';

export const createPostInChatRoomService = async (obj: IMessage) => {
  try {
    const room = getChatRoomByRoomId(obj.chatRoomId);

    const newObj: IMessage = {
      ...obj,
      readByRecipients: [
        {
          readByUserId: obj.postedByUser,
          readAt: new Date(Date.now())
        }
      ]
    }

    await room;

    const post = await MessageModel.create(newObj);
    // aggregate sirve para agrupar objetos y realizar filtros sobre un modelo
    const aggregate = await MessageModel.aggregate([
      {
        $match: {
          _id: post._id
        }
      },
      {
        // lookup sirve para realizar operaciones tipo Join en mongodb
        $lookup: {
          from: 'users', // de que tabla proviene
          localField: 'postedByUser', // atributo de la tabla IMessage para relacionar entre dos
          foreignField: '_id', // atributo de la tabla user para usar como referencia
          as: 'postedByUser' // alias
        }
      },
      {
        // lo que hace esto es según un array crear varias copias de un objeto pero con cada valor del
        // del array, por ejemplo si un libro tiene 2 categorias entonces crearía dos objetos
        // con los mismos campos pero diferentes categorias
        $unwind: '$postedByUser'
      },
      {
        $lookup: {
          from: 'chatroom',
          localField: 'chatRoomId',
          foreignField: '_id',
          as: 'chatRoomInfo'
        }
      },
      {
        $unwind: '$chatRoomInfo'
      },
      {
        $unwind: '$chatRoomInfo.userIds'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'chatRoomInfo.userIds',
          foreignField: '_id',
          as: 'chatRoomInfo.userProfile', // dentro de chatRoomInfo estas agregando el campo
          // userProfile que es un array lleno de objetos
        }
        /*
         Una representación de como podría quedar
         {
           "_id": ObjectId("..."),
           "chatRoomInfo": {
             "userIds": [...],
             "userProfile": [
               { "_id": ObjectId("..."), "name": "Usuario1", ... },
               { "_id": ObjectId("..."), "name": "Usuario2", ... },
             ]
           },
         }
         */
      },
      {
        $unwind: '$chatRoomInfo.userProfile'
      },
      {
        $group: {
          _id: '$chatRoomInfo._id',
          postId: { $last: '$_id' },
          chatRoomId: { $last: '$chatRoomInfo._id' },
          message: { $last: '$message' },
          type: { $last: '$type' },
          postedByUser: { $last: '$postedByUser' },
          readByRecipients: { $last: '$readByRecipients' },
          chatRoomInfo: { $addToSet: '$chatRoomInfo.userProfile' },
          createdAt: { $last: '$createdAt' },
          updatedAt: { $last: '$updatedAt' },
        }
      }
    ]);

    return aggregate[0];
  } catch (error) {
    throw error;
  }
}

export const getConversationByRoomIdService = async (chatRoomId: string, options: IOptions) => {
  try {
    return MessageModel.aggregate([
      { $match: { chatRoomId } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser'
        }
      },
      { $unwind: '$postedByUser' },
      { $skip: options.page * options.limit },
      { $limit: options.limit },
      { $sort: { createdAt: 1 } }
    ]);
  } catch (error) {
    throw error;
  }
}