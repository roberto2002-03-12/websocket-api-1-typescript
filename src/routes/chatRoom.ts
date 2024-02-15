import express from 'express';
import chatRoom from '../controllers/chatRoom';
import { createChatRoomSchema, postMessageSchema, sendRoomIdSchema, optionsQuerySchema,  } from '../validator'
import { decode, validationMiddleware } from '../middlewares';

const router = express.Router();

router
  .get(
    '/', 
    chatRoom.getRecentConversation
  )
  .get(
    '/:roomId',
    decode,
    validationMiddleware(sendRoomIdSchema, 'params'),
    validationMiddleware(optionsQuerySchema, 'query'),
    chatRoom.getConversationByRoomId
  )
  .post(
    '/initiate', 
    decode, 
    validationMiddleware(createChatRoomSchema, 'body'), 
    chatRoom.initiate
  )
  .post(
    '/:roomId/message', 
    decode, 
    validationMiddleware(sendRoomIdSchema, 'params'), 
    validationMiddleware(postMessageSchema, 'body'), 
    chatRoom.postMessage
  )
  .put(
    '/:roomId/mark-read', 
    chatRoom.markConversationReadByRoomId
  )

export default router;