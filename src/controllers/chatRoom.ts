import { Request, Response } from 'express'
import { initiateChat, createPostInChatRoomService, getConversationByRoomIdService, getChatRoomByRoomId, getUserByIds } from '../services';
import { ResponseHttp, IJwtRequest, IMessage, HttpError, IOptions } from '../models/classes';

const initiateChatController = async (req: Request, res: Response) => {
  try {
    const { userIds, chatRoomType } = req.body;
    const userId = (req as IJwtRequest).userId || 'null';
    const allUserIds = userIds as string[];
    allUserIds.push(userId)
    const response = await initiateChat(allUserIds, chatRoomType as string, userId);
    return res.status(201).json(new ResponseHttp(true, response))
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const createPostInChatRoomController = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const currentLoggedUser: string = (req as IJwtRequest).userId;

    const objToSend: IMessage = {
      chatRoomId: roomId as string,
      message: {
        messageText: req.body.messageText
      },
      type: 'text',
      postedByUser: currentLoggedUser,
      readByRecipients: []
    };

    const post = await createPostInChatRoomService(objToSend);
    globalThis.SocketServer.sockets.in(roomId).emit("New Message", { message: post } );
    return res.status(200).json(new ResponseHttp(true, post))
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.statusCode).json(error);
    return res.status(500).json(error);
  }
}

const getConversationByRoomIdController = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const room = await getChatRoomByRoomId(roomId as string);
    const users = await getUserByIds(room.userIds);

    const options: IOptions = {
      page: parseInt(req.query.page as string) ?? 1,
      limit: parseInt(req.query.page as string) ?? 0
    };

    const conversation = await getConversationByRoomIdService(roomId, options);

    return res.status(200).json(new ResponseHttp(true, { conversation, users }));
  } catch (error: any) {
    console.log(error);
    if (error instanceof HttpError) return res.status(error.statusCode).json(error);
    return res.status(500).json(error);
  }
}

export default {
  initiate: initiateChatController,
  postMessage: createPostInChatRoomController,
  getRecentConversation: async (req: Request, res: Response) => { },
  getConversationByRoomId: getConversationByRoomIdController,
  markConversationReadByRoomId: async (req: Request, res: Response) => { },
}